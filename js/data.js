// parse json
function processGameData() {
    const eventData     = gameData.eventResults[0].eventResponseData;
    
    const tmpPlayerData = eventData.playerData;
    const tmpGuildData  = eventData.guildData;

    activityLogs        = eventData.activityLogs;

    const midTimestamp  = getMiddleTimestamp(activityLogs);
    currentSeasonKey    = midTimestamp ? detectSeasonKeyFromTimestamp(midTimestamp) : null;
    console.log('Detected season key:', currentSeasonKey);

    // guild names
    document.getElementById('guild1Name').textContent = tmpGuildData[0]?.name ?? 'Guild 1';
    document.getElementById('guild2Name').textContent = tmpGuildData[1]?.name ?? 'Guild 2';

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
            tokensAte:  0, // used for statistics.
            attacks:    0,
            defends:    0,
            scoreAtt:   0,
            scoreDef:   0,
            guild:      null,
            battles: {
                '0med': { hit: 0, cleanup: 0, failed: 0 },
                '1med': { hit: 0, cleanup: 0, failed: 0 },
                '2med': { hit: 0, cleanup: 0, failed: 0 }
            },
            performanceMetric: 0.0,
            defaultLines: 0,
            battleAsAttacker: [], // these are just
            battleAsDefender: [], // the log.id's.
            performancePerBattle: [],
            defenseTeams: [], // these are the actual teams,
            offenseTeams: [], // but not the actual fight.
            defenseTeamSignatures: new Set(),
            offenseTeamSignatures: new Set(),
            battleDetailsAsAttacker: [],
            battleDetailsAsDefender: [],
            mapAssignedTo: null,
            mapAssignedToCertainty: false,
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

    // also assign the tiles everybody is on. needs 3 different methods.
    //  1) check all the "type": "playerClaimedZone" entries. since ppl can
    //     move, we keep updating a players info with any later entries.
    //  2) we include "type": "playerMoved" entries with (1) because
    //     these are also pre-battle and need to be taken into account.
    //  3) we then add this info from "type": "battleFinished" and assign it
    //     to the userid of the defender. we also do this for the entries 
    //     from (1) because i might have missed something.
    // addressing (1) and (2) here. (3) we be done in the next area.
    activityLogs.forEach(log => {
        if (log.type === 'playerClaimedZone' && log.userId) {
            if (playerData[log.userId]) {
                playerData[log.userId].mapAssignedTo = log.zone.type;
            }
        } else if (log.type === 'playerMoved' && log.userId) {
            if (playerData[log.userId]) {
                playerData[log.userId].mapAssignedTo = log.targetZone.type;
            }
        }
    });


    // process the battle logs. save a reference to both players involved.
    battleData = {};
    activityLogs.forEach(log => {
        if (log.type === 'battleFinished') {

            const attackerId    = log.userId;
            const defenderId    = log.defender.userId || null;
            const playerScore   = extractPlayerScoreFromTotalScore(log.score || 0);
            const abandoned     = log.abandoned || false;

            // probably an abandoned fight _before_ selecting characters.
            // TODO: do i need to also check for log.abandoned === true?
            if (!log.attacker) {

                battleData[log.id] = {
                    attackerUserId: log.userId,
                    defenderUserId: defenderId,
                    teamIndex:      log.teamIndex,
                    zone:           log.zone,
                    attemptDebuff:  log.attemptDebuff || 0,
                    score:          log.score || 0,
                    scorePlayer:    playerScore,
                    attacker:       null,
                    defender:       log.defender,
                    buffs:          log.buffs || [],
                    abandoned:      abandoned,
                    createdOn:      log.createdOn
                };

                // process just the buff names
                const buffs = (log.buffs || []).map(buff => buff.abilityId);

                playerData[attackerId].tokensRemaining  = Math.max(0, Math.min(10, playerData[attackerId].tokensRemaining - 1));
                playerData[attackerId].tokensUsed       = Math.max(0, Math.min(10, playerData[attackerId].tokensUsed + 1));
                playerData[attackerId].attacks++;
                playerData[attackerId].battleAsAttacker.push(log.id);
                playerData[attackerId].performancePerBattle.push(0.0);

                // if-statement because defender might be an npc
                if (defenderId && playerData[defenderId]) {
                    playerData[defenderId].defends++;
                    playerData[defenderId].battleAsDefender.push(log.id);

                    playerData[defenderId].mapAssignedTo = log.zone.type;
                    playerData[defenderId].mapAssignedToCertainty = true;

                    addDefenderTeam(defenderId, log.defender, log.id);
                }

                addFullFightDetails(log.id, attackerId, null, defenderId, log.defender, buffs, playerScore, abandoned, 0.0, log.zone)

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
                    scorePlayer:    playerScore,
                    attacker:       log.attacker,
                    defender:       log.defender,
                    buffs:          log.buffs || [],
                    abandoned:      abandoned,
                    createdOn:      log.createdOn
                };

                const buffs = (log.buffs || []).map(buff => buff.abilityId);

                playerData[attackerId].tokensRemaining  = Math.max(0, Math.min(10, playerData[attackerId].tokensRemaining - 1));
                playerData[attackerId].tokensUsed       = Math.max(0, Math.min(10, playerData[attackerId].tokensUsed + 1));
                playerData[attackerId].attacks++;
                playerData[attackerId].battleAsAttacker.push(log.id);
                playerData[attackerId].performancePerBattle.push(0.0);

                addAttackerTeam(attackerId, log.attacker, log.id);

                if (defenderId && playerData[defenderId]) {
                    playerData[defenderId].defends++;
                    playerData[defenderId].tokensAte++;
                    playerData[defenderId].battleAsDefender.push(log.id);

                    playerData[defenderId].mapAssignedTo = log.zone.type;
                    playerData[defenderId].mapAssignedToCertainty = true;

                    addDefenderTeam(defenderId, log.defender, log.id);
                }

                addFullFightDetails(log.id, attackerId, log.attacker, defenderId, log.defender, buffs, playerScore, abandoned, 0.0, log.zone)

                return;
            }

            // otherwise, this should be a completed fight.

            battleData[log.id] = {
                attackerUserId: attackerId,
                defenderUserId: defenderId,
                teamIndex:      log.teamIndex,
                zone:           log.zone,
                attemptDebuff:  log.attemptDebuff || 0,
                score:          log.score || 0,
                scorePlayer:    playerScore,
                attacker:       log.attacker,
                defender:       log.defender,
                buffs:          log.buffs || [],
                abandoned:      abandoned,
                createdOn:      log.createdOn
            }

            // process the fighters now

            // all buffs
            const buffs = (log.buffs || []).map(buff => buff.abilityId);

            // count med buffs
            const medCount = (log.buffs || [])
                .filter(b => b.abilityId === 'EnvDefenderHealthBuff2')
                .length;

            // count units still alive for performance metric.                
            const attSurvivorsCount = (log.attacker.units || [])
                .filter(unit => unit.remainingHPAfter !== undefined)
                .length;
                
            // determine the battle result for the Xmed stat display.
            let result;
            if (playerScore >= 1100) {
                result = 'hit';
            } else {
                // check if any defender unit survived
                const hasDefSurvivors = (log.defender.units || []).some(unit => unit.remainingHPAfter !== undefined);
                // if defender has survivors -> failed, otherwise -> cleanup
                result = hasDefSurvivors ? 'failed' : 'cleanup';
            }

            // was the fight against default units? templNpc1Initiate
            const foughtNPCs = (log.defender.units || []).some(unit => unit.unitId === 'templNpc1Initiate');
            npcLine = foughtNPCs ? true : false;

            // let's do some performance metric things. need to generate the keys.
            let attResultType;
            if (result === 'hit') {
                attResultType = 'Win';
            } else if (result === 'cleanup') {
                attResultType = 'Cleanup';
            } else {
                attResultType = 'Loss';
            }

            let attKey;
            if (npcLine) {
                const npcCount = (log.defender.units || []).filter(unit => unit.unitId === 'templNpc1Initiate').length;
                if (attResultType === 'Win') {
                    attKey = `npc${npcCount}Win`;
                } else {
                    attKey = `npcLoss`;
                }
            } else if (attResultType !== 'Win') {
                attKey = `${medCount}med${attResultType}`;
            } else {
                attKey = `${medCount}medWin${attSurvivorsCount}`;
            }

            //console.log(`key: |${attKey}| found: ${attKey in PERFORMANCE_METRIC} value: ${PERFORMANCE_METRIC[attKey]}`);
            const basePerformanceValue = PERFORMANCE_METRIC[attKey] ?? 100.0; // makes errors obvious.

            // final performance should also take into account the tough
            //  maps and lineups. so it needs to be tallied after the
            //  addDefenderTeam() call.
                
            // record the battle stats to both players.         v-- deals with SP returning tokens, kinda.
            playerData[attackerId].tokensRemaining  = Math.max(0, Math.min(10, playerData[attackerId].tokensRemaining - 1));
            playerData[attackerId].tokensUsed       = Math.max(0, Math.min(10, playerData[attackerId].tokensUsed + 1));
            playerData[attackerId].attacks++;
            playerData[attackerId].scoreAtt += playerScore;
            if (!npcLine) playerData[attackerId].battles[medCount + 'med'][result]++;
            playerData[attackerId].defaultLines += npcLine;
            playerData[attackerId].battleAsAttacker.push(log.id);

            addAttackerTeam(attackerId, log.attacker, log.id);

            if (defenderId && playerData[defenderId]) {
                playerData[defenderId].defends++;
                playerData[defenderId].tokensAte++;
                playerData[defenderId].scoreDef += playerScore;
                playerData[defenderId].battleAsDefender.push(log.id);

                playerData[defenderId].mapAssignedTo = log.zone.type;
                playerData[defenderId].mapAssignedToCertainty = true;

                addDefenderTeam(defenderId, log.defender, log.id);
            }
            
            const mapPerformanceBonus   = npcLine ? 0.0 : getMapPerformanceModifier(attResultType,  log.zone.type, log.createdOn, medCount)
            const defPerformanceBonus   = npcLine ? 0.0 : getDefPerformanceModifier(attResultType,  log.defender, medCount)
            const buffPerformanceBonus  = npcLine ? 0.0 : getBuffPerformanceModifier(attResultType, buffs, medCount)
            const finalPerformanceValue = basePerformanceValue + mapPerformanceBonus + defPerformanceBonus + buffPerformanceBonus
            
            playerData[attackerId].performancePerBattle.push(finalPerformanceValue);
            playerData[attackerId].performanceMetric += finalPerformanceValue;

            addFullFightDetails(log.id, attackerId, log.attacker, defenderId, log.defender, buffs, playerScore, abandoned, finalPerformanceValue, log.zone)
        }
    });

    // let's compute avgDefScore for all players to sort it later.
    Object.values(playerData).forEach(player => {
        player.avgDefScore = player.tokensAte > 0
            ? Math.round(player.scoreDef / player.tokensAte)
            : 0;
    });

    // fill in missing teams with placeholders
    fillMissingTeams();

    // classify the teams
    classifyAllTeams();

    renderPlayers();
    renderStats();
}

