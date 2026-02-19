// handle all the stat related things.
function renderStats() {
    const statsGrid     = document.getElementById('statsGrid');
    const statsSection  = document.getElementById('statsSection');
    
    const guild1Players = Object.values(playerData).filter(p => p.guild === 1);
    const guild2Players = Object.values(playerData).filter(p => p.guild === 2);

    const guild1Progression = getZoneProgression(activityLogs, 1);
    const guild2Progression = getZoneProgression(activityLogs, 2);

    const guild1TotalTokens = getGuildTotalTokens(guild1Players);
    const guild2TotalTokens = getGuildTotalTokens(guild2Players);
    
    const guild1TokensRemaining = guild1Players.reduce((sum, p) => sum + p.tokensRemaining, 0);
    const guild2TokensRemaining = guild2Players.reduce((sum, p) => sum + p.tokensRemaining, 0);

    const gwStartTime   = getGuildWarStartTime(activityLogs);
    const gwTimeStatus  = getGuildWarTimeStatus(gwStartTime);
    

    // get the war progression
    const formatProgression = (progression) => {
        if (progression.length === 0) return 'No zones destroyed yet';
        
        return progression.map(item => {
            if (item.type === 'wipeout') {
                return `<span style="color: #fbbf24; font-weight: bold;">WIPE (${item.attempts})</span>`;
            } else {
                return `<span style="font-weight: bold;">${item.name} (${item.attempts})</span>`;
            }
        }).join(' ➡️ ');
    };

    // format team composition stats for a guild
    function formatTeamComp(guildPlayers, teamType, limit = 10) {
        const teamCounts = {};
        const metaTeamGroups = {};
        const teamUnitsData = {}; 
        
        guildPlayers.forEach(player => {
            const teams = teamType === 'defense' ? player.defenseTeams : player.offenseTeams;
            
            teams.forEach(team => {
                if (team.isPlaceholder) return;
                
                const metaName = team.teamMetaName || 'Unknown';
                let metaTeam = team.metaTeam || metaName.replace(/\d+$/, '').trim();
                
                // group all mixed/unknown teams together
                if (metaName.toLowerCase().includes('mixed') || 
                    metaName.toLowerCase().includes('team') ||
                    metaName.toLowerCase().includes('unknown') ||
                    metaName === 'Unknown Team') {
                    metaTeam = 'Misc.';
                }
                
                teamCounts[metaName] = (teamCounts[metaName] || 0) + 1;
                
                if (!metaTeamGroups[metaTeam]) {
                    metaTeamGroups[metaTeam] = {};
                    teamUnitsData[metaTeam] = {}; // NEW
                }
                metaTeamGroups[metaTeam][metaName] = (metaTeamGroups[metaTeam][metaName] || 0) + 1;
                
                if (!teamUnitsData[metaTeam][metaName] && team.units) {
                    teamUnitsData[metaTeam][metaName] = team.units;
                }
            });
        });
        
        const metaTeamTotals = {};
        Object.entries(metaTeamGroups).forEach(([metaTeam, variants]) => {
            metaTeamTotals[metaTeam] = Object.values(variants).reduce((sum, count) => sum + count, 0);
        });
        
        const sortedMetaTeams = Object.entries(metaTeamTotals)
            .sort((a, b) => b[1] - a[1]);
        
        if (sortedMetaTeams.length === 0) return '<div class="team-no-teams">No teams found</div>';
        
        const visible = sortedMetaTeams.slice(0, limit);
        const hidden = sortedMetaTeams.slice(limit);
        
        let html = visible.map(([metaTeam, totalCount]) => {
            return createTeamCard(metaTeam, totalCount, metaTeamGroups[metaTeam], teamUnitsData[metaTeam], teamType);
        }).join('');
        
        if (hidden.length > 0) {
            const hiddenId = `hidden-${teamType}-${Math.random().toString(36).substr(2, 9)}`;
            const buttonId = `btn-${hiddenId}`;
            
            html += `
                <div id="${hiddenId}" style="display: none;">
                    ${hidden.map(([metaTeam, totalCount]) => {
                        return createTeamCard(metaTeam, totalCount, metaTeamGroups[metaTeam], teamUnitsData[metaTeam], teamType);
                    }).join('')}
                </div>
                <button id="${buttonId}" class="team-show-more-btn"
                        onclick="
                            const hidden = document.getElementById('${hiddenId}');
                            const btn = document.getElementById('${buttonId}');
                            if (hidden.style.display === 'none') {
                                hidden.style.display = 'block';
                                btn.textContent = 'Show less';
                            } else {
                                hidden.style.display = 'none';
                                btn.textContent = 'Show ${hidden.length} more...';
                            }
                        ">
                    Show ${hidden.length} more...
                </button>
            `;
        }
        
        return html;
    }

    function createTeamCard(metaTeam, totalCount, variants, teamUnitsData, teamType) {
        const variantCount  = Object.keys(variants).length;
        const expandId      = `expand-${teamType}-${metaTeam.replace(/\s/g, '-')}-${Math.random().toString(36).substr(2, 9)}`;
        
        let card = `
            <div class="team-card clickable" onclick="
                const details = document.getElementById('${expandId}');
                const arrow = this.querySelector('.team-expand-arrow');
                if (details.style.display === 'none' || details.style.display === '') {
                    details.style.display = 'block';
                    arrow.textContent = '▼';
                } else {
                    details.style.display = 'none';
                    arrow.textContent = '▶';
                }
            ">
                <span class="team-name">
                    <span class="team-expand-arrow">▶</span> ${metaTeam}
                </span>
                <span class="team-count">${totalCount}</span>
            </div>
        `;
        
        const sortedVariants = Object.entries(variants).sort((a, b) => b[1] - a[1]);
        card += `
            <div id="${expandId}" class="team-variant-container">
                ${sortedVariants.map(([variantName, count]) => {
                    // check meta teams first, display those in the meta style.
                    const teamDef = Object.entries(TEAM_META_DEFINITIONS).find(([key, def]) => key === variantName);
                    
                    let iconsHtml = '';
                    if (teamDef && teamDef[1].requiredUnits) {
                        // ...and display them.
                        iconsHtml = teamDef[1].requiredUnits
                            .map(unitId => `<img src="${getUnitIcon(unitId)}" alt="${unitId}" class="unit-icon" title="${unitId}">`)
                            .join('');
                    } else if (teamUnitsData && teamUnitsData[variantName]) {
                        // else, fallback to showing all units in the team that we don't consider meta.
                        iconsHtml = teamUnitsData[variantName]
                            .map(unitId => `<img src="${getUnitIcon(unitId)}" alt="${unitId}" class="unit-icon" title="${unitId}">`)
                            .join('');
                    }
                    
                    return `
                        <div class="team-variant-card">
                            <div class="variant-info">
                                <span>${variantName}</span>
                                ${iconsHtml ? `<div class="team-icons">${iconsHtml}</div>` : ''}
                            </div>
                            <span class="team-variant-count">${count}</span>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
        
        return card;
    }

    // calculate global battle stats
    const globalBattles = {
        '0med': { hit: 0, cleanup: 0, failed: 0 },
        '1med': { hit: 0, cleanup: 0, failed: 0 },
        '2med': { hit: 0, cleanup: 0, failed: 0 }
    };

    Object.values(playerData).forEach(player => {
        ['0med', '1med', '2med'].forEach(med => {
            globalBattles[med].hit      += player.battles[med].hit;
            globalBattles[med].cleanup  += player.battles[med].cleanup;
            globalBattles[med].failed   += player.battles[med].failed;
        });
    });

    // add totals
    globalBattles.total = {
        hit:        globalBattles['0med'].hit       + globalBattles['1med'].hit     + globalBattles['2med'].hit,
        cleanup:    globalBattles['0med'].cleanup   + globalBattles['1med'].cleanup + globalBattles['2med'].cleanup,
        failed:     globalBattles['0med'].failed    + globalBattles['1med'].failed  + globalBattles['2med'].failed
    };

    // calculate guild-specific battle stats
    const guild1Battles = {
        '0med': { hit: 0, cleanup: 0, failed: 0 },
        '1med': { hit: 0, cleanup: 0, failed: 0 },
        '2med': { hit: 0, cleanup: 0, failed: 0 }
    };

    const guild2Battles = {
        '0med': { hit: 0, cleanup: 0, failed: 0 },
        '1med': { hit: 0, cleanup: 0, failed: 0 },
        '2med': { hit: 0, cleanup: 0, failed: 0 }
    };
    
    guild1Players.forEach(player => {
        ['0med', '1med', '2med'].forEach(med => {
            guild1Battles[med].hit      += player.battles[med].hit;
            guild1Battles[med].cleanup  += player.battles[med].cleanup;
            guild1Battles[med].failed   += player.battles[med].failed;
        });
    });

    guild2Players.forEach(player => {
        ['0med', '1med', '2med'].forEach(med => {
            guild2Battles[med].hit      += player.battles[med].hit;
            guild2Battles[med].cleanup  += player.battles[med].cleanup;
            guild2Battles[med].failed   += player.battles[med].failed;
        });
    });

    guild1Battles.total = {
        hit:        guild1Battles['0med'].hit       + guild1Battles['1med'].hit     + guild1Battles['2med'].hit,
        cleanup:    guild1Battles['0med'].cleanup   + guild1Battles['1med'].cleanup + guild1Battles['2med'].cleanup,
        failed:     guild1Battles['0med'].failed    + guild1Battles['1med'].failed  + guild1Battles['2med'].failed
    };

    guild2Battles.total = {
        hit:        guild2Battles['0med'].hit       + guild2Battles['1med'].hit     + guild2Battles['2med'].hit,
        cleanup:    guild2Battles['0med'].cleanup   + guild2Battles['1med'].cleanup + guild2Battles['2med'].cleanup,
        failed:     guild2Battles['0med'].failed    + guild2Battles['1med'].failed  + guild2Battles['2med'].failed
    };

    // calculate the guild scores.
    const calculateGuildScore = (progression, guildPlayers) => {
        let zoneScore = 0;
        
        progression.forEach(item => {
            if (item.type === 'zone') {
                zoneScore += ZONE_POINTS[item.name] || 0;
            }
        });
        
        let playerScore = 0;
        activityLogs.forEach(log => {
            if (log.type === 'battleFinished' && log.score) {
                const attackerId = log.attacker?.userId;
                if (attackerId && guildPlayers.some(p => p.userId === attackerId)) {
                    playerScore += log.score;
                }
            }
        });
        
        return {
            zoneScore:      zoneScore,
            playerScore:    playerScore,
            totalScore:     zoneScore + playerScore
        };
    };

    const guild1Score = calculateGuildScore(guild1Progression, guild1Players);
    const guild2Score = calculateGuildScore(guild2Progression, guild2Players);
    
    const formatStat = (count, type) => {
        if (count === 0) return `<span style="color: #b0b0b0;"></span>`;
        
        let color;
        if (type === 'hit') color = '#4cec86'; // green, colorblind safe
        else if (type === 'cleanup') color = '#fbbf24'; // yellow, colorblind safe
        else color = '#e45858'; // red, colorblind safe

        if (count === 0) {
            return `<span style="color: #b0b0b0;">${count}</span>`;
        }
        
        return `<span style="color: ${color}; font-weight: bold;">${count}</span>`;
    };

    // calculate efficiency and projections for Guild 1
    const guild1TokensUsed          = guild1Players.reduce((sum, p) => sum + p.tokensUsed, 0);
    const guild1SuccessfulAttacks   = guild1Battles.total.hit + guild1Battles.total.cleanup;
    const guild1Efficiency          = guild1TokensUsed > 0 ? ((guild1SuccessfulAttacks / guild1TokensUsed) * 100).toFixed(1) : 0;

    const guild1ScaleFactor         = guild1TokensUsed > 0 ? guild1TotalTokens / guild1TokensUsed : 0;
    const guild1ProjectedHits       = Math.round(guild1Battles.total.hit        * guild1ScaleFactor);
    const guild1ProjectedCleanup    = Math.round(guild1Battles.total.cleanup    * guild1ScaleFactor);
    const guild1ProjectedFailed     = Math.round(guild1Battles.total.failed     * guild1ScaleFactor);

    // calculate efficiency and projections for Guild 2
    const guild2TokensUsed          = guild2Players.reduce((sum, p) => sum + p.tokensUsed, 0);
    const guild2SuccessfulAttacks   = guild2Battles.total.hit + guild2Battles.total.cleanup;
    const guild2Efficiency          = guild2TokensUsed > 0 ? ((guild2SuccessfulAttacks / guild2TokensUsed) * 100).toFixed(1) : 0;

    const guild2ScaleFactor         = guild2TokensUsed > 0 ? guild2TotalTokens / guild2TokensUsed : 0;
    const guild2ProjectedHits       = Math.round(guild2Battles.total.hit        * guild2ScaleFactor);
    const guild2ProjectedCleanup    = Math.round(guild2Battles.total.cleanup    * guild2ScaleFactor);
    const guild2ProjectedFailed     = Math.round(guild2Battles.total.failed     * guild2ScaleFactor);

    const createTokenStatsTable = (title, tokensRemaining, totalTokens, tokenEfficiency, projectedHits, projectedCleanups, projectedFails, guildScore, span = 2) => `
        <div class="stat-card span-${span}" style="text-align: left; padding: 15px;">
            <div style="font-size: 0.9em; margin-bottom: 8px; font-weight: bold; text-align: center;">${title}</div>
            <div style="font-size: 12px; font-family: 'Courier New', monospace; line-height: 1.8;">
                <div>Remaining #: <span style="font-weight: bold;">${tokensRemaining}</span> (out of <span style="font-weight: bold;">${totalTokens})</span></div>
                <div>~Efficiency: <span style="font-weight: bold;">${tokenEfficiency}%</span></div>
                <div>Total Score: <span style="font-weight: bold;">${guildScore.totalScore.toLocaleString()}</span></div>
                <div>Estm. Final: ✅ <span style="display: inline-block; width: 20px; text-align: right;">${formatStat(projectedHits, 'hit')}</span> | 🧹 <span style="display: inline-block; width: 20px; text-align: right;">${formatStat(projectedCleanups, 'cleanup')}</span> | 🚫 <span style="display: inline-block; width: 20px; text-align: right;">${formatStat(projectedFails, 'failed')}</span></div>
            </div>
        </div>
    `;

    const createBattleTable = (title, battles, span = 2) => `
        <div class="stat-card span-${span}">
            <div class="stat-label" style="margin-bottom: 10px; font-weight: bold; font-size: 0.9em;">${title}</div>
            <div style="font-size: 12px; font-family: 'Courier New', monospace; line-height: 1.6;">
                <div>2med:  ✅ <span style="display: inline-block; width: 20px; text-align: right;">${formatStat(battles['2med'].hit, 'hit')}</span> | 🧹 <span style="display: inline-block; width: 20px; text-align: right;">${formatStat(battles['2med'].cleanup, 'cleanup')}</span> | 🚫 <span style="display: inline-block; width: 20px; text-align: right;">${formatStat(battles['2med'].failed, 'failed')}</span></div>
                <div>1med:  ✅ <span style="display: inline-block; width: 20px; text-align: right;">${formatStat(battles['1med'].hit, 'hit')}</span> | 🧹 <span style="display: inline-block; width: 20px; text-align: right;">${formatStat(battles['1med'].cleanup, 'cleanup')}</span> | 🚫 <span style="display: inline-block; width: 20px; text-align: right;">${formatStat(battles['1med'].failed, 'failed')}</span></div>
                <div>0med:  ✅ <span style="display: inline-block; width: 20px; text-align: right;">${formatStat(battles['0med'].hit, 'hit')}</span> | 🧹 <span style="display: inline-block; width: 20px; text-align: right;">${formatStat(battles['0med'].cleanup, 'cleanup')}</span> | 🚫 <span style="display: inline-block; width: 20px; text-align: right;">${formatStat(battles['0med'].failed, 'failed')}</span></div>
                <div>totl:  ✅ <span style="display: inline-block; width: 20px; text-align: right;">${formatStat(battles.total.hit, 'hit')}</span> | 🧹 <span style="display: inline-block; width: 20px; text-align: right;">${formatStat(battles.total.cleanup, 'cleanup')}</span> | 🚫 <span style="display: inline-block; width: 20px; text-align: right;">${formatStat(battles.total.failed, 'failed')}</span></div>
            </div>
        </div>
    `;

    statsGrid.innerHTML = `
        <div class="stat-card span-3" style="text-align: left; padding: 12px;">
            <div class="stat-label" style="margin-bottom: 10px; font-weight: bold; font-size: 0.9em; text-align: center;">${document.getElementById('guild1Name').textContent} Progression</div>
            <div style="font-size: 11px; line-height: 1.6; word-wrap: break-word; font-family: 'Roboto', monospace;">
                ${formatProgression(guild1Progression)}
            </div>
        </div>
                        
        <div class="stat-card span-2">
            <div class="stat-label" style="margin-bottom: 10px; font-weight: bold; font-size: 0.9em;">Global Battle Statistics</div>
            <div style="font-size: 12px; font-family: 'Courier New', monospace; line-height: 1.6;">
                <div style="margin-bottom: 8px; color: #fbbf24; font-weight: bold;">${gwTimeStatus}</div>
                <div>2med:  ✅ <span style="display: inline-block; width: 20px; text-align: right;">${formatStat(globalBattles['2med'].hit, 'hit')}</span> | 🧹 <span style="display: inline-block; width: 20px; text-align: right;">${formatStat(globalBattles['2med'].cleanup, 'cleanup')}</span> | 🚫 <span style="display: inline-block; width: 20px; text-align: right;">${formatStat(globalBattles['2med'].failed, 'failed')}</span></div>
                <div>1med:  ✅ <span style="display: inline-block; width: 20px; text-align: right;">${formatStat(globalBattles['1med'].hit, 'hit')}</span> | 🧹 <span style="display: inline-block; width: 20px; text-align: right;">${formatStat(globalBattles['1med'].cleanup, 'cleanup')}</span> | 🚫 <span style="display: inline-block; width: 20px; text-align: right;">${formatStat(globalBattles['1med'].failed, 'failed')}</span></div>
                <div>0med:  ✅ <span style="display: inline-block; width: 20px; text-align: right;">${formatStat(globalBattles['0med'].hit, 'hit')}</span> | 🧹 <span style="display: inline-block; width: 20px; text-align: right;">${formatStat(globalBattles['0med'].cleanup, 'cleanup')}</span> | 🚫 <span style="display: inline-block; width: 20px; text-align: right;">${formatStat(globalBattles['0med'].failed, 'failed')}</span></div>
                <div>totl:  ✅ <span style="display: inline-block; width: 20px; text-align: right;">${formatStat(globalBattles.total.hit, 'hit')}</span> | 🧹 <span style="display: inline-block; width: 20px; text-align: right;">${formatStat(globalBattles.total.cleanup, 'cleanup')}</span> | 🚫 <span style="display: inline-block; width: 20px; text-align: right;">${formatStat(globalBattles.total.failed, 'failed')}</span></div>
            </div>
        </div>
        
        <div class="stat-card span-3" style="text-align: left; padding: 12px;">
            <div class="stat-label" style="margin-bottom: 10px; font-weight: bold; font-size: 0.9em; text-align: center;">${document.getElementById('guild2Name').textContent} Progression</div>
            <div style="font-size: 11px; line-height: 1.6; word-wrap: break-word; font-family: 'Roboto', monospace;">
                ${formatProgression(guild2Progression)}
            </div>
        </div>

        ${createTokenStatsTable(document.getElementById('guild1Name').textContent + ' Tokens',  guild1TokensRemaining, guild1TotalTokens,   guild1Efficiency, guild1ProjectedHits, guild1ProjectedCleanup, guild1ProjectedFailed, guild1Score)}
        ${createBattleTable(document.getElementById('guild1Name').textContent + ' Battles',     guild1Battles)}
        ${createBattleTable(document.getElementById('guild2Name').textContent + ' Battles',     guild2Battles)}
        ${createTokenStatsTable(document.getElementById('guild2Name').textContent + ' Tokens',  guild2TokensRemaining, guild2TotalTokens,   guild2Efficiency, guild2ProjectedHits, guild2ProjectedCleanup, guild2ProjectedFailed, guild2Score)}

        <div class="stat-card span-4" style="text-align: left; padding: 12px;">
            <div class="stat-label" style="margin-bottom: 10px; font-weight: bold; font-size: 0.9em; text-align: center;">${document.getElementById('guild1Name').textContent} Team Composition</div>
            <div class="team-comp-grid" style="font-size: 11px;">
                <div>
                    <div style="color: #4cec86; font-weight: bold; margin-bottom: 8px; text-align: center;">Defense</div>
                    ${formatTeamComp(guild1Players, 'defense')}
                </div>
                <div>
                    <div style="color: #fbbf24; font-weight: bold; margin-bottom: 8px; text-align: center;">Offense</div>
                    ${formatTeamComp(guild1Players, 'offense')}
                </div>
            </div>
        </div>

        <div class="stat-card span-4" style="text-align: left; padding: 12px;">
            <div class="stat-label" style="margin-bottom: 10px; font-weight: bold; font-size: 0.9em; text-align: center;">${document.getElementById('guild2Name').textContent} Team Composition</div>
            <div class="team-comp-grid" style="font-size: 11px;">
                <div>
                    <div style="color: #4cec86; font-weight: bold; margin-bottom: 8px; text-align: center;">Defense</div>
                    ${formatTeamComp(guild2Players, 'defense')}
                </div>
                <div>
                    <div style="color: #fbbf24; font-weight: bold; margin-bottom: 8px; text-align: center;">Offense</div>
                    ${formatTeamComp(guild2Players, 'offense')}
                </div>
            </div>
        </div>
    `;
    
    // show stats section
    statsSection.style.display = 'block';
}