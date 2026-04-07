// draw player cards.
function renderPlayers() {
    const guild1        = document.getElementById('guild1Players');
    const guild2        = document.getElementById('guild2Players');
    const unassigned    = document.getElementById('unassignedPlayers');

    guild1.innerHTML        = '';
    guild2.innerHTML        = '';
    unassigned.innerHTML    = '';

    // separate players by guild assignment
    const guild1Players     = [];
    const guild2Players     = [];
    const unassignedPlayers = [];

    Object.entries(playerData).forEach(([userId, stats]) => {
        if (stats.guild === 1) {
            guild1Players.push({ userId, stats });
        } else if (stats.guild === 2) {
            guild2Players.push({ userId, stats });
        } else {
            unassignedPlayers.push({ userId, stats });
        }
    });

    // sort method and sorting
    function sortPlayers(players, guild) {
        const { key, dir } = guildSortState[guild] || { key: 'tokensRemaining', dir: 'desc' };
        if (key === 'combinedRank') computeCombinedRanks(players);
        const mul = dir === 'desc' ? -1 : 1;
        players.sort((a, b) => mul * (a.stats[key] - b.stats[key]));
    }

    sortPlayers(guild1Players, 1);
    sortPlayers(guild2Players, 2);
    sortPlayers(unassignedPlayers, 1);

    // render each guild list
    guild1Players.forEach(({ userId, stats }) => {
        guild1.appendChild(createPlayerCard(userId, stats));
    });

    guild2Players.forEach(({ userId, stats }) => {
        guild2.appendChild(createPlayerCard(userId, stats));
    });

    unassignedPlayers.forEach(({ userId, stats }) => {
        unassigned.appendChild(createPlayerCard(userId, stats));
    });

    // hide unassigned box if empty
    const unassignedBox = document.querySelector('.unassigned');
    if (unassignedPlayers.length === 0) {
        unassignedBox.style.display = 'none';
    } else {
        unassignedBox.style.display = 'block';
    }

    const sb1 = document.getElementById('guild1SortButtons');
    const sb2 = document.getElementById('guild2SortButtons');

    if (sb1) sb1.innerHTML = sortButtonsHTML(1);
    if (sb2) sb2.innerHTML = sortButtonsHTML(2);
    
}

function buffsToIcons(buffs) {
    if (!buffs || buffs.length === 0) return '';
    return buffs.map(b => BUFF_ICONS[b] || '❓').join('');
}

