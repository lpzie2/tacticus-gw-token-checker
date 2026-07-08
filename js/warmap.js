const RARITY_CODE_MAP = { 'U': 'uncommon', 'R': 'rare', 'E': 'epic', 'L': 'legendary', 'M': 'mythic' };

const WM_TILE_CODES = {
    'HQ':                   'hq',
    'SupplyDepot':          'sd',
    'ComsStation':          'cs',
    'Armoury':              'am',
    'ArtilleryPosition1':   'ap1',
    'ArtilleryPosition2':   'ap2',
    'AntiAirBattery':       'aa',
    'AntiAirBattery1':      'aa1',
    'AntiAirBattery2':      'aa2',
    'Bunker1':              'bk1',
    'Bunker2':              'bk2',
    'MedicaeStation1':      'ms1',
    'MedicaeStation2':      'ms2',
    'Trenches1':            'fl1',
    'Trenches2':            'fl2',
    'Trenches3':            'fl3',
    'WarpRift':             'wr',
    'Garrison1':            'gr1',
    'Garrison2':            'gr2',
    'LandingPad':           'lp',
    'LandingPad1':          'lp1',
    'LandingPad2':          'lp2',
};

// a standard default map layout.
const WM_TILE_ORDER_DEFAULT = [
    'HQ', 'SupplyDepot', 'ComsStation',
    'Armoury', 'ArtilleryPosition1', 'ArtilleryPosition2',
    'AntiAirBattery1', 'AntiAirBattery2', 'Bunker1',
    'Bunker2', 'MedicaeStation1', 'MedicaeStation2',
    'Trenches1', 'Trenches2', 'Trenches3',
];

// some tiles should always be in a certain location.
//   might need to be changed depending on season so some method to do that
//   will be required eventually.
const WM_PINNED_SLOTS = {
    'HQ':                   0,
    'WarpRift':             1,
    'Trenches1':            12,
    'Trenches2':            13,
    'Trenches3':            14,
};

// reverse lookup for the tile codes.
const WM_CODE_TO_TILE = Object.fromEntries(
    Object.entries(WM_TILE_CODES).map(([tile, code]) => [code, tile])
);

// mutable state
let wmLayout            = [];
let WM_TILE_ORDER       = [...WM_TILE_ORDER_DEFAULT];
let wmBattlefield       = '1';
let wmView              = 'tile';               // 'tile' | 'spawns' | 'original'
let wmSwapMode          = false;
let wmSwapFirst         = null;                 // index of first-selected card in swap mode
let wmSeasonKey         = null;                 // resolved season key e.g. '23.2'
let wmShowIngameName    = false;

// ── helpers ───────────────────────────────────────────────────────────────────

function wmResolveSeason() {
    const now = Date.now();

    // 1. if we already have a currentSeasonKey from data.js, prefer it.
    if (typeof currentSeasonKey === 'string' && currentSeasonKey) {
        wmSeasonKey = currentSeasonKey;
    } else {
        // 2. walk the schedule: find active window, else next upcoming.
        let active = null;
        let next   = null;

        for (const entry of WAR_SCHEDULE) {
            if (now >= entry.startDate && now <= entry.endDate) {
                active = entry;
                break;
            }
            if (now < entry.startDate) {
                if (!next || entry.startDate < next.startDate) next = entry;
            }
        }

        const entry = active ?? next;
        wmSeasonKey = entry ? `${entry.season}.${entry.battle}` : null;
    }

    // 3. derive tile order from the resolved season, fall back to default.
    //      give priority to the pinned tiles first.
    const seasonTiles = wmSeasonKey ? Object.keys(SEASON_MAPS[wmSeasonKey] ?? {}) : [];
    if (seasonTiles.length === 15) {
        const layout = new Array(15).fill(null);

        // place pinned tiles first
        const unpinned = [];
        for (const tile of seasonTiles) {
            const slot = WM_PINNED_SLOTS[tile];
            if (slot !== undefined) {
                layout[slot] = tile;
            } else {
                unpinned.push(tile);
            }
        }

        // fill remaining slots in order with unpinned tiles
        let ui = 0;
        for (let i = 0; i < 15; i++) {
            if (layout[i] === null) layout[i] = unpinned[ui++];
        }

        WM_TILE_ORDER = layout;
    } else {
        WM_TILE_ORDER = [...WM_TILE_ORDER_DEFAULT];
    }
}

