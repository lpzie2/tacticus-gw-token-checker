// parse json
function processGameData() {
    const eventData     = gameData.eventResults[0].eventResponseData;
    
    const tmpPlayerData = eventData.playerData;
    const tmpGuildData  = eventData.guildData;

    activityLogs        = eventData.activityLogs;

    // guild names
    document.getElementById('guild1Name').textContent = tmpGuildData[0].name;
    document.getElementById('guild2Name').textContent = tmpGuildData[1].name;

    // player lookup map
    const playerMap = {};
    tmpPlayerData.forEach(player => {
        playerMap[player.userId] = player.displayName;
    });

    // creating the player-centric table.
    tmpPlayerData.forEach(player => {
        playerData[player.userId] = {
            displayName: player.displayName,
            tokensRemaining: INITIAL_TOKENS,
            tokensUsed: 0,
            attacks:    0,
            defends:    0,
            guild:      null,
            battles: {
                '0med': { hit: 0, cleanup: 0, failed: 0 },
                '1med': { hit: 0, cleanup: 0, failed: 0 },
                '2med': { hit: 0, cleanup: 0, failed: 0 }
            },
            battleAsAttacker: [],
            battleAsDefender: [],
            defenseTeams: [],
            offenseTeams: [],
            defenseTeamSignatures: new Set(),
            offenseTeamSignatures: new Set()
        };
    });

    // auto-assign guilds based on teamIndex in activity logs
    activityLogs.forEach(log => {
        if (log.type === 'battleFinished' && log.userId && log.teamIndex) {
            if (playerData[log.userId]) {
                playerData[log.userId].guild = log.teamIndex;
            }
        }
        // lets also give the other value to the defender
        if (log.type === 'battleFinished' && log.defender && log.defender.userId) {
            if (playerData[log.defender.userId]) {
                playerData[log.defender.userId].guild = 3 - log.teamIndex;
            }
        }
    });

    // process the battle logs. save a reference to both players involved.
    battleData = {};
    activityLogs.forEach(log => {
        if (log.type === 'battleFinished') {

            const attackerId = log.userId;
            const defenderId = log.defender.userId || null;

            // probably an abandoned fight _before_ selecting characters
            if (!log.attacker) {

                battleData[log.id] = {
                    attackerUserId: log.userId,
                    defenderUserId: defenderId,
                    teamIndex:      log.teamIndex,
                    zone:           log.zone,
                    attemptDebuff:  log.attemptDebuff || 0,
                    score:          log.score || 0,
                    attacker:       null,
                    defender:       log.defender,
                    buffs:          log.buffs || [],
                    abandoned:      log.abandoned || false,
                    createdOn:      log.createdOn
                };

                playerData[attackerId].tokensRemaining--;
                playerData[attackerId].tokensUsed++;
                playerData[attackerId].attacks++;
                playerData[attackerId].battleAsAttacker.push(log.id);

                // if-statement because defender might be an npc
                if (defenderId && playerData[defenderId]) {
                    playerData[defenderId].defends++;
                    playerData[defenderId].battleAsDefender.push(log.id);

                    addDefenderTeam(defenderId, log.defender, log.id);
                }

                return;
            }

            // probably an abandoned fight _after_ selecting characters
            if (log.abandoned === true) {

                battleData[log.id] = {
                    attackerUserId: log.userId,
                    defenderUserId: defenderId,
                    teamIndex:      log.teamIndex,
                    zone:           log.zone,
                    attemptDebuff:  log.attemptDebuff || 0,
                    score:          log.score || 0,
                    attacker:       log.attacker,
                    defender:       log.defender,
                    buffs:          log.buffs || [],
                    abandoned:      log.abandoned || false,
                    createdOn:      log.createdOn
                };

                playerData[attackerId].tokensRemaining--;
                playerData[attackerId].tokensUsed++;
                playerData[attackerId].attacks++;
                playerData[attackerId].battleAsAttacker.push(log.id);

                addAttackerTeam(attackerId, log.attacker, log.id);

                if (defenderId && playerData[defenderId]) {
                    playerData[defenderId].defends++;
                    playerData[defenderId].battleAsDefender.push(log.id);

                    addDefenderTeam(defenderId, log.defender, log.id);
                }

                return;
            }

            // otherwise, this should be a completeled fight.

            battleData[log.id] = {
                attackerUserId: attackerId,
                defenderUserId: defenderId,
                teamIndex:      log.teamIndex,
                zone:           log.zone,
                attemptDebuff:  log.attemptDebuff || 0,
                score:          log.score || 0,
                attacker:       log.attacker,
                defender:       log.defender,
                buffs:          log.buffs || [],
                abandoned:      log.abandoned || false,
                createdOn:      log.createdOn
            }

            // process the fighters now

            // count med buffs
            const medCount = (log.buffs || []).filter(b => b.abilityId === 'EnvDefenderHealthBuff2').length;
                
            // determine the battle result for the Xmed display.
            let result;
            if (log.score >= 1100) {
                result = 'hit';
            } else {
                // check if any attacker unit survived (has remainingHPAfter)
                const hasSurvivors = (log.attacker.units || []).some(unit => unit.remainingHPAfter !== undefined);
                result = hasSurvivors ? 'cleanup' : 'failed';
            }
                
            // record the battle stats to both players
            playerData[attackerId].tokensRemaining--;
            playerData[attackerId].tokensUsed++;
            playerData[attackerId].attacks++;
            playerData[attackerId].battles[medCount + 'med'][result]++;
            playerData[attackerId].battleAsAttacker.push(log.id);

            addAttackerTeam(attackerId, log.attacker, log.id);

            if (defenderId && playerData[defenderId]) {
                playerData[defenderId].defends++;
                playerData[defenderId].battleAsDefender.push(log.id);

                addDefenderTeam(defenderId, log.defender, log.id);
            }
        }
    });

    // fill in missing teams with placeholders
    fillMissingTeams();

    // classify the teams
    classifyAllTeams();

    renderPlayers();
    renderStats();
}