function createPlayerCard(userId, stats) {
    const card      = document.createElement('div');
    card.className  = 'player-card';
    card.dataset.userId = userId;

    const formatStat = (count, type) => {
        if (count == 0) return `<span style="color: #b0b0b0;"></span>`;

        let color;
        if (type === 'hit')             color = '#4cec86'; // green, colorblind safe
        else if (type === 'cleanup')    color = '#fbbf24'; // yellow, colorblind safe
        else if (type === 'failed')     color = '#e45858'; // red, colorblind safe
        else                            color = '#23f8ff'; // blue, for npc lines

        if (count === 0) {
            return `<span style="color: #b0b0b0;">${count}</span>`;
        }
        
        return `<span style="color: ${color}; font-weight: bold;">${count}</span>`;
    };

    const battleTable = `
        <div class="battlecard">
            <span>💊💊</span><span style="text-align:left;">✅ ${formatStat(stats.battles['2med'].hit, 'hit')}</span><span style="text-align:left;">🧹 ${formatStat(stats.battles['2med'].cleanup, 'cleanup')}</span><span style="text-align:left;">🚫 ${formatStat(stats.battles['2med'].failed, 'failed')}</span>
            <span>💊💥</span><span style="text-align:left;">✅ ${formatStat(stats.battles['1med'].hit, 'hit')}</span><span style="text-align:left;">🧹 ${formatStat(stats.battles['1med'].cleanup, 'cleanup')}</span><span style="text-align:left;">🚫 ${formatStat(stats.battles['1med'].failed, 'failed')}</span>
            <span>💥💥</span><span style="text-align:left;">✅ ${formatStat(stats.battles['0med'].hit, 'hit')}</span><span style="text-align:left;">🧹 ${formatStat(stats.battles['0med'].cleanup, 'cleanup')}</span><span style="text-align:left;">🚫 ${formatStat(stats.battles['0med'].failed, 'failed')}</span>
            <span></span><span></span><span></span><span style="text-align:left;">🤖 ${formatStat(stats.defaultLines, 'npc')}</span>
        </div>
    `;

    card.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 8px;">
            ${stats.guild === null ? `
                <div style="display:flex; gap:4px; margin-bottom:6px;">
                    <button onclick="event.stopPropagation(); setPlayerGuild('${userId}', 1)"
                        title="Move to Guild 1"
                        style="flex:1; background:#4a7a4a; border:none; border-radius:4px; color:white; font-size:11px; padding:4px 6px; cursor:pointer; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">← ${document.getElementById('guild1Name').textContent}</button>
                    <button onclick="event.stopPropagation(); setPlayerGuild('${userId}', 2)"
                        title="Move to Guild 2"
                        style="flex:1; background:#4a4a7a; border:none; border-radius:4px; color:white; font-size:11px; padding:4px 6px; cursor:pointer; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${document.getElementById('guild2Name').textContent} →</button>
                </div>
            ` : ''}
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                <div class="player-name">${stats.displayName}</div>
                <div style="display:flex; gap:4px;">
                    ${stats.guild !== null ? `
                        <button onclick="event.stopPropagation(); swapPlayerGuild('${userId}')"
                            title="Swap guild"
                            style="background:#6c757d; border:none; border-radius:4px; color:white; font-size:11px; padding:2px 6px; cursor:pointer;">⇄</button>
                    ` : ''}
                    <button onclick="event.stopPropagation(); toggleBattleDetails('${userId}', 'attacker')"
                        title="Attack details"
                        style="background:#1d6fa4; border:none; border-radius:4px; color:white; font-size:11px; padding:2px 6px; cursor:pointer;">⚔️</button>
                    <button onclick="event.stopPropagation(); toggleBattleDetails('${userId}', 'defender')"
                        title="Defense details"
                        style="background:#a43a1d; border:none; border-radius:4px; color:white; font-size:11px; padding:2px 6px; cursor:pointer;">🛡️</button>
                </div>
            </div>

            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                <div style="font-size:12px; color:#888; font-style:italic;">${stats.mapAssignedTo || 'Unknown'}</div>
            </div>
            
            <div style="display: flex; justify-content: space-between; gap: 20px; align-items: flex-start;">
                
                <div class="player-stats">
                    <div><span class="tokens-remaining">🪙 ${stats.tokensRemaining.toLocaleString()}</span></div>
                    <div><span class="att-score">⚔️ ${stats.scoreAtt.toLocaleString()}</span></div>
                    <div><span class="avg-def">🛡️ ${stats.avgDefScore.toLocaleString()}</span></div>
                    <div style="font-size:12px; color: #f7e013;">⭐ ${stats.performanceMetric.toFixed(2)}</div>
                </div>
                
                ${battleTable}
            </div>
        </div>
    `;

    return card;
}

function createBattleLineHTML(battle, perspective) {

    const theme = RARITY_THEMES[battle.rarity] ?? RARITY_THEMES.common;

    // perspective: 'attacker' or 'defender'
    const isAttPerspective = perspective === 'attacker';

    const attUnits      = battle.attUnits       || [];
    const defUnits      = battle.defUnits       || [];
    const attHP         = battle.attHP          || [];
    const attMaxHP      = battle.attMaxHP       || [];
    const defHPStart    = battle.defHPStart     || [];
    const defMaxHPStart = battle.defMaxHPStart  || [];
    const defHPEnd      = battle.defHPEnd       || [];
    const defMaxHPEnd   = battle.defMaxHPEnd    || [];
    const attDied       = battle.attDied        || [];
    const defFought     = battle.defFought      || [];
    const defDied       = battle.defDied        || [];

    let resultLabel;
    if (battle.abandoned) {
        resultLabel = `<span style="color: #7f43a7; font-weight:bold;">ABANDONED</span>`;
    } else if (isAttPerspective) {
        if (battle.battleScore >= 1100) {
            resultLabel = `<span style="color:${theme.win}; font-weight:bold;">✅ WON (${battle.battleScore})</span>`;
        } else {
            const anyDefSurvived = defHPEnd.some((hp, i) => defUnits[i] && hp > 0);
            resultLabel = anyDefSurvived
                ? `<span style="color:${theme.loss}; font-weight:bold;">🚫 LOST (${battle.battleScore})</span>`
                : `<span style="color:${theme.cleanup}; font-weight:bold;">🧹 CLEAN UP (${battle.battleScore})</span>`;
        }
    } else {
        // defender perspective
        if (battle.battleScore >= 1100) {
            resultLabel = `<span style="color:${theme.loss}; font-weight:bold;">💀 LOST (${battle.battleScore})</span>`;
        } else {
            const anyDefSurvived = defHPEnd.some((hp, i) => defUnits[i] && hp > 0);
            resultLabel = anyDefSurvived
                ? `<span style="color:${theme.win}; font-weight:bold;">🛡️ HELD (${battle.battleScore})</span>`
                : `<span style="color:${theme.cleanup}; font-weight:bold;">🧹 CLEANED UP (${battle.battleScore})</span>`;
        }
    }

    const buffsHTML = buffsToIcons(battle.battleBuffs);

    function hpBar(current, max, label = null) {
        if (label) {
            return `<div style="font-size:9px; text-align:center; color:#888; line-height:1.2;">${label}</div>`;
        }
        const pct   = max > 0 ? Math.max(0, Math.min(100, (current / max) * 100)) : 0;
        const color = pct > 50 ? theme.hpHigh : pct > 25 ? theme.hpMid : theme.hpLow;
        return `
            <div style="background:#222; border-radius:3px; height:5px; width:100%; margin-top:2px;" title="${current}/${max}">
                <div style="width:${pct}%; background:${color}; height:100%; border-radius:3px;"></div>
            </div>
            <div style="font-size:9px; text-align:center; color:${theme.textMuted};">${current === max ? current : `${current}/${max}`}</div>
        `;
    }

    function unitColumn(unitId, isAtt, idx) {
        if (!unitId) return `<div style="display:flex; flex-direction:column; align-items:center; flex:1; min-width:0;">
            <div style="width:36px; height:36px; border-radius:50%; background: #45455e; border:2px solid #45455e;"></div>
        </div>`;

        const isDead        = isAtt     ? attDied[idx]      : defDied[idx];
        const fought        = isAtt     ? true              : defFought[idx];
        //const opacity     = (!isAtt && defFought[idx] === false) ? '0.20' : isDead ? '0.40' : '1';
        const filterStyle   = (!isAtt && defFought[idx] === false) ? 'grayscale(100%) brightness(0.3)' : isDead ? 'grayscale(25%) brightness(0.7)' : 'none';

        const rarity            = isAtt ? battle.attRarity[idx] : battle.defRarity[idx];
        const rarityBorderColor = RARITY_COLORS[rarity] ?? '#444';
        const rankNum           = isAtt ? battle.attRankNum[idx] : battle.defRankNum[idx];
        const rankPadded        = rankNum === -1 ? 'unknown' : String(rankNum).padStart(2, '0');

        let hpHTML = '';
        if (isAtt) {
            const hp    = isDead ? 0           : (attHP[idx] || 0);
            const maxHp = attMaxHP[idx] || 0;
            hpHTML = hpBar(hp, maxHp);
        } else {
            if (fought === false) {
                hpHTML = `<div style="font-size:10px; text-align:center; color:${theme.didNotFight}; line-height:1.4; margin-top:3px; font-weight:bold;">DID<br>NOT<br>FIGHT</div>`;
            } else if (isDead) {
                hpHTML = hpBar(defHPStart[idx] || 0, defMaxHPStart[idx] || 0)
                    + `<div style="font-size:12px; text-align:center; color:${theme.vs}; line-height:1;">↓</div>`
                    + `<div style="font-size:10px; text-align:center; color:${theme.dead}; font-weight:bold;">DEAD</div>`;
            } else {
                hpHTML = hpBar(defHPStart[idx] || 0, defMaxHPStart[idx] || 0)
                    + `<div style="font-size:10px; text-align:center; color:${theme.vs}; line-height:1;">↓</div>`
                    + hpBar(defHPEnd[idx] || 0, defMaxHPEnd[idx] || 0);
            }
        }

        return `
            <div style="display:flex; flex-direction:column; align-items:center; flex:1; min-width:0;">
                <div style="position:relative; width:36px; height:36px;">
                    <img src="${getUnitIcon(unitId)}" style="width:36px; height:36px; border-radius:50%; object-fit:cover; border:2px solid ${rarityBorderColor}; filter:${filterStyle};" title="${unitId}" onerror="this.style.display='none'">
                    <img src="img/rank/rank_${rankPadded}.png" style="position:absolute; bottom:-4px; right:-6px; width:23px; height:23px; filter:${filterStyle};">
                </div>
                ${hpHTML}
            </div>
        `;
    }

    function mowColumn(unitId, rarity, lost) {

        const borderColor   = RARITY_COLORS[rarity] ?? '#4d4d4d';
        //const opacity       = lost ? '0.35' : '1';
        const filterStyle   = lost ? 'grayscale(25%) brightness(0.7)' : 'none';

        if (!unitId || unitId === 'none') return `<div style="display:flex; flex-direction:column; align-items:center; flex:1; min-width:0;">
            <div style="width:36px; height:36px; border-radius:50%; background: #45455e; border:2px solid #45455e;"></div>
        </div>`;

        return `<div style="display:flex; flex-direction:column; align-items:center; flex:1; min-width:0;">
            <img src="${getUnitIcon(unitId)}" style="width:36px; height:36px; border-radius:50%; object-fit:cover; border:2px solid ${borderColor}; filter:${filterStyle};" title="${unitId}" onerror="this.style.display='none'">
        </div>`;
    }

    const anyDefSurvived    = defFought.some((f, i) => defUnits[i] && f !== false && !defDied[i]);
    const attackerWon       = !anyDefSurvived;
    const attLost           = !attackerWon;
    const defLost           = attackerWon;

    const attCols = attUnits.map((u, i) => unitColumn(u, true,  i)).join('') + mowColumn(battle.attMoW, battle.attMoWRarity, attLost);
    const defCols = defUnits.map((u, i) => unitColumn(u, false, i)).join('') + mowColumn(battle.defMoW, battle.defMoWRarity, defLost);

    const battleLabel = isAttPerspective
        ? `Token #${battle.battleNumber}`
        : `Defense #${battle.battleNumber}`;

    return `
        <div style="background: #45455e; border-radius:8px; padding:10px; margin-bottom:10px; border-left:6px solid ${theme.border}; border-right:3px solid ${theme.border};">
            <div style="display:flex; align-items:center; margin-bottom:8px; font-size:12px;">
                <div style="display:flex; align-items:center; gap:12px; width:70%;">
                    <span style="color:${theme.textMuted}; font-weight:bold;">${battleLabel}</span>
                    <span>${resultLabel}</span>
                    <span style="color:${theme.textMuted}; text-transform:capitalize; font-weight:bold;">${battle.rarity}</span>
                    <span style="color:${theme.token}; font-weight:bold;" title="Performance">⭐ ${battle.performance?.toFixed(2) ?? '—'}</span>
                </div>
                <div style="width:30%; text-align:right; font-size:14px;" title="Buffs">${buffsHTML || '—'}</div>
            </div>
            <div style="display:flex; align-items:flex-start; gap:10px;">
                <div style="flex:1; min-width:0;">
                    <!-- <div style="font-size:11px; color:${theme.textMuted}; text-align:center; margin-bottom:3px;">${isAttPerspective ? 'OFFENSE' : 'DEFENSE'}</div> -->
                    <div style="display:flex; gap:4px; width:100%;">${isAttPerspective ? attCols : defCols}</div>
                </div>
                <div style="color:${theme.vs}; font-size:20px; align-self:center;">vs</div>
                <div style="flex:1; min-width:0;">
                    <!-- <div style="font-size:11px; color:${theme.textMuted}; text-align:center; margin-bottom:3px;">${isAttPerspective ? 'DEFENSE' : 'OFFENSE'}</div> -->
                    <div style="display:flex; gap:4px; width:100%;">${isAttPerspective ? defCols : attCols}</div>
                </div>
            </div>
        </div>
    `;
}