function wmShouldStartExpanded() {
    const now = Date.now();
    for (const entry of WAR_SCHEDULE) {
        if (now >= entry.startDate && now <= entry.endDate) return true;
    }
    return false;
}

function wmTileImageSrc(tileId) {
    // e.g. 'ArtilleryPosition1' → 'img/tiles/artilleryposition1.png'
    return `img/tiles/${tileId.toLowerCase()}.png`;
}

function wmMapImageSrc(mapId, view) {
    if (view === 'grid_n_spawns')   return `img/maps/grid_n_spawns/${mapId.toLowerCase()}.png`;
    if (view === 'only_spawns')     return `img/maps/only_spawns/${mapId.toLowerCase()}.png`;
    if (view === 'original')        return `img/maps/original/${mapId.toLowerCase()}.png`;
    return `img/tiles/${tileId.toLowerCase()}.png`;
}

function wmRarityString(tileId) {
    const season = wmSeasonNumber();
    if (!season) return null;
    return TILE_RARITY?.[season]?.[wmBattlefield]?.[tileId] ?? null;
}

// dominant rarity = first char of the rarity string (highest rarity listed first)
function wmDominantRarity(tileId) {
    const str = wmRarityString(tileId);
    if (!str) return null;
    return RARITY_CODE_MAP[str[0]] ?? null;
}

function wmIsToughMap(mapId) {
    return mapId && PERFORMANCE_TOUGH_MAPS.includes(mapId);
}

function wmSeasonNumber() {
    return wmSeasonKey ? wmSeasonKey.split('.')[0] : null;
}

// ── render ────────────────────────────────────────────────────────────────────
function wmRender() {
    const grid = document.getElementById('wmGrid');
    if (!grid) return;

    grid.innerHTML = '';

    const seasonMaps = wmSeasonKey ? (SEASON_MAPS[wmSeasonKey] ?? null) : null;

    wmLayout.forEach((tileId, idx) => {
        const mapId     = seasonMaps?.[tileId] ?? null;
        const altName   = mapId ? (MAP_ALTNAMES[mapId] ?? null) : null;
        const rarityStr = wmRarityString(tileId);
        const domRarity = wmDominantRarity(tileId);
        const isTough   = wmIsToughMap(mapId);

        const imgSrc = wmView === 'tile'
            ? wmTileImageSrc(tileId)
            : wmMapImageSrc(mapId, wmView) ;

        const card = document.createElement('div');
        card.className = `wm-tile-card${domRarity ? ` wm-rarity-${domRarity}` : ''}`;
        card.dataset.idx = idx;

        const displayName = wmShowIngameName
            ? (TILE_INGAME_NAMES[tileId] ?? tileId)
            : tileId;

        card.innerHTML = `
            <div class="wm-tile-top">
                <span class="wm-tile-badge-inline" style="min-width:20px; text-align:left;">${rarityStr ?? ''}</span>
                <span style="flex:1; text-align:center; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;" title="${tileId}">${displayName}</span>
                <span style="min-width:20px; text-align:right;">${isTough ? '⚠️' : ''}</span>
            </div>
            <div class="wm-tile-img-wrap">
                <img src="${imgSrc}" alt="${tileId}" onerror="this.style.opacity='0.15'">
            </div>
            <div class="wm-tile-bottom">
                ${mapId
                    ? `<div class="wm-map-id">${mapId}</div>${altName ? `<div class="wm-map-alt">${altName}</div>` : ''}`
                    : `<div class="wm-map-alt" style="color:#555;">no map data</div>`
                }
            </div>
        `;

        card.addEventListener('click', () => wmHandleCardClick(idx, card));
        grid.appendChild(card);
    });
}