function getMapPerformanceModifier(result, map, time, medNumber) {
    if (result === 'Win' || result === 'Cleanup') {
        const seasonKey = detectSeasonKeyFromTimestamp(time);
        if (!seasonKey) return 0.0;

        const seasonMaps = SEASON_MAPS[seasonKey];
        if (!seasonMaps) return 0.0;

        const mapId = seasonMaps[map];
        if (!mapId) return 0.0;

        if (PERFORMANCE_TOUGH_MAPS.includes(mapId)) {
            return PERFORMANCE_ADDONS[`${medNumber}medToughMap`] ?? 0.0;
        }

        return 0.0;
    } else {
        return 0.0;
    }
}

function getDefPerformanceModifier(result, defender, medNumber) {
    if (result === 'Win' || result === 'Cleanup') {
        const defUnits = Array.from({ length: 5 }, (_, i) => {
            return defender?.units?.[i]?.unitId ?? null; 
        });

        const hasToughLine = Object.values(PERFORMANCE_TOUGH_LINES).some(line =>
            line.every(unit => defUnits.includes(unit))
        );

        return hasToughLine ? (PERFORMANCE_ADDONS[`${medNumber}medToughTeam`] ?? 0.0) : 0.0;
    } else {
        return 0.0;
    }
}

function getBuffPerformanceModifier(result, buffs, medNumber) {
    if (result === 'Win' || result === 'Cleanup') {
        const buffsSansMed = (buffs?.length ?? 0) - medNumber;
        return PERFORMANCE_BUFF_SCALING[Math.max(0, buffsSansMed)] ?? 0.0;
    } else {
        return 0.0;
    }
}