function toggleBattleDetails(userId, perspective) {
    const card = document.querySelector(`.player-card[data-user-id="${userId}"]`);
    if (!card) return;

    const detailId  = `battle-detail-${userId}-${perspective}`;
    const existing  = card.querySelector('.battle-detail-panel');
    const isSame    = existing?.id === detailId;

    // if same panel is open, close it and restore
    if (isSame) {
        existing.remove();
        card.style.gridColumn = '';
        card.style.gridRow = '';
        return;
    }

    // close any other open panel on any card and restore their span
    document.querySelectorAll('.battle-detail-panel').forEach(el => {
        const ownerCard = el.closest('.player-card');
        if (ownerCard !== card) {
            ownerCard.style.gridColumn = '';
            ownerCard.style.gridRow = '';
        }
        el.remove();
    });

    const stats   = playerData[userId];
    const battles = perspective === 'attacker'
        ? stats.battleDetailsAsAttacker
        : stats.battleDetailsAsDefender;

    const title   = perspective === 'attacker' ? '⚔️ Attacks' : '🛡️ Defenses';

    const linesHTML = battles.length === 0
        ? '<div style="color:#888; text-align:center; padding:10px; font-size:11px;">No battles recorded.</div>'
        : battles.map(b => createBattleLineHTML(b, perspective)).join('');

    // span across both columns
    card.style.gridColumn = '1 / -1';

    const panel = document.createElement('div');
    panel.id = detailId;
    panel.className = 'battle-detail-panel';
    panel.style.cssText = `
        margin-top: 10px;
        border-top: 1px solid #555;
        padding-top: 10px;
    `;
    panel.innerHTML = `
        <div style="font-size:11px; color:#aaa; font-weight:bold; margin-bottom:8px;">${title}</div>
        ${linesHTML}
    `;

    card.appendChild(panel);
}