// ── swap logic ────────────────────────────────────────────────────────────────

function wmHandleCardClick(idx, card) {
    if (!wmSwapMode) return;

    if (wmSwapFirst === null) {
        wmSwapFirst = idx;
        card.classList.add('wm-swap-selected');
    } else {
        if (wmSwapFirst === idx) {
            // deselect
            card.classList.remove('wm-swap-selected');
            wmSwapFirst = null;
            return;
        }
        // perform swap
        const a = wmSwapFirst;
        const b = idx;
        [wmLayout[a], wmLayout[b]] = [wmLayout[b], wmLayout[a]];
        wmSwapFirst = null;
        wmRender();
    }
}

// ── export / import ───────────────────────────────────────────────────────────

function wmExportCode() {
    const codes = wmLayout.map(tile => WM_TILE_CODES[tile] ?? tile);
    return `${wmBattlefield}:${codes.join(',')}`;
}

function wmImportCode(code) {
    try {
        const [bf, rest] = code.trim().split(':');
        if (!rest) throw new Error('bad format');
        const codes = rest.split(',');
        if (codes.length !== 15) throw new Error('need 15 tiles');
        const tiles = codes.map(c => {
            const tile = WM_CODE_TO_TILE[c.toLowerCase()];
            if (!tile) throw new Error(`unknown code: ${c}`);
            return tile;
        });
        if (new Set(tiles).size !== 15) throw new Error('duplicate tiles');
        wmBattlefield = String(Number(bf)) || '1';
        wmLayout = tiles;
        wmSyncBattlefieldUI();
        wmRender();
        return true;
    } catch (e) {
        alert('Invalid layout code: ' + e.message);
        return false;
    }
}

function wmSyncBattlefieldUI() {
    document.querySelectorAll('.wm-bf-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.bf === wmBattlefield);
    });
}

// ── capture ───────────────────────────────────────────────────────────────────

async function wmCaptureGrid() {
    const btn = document.getElementById('wmCaptureBtn');
    btn.textContent = '⏳ Capturing...';
    btn.disabled = true;

    try {
        const canvas = await html2canvas(document.getElementById('wmGrid'), {
            backgroundColor: '#1a1a2e',
            scale: 2,
            logging: false,
        });

        const season    = wmSeasonKey ? wmSeasonKey.replace('.', '_') : 'unknown';
        const a         = document.createElement('a');
        a.href          = canvas.toDataURL('image/png');
        a.download      = `warmap_${season}.png`;
        a.click();
        btn.textContent = '📸 Capture Grid';
        btn.disabled    = false;

    } catch (e) {
        alert('Capture failed: ' + e.message);
        btn.textContent = '📸 Capture Grid';
        btn.disabled = false;
    }
}

// ── context label ─────────────────────────────────────────────────────────────

function wmUpdateContextLabel() {
    const label = document.getElementById('warMapContextLabel');
    if (!label) return;

    // if a file has been loaded, season is known. no need for the schedule label
    if (typeof currentSeasonKey === 'string' && currentSeasonKey) {
        label.style.display = 'none';
        return;
    }
    label.style.display = 'block';

    if (!wmSeasonKey) {
        label.textContent = 'No active or upcoming war found in schedule.';
        return;
    }

    const now   = Date.now();
    const entry = WAR_SCHEDULE.find(e => `${e.season}.${e.battle}` === wmSeasonKey);
    if (!entry) { label.textContent = `Season ${wmSeasonKey}`; return; }

    if (now >= entry.startDate && now <= entry.endDate) {
        const endMs  = entry.endDate - now;
        const endHrs = Math.floor(endMs / 3600000);
        const endMin = Math.floor((endMs % 3600000) / 60000);
        label.textContent = `⚔️ Season ${entry.season}.${entry.battle} : active, ends in ${endHrs}h ${endMin}m`;
    } else {
        const startMs  = entry.startDate - now;
        const startHrs = Math.floor(startMs / 3600000);
        const startMin = Math.floor((startMs % 3600000) / 60000);
        label.textContent = `🕐 Next: Season ${entry.season}.${entry.battle} : starts in ${startHrs}h ${startMin}m`;
    }
}