function addAttackerTeam(attackerId, attacker, battleId) {
    if (!attacker || !playerData[attackerId]) return;
    
    const player = playerData[attackerId];
    
    // only process if we haven't hit 10 teams yet
    if (player.offenseTeams.length >= 10) return;
    
    const units = (attacker.units || []).map(unit => unit.unitId);
    const machineOfWar = attacker.machineOfWar ? attacker.machineOfWar.unitId : 'none';
    
    // create signature
    const signature = units.sort().join('|') + `|MOW:${machineOfWar}`;
    
    // check if this is a duplicate
    if (player.offenseTeamSignatures.has(signature)) return;
    
    // add the team
    player.offenseTeamSignatures.add(signature);
    player.offenseTeams.push({
        teamNumber: player.offenseTeams.length + 1,
        teamMetaName: null,
        units: units,
        machineOfWar: machineOfWar,
        lineupPower: attacker.lineupPower || 0,
        signature: signature,
        battleId: battleId
    });
}

// add defender team to player data
function addDefenderTeam(defenderId, defender, battleId) {
    if (!defender || !defenderId || !playerData[defenderId]) return;
    
    const player = playerData[defenderId];
    
    // only process if we haven't hit 5 teams yet
    if (player.defenseTeams.length >= 5) return;
    
    const units = (defender.units || []).map(unit => unit.unitId);
    const machineOfWar = defender.machineOfWar ? defender.machineOfWar.unitId : 'none';
    
    // create signature
    const signature = units.sort().join('|') + `|MOW:${machineOfWar}`;
    
    // check if this is a duplicate
    if (player.defenseTeamSignatures.has(signature)) return;
    
    // add the team
    player.defenseTeamSignatures.add(signature);
    player.defenseTeams.push({
        teamNumber: player.defenseTeams.length + 1,
        teamMetaName: null,
        units: units,
        machineOfWar: machineOfWar,
        lineupPower: defender.lineupPower || 0,
        signature: signature,
        battleId: battleId
    });
}

function fillMissingTeams() {
    Object.keys(playerData).forEach(userId => {
        const player = playerData[userId];
        
        // fill defense teams up to 5
        while (player.defenseTeams.length < 5) {
            player.defenseTeams.push({
                teamNumber: player.defenseTeams.length + 1,
                teamMetaName: 'default',
                units: ['placeholder1', 'placeholder2', 'placeholder3', 'placeholder4', 'placeholder5'],
                machineOfWar: 'placeholderMOW',
                lineupPower: 0,
                signature: 'default',
                battleId: null,
                isPlaceholder: true
            });
        }
        
        // fill offense teams up to 10
        while (player.offenseTeams.length < 10) {
            player.offenseTeams.push({
                teamNumber: player.offenseTeams.length + 1,
                teamMetaName: 'default',
                units: ['placeholder1', 'placeholder2', 'placeholder3', 'placeholder4', 'placeholder5'],
                machineOfWar: 'placeholderMOW',
                lineupPower: 0,
                signature: 'default',
                battleId: null,
                isPlaceholder: true
            });
        }
        
        // clean up the signature sets
        delete player.offenseTeamSignatures;
        delete player.defenseTeamSignatures;
    });
}

function classifyTeam(team) {
    const teamUnits = team.units;
    const teamMOW   = team.machineOfWar;
    
    for (const [metaName, definition] of Object.entries(TEAM_META_DEFINITIONS)) {
        const hasAllRequiredUnits = definition.requiredUnits.every(requiredUnit => 
            teamUnits.includes(requiredUnit)
        );
        
        let meetsMOWRequirement = true;
        if (definition.requiredMOW !== null) {
            meetsMOWRequirement = (teamMOW === definition.requiredMOW);
        }
        
        if (hasAllRequiredUnits && meetsMOWRequirement) {
            team.metaTeam = definition.metaTeam || metaName.replace(/\d+$/, '').trim();
            return metaName;
        }
    }
    
    const factionName = detectFactionName(teamUnits, teamMOW);
    team.metaTeam = factionName.replace(' Team', '').replace(' Mixed', '');
    return factionName;

}