function swapPlayerGuild(userId) {
    if (!playerData[userId]) return;

    const current = playerData[userId].guild;

    if (current === 1) playerData[userId].guild = 2;
    else if (current === 2) playerData[userId].guild = 1;

    renderPlayers();
    renderStats();
}

function setPlayerGuild(userId, guild) {
    if (!playerData[userId]) return;
    playerData[userId].guild = guild;
    renderPlayers();
    renderStats();
}

function sortButtonsHTML(guild) {
    const state = guildSortState[guild];
    const buttons = [
        { key: 'tokensRemaining',   icon: '🪙', label: 'Tokens Remaining' },
        { key: 'scoreAtt',          icon: '⚔️', label: 'Attack Score' },
        { key: 'avgDefScore',       icon: '🛡️', label: 'Token Avg Def Score' },
        { key: 'performanceMetric', icon: '⭐', label: 'Performance Metric' },
        { key: 'combinedRank',      icon: '🔷', label: 'Rank of Ranks (⭐, ⚔️)' },
        { key: 'defaultLines',      icon: '🤖', label: 'NPC Lines' },
    ];

    return buttons.map(({ key, icon, label }) => {
        const isActive = state.key === key;
        const arrow = isActive ? (state.dir === 'desc' ? ' ↓' : ' ↑') : '';
        const bg = isActive ? '#5a6a8a' : '#3a3a4e';
        return `<button
            onclick="event.stopPropagation(); setSortAndRender(${guild}, '${key}')"
            style="background:${bg}; border:none; border-radius:4px; color:white; font-size:13px; padding:3px 7px; cursor:pointer;"
            title="Sort by ${label}">${icon}${arrow}</button>`
    }).join('') + `<button
        onclick="event.stopPropagation(); openRankingOverlay(${guild})"
        style="background:#3a3a4e; border:1px solid #555; border-radius:4px; color:white; font-size:13px; padding:3px 7px; cursor:pointer; margin-left:4px;"
        title="Show ranking">🏆</button>`;
}