function addFullFightDetails(battleId, attackerId, attacker, defenderId, defender, buffs, score=0, abandoned=false, performance=0.0, zone=null) {
    // need the performance, the att units, the attack max and remaining hp, 
    //  the unit progression, the rank progression, who died and started dead,
    //  and most of that for defense too.

    const battleRarity      = getBattleRarityFromDefenderInfo(defender, attacker);
    const rarityCapInfo     = GUILDWAR_RARITY_CAPS[battleRarity];
    //console.log(rarityCapInfo);

    // all the cases we handle:
    // attacker side:  
    //  normal battle, 
    //  abandoned/dc'd after selecting units, 
    //  dc'd before selecting units.
    // defender side:
    //  normal battle,
    //  full of npcs.

    const attPlayer = playerData[attackerId];

    // array of the units that fought.
    const attUnits = Array.from({ length: 5 }, (_, i) => {
        return attacker?.units?.[i]?.unitId ?? null;
    });

    const attMachineOfWar = attacker?.machineOfWar?.unitId ?? null;

    // units rarity - always 5 slots, null for empty, clamp progressionIndex/rank DOWN to cap if over
    //  e.g. ['rare', 'rare', 'uncommon', 'rare', null]
    const attUnitsRarity = Array.from({ length: 5 }, (_, i) => {
        const unit = attacker?.units?.[i];
        if (!unit) return null;

        const clampedProgression    = Math.min(unit.progressionIndex, rarityCapInfo.max_character_progression);
        const progression           = CHARACTER_PROGRESSION[clampedProgression];

        return progression?.rarity ?? null;
    });

    // get the mow rarity too.
    const attMachineOfWarRarity = getMoWRarity(attacker?.machineOfWar, rarityCapInfo);

    // units star info. array with an array for star color and amount, or null.
    const attUnitsStarInfo = Array.from({ length: 5 }, (_, i) => {
        const unit = attacker?.units?.[i];
        if (!unit) return null;
        const clampedProgression = Math.min(unit.progressionIndex, rarityCapInfo.max_character_progression);
        const progression = CHARACTER_PROGRESSION[clampedProgression];
        return progression?.star ?? null;
    });

    // units rank in text
    const attUnitsRank = Array.from({ length: 5 }, (_, i) => {
        const unit = attacker?.units?.[i];
        
        if (!unit) return null;
        if (unit.rank == null) return 'Unranked';

        const clampedRank = Math.min(unit.rank, rarityCapInfo.max_character_rank);

        return CHARACTER_RANK[clampedRank] ?? null;
    });

    // units rank as a value,
    const attUnitsRankNum = Array.from({ length: 5 }, (_, i) => {
        const unit = attacker?.units?.[i];

        if (!unit) return null;
        if (unit.rank == null) return -1;

        const clampedRank = Math.min(unit.rank, rarityCapInfo.max_character_rank);
        return clampedRank ?? 0;
    });

    // attacker: did this unit participate? (same as attUnits, but might do something different later)
    const attUnitsFought = Array.from({ length: 5 }, (_, i) => {
        const unit = attacker?.units?.[i];
        if (!unit) return null;
        return true;
    });

    // attacker: survived means remainingHPAfter exists
    const attUnitsSurvived = Array.from({ length: 5 }, (_, i) => {
        const unit = attacker?.units?.[i];
        if (!unit) return null;
        return 'remainingHPAfter' in unit;
    });

    // attacker: unit ended up dead. 
    const attUnitsEndedDead = Array.from({ length: 5 }, (_, i) => {
        const unit = attacker?.units?.[i];
        if (!unit) return null;
        return !('remainingHPAfter' in unit);
    });

    // [    unit portrait   ] (in color or greyed out based on attHP and )
    // [      HP / maxHP    ] (could also be blank)
    // [   HPend / maxHPend ] (could also say DEAD)

    // starting hp for attackers. not given, we have to calculate it.
    //   from: ROUNDDOWN( base_stat * (1.25205 ^ rank) * (1 + 0.1 * stars) )
    //   credit to the French community for figuring this out.
    const attMaxHP = Array.from({ length: 5 }, (_, i) => {
        const unit = attacker?.units?.[i];
        if (!unit) return null;
        const clampedProgression = Math.min(unit.progressionIndex, rarityCapInfo.max_character_progression);
        const clampedRank = Math.min(unit.rank, rarityCapInfo.max_character_rank);
        
        const maxHPGuess1 = calculateStat(BASE_HP[unit.unitId], clampedProgression, clampedRank);
        const maxHPGuess2 = unit.remainingHPAfter || 0;

        return Math.max(maxHPGuess1, maxHPGuess2);

    });

    const attHP = Array.from({ length: 5 }, (_, i) => {
        const unit = attacker?.units?.[i];
        if (!unit) return null;
        return unit.remainingHPAfter ?? 0;
    });


    //
    // let's do the def side now.
    //

    const defPlayer = defenderId ? playerData[defenderId] : null;

    const defUnits = Array.from({ length: 5 }, (_, i) => {
        return defender?.units?.[i]?.unitId ?? null; 
    });

    const defMachineOfWar = defender?.machineOfWar?.unitId ?? null;

    const defUnitsRarity = Array.from({ length: 5 }, (_, i) => {
        const unit = defender?.units?.[i];
        if (!unit) return null;

        const progression = CHARACTER_PROGRESSION[unit.progressionIndex];

        return progression?.rarity ?? null;
    });

    const defMachineOfWarRarity = getMoWRarity(defender?.machineOfWar, rarityCapInfo);

    const defUnitsStarInfo = Array.from({ length: 5 }, (_, i) => {
        const unit = defender?.units?.[i];
        if (!unit) return null;
        const progression = CHARACTER_PROGRESSION[unit.progressionIndex];
        return progression?.star ?? null;
    });

    const defUnitsRank = Array.from({ length: 5 }, (_, i) => {
        const unit = defender?.units?.[i];

        if (!unit) return null;
        if (unit.rank == null) return 'Unranked';

        return CHARACTER_RANK[unit.rank] ?? null;
    });

    // units rank as a value,
    const defUnitsRankNum = Array.from({ length: 5 }, (_, i) => {
        const unit = defender?.units?.[i];

        if (!unit) return null;
        if (unit.rank == null) return -1;

        const clampedRank = Math.min(unit.rank, rarityCapInfo.max_character_rank);

        return clampedRank ?? 0;
    });

    // defender: remainingHPBefore means they were active in the fight
    const defUnitsFought = Array.from({ length: 5 }, (_, i) => {
        const unit = defender?.units?.[i];
        if (!unit) return null;
        return 'remainingHPBefore' in unit;
    });

    // defender: survived means remainingHPBefore and remainingHPAfter both exist.
    const defUnitsSurvived = Array.from({ length: 5 }, (_, i) => {
        const unit = defender?.units?.[i];
        if (!unit) return null;
        return 'remainingHPBefore' in unit && 'remainingHPAfter' in unit;
    });

    // defender: unit endet up dead.
    const defUnitsEndedDead = Array.from({ length: 5 }, (_, i) => {
        const unit = defender?.units?.[i];
        if (!unit) return null;
        return 'remainingHPBefore' in unit && !('remainingHPAfter' in unit);
    });

    const defMaxHPStart = Array.from({ length: 5 }, (_, i) => {
        const unit = defender?.units?.[i];
        if (!unit) return null;
        return unit.startHPBefore ?? 0;
    });

    const defHPStart = Array.from({ length: 5 }, (_, i) => {
        const unit = defender?.units?.[i];
        if (!unit) return null;
        return unit.remainingHPBefore ?? 0;
    });

    const defMaxHPEnd = Array.from({ length: 5 }, (_, i) => {
        const unit = defender?.units?.[i];
        if (!unit) return null;
        return unit.startHPAfter ?? 0;
    });

    const defHPEnd = Array.from({ length: 5 }, (_, i) => {
        const unit = defender?.units?.[i];
        if (!unit) return null;
        return unit.remainingHPAfter ?? 0;
    });

    
    attPlayer.battleDetailsAsAttacker.push({
        battleNumber:   attPlayer.battleDetailsAsAttacker.length + 1,
        attUnits:       attUnits,
        defUnits:       defUnits,
        attMoW:         attMachineOfWar,
        defMoW:         defMachineOfWar,
        attPower:       attacker?.lineupPower || 0, // uncapped, don't use.
        defPower:       defender?.lineupPower || 0,
        rarity:         battleRarity,
        attRarity:      attUnitsRarity,
        defRarity:      defUnitsRarity,
        attMoWRarity:   attMachineOfWarRarity,
        defMoWRarity:   defMachineOfWarRarity,
        attStar:        attUnitsStarInfo,
        defStar:        defUnitsStarInfo,
        attRank:        attUnitsRank,
        defRank:        defUnitsRank,
        attRankNum:     attUnitsRankNum,
        defRankNum:     defUnitsRankNum,
        attFought:      attUnitsFought,
        attSurvived:    attUnitsSurvived,
        attDied:        attUnitsEndedDead,
        defFought:      defUnitsFought,
        defSurvived:    defUnitsSurvived,
        defDied:        defUnitsEndedDead,
        attHP:          attHP,
        attMaxHP:       attMaxHP,
        defHPStart:     defHPStart,
        defMaxHPStart:  defMaxHPStart,
        defHPEnd:       defHPEnd,
        defMaxHPEnd:    defMaxHPEnd,
        battleBuffs:    buffs,
        battleScore:    score,
        abandoned:      abandoned,
        performance:    performance,
        battleId:       battleId,
        battleTile:     zone?.type ?? null
    });

    if (defPlayer !== null) {
        defPlayer.battleDetailsAsDefender.push({
            battleNumber:   defPlayer.battleDetailsAsDefender.length + 1,
            attUnits:       attUnits,
            defUnits:       defUnits,
            attMoW:         attMachineOfWar,
            defMoW:         defMachineOfWar,
            attPower:       attacker?.lineupPower || 0, // uncapped, don't use.
            defPower:       defender?.lineupPower || 0,
            rarity:         battleRarity,
            attRarity:      attUnitsRarity,
            defRarity:      defUnitsRarity,
            attMoWRarity:   attMachineOfWarRarity,
            defMoWRarity:   defMachineOfWarRarity,
            attStar:        attUnitsStarInfo,
            defStar:        defUnitsStarInfo,
            attRank:        attUnitsRank,
            defRank:        defUnitsRank,
            attRankNum:     attUnitsRankNum,
            defRankNum:     defUnitsRankNum,
            attFought:      attUnitsFought,
            attSurvived:    attUnitsSurvived,
            attDied:        attUnitsEndedDead,
            defFought:      defUnitsFought,
            defSurvived:    defUnitsSurvived,
            defDied:        defUnitsEndedDead,
            attHP:          attHP,
            attMaxHP:       attMaxHP,
            defHPStart:     defHPStart,
            defMaxHPStart:  defMaxHPStart,
            defHPEnd:       defHPEnd,
            defMaxHPEnd:    defMaxHPEnd,
            battleBuffs:    buffs,
            battleScore:    score,
            abandoned:      abandoned,
            performance:    performance,
            battleId:       battleId,
            battleTile:     zone?.type ?? null
        });
    };
}