function detectUnitIdName(units, machineOfWar) {
    // join all unitIds with "/"
    let allUnits = [...units];
    
    // add mow if it exists and isn't a placeholder
    if (machineOfWar && machineOfWar !== 'none' && machineOfWar !== 'placeholderMOW') {
        allUnits.push(machineOfWar);
    }
    
    return allUnits.join('/');
}

function detectFactionName(units, machineOfWar) {
    
    const foundFactions = new Set();
    
    // check all units sans mow.
    units.forEach(unitId => {
        for (const [prefix, faction] of Object.entries(FACTION_PREFIXES)) {
            if (unitId.toLowerCase().startsWith(prefix)) {
                foundFactions.add(faction);
            }
        }
    });
    
    // nvm, since we're not really displaying the misc teams with mows, lets not do this.
    // check mow
    //if (machineOfWar && machineOfWar !== 'none' && machineOfWar !== 'placeholderMOW') {
    //    for (const [prefix, faction] of Object.entries(FACTION_PREFIXES)) {
    //        if (machineOfWar.toLowerCase().startsWith(prefix)) {
    //            foundFactions.add(faction);
    //        }
    //    }
    //}
    
    if (foundFactions.size === 1) {
        return Array.from(foundFactions)[0] + ' Team';
    } else if (foundFactions.size > 1) {
        return Array.from(foundFactions).join('/') + ' Mixed';
    }
    
    return 'Unknown Team';
}

function classifyAllTeams() {
    Object.keys(playerData).forEach(userId => {
        const player = playerData[userId];
        
        // classify defense teams
        player.defenseTeams.forEach(team => {
            if (!team.isPlaceholder) {
                team.teamMetaName = classifyTeam(team);
            } else {
                team.teamMetaName = 'Empty Slot';
            }
        });
        
        // classify offense teams
        player.offenseTeams.forEach(team => {
            if (!team.isPlaceholder) {
                team.teamMetaName = classifyTeam(team);
            } else {
                team.teamMetaName = 'Empty Slot';
            }
        });
    });
}

// zone destruction timeline.
function getZoneProgression(activityLogs, teamIndex) {
    const progression = [];
    
    activityLogs.forEach(log => {
        if (log.teamIndex === teamIndex) {
            if (log.type === 'zoneDestroyed' && log.zone) {
                const zoneName = log.zone.type || 'Unknown';
                const visualID = log.zone.visualId || 'unknown_map';
                const attempts = log.totalAttempts || 0;
                progression.push({
                    type: 'zone',
                    name: zoneName,
                    visualID: visualID,
                    attempts: attempts,
                    time: log.createdOn
                });
            } else if (log.type === 'wipeout') {
                const attempts = log.totalAttempts || 0;
                progression.push({
                    type: 'wipeout',
                    attempts: attempts,
                    time: log.createdOn
                });
            }
        }
    });
    
    // sort by time
    progression.sort((a, b) => a.time - b.time);
    
    return progression;
}

// get the earliest start of the guild war (assumes someone attacked within the first hour)
function getGuildWarStartTime(activityLogs) {
    let earliestTime = null;
    
    activityLogs.forEach(log => {
        if (log.type === 'battleFinished' || log.type === 'markTarget') {
            if (log.createdOn && (earliestTime === null || log.createdOn < earliestTime)) {
                earliestTime = log.createdOn;
            }
        }
    });
    
    return earliestTime;
}

// calculate time remaining in guild war (30 hour duration)
function getGuildWarTimeStatus(startTime) {
    if (!startTime) return 'Unknown';
    
    const GW_DURATION_HOURS = 35;
    const currentTime = Date.now();
    const elapsedHours = (currentTime - startTime) / (1000 * 60 * 60);
    
    if (elapsedHours < GW_DURATION_HOURS) {
        const hoursLeft = Math.round(GW_DURATION_HOURS - elapsedHours);
        return `Time Left: ~${hoursLeft} hours`;
    } else {
        return 'Battle Finished';
    }
}

// convert unitId to image filename
function getUnitIcon(unitId) {
    // special case exceptions
    const exceptions = {
        // none atm, renamed all the files to fix these.
    };
    
    // check if this unitId has a special exception
    if (exceptions[unitId]) {
        return `img/${exceptions[unitId]}.png`;
    }

    // find the first capital letter and insert underscore before it
    // then convert everything to lowercase
    const filename = unitId.replace(/^([a-z]+)([A-Z].*)$/, '$1_$2').toLowerCase();
    return `img/${filename}.png`;
}

function getGuildTotalTokens(guildPlayers) {
    return guildPlayers.length * INITIAL_TOKENS;
}