// the legends page html code
function buildLegendHTML() {
    const iconRows = [
        { icon: '🪙', label: 'Tokens remaining' },
        { icon: '⚔️', label: 'Player attack score total' },
        { icon: '🛡️', label: 'Player defense score per token eaten' },
        { icon: '⭐', label: 'Performance metric (see below)' },
        { icon: '🔷', label: 'Rank of Combined Ranks (see below)' },
        { icon: '🤖', label: 'Fights against NPC lines' },
        { icon: '💊💊', label: '2 medicae buffs active' },
        { icon: '💊💥', label: '1 medicae buff active' },
        { icon: '💥💥', label: '0 medicae buffs active' },
        { icon: '✅', label: 'Win (score ≥ 1100)' },
        { icon: '🧹', label: 'Cleanup (all defenders dead, score < 1100)' },
        { icon: '🚫', label: 'Loss (defenders survived)' },
        { icon: '🏆', label: 'Ranking of the guild based on sort method.' },
        { icon: `<button style="background:#6c757d; border:none; border-radius:4px; color:white; font-size:11px; padding:2px 6px;">⇄</button>`,  label: 'Swap player to other guild' },
        { icon: `<button style="background:#1d6fa4; border:none; border-radius:4px; color:white; font-size:11px; padding:2px 6px;">⚔️</button>`, label: 'Show attack battle details' },
        { icon: `<button style="background:#a43a1d; border:none; border-radius:4px; color:white; font-size:11px; padding:2px 6px;">🛡️</button>`, label: 'Show defense battle details' },
        { icon: `<button style="background:#4a7a4a; border:none; border-radius:4px; color:white; font-size:11px; padding:2px 6px;">← G1</button>`, label: 'Assign unassigned player to guild 1' },
        { icon: `<button style="background:#4a4a7a; border:none; border-radius:4px; color:white; font-size:11px; padding:2px 6px;">G2 →</button>`, label: 'Assign unassigned player to guild 2' },
    ];

    const perfRows = [
        { label: 'Win w/ 5 survivors', keys: ['2medWin5', '1medWin5', '0medWin5'] },
        { label: 'Win w/ 4 survivors', keys: ['2medWin4', '1medWin4', '0medWin4'] },
        { label: 'Win w/ 3 survivors', keys: ['2medWin3', '1medWin3', '0medWin3'] },
        { label: 'Win w/ 2 survivors', keys: ['2medWin2', '1medWin2', '0medWin2'] },
        { label: 'Win w/ 1 survivor',  keys: ['2medWin1', '1medWin1', '0medWin1'] },
        { label: 'Win w/ 0 survivors', keys: ['2medWin0', '1medWin0', '0medWin0'] },
        { label: 'Cleanup',            keys: ['2medCleanup', '1medCleanup', '0medCleanup'] },
        { label: 'Loss',               keys: ['2medLoss', '1medLoss', '0medLoss'] },
        { label: 'Win vs 5 NPCs',      keys: ['npc5Win', 'npc5Win', 'npc5Win'] },
        { label: 'Win vs 4 NPCs',      keys: ['npc4Win', 'npc4Win', 'npc4Win'] },
        { label: 'Win vs 3 NPCs',      keys: ['npc3Win', 'npc3Win', 'npc3Win'] },
        { label: 'Win vs 2 NPCs',      keys: ['npc2Win', 'npc2Win', 'npc2Win'] },
        { label: 'Win vs 1 NPC',       keys: ['npc1Win', 'npc1Win', 'npc1Win'] },
        { label: 'Loss vs NPCs',       keys: ['npcLoss', 'npcLoss', 'npcLoss'] },
    ];

    const addonRows = [
        { label: 'Tough map',  keys: ['2medToughMap',  '1medToughMap',  '0medToughMap']  },
        { label: 'Tough team', keys: ['2medToughTeam', '1medToughTeam', '0medToughTeam'] },
    ];

    const combinedRankRows = [
        { label: '⭐ Performance weight',   key: 'weightsPerformance' },
        { label: '⚔️ Attack score weight',  key: 'weightsScore' },
    ];

    const iconRowsHTML = iconRows.map(({ icon, label }) => `
        <tr>
            <td style="padding:4px 12px 4px 0; font-size:16px;">${icon}</td>
            <td style="padding:4px 0; font-size:12px; color:#ccc;">${label}</td>
        </tr>
    `).join('');

    const perfRowsHTML = perfRows.map(({ label, keys }) => `
        <tr>
            <td style="padding:3px 12px 3px 0; font-size:12px; color:#ccc;">${label}</td>
            <td style="padding:3px 8px; text-align:center; font-size:12px; color:#fbbf24;">${PERFORMANCE_METRIC[keys[0]] ?? '—'}</td>
            <td style="padding:3px 8px; text-align:center; font-size:12px; color:#fbbf24;">${PERFORMANCE_METRIC[keys[1]] ?? '—'}</td>
            <td style="padding:3px 8px; text-align:center; font-size:12px; color:#fbbf24;">${PERFORMANCE_METRIC[keys[2]] ?? '—'}</td>
        </tr>
    `).join('');

    const addonRowsHTML = addonRows.map(({ label, keys }) => `
        <tr>
            <td style="padding:3px 12px 3px 0; font-size:12px; color:#ccc;">${label}</td>
            <td style="padding:3px 8px; text-align:center; font-size:12px; color:#4cec86;">+${PERFORMANCE_ADDONS[keys[0]] ?? '—'}</td>
            <td style="padding:3px 8px; text-align:center; font-size:12px; color:#4cec86;">+${PERFORMANCE_ADDONS[keys[1]] ?? '—'}</td>
            <td style="padding:3px 8px; text-align:center; font-size:12px; color:#4cec86;">+${PERFORMANCE_ADDONS[keys[2]] ?? '—'}</td>
        </tr>
    `).join('');

    const combinedRankRowsHTML = combinedRankRows.map(({ label, key }) => `
        <tr>
            <td style="padding:3px 12px 3px 0; font-size:12px; color:#ccc;">${label}</td>
            <td style="padding:3px 8px; text-align:center; font-size:12px; color:#4cec86;">${PERFORMANCE_WEIGHTS[key] ?? '—'}</td>
        </tr>
    `).join('');

    return `
        <h3 style="margin-bottom:10px; font-size:13px; color:#aaa;">Icons & Buttons</h3>
        <table style="margin-bottom:24px; border-collapse:collapse;">
            ${iconRowsHTML}
        </table>
        <br>
        <h3 style="margin-bottom:10px; font-size:13px; color:#aaa;">⭐ Performance Values</h3>
        <table style="border-collapse:collapse; width:100%;">
            <thead>
                <tr>
                    <th style="text-align:left; padding:4px 12px 8px 0; font-size:12px; color:#aaa;">Outcome</th>
                    <th style="padding:4px 8px 8px; font-size:12px; color:#aaa;">💊💊</th>
                    <th style="padding:4px 8px 8px; font-size:12px; color:#aaa;">💊💥</th>
                    <th style="padding:4px 8px 8px; font-size:12px; color:#aaa;">💥💥</th>
                </tr>
            </thead>
            <tbody>
                ${perfRowsHTML}
            </tbody>
        </table>
        <br><br>
        <h3 style="margin-bottom:10px; font-size:13px; color:#aaa;">Performance Addons</h3>
        <table style="border-collapse:collapse; width:100%;">
            <thead>
                <tr>
                    <th style="text-align:left; padding:4px 12px 8px 0; font-size:12px; color:#aaa;">Condition</th>
                    <th style="padding:4px 8px 8px; font-size:12px; color:#aaa;">💊💊</th>
                    <th style="padding:4px 8px 8px; font-size:12px; color:#aaa;">💊💥</th>
                    <th style="padding:4px 8px 8px; font-size:12px; color:#aaa;">💥💥</th>
                </tr>
            </thead>
            <tbody>${addonRowsHTML}</tbody>
        </table>
        <br><br>
        <h3 style="margin-bottom:10px; font-size:13px; color:#aaa;">🔷 Combined Rank</h3>
        <p style="font-size:11px; color:#888; margin-bottom:10px; line-height:1.6; max-width:400px;">
            Each player is ranked 1–N within their guild separately for ⭐ Performance and ⚔️ Attack Score. 
            Those ranks are inverted (so #1 becomes the highest value) and then combined using the weights below.
        </p>
        <table style="border-collapse:collapse; width:100%;">
            <thead>
                <tr>
                    <th style="text-align:left; padding:4px 12px 8px 0; font-size:12px; color:#aaa;">Field</th>
                    <th style="padding:4px 8px 8px; font-size:12px; color:#aaa;">Weight</th>
                </tr>
            </thead>
            <tbody>${combinedRankRowsHTML}</tbody>
        </table>
    `;
}