function addAttackerTeam(attackerId, attacker, battleId) {
    if (!attacker || !playerData[attackerId]) return;
    
    const player = playerData[attackerId];
    
    // only process if we haven't hit 10 teams yet
    if (player.offenseTeams.length >= 10) return;
    
    const units = (attacker.units || []).map(unit => unit.unitId);
    const machineOfWar = attacker.machineOfWar ? attacker.machineOfWar.unitId : 'none';
    
    // create signature
    const signature = [...units].sort().join('|') + `|MOW:${machineOfWar}`;
    
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
    const signature = [...units].sort().join('|') + `|MOW:${machineOfWar}`;
    
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

// calculate time remaining in guild war (35.5 hour duration)
// TODO: can be done exactly with the new WAR_SCHEDULE global.
function getGuildWarTimeStatus(startTime) {
    if (!startTime) return 'Unknown';
    
    const currentTime = Date.now();
    const elapsedHours = (currentTime - startTime) / (1000 * 60 * 60);
    
    if (elapsedHours < GW_DURATION_HOURS) {
        const hoursLeft = Math.round(GW_DURATION_HOURS - elapsedHours);
        return `Time Left: ~${hoursLeft} hours`;
    } else {
        return 'Battle Finished';
    }
}

function getMiddleTimestamp(activityLogs) {
    const timestamps = activityLogs
        .map(log => log.createdOn)
        .filter(t => t != null)
        .sort((a, b) => a - b);

    if (timestamps.length === 0) return null;

    const first = timestamps[0];
    const last  = timestamps[timestamps.length - 1];

    return Math.round((first + last) / 2);
}

// convert unitId to image filename
function getUnitIcon(unitId) {
    // special case exceptions
    const exceptions = {
        // none atm, renamed all the files to fix these.
    };
    
    // check if this unitId has a special exception
    if (exceptions[unitId]) {
        return `img/portraits/${exceptions[unitId]}.png`;
    }

    // find the first capital letter and insert underscore before it
    // then convert everything to lowercase
    const filename = unitId.replace(/^([a-z]+)([A-Z].*)$/, '$1_$2').toLowerCase();
    return `img/portraits/${filename}.png`;
}

function getGuildTotalTokens(guildPlayers) {
    return guildPlayers.length * INITIAL_TOKENS;
}

function extractPlayerScoreFromTotalScore(score) {

    if (score < UNIQUE_TILES[0]) {
        return score;
    }

    for (const base of UNIQUE_TILES) {
        if (score >= base && score <= base + MAX_PLAYER_SCORE) {
            return score - base;
        }
    }
    
    console.warn(`Score ${score} didn't match any tile base`, UNIQUE_TILES);
    return score;
}

function getBattleRarityFromDefenderInfo(defender, attacker=null) {

    // get max progressionIndex and rank from all defender units
    const maxProgression    = Math.max(...defender.units.map(u => u.progressionIndex ?? 0));
    const maxRank           = Math.max(...defender.units.map(u => u.rank ?? 0));

    // find the lowest rarity tier where both caps are satisfied
    const rarityGuess1 = RARITY_ORDER.find(rarity => {
        const cap = GUILDWAR_RARITY_CAPS[rarity];
        return maxProgression <= cap.max_character_progression &&
               maxRank <= cap.max_character_rank;
    }) ?? 'mythic'; // if nothing fits, assume highest (new ranks?)

    let rarityBestGuess = rarityGuess1;

    if (attacker != null) {
        // get max remainingHPAfter from attacker units (default 0 if missing, e.g. dead)
        const maxHP = Math.max(...attacker.units.map(u => u.remainingHPAfter ?? 0));

        // NOTE: used tyrant guard at cap with max items from tacticusdb.com as ref., with a little extra.
        let rarityGuess2 = 'uncommon'; // start at lowest, work up
        if (maxHP >= 800)   rarityGuess2 = 'rare';
        if (maxHP >= 1900)  rarityGuess2 = 'epic';
        if (maxHP >= 4200)  rarityGuess2 = 'legendary';
        if (maxHP >= 13000) rarityGuess2 = 'mythic';

        // pick whichever guess implies the higher rarity tier
        const idx1 = RARITY_ORDER.indexOf(rarityGuess1);
        const idx2 = RARITY_ORDER.indexOf(rarityGuess2);
        rarityBestGuess = RARITY_ORDER[Math.max(idx1, idx2)];
    }

    // that should give us some confidence, probably, about the rarity of the line.
    // NOTE: if someone places all lower rarity units, could be bad. so we also
    //       check the hp on attacker, since that is properly capped. but still 
    //       possible to miss something.
    return rarityBestGuess;
}

function getMoWRarity(machineOfWar, rarityCapInfo) {
    if (!machineOfWar) return null;
    const clampedProgression = Math.min(machineOfWar.progressionIndex, rarityCapInfo.max_character_progression);
    return MACHINE_OF_WAR_PROGRESSION[clampedProgression]?.rarity ?? null;
}

function calculateStat(baseStat, character_progression, character_rank) {
    return Math.floor(baseStat * Math.pow(1.25205, character_progression) * (1 + 0.1 * character_rank));
}

function detectSeasonKeyFromTimestamp(timestamp) {
    const match = WAR_SCHEDULE.find(w =>
        timestamp >= w.startDate && timestamp <= w.endDate
    );
    if (!match) return null;
    return `${match.season}.${String(match.battle)}`;
}