// ── init ──────────────────────────────────────────────────────────────────────

function initWarMapPanel() {
    wmResolveSeason();
    wmLayout = [...WM_TILE_ORDER];
    wmUpdateContextLabel();

    // collapse/expand
    const toggle    = document.getElementById('warMapToggle');
    const body      = document.getElementById('warMapBody');
    const arrow     = document.getElementById('warMapCollapseArrow');
    const expanded  = wmShouldStartExpanded();

    if (expanded) {
        body.style.display  = 'block';
        arrow.style.transform = 'rotate(90deg)';
    }

    toggle.addEventListener('click', () => {
        const open = body.style.display !== 'none';
        body.style.display    = open ? 'none' : 'block';
        arrow.style.transform = open ? 'rotate(0deg)' : 'rotate(90deg)';
    });

    // battlefield buttons
    document.querySelectorAll('.wm-bf-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            wmBattlefield = btn.dataset.bf;
            wmSyncBattlefieldUI();
            wmRender();
        });
    });

    // map image view buttons
    document.querySelectorAll('.wm-view-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            wmView = btn.dataset.view;
            document.querySelectorAll('.wm-view-btn').forEach(b => b.classList.toggle('active', b.dataset.view === wmView));
            wmRender();
        });
    });

    // in-game name button
    const nameBtn = document.getElementById('wmNameBtn');
    nameBtn.addEventListener('click', () => {
        wmShowIngameName = !wmShowIngameName;
        nameBtn.textContent = wmShowIngameName ? '🏷️ Internal Names' : '🏷️ In-Game Names';
        wmRender();
    });

    // swap button
    const swapBtn       = document.getElementById('wmSwapBtn');
    const swapBanner    = document.getElementById('wmSwapBanner');
    swapBtn.addEventListener('click', () => {
        wmSwapMode  = !wmSwapMode;
        wmSwapFirst = null;
        swapBtn.classList.toggle('active', wmSwapMode);
        swapBanner.style.display = wmSwapMode ? 'block' : 'none';
        if (!wmSwapMode) wmRender(); // clear selection highlights
    });

    // export
    const exportBtn = document.getElementById('wmExportBtn');
    const exportRow = document.getElementById('wmExportRow');
    const exportOut = document.getElementById('wmExportOutput');
    exportBtn.addEventListener('click', () => {
        const showing = exportRow.style.display !== 'none';
        exportRow.style.display = showing ? 'none' : 'flex';
        importRow.style.display = 'none';
        if (!showing) exportOut.value = wmExportCode();
    });
    document.getElementById('wmExportCopy').addEventListener('click', () => {
        navigator.clipboard.writeText(exportOut.value);
        document.getElementById('wmExportCopy').textContent = '✅ Copied!';
        setTimeout(() => document.getElementById('wmExportCopy').textContent = '📋 Copy', 1500);
    });

    // import
    const importBtn = document.getElementById('wmImportBtn');
    const importRow = document.getElementById('wmImportRow');
    importBtn.addEventListener('click', () => {
        const showing = importRow.style.display !== 'none';
        importRow.style.display = showing ? 'none' : 'flex';
        exportRow.style.display = 'none';
    });
    document.getElementById('wmImportConfirm').addEventListener('click', () => {
        const code = document.getElementById('wmImportInput').value;
        if (wmImportCode(code)) {
            importRow.style.display = 'none';
            document.getElementById('wmImportInput').value = '';
        }
    });

    // grid capture
    document.getElementById('wmCaptureBtn').addEventListener('click', wmCaptureGrid);

    wmRender();
}

// call once DOM is ready. main.js can call this, or we self-init via DOMContentLoaded
document.addEventListener('DOMContentLoaded', initWarMapPanel);