function openRankingOverlay(guild) {
    document.getElementById('rankingOverlay').classList.add('active');
    const { html, plainText } = buildRankingHTML(guild);
    document.getElementById('rankingContent').innerHTML = html;
    document.getElementById('rankingCopyBtn').addEventListener('click', () => {
        navigator.clipboard.writeText(plainText);
    });
}

// ranking overlay html code.
function buildRankingHTML(guild) {
    const { key, dir } = guildSortState[guild];
    const guildName    = document.getElementById(`guild${guild}Name`).textContent;

    const statMeta = {
        tokensRemaining:   { icon: '🪙', label: 'Tokens Remaining'      },
        scoreAtt:          { icon: '⚔️', label: 'Attack Score'          },
        avgDefScore:       { icon: '🛡️', label: 'Token Avg Def. Score'  },
        performanceMetric: { icon: '⭐', label: 'Performance'           },
        combinedRank:      { icon: '🔷', label: 'Combined Rank'         },
        defaultLines:      { icon: '🤖', label: 'NPC Lines'             },
    };

    const { icon, label } = statMeta[key] ?? { icon: '?', label: key };
    const dirLabel = dir === 'desc' ? '↓' : '↑';

    // get and sort players
    const players = Object.entries(playerData)
        .filter(([_, stats]) => stats.guild === guild)
        .map(([userId, stats]) => ({ userId, stats }));

    const mul = dir === 'desc' ? -1 : 1;
    players.sort((a, b) => mul * (a.stats[key] - b.stats[key]));

    // build rows
    const chunkSize = 10;
    const columns = [0, 1, 2].map(col => {
        const chunk = players.slice(col * chunkSize, (col + 1) * chunkSize);
        const colRows = chunk.map(({ stats }, i) => {
            const rank = col * chunkSize + i + 1;
            const value = key === 'performanceMetric'
                ? stats[key].toFixed(2)
                : stats[key].toLocaleString();
            return `
                <div style="display:flex; align-items:center; gap:6px; padding:6px 8px; background:${rank % 2 === 0 ? '#3a3a4e' : '#2a2a3e'}; border-radius:6px; margin-bottom:3px;">
                    <span style="color:#888; font-size:11px; width:20px; text-align:right;">${rank}.</span>
                    <span style="flex:1; font-size:12px; font-weight:bold; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${stats.displayName}</span>
                    <span style="font-size:12px; white-space:nowrap;">${icon} ${value}</span>
                </div>
            `;
        }).join('');
        return `<div style="flex:1; min-width:0;">${colRows}</div>`;
    }).join('');

    const rows = `<div style="display:flex; gap:10px;">${columns}</div>`;

    // plain text for clipboard
    const plainText = [
        `${guildName} — sorted by ${icon} ${label} ${dirLabel}`,
        '',
        ...players.map(({ stats }, i) => {
            const value = key === 'performanceMetric'
                ? stats[key].toFixed(2)
                : stats[key].toLocaleString();
            return `${String(i + 1).padStart(2, ' ')}. ${stats.displayName} — ${icon} ${value}`;
        })
    ].join('\n');

    return {
        html: `
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; padding-right:40px;">
                <div>
                    <div style="font-size:1.1em; font-weight:bold;">${guildName}</div>
                    <div style="font-size:12px; color:#aaa; margin-top:2px;">Sorted by ${icon} ${label} ${dirLabel}</div>
                </div>
            <button id="rankingCopyBtn"
                style="background:#425974; border:none; border-radius:6px; color:white; font-size:12px; padding:6px 12px; cursor:pointer;">
                📋
            </button>
            </div>
            ${rows}
        `,
        plainText
    };
}

// seems ok here for now.
function computeCombinedRanks(players) {
    const n = players.length;

    const assignRanks = (arr, key) => {
        const sorted = [...arr].sort((a, b) => b.stats[key] - a.stats[key]);
        sorted.forEach((p, i) => p._rankCache[key] = i + 1);
    };

    players.forEach(p => p._rankCache = {});
    assignRanks(players, 'performanceMetric');
    assignRanks(players, 'scoreAtt');

    players.forEach(p => {
        // invert: rank 1 becomes n, rank n becomes 1
        const perfInverted  = (n + 1) - p._rankCache['performanceMetric'];
        const scoreInverted = (n + 1) - p._rankCache['scoreAtt'];

        // apply weights
        p.stats.combinedRank = (perfInverted  * PERFORMANCE_WEIGHTS['weightsPerformance'])
                             + (scoreInverted * PERFORMANCE_WEIGHTS['weightsScore']);

        delete p._rankCache;
    });
}