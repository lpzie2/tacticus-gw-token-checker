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
    const sortByTokens = (a, b) => b.stats.tokensRemaining - a.stats.tokensRemaining;

    guild1Players.sort(sortByTokens);
    guild2Players.sort(sortByTokens);
    unassignedPlayers.sort(sortByTokens);

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
    
}

function createPlayerCard(userId, stats) {
    const card      = document.createElement('div');
    card.className  = 'player-card';
    card.draggable  = true;
    card.dataset.userId = userId;

    // to avoid div by zero
    const avgDefScore = stats.tokensAte > 0 ? Math.round(stats.scoreDef / stats.tokensAte).toLocaleString() : '0';

    const formatStat = (count, type) => {
        if (count == 0) return `<span style="color: #b0b0b0;"></span>`;

        let color;
        if (type === 'hit') color = '#4cec86'; // green, colorblind safe
        else if (type === 'cleanup') color = '#fbbf24'; // yellow, colorblind safe
        else color = '#e45858'; // red, colorblind safe

        if (count === 0) {
            return `<span style="color: #b0b0b0;">${count}</span>`;
        }
        
        return `<span style="color: ${color}; font-weight: bold;">${count}</span>`;
    };

    const battleTable = `
        <div class="battlecard">
            <div>💊💊:  ✅ <span style="display: inline-block; width: 12px; text-align: right;">${formatStat(stats.battles['2med'].hit, 'hit')}</span> 🧹 <span style="display: inline-block; width: 12px; text-align: right;">${formatStat(stats.battles['2med'].cleanup, 'cleanup')}</span> 🚫 <span style="display: inline-block; width: 12px; text-align: right;">${formatStat(stats.battles['2med'].failed, 'failed')}</span></div>
            <div>💊💥:  ✅ <span style="display: inline-block; width: 12px; text-align: right;">${formatStat(stats.battles['1med'].hit, 'hit')}</span> 🧹 <span style="display: inline-block; width: 12px; text-align: right;">${formatStat(stats.battles['1med'].cleanup, 'cleanup')}</span> 🚫 <span style="display: inline-block; width: 12px; text-align: right;">${formatStat(stats.battles['1med'].failed, 'failed')}</span></div>
            <div>💥💥:  ✅ <span style="display: inline-block; width: 12px; text-align: right;">${formatStat(stats.battles['0med'].hit, 'hit')}</span> 🧹 <span style="display: inline-block; width: 12px; text-align: right;">${formatStat(stats.battles['0med'].cleanup, 'cleanup')}</span> 🚫 <span style="display: inline-block; width: 12px; text-align: right;">${formatStat(stats.battles['0med'].failed, 'failed')}</span></div>
        </div>
    `;

    card.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 8px;">
            <div class="player-name">${stats.displayName}</div>
            
            <div style="display: flex; justify-content: space-between; gap: 20px; align-items: flex-start;">
                
                <div class="player-stats">
                    <div><span class="tokens-remaining">🪙 ${stats.tokensRemaining.toLocaleString()}</span></div>
                    <div><span class="att-score">⚔️ ${stats.scoreAtt.toLocaleString()}</span></div>
                    <div><span class="avg-def">🛡️ ${avgDefScore.toLocaleString()}</span></div>
                </div>
                
                ${battleTable}
            </div>
        </div>
    `;

    // drag events
    card.addEventListener('dragstart', handleDragStart);
    card.addEventListener('dragend', handleDragEnd);

    return card;
}

function handleDragStart(e) {
    e.target.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', e.target.dataset.userId);
}

function handleDragEnd(e) {
    e.target.classList.remove('dragging');
}