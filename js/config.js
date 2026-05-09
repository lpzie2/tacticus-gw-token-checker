const DEV_MODE = false; // a tool that i used to get x,y coords for icons on maps.

const ZONE_POINTS = {
    'HQ':                   40000,
    'SupplyDepot':          30000,
    'Trenches1':            10000,
    'Trenches2':            10000,
    'Trenches3':            10000,
    'Armoury':              16000,
    'ComsStation':          16000,
    'Bunker1':              16000,
    'Bunker2':              16000,
    'MedicaeStation1':      16000,
    'MedicaeStation2':      16000,
    'ArtilleryPosition1':   16000,
    'ArtilleryPosition2':   16000,
    'AntiAir':              16000,
    'AntiAirBattery1':      16000,
    'AntiAirBattery2':      16000,
    'WarpRift':             16000
};

const BUFF_ICONS = {
    'EnvDefenderHealthBuff2':   '🏥',
    'EnvDefenderHealthBuff1':   '🏥',
    'EnvValkyrieStrike':        '🪽',
    'EnvArmourSupplies':        '🛡️',
    'EnvArtillerySupport':      '🔥',
    'EnvFlakFire':              '🎯',
    'EnvFortified':             '🏰'
};

const ZONE_BUFFS = {
    'MedicaeStation1':      'EnvDefenderHealthBuff2',
    'MedicaeStation2':      'EnvDefenderHealthBuff2',
    'ComsStation':          'EnvValkyrieStrike',
    'Armoury':              'EnvArmourSupplies',
    'ArtilleryPosition1':   'EnvArtillerySupport',
    'ArtilleryPosition2':   'EnvArtillerySupport',
    'AntiAirBattery1':      'EnvFlakFire',
    'AntiAirBattery2':      'EnvFlakFire',
    'Bunker1':              'EnvFortified',
    'Bunker2':              'EnvFortified',
};

const BUFF_RANGE = {
    'EnvDefenderHealthBuff2':   'Global',
    'EnvDefenderHealthBuff1':   'Global',
    'EnvValkyrieStrike':        'Global',
    'EnvArmourSupplies':        'Regional',
    'EnvArtillerySupport':      'Regional',
    'EnvFlakFire':              'Regional',
    'EnvFortified':             'Local'
};

const UNIQUE_TILES = [...new Set(Object.values(ZONE_POINTS))].sort((a, b) => a - b);

const MAX_PLAYER_SCORE = 1601;

const INITIAL_TOKENS = 10;

const GW_DURATION_HOURS = 35.5;

const FACTION_PREFIXES = {
    'ultra' : 'Ultramarines',
    'death' : 'Death Guard',
    'black' : 'Black Legion',
    'world' : 'World Eaters',
    'custo' : 'Adeptus Custodes',
    'necro' : 'Necrons',
    'space' : 'Space Wolves',
    'orks'  : 'Orks',
    'eldar' : 'Aeldari',
    'tau'   : "T'au Empire",
    'thous' : 'Thousand Sons',
    'genes' : 'Genestealer Cults',
    'tyran' : 'Tyranids',
    'astra' : 'Astra Militarum',
    'admec' : 'Adeptus Mechanicus',
    'emper' : "Emperor's Children",
    'templ' : 'Black Templars',
    'adept' : 'Adepta Sororitas',
    'blood' : 'Blood Angels',
    'darka' : 'Dark Angels',
    'votan' : 'League of Votann'
};

const CHARACTER_PROGRESSION = {
    // 0 means the unit hasn't been unlocked.
    1:  {'rarity': 'common',    'star': {'color': 'yellow', 'number': 1}},
    2:  {'rarity': 'common',    'star': {'color': 'yellow', 'number': 2}},
    3:  {'rarity': 'uncommon',  'star': {'color': 'yellow', 'number': 2}},
    4:  {'rarity': 'uncommon',  'star': {'color': 'yellow', 'number': 3}},
    5:  {'rarity': 'uncommon',  'star': {'color': 'yellow', 'number': 4}},
    6:  {'rarity': 'rare',      'star': {'color': 'yellow', 'number': 4}},
    7:  {'rarity': 'rare',      'star': {'color': 'yellow', 'number': 5}},
    8:  {'rarity': 'rare',      'star': {'color': 'red',    'number': 1}},
    9:  {'rarity': 'epic',      'star': {'color': 'red',    'number': 1}},
    10: {'rarity': 'epic',      'star': {'color': 'red',    'number': 2}},
    11: {'rarity': 'epic',      'star': {'color': 'red',    'number': 3}},
    12: {'rarity': 'legendary', 'star': {'color': 'red',    'number': 3}},
    13: {'rarity': 'legendary', 'star': {'color': 'red',    'number': 4}},
    14: {'rarity': 'legendary', 'star': {'color': 'red',    'number': 5}},
    15: {'rarity': 'legendary', 'star': {'color': 'blue',   'number': 1}},
    16: {'rarity': 'mythic',    'star': {'color': 'blue',   'number': 1}},
    17: {'rarity': 'mythic',    'star': {'color': 'blue',   'number': 2}},
    18: {'rarity': 'mythic',    'star': {'color': 'blue',   'number': 3}},
    19: {'rarity': 'mythic',    'star': {'color': 'mythic', 'number': 1}}
};

const CHARACTER_RANK = { 
    0:  'Stone 1',
    1:  'Stone 2',
    2:  'Stone 3',
    3:  'Iron 1',
    4:  'Iron 2',
    5:  'Iron 3',
    6:  'Bronze 1',
    7:  'Bronze 2',
    8:  'Bronze 3',
    9:  'Silver 1',
    10: 'Silver 2',
    11: 'Silver 3',
    12: 'Gold 1',
    13: 'Gold 2',
    14: 'Gold 3',
    15: 'Diamond 1',
    16: 'Diamond 2',
    17: 'Diamond 3',
    18: 'Adamantine 1',
    19: 'Adamantine 2',
    20: 'Adamantine 3'
};

// it's the same as character progression but who knows in the future.
const MACHINE_OF_WAR_PROGRESSION = {
    // 0 means the mow hasn't been unlocked
    1:  {'rarity': 'common',    'star': {'color': 'yellow', 'number': 1}},
    2:  {'rarity': 'common',    'star': {'color': 'yellow', 'number': 2}},
    3:  {'rarity': 'uncommon',  'star': {'color': 'yellow', 'number': 2}},
    4:  {'rarity': 'uncommon',  'star': {'color': 'yellow', 'number': 3}},
    5:  {'rarity': 'uncommon',  'star': {'color': 'yellow', 'number': 4}},
    6:  {'rarity': 'rare',      'star': {'color': 'yellow', 'number': 4}},
    7:  {'rarity': 'rare',      'star': {'color': 'yellow', 'number': 5}},
    8:  {'rarity': 'rare',      'star': {'color': 'red',    'number': 1}},
    9:  {'rarity': 'epic',      'star': {'color': 'red',    'number': 1}},
    10: {'rarity': 'epic',      'star': {'color': 'red',    'number': 2}},
    11: {'rarity': 'epic',      'star': {'color': 'red',    'number': 3}},
    12: {'rarity': 'legendary', 'star': {'color': 'red',    'number': 3}},
    13: {'rarity': 'legendary', 'star': {'color': 'red',    'number': 4}},
    14: {'rarity': 'legendary', 'star': {'color': 'red',    'number': 5}},
    15: {'rarity': 'legendary', 'star': {'color': 'blue',   'number': 1}},
    16: {'rarity': 'mythic',    'star': {'color': 'blue',   'number': 1}},
    17: {'rarity': 'mythic',    'star': {'color': 'blue',   'number': 2}},
    18: {'rarity': 'mythic',    'star': {'color': 'blue',   'number': 3}},
    19: {'rarity': 'mythic',    'star': {'color': 'mythic', 'number': 1}}
};

const GUILDWAR_RARITY_CAPS = {
    'common':       {'max_character_progression': 1,    'max_character_rank': 1},
    'uncommon':     {'max_character_progression': 5,    'max_character_rank': 6},
    'rare':         {'max_character_progression': 8,    'max_character_rank': 9},
    'epic':         {'max_character_progression': 11,   'max_character_rank': 12},
    'legendary':    {'max_character_progression': 15,   'max_character_rank': 17},
    'mythic':       {'max_character_progression': 19,   'max_character_rank': 20}
};

const RARITY_ORDER = ['common', 'uncommon', 'rare', 'epic', 'legendary', 'mythic'];

const RARITY_COLORS = {
    'common':    '#a1a1a1',
    'uncommon':  '#8f6930',
    'rare':      '#ffffff',
    'epic':      '#fffd6e',
    'legendary': '#3be8ff',
    'mythic':    '#ff4800',
};

// used for the battle detail card.
const RARITY_THEMES = {
    common: {
        bg:          'color-mix(in srgb, #a1a1a1 70%, #1a1a1a)',
        border:      '#a1a1a1',
        text:        '#a1a1a1',
        textMuted:   '#d4d4d4',
        win:         '#7bffac',
        loss:        '#e45858',
        cleanup:     '#fbbf24',
        dead:        '#fd7474',
        didNotFight: '#dddddd',
        token:       '#f7e013',
        hpHigh:      '#4cec86',
        hpMid:       '#fbbf24',
        hpLow:       '#e45858',
        vs:          '#d4d4d4',
    },
    uncommon: {
        bg:          'color-mix(in srgb, #8f6930 70%, #1a1a1a)',
        border:      '#8f6930',
        text:        '#ac8346',
        textMuted:   '#caa163',
        win:         '#7bffac',
        loss:        '#ce4343',
        cleanup:     '#fbbf24',
        dead:        '#fd7474',
        didNotFight: '#dddddd',
        token:       '#f7e013',
        hpHigh:      '#4cec86',
        hpMid:       '#fbbf24',
        hpLow:       '#e45858',
        vs:          '#caa163',
    },
    rare: {
        bg:          'color-mix(in srgb, #ffffff 70%, #1a1a1a)',
        border:      '#ffffff',
        text:        '#ffffff',
        textMuted:   '#eeeeee',
        win:         '#7bffac',
        loss:        '#ce4343',
        cleanup:     '#fbbf24',
        dead:        '#fd7474',
        didNotFight: '#dddddd',
        token:       '#f7e013',
        hpHigh:      '#4cec86',
        hpMid:       '#fbbf24',
        hpLow:       '#e45858',
        vs:          '#eeeeee',
    },
    epic: {
        bg:          'color-mix(in srgb, #fffd6e 60%, #1a1a1a)',
        border:      '#fffd6e',
        text:        '#efff63',
        textMuted:   '#f6ffa9',
        win:         '#7bffac',
        loss:        '#ce4343',
        cleanup:     '#fbbf24',
        dead:        '#fd7474',
        didNotFight: '#dddddd',
        token:       '#f7e013',
        hpHigh:      '#4cec86',
        hpMid:       '#fbbf24',
        hpLow:       '#e45858',
        vs:          '#f6ffa9',
    },
    legendary: {
        bg:          'color-mix(in srgb, #3be8ff 60%, #1a1a1a)',
        border:      '#3be8ff',
        text:        '#b6f6ff',
        textMuted:   '#85efff',
        win:         '#7bffac',
        loss:        '#ce4343',
        cleanup:     '#fbbf24',
        dead:        '#fd7474',
        didNotFight: '#dddddd',
        token:       '#f7e013',
        hpHigh:      '#4cec86',
        hpMid:       '#fbbf24',
        hpLow:       '#e45858',
        vs:          '#85efff',
    },
    mythic: {
        bg:          'color-mix(in srgb, #ff4800 60%, #1a1a1a)',
        border:      '#ff4800',
        text:        '#ffe3d8',
        textMuted:   '#ffc0ad',
        win:         '#7bffac',
        loss:        '#ce4343',
        cleanup:     '#fbbf24',
        dead:        '#fd7474',
        didNotFight: '#dddddd',
        token:       '#f7e013',
        hpHigh:      '#4cec86',
        hpMid:       '#fbbf24',
        hpLow:       '#e45858',
        vs:          '#ffc0ad',
    },
};

const BASE_HP = {
    'adeptCanoness':        85,
    'adeptCelestine':       60,
    'adeptHospitaller':     85,
    'adeptMorvenn':         95,
    'adeptRetributor':      70,
    'admecDestroyer':       95,
    'admecDominus':         90,
    'admecManipulus':       95,
    'admecMarshall':        85,
    'admecRuststalker':     80,
    'astraBullgryn':        95,
    'astraCreed':           90,
    'astraDreir':           100,
    'astraOrdnance':        65,
    'astraPrimarisPsy':     55,
    'astraYarrick':         75,
    'blackAbaddon':         100,
    'blackHaarken':         95,
    'blackObliterator':     125,
    'blackPossession':      80,
    'blackTerminator':      110,
    'bloodDante':           90,
    'bloodDeathCompany':    90,
    'bloodIntercessor':     90,
    'bloodMephiston':       95,
    'bloodSanguinary':      90,
    'custoAtlacoya':        80,
    'custoBladeChampion':   95,
    'custoKyrus':           95,
    'custoTrajann':         100,
    'custoVexilusPraetor':  110,
    'darkaAsmodai':         90,
    'darkaAzrael':          95,
    'darkaCompanion':       90,
    'darkaHellblaster':     70,
    'darkaTerminator':      110,
    'deathBlightbringer':   125,
    'deathBlightlord':      120,
    'deathPutrifier':       120,
    'deathRotbone':         120,
    'deathTyphus':          120,
    'eldarAutarch':         80,
    'eldarFarseer':         75,
    'eldarJainZar':         75,
    'eldarMauganRa':        70,
    'eldarRanger':          70,
    'emperExultant':        90,
    'emperFlawlessBlade':   95,
    'emperKakophonist':     100,
    'emperLucius':          90,
    'emperNoiseMarine':     85,
    'genesBiophagus':       55,
    'genesKelermorph':      60,
    'genesMagus':           55,
    'genesPatriarch':       100,
    'genesPrimus':          70,
    'necroDestroyer':       72,
    'necroOverlord':        85,
    'necroPlasmancer':      75,
    'necroSpyder':          75,
    'necroWarden':          85,
    'orksBigMek':           75,
    'orksKillaKan':         90,
    'orksNob':              100,
    'orksRuntherd':         120,
    'orksWarboss':          100,
    'spaceBlackmane':       100,
    'spaceHound':           85,
    'spaceRockfist':        110,
    'spaceStormcaller':     80,
    'spaceWolfPriest':      90,
    'spaceWulfen':          90,
    'tauAunShi':            85,
    'tauCrisis':            105,
    'tauDarkstrider':       75,
    'tauFarsight':          100,
    'tauMarksman':          65,
    'tauShadowsun':         80,
    'templAggressor':       120,
    'templAncient':         100,
    'templChampion':        110,
    'templHelbrecht':       95,
    'templSwordBrother':    95,
    'thousAhriman':         80,
    'thousInfernalMaster':  70,
    'thousSorcerer':        75,
    'thousTerminator':      90,
    'thousTzaangor':        65,
    'tyranDeathleaper':     80,
    'tyranNeurothrope':     85,
    'tyranParasite':        90,
    'tyranTyrantGuard':     125,
    'tyranWingedPrime':     100,
    'ultraApothecary':      100,
    'ultraCalgar':          95,
    'ultraEliminatorSgt':   60,
    'ultraInceptorSgt':     85,
    'ultraTigurius':        65,
    'ultraTitus':           95,
    'votanBeserk':          90,
    'votanIronmaster':      80,
    'votanMemnyr':          90,
    'votanUthar':           90,
    'worldEightbound':      100,
    'worldExecutions':      95,
    'worldJakhal':          90,
    'worldKharn':           90,
    'worldTerminator':      95
};

const PERFORMANCE_METRIC = {
    'battleLost':   1.00,
    'npc5Win':      1.25,
    'npc4Win':      1.25,
    'npc3Win':      1.25,
    'npc2Win':      1.25,
    'npc1Win':      1.25,
    'npcLoss':      0.50,
    '2medWin5':     3.00,
    '2medWin4':     2.95,
    '2medWin3':     2.90,
    '2medWin2':     2.85,
    '2medWin1':     2.80,
    '2medWin0':     2.78,
    '2medCleanup':  2.00,
    '2medLoss':     1.00,
    '1medWin5':     2.75,
    '1medWin4':     2.70,
    '1medWin3':     2.65,
    '1medWin2':     2.60,
    '1medWin1':     2.55,
    '1medWin0':     2.53,
    '1medCleanup':  1.75,
    '1medLoss':     1.00,
    '0medWin5':     2.50,
    '0medWin4':     2.45,
    '0medWin3':     2.40,
    '0medWin2':     2.35,
    '0medWin1':     2.30,
    '0medWin0':     2.28,
    '0medCleanup':  1.50,
    '0medLoss':     1.00
};

const PERFORMANCE_ADDONS = {
    '2medToughMap':         0.20,
    '1medToughMap':         0.15,
    '0medToughMap':         0.10,
    '2medToughTeam':        0.20,
    '1medToughTeam':        0.15,
    '0medToughTeam':        0.10
};

const PERFORMANCE_BUFF_SCALING = [
    0.00, 0.01, 0.02, 0.03, 0.05, 0.06 , 0.07, 0.09, 0.10, 0.11, 0.13, 0.14, 0.15
];

const PERFORMANCE_WEIGHTS = {
    'weightsPerformance':   0.67,
    'weightsScore':         0.33
};

const PERFORMANCE_TOUGH_MAPS = [
    'MC1_31', 'EC1_09', 'LHE_Desert_02', 'C1_70', 'MC1_11'
];

const PERFORMANCE_TOUGH_LINES = {
    'GSC_01':   ['genesPrimus',     'genesKelermorph'],
    'DG_01':    ['deathRotbone',    'deathBlightlord'],
    'DG_02':    ['deathRotbone',    'deathTyphus']
};

// TODO: add more to this as it becomes important.
// note: make sure to order them from more specific to least; order matters!
// note: numbers at the end will be ignored when counting the teams.
// null means any mow is fine
const TEAM_META_DEFINITIONS = {

    // 6 unit teams

    "Judh Going Solo": {
        metaTeam: "GSC",
        requiredUnits: ["genesKelermorph", "custoVexilusPraetor", "eldarAutarch", "spaceWolfPriest", "genesMagus"],
        requiredMOW: "darkaStormSpeeder"
    },

    // 5 man teams

    "Perfect Blood Angels": {
        metaTeam: "Blood Angels",
        requiredUnits: ["bloodIntercessor", "bloodDeathCompany", "bloodSanguinary", "bloodMephiston", "bloodDante"],
        requiredMOW: null
    },
    "Perfect GSC": {
        metaTeam: "GSC",
        requiredUnits: ["genesPrimus", "genesBiophagus", "genesKelermorph", "genesPatriarch", "genesMagus"],
        requiredMOW: null
    },
    "Synapse GSC": {
        metaTeam: "GSC",
        requiredUnits: ["genesPrimus", "genesBiophagus", "genesKelermorph", "genesPatriarch", "tyranWingedPrime"],
        requiredMOW: null
    },
    "Mechanical+ GSC": {
        metaTeam: "GSC",
        requiredUnits: ["genesPrimus", "genesBiophagus", "genesKelermorph", "tauCrisis", "tauMarksman"],
        requiredMOW: null
    },
    "Summoning Nids": {
        metaTeam: "Tyranids",
        requiredUnits: ["genesPatriarch", "tyranWingedPrime", "genesPrimus", "genesBiophagus", "tyranParasite"],
        requiredMOW: null
    },
    "Ideal Psykers": {
        metaTeam: "Psykers",
        requiredUnits: ["thousInfernalMaster", "thousTzaangor", "blackPossession", "thousAhriman", "tyranNeurothrope"],
        requiredMOW: null
    },
    "Buffed Psykers": {
        metaTeam: "Psykers",
        requiredUnits: ["thousInfernalMaster", "thousTzaangor", "eldarFarseer", "thousAhriman", "tyranNeurothrope"],
        requiredMOW: null
    },
    "Flying Psykers": {
        metaTeam: "Psykers",
        requiredUnits: ["thousInfernalMaster", "thousTzaangor", "bloodMephiston", "thousAhriman", "tyranNeurothrope"],
        requiredMOW: null
    },
    "Admech Hero Plus 0": {
        metaTeam: "AdMech",
        requiredUnits: ["admecRuststalker", "admecManipulus", "admecMarshall", "admecDominus", "tauCrisis"],
        requiredMOW: null
    },
    "We Got AdMech At Home": {
        metaTeam: "AdMech",
        requiredUnits: ["admecRuststalker", "admecManipulus", "necroDestroyer", "necroSpyder", "tauMarksman"],
        requiredMOW: null
    },
    "Dollar Store AdMech": {
        metaTeam: "AdMech",
        requiredUnits: ["admecDominus", "admecMarshall", "admecRuststalker", "necroDestroyer", "tauMarksman"],
        requiredMOW: null
    },
    "SadMech": {
        metaTeam: "AdMech",
        requiredUnits: ["admecDominus", "admecMarshall", "admecManipulus", "necroSpyder", "orksWarboss"],
        requiredMOW: null
    },
    "Perfect Orks": {
        metaTeam: "Waarg!",
        requiredUnits: ["orksWarboss", "orksRuntherd", "orksBigMek", "orksKillaKan", "orksNob"],
        requiredMOW: null
    },
    "BT Orks": {
        metaTeam: "Waarg!",
        requiredUnits: ["orksWarboss", "orksRuntherd", "orksBigMek", "templChampion", "templSwordBrother"],
        requiredMOW: null
    },
    "Juiced Up Orks": {
        metaTeam: "Waarg!",
        requiredUnits: ["orksWarboss", "orksRuntherd", "templHelbrecht", "orksNob", "orksBigMek"],
        requiredMOW: null
    },
    "T'Ork Spyder": {
        metaTeam: "Waarg!",
        requiredUnits: ["orksWarboss", "orksRuntherd", "orksNob", "tauCrisis", "necroSpyder"],
        requiredMOW: null
    },
    "Warped Flames": {
        metaTeam: "Psykers",
        requiredUnits: ["deathTyphus", "thousTerminator", "thousAhriman", "adeptRetributor", "worldTerminator"],
        requiredMOW: null
    },
    "Mechanical Advantage": {
        metaTeam: "Overwatch",
        requiredUnits: ["tauCrisis", "ultraCalgar", "eldarMauganRa", "tauFarsight", "eldarRanger"],
        requiredMOW: null
    },
    "Mechanical Wingspan": {
        metaTeam: "Overwatch",
        requiredUnits: ["tauCrisis", "ultraCalgar", "eldarMauganRa", "tauFarsight", "eldarAutarch"],
        requiredMOW: null
    },
    "Friendly Fire": {
        metaTeam: "Astra Mil.",
        requiredUnits: ["adeptCelestine", "astraYarrick", "adeptHospitaller", "astraDreir", "adeptRetributor"],
        requiredMOW: null
    },
    "Beefy Chaos": {
        metaTeam: "Chaos",
        requiredUnits: ["blackTerminator", "blackAbaddon", "deathBlightbringer", "worldKharn", "worldTerminator"],
        requiredMOW: null
    },


    // 4 man teams

    "Holy GSC": {
        metaTeam: "GSC",
        requiredUnits: ["genesPrimus", "genesBiophagus", "genesKelermorph", "adeptCelestine"],
        requiredMOW: null
    },
    "Mechanical GSC": {
        metaTeam: "GSC",
        requiredUnits: ["genesPrimus", "genesBiophagus", "genesKelermorph", "tauCrisis"],
        requiredMOW: null
    },
    "Fire Psykers": {
        metaTeam: "Psykers",
        requiredUnits: ["thousInfernalMaster", "thousTzaangor", "thousAhriman", "thousTerminator"],
        requiredMOW: null
    },
    "Repairable Admech": {
        metaTeam: "AdMech",
        requiredUnits: ["admecRuststalker", "admecManipulus", "admecMarshall", "admecDominus"],
        requiredMOW: null
    },
    "Piercing Admech": {
        metaTeam: "AdMech",
        requiredUnits: ["admecRuststalker", "admecManipulus", "admecMarshall", "tauMarksman"],
        requiredMOW: null
    },


    // 3 man teams

    "Basic Blood Angels": {
        metaTeam: "Blood Angels",
        requiredUnits: ["bloodIntercessor", "bloodDeathCompany", "bloodSanguinary"],
        requiredMOW: null
    },
    "Basic Boosted Overwatch": {
        metaTeam: "Overwatch",
        requiredUnits: ["tauCrisis", "ultraCalgar", "eldarMauganRa"],
        requiredMOW: null
    },
    "Windy Death Guard": {
        metaTeam: "Death Guard",
        requiredUnits: ["deathBlightlord", "deathRotbone", "deathTyphus"],
        requiredMOW: null
    },
    "Fast Death Guard": {
        metaTeam: "Death Guard",
        requiredUnits: ["deathBlightlord", "deathRotbone", "deathBlightbringer"],
        requiredMOW: null
    },
    "Basic GSC": {
        metaTeam: "GSC",
        requiredUnits: ["genesPrimus", "genesBiophagus", "genesKelermorph"],
        requiredMOW: null
    },
    "Mechanical Orks": {
        metaTeam: "Mechanical",
        requiredUnits: ["orksWarboss", "admecMarshall", "admecManipulus"],
        requiredMOW: null
    },
    "Core Orks": {
        metaTeam: "Waarg!",
        requiredUnits: ["orksWarboss", "orksRuntherd", "orksBigMek"],
        requiredMOW: null
    },
    "Piercing Orks": {
        metaTeam: "Waarg!",
        requiredUnits: ["orksWarboss", "orksRuntherd", "templHelbrecht"],
        requiredMOW: null
    },
    "Dark Holy Angels": {
        metaTeam: "Dark Angels",
        requiredUnits: ["darkaHellblaster", "darkaTerminator", "adeptHospitaller"],
        requiredMOW: null
    },
    "Budget Psykers": {
        metaTeam: "Psykers",
        requiredUnits: ["thousInfernalMaster", "thousTzaangor", "thousTerminator"],
        requiredMOW: null
    },
    "Basic Psykers": {
        metaTeam: "Psykers",
        requiredUnits: ["thousInfernalMaster", "thousTzaangor", "thousAhriman"],
        requiredMOW: null
    },
    "Standard Double Howl": {
        metaTeam: "Howl",
        requiredUnits: ["spaceBlackmane", "tauAunShi", "worldKharn"],
        requiredMOW: null
    },
    "Basic Admech": {
        metaTeam: "AdMech",
        requiredUnits: ["admecRuststalker", "admecManipulus", "admecMarshall"],
        requiredMOW: null
    },


    // 2 man teams (you risk grouping up too many different teams at this point and beyond)

    //"Basic Death Guard": {
    //    metaTeam: "Death Guard",
    //    requiredUnits: ["deathBlightlord", "deathRotbone"],
    //    requiredMOW: null
    //},
    //"Basic Double Howl": {
    //    metaTeam: "Howl",
    //    requiredUnits: ["spaceBlackmane", "tauAunShi"],
    //    requiredMOW: null
    //},
    //"Single Howl": {
    //    metaTeam: "Howl",
    //    requiredUnits: ["spaceBlackmane", "worldKharn"],
    //    requiredMOW: null
    //},
    //"Basic Orks": {
    //    metaTeam: "Waarg!",
    //    requiredUnits: ["orksWarboss", "orksRuntherd"],
    //    requiredMOW: null
    //}

    // 1 man teams (very risky to put units here, will mask a lot of different teams.)
    //"Sad Single Howl": {
    //    metaTeam: "Howl",
    //    requiredUnits: ["spaceBlackmane"],
    //    requiredMOW: null
    //}
};


const MAP_ALTNAMES = {
    'C1_15':            'Grasslands',
    'C1_23':            'Sniper\'s Nest',
    'C1_37':            'Three Bridges',
    'C1_70':            'Five Pillars',
    'CE2_06':           'Deathleaper\'s Cove',
    'EC1_09':           'Right Ridge',
    'EMC1_06':          'Left Ridge',
    'LHE_Desert_02':    'Gulch',
    'LHE_Desert_03':    'Oasis',
    'LHE_Desert_04':    'Canyon',
    'LHE_Desert_05':    'Peak',
    'LHE_Desert_06':    'RV Point',
    'MC1_11':           'Split',
    'MC1_31':           'Bridge',
    'PVP_desert_10':    'AFUITM',
};

// where to place the unit icons
const MAP_SPAWN_POINTS = {
    'C1_15': { // grasslands, done.
        def: [  { x: 25.1, y: 20.8 }, // unit 01
                { x: 38.6, y: 25.4 }, // unit 02
                { x: 49.8, y: 20.8 }, // unit 03
                { x: 62.0, y: 25.4 }, // unit 04
                { x: 75.0, y: 20.8 }  // unit 05
        ],
        att: [  { x: 50.0, y: 92.0 },
                { x: 62.0, y: 87.6 },
                { x: 75.0, y: 92.0 },
                { x: 87.2, y: 87.6 },
                { x: 87.4, y: 78.5 }
        ]
    },
    'C1_23': { // sniper's nest, done.
        def: [  { x: 62.7, y: 16.7 },
                { x: 62.7, y: 24.5 },
                { x: 74.7, y: 21.5 },
                { x: 87.4, y: 25.8 },
                { x: 87.4, y: 16.7 },
        ],
        att: [  { x: 25.2, y: 84.4 },
                { x: 25.2, y: 93.4 },
                { x: 37.8, y: 88.8 },
                { x: 50.2, y: 84.4 },
                { x: 50.2, y: 93.4 }
        ]
    },
    'C1_37': { // 3 bridges, done.
        def: [  { x: 12.7, y: 32.2 },
                { x: 25.1, y: 27.6 },
                { x: 50.0, y: 27.9 },
                { x: 62.5, y: 32.4 },
                { x: 75.0, y: 27.7 }
        ],
        att: [  { x: 12.7, y: 87.4 },
                { x: 25.1, y: 91.8 },
                { x: 37.8, y: 87.2 },
                { x: 74.7, y: 91.8 },
                { x: 87.2, y: 87.4 }
        ]
    },
    'C1_70': { // 5 pillars, done.
        def: [  { x: 12.9, y: 22.8 },
                { x: 25.1, y: 17.9 },
                { x: 50.0, y: 26.1 },
                { x: 74.7, y: 19.0 },
                { x: 87.4, y: 13.5 }
        ],
        att: [  { x: 12.9, y: 77.4 },
                { x: 25.4, y: 81.9 },
                { x: 50.0, y: 91.0 },
                { x: 75.0, y: 84.0 },
                { x: 87.2, y: 88.6 }
        ]
    },
    'CE2_06': { // deathleaper's cove, done.
        def: [  { x: 16.9, y: 17.1 },
                { x: 28.4, y: 13.0 },
                { x: 50.5, y: 13.1 },
                { x: 72.5, y: 13.0 },
                { x: 83.7, y: 17.4 }
        ],
        att: [  { x: 16.9, y: 78.0 },
                { x: 27.9, y: 82.2 },
                { x: 39.1, y: 86.3 },
                { x: 61.3, y: 86.5 },
                { x: 72.7, y: 82.2 }
        ]
    },
    'EC1_09': { //  right ridge, done.
        def: [  { x: 25.4, y: 21.7 },
                { x: 37.8, y: 25.4 },
                { x: 50.0, y: 20.6 },
                { x: 62.5, y: 24.7 },
                { x: 75.0, y: 29.0 }
        ],
        att: [  { x: 24.9, y: 92.9 },
                { x: 37.6, y: 88.5 },
                { x: 50.0, y: 92.9 },
                { x: 62.3, y: 88.3 },
                { x: 74.7, y: 83.1 }
        ]
    },
    
    'EMC1_06': { // left ridge, done.
        def: [  { x: 25.9, y: 17.6 },
                { x: 38.1, y: 13.1 },
                { x: 62.8, y: 13.7 },
                { x: 74.5, y: 18.5 },
                { x: 50.3, y: 18.3 }
        ],
        att: [  { x: 12.9, y: 77.1 },
                { x: 25.4, y: 72.4 },
                { x: 50.0, y: 81.7 },
                { x: 62.5, y: 86.1 },
                { x: 87.2, y: 86.1 }
        ]
    },
    'LHE_Desert_02': { // gulch, done.
        def: [  { x: 25.5, y: 19.0 },
                { x: 37.5, y: 14.5 },
                { x: 50.0, y: 19.0 }, 
                { x: 62.7, y: 14.5 },
                { x: 74.7, y: 19.0 }
        ],
        att: [  { x: 25.5, y: 81.9 },
                { x: 37.5, y: 77.4 },
                { x: 50.0, y: 81.9 },
                { x: 62.7, y: 77.4 },
                { x: 74.7, y: 81.9 }
        ]
    },
    'LHE_Desert_03': { // oasis, done.
        def: [  { x: 74.7, y: 27.7 },
                { x: 87.4, y: 21.7 },
                { x: 74.7, y: 18.7 },
                { x: 25.0, y: 30.8 },
                { x: 12.7, y: 35.2 }
        ],
        att: [  { x: 25.0, y: 83.3 },
                { x: 25.0, y: 92.2 },
                { x: 37.6, y: 87.9 },
                { x: 61.8, y: 90.8 },
                { x: 74.7, y: 95.4 }
        ]
    },
    'LHE_Desert_04': { // canyon, done.
        def: [  { x: 62.5, y: 22.8 },
                { x: 49.9, y: 28.6 },
                { x: 49.9, y: 19.4 },
                { x: 37.6, y: 24.4 },
                { x: 74.7, y: 37.5 }
        ],
        att: [  { x: 24.9, y: 94.3 },
                { x: 37.8, y: 89.9 },
                { x: 49.8, y: 85.3 },
                { x: 62.5, y: 89.9 },
                { x: 74.2, y: 94.3 }
        ]
    },
    'LHE_Desert_05': { // peak, done.
        def: [  { x: 87.4, y: 34.2 },
                { x: 50.5, y: 19.7 },
                { x: 75.0, y: 21.7 },
                { x: 62.8, y: 25.2 },
                { x: 87.4, y: 24.2 }
        ],
        att: [  { x: 12.9, y: 78.3 },
                { x: 25.4, y: 84.0 },
                { x: 37.8, y: 79.4 },
                { x: 37.8, y: 88.5 },
                { x: 75.0, y: 83.8 }
        ]
    },
    'LHE_Desert_06': { // rv point, done.
        def: [  { x: 87.6, y: 22.6 },
                { x: 75.2, y: 19.4 },
                { x: 62.5, y: 23.8 },
                { x: 37.9, y: 22.8 },
                { x: 50.2, y: 17.9 }
        ],
        att: [  { x: 37.9, y: 87.2 },
                { x: 50.2, y: 83.8 },
                { x: 62.5, y: 88.5 },
                { x: 75.2, y: 83.8 },
                { x: 87.6, y: 88.5 }
        ]
    },
    'MC1_11': { // split, done.
        def: [  { x: 87.4, y: 15.5 },
                { x: 87.4, y: 23.8 },
                { x: 87.4, y: 87.6 },
                { x: 87.4, y: 77.1 },
                { x: 87.4, y: 42.0 }
        ],
        att: [  { x: 12.9, y: 14.6 },
                { x: 12.9, y: 23.8 },
                { x: 12.9, y: 40.7 },
                { x: 12.9, y: 78.5 },
                { x: 12.9, y: 88.6 }
        ]
    },
    'MC1_31': { // bridge, done.
        def: [  { x: 37.8, y: 22.9 },
                { x: 50.3, y: 18.1 },
                { x: 75.0, y: 26.7 },
                { x: 74.7, y: 18.7 },
                { x: 62.5, y: 13.7 }
        ],
        att: [  { x: 25.6, y: 73.5 },
                { x: 37.8, y: 78.0 },
                { x: 49.8, y: 82.6 },
                { x: 62.5, y: 77.6 },
                { x: 74.7, y: 82.1 }
        ]
    },
    'PVP_desert_10': { // clown face, done.
        def: [  { x: 16.9, y: 13.0 },
                { x: 39.1, y: 13.0 },
                { x: 49.8, y: 16.9 },
                { x: 72.0, y: 17.1 },
                { x: 83.2, y: 12.8 }
        ],
        att: [  { x: 16.9, y: 68.9 },
                { x: 27.6, y: 65.0 },
                { x: 50.0, y: 81.2 },
                { x: 72.0, y: 89.2 },
                { x: 82.9, y: 85.1 }
        ]
    },
};

// guild war seasons by time range. allows automatic tile to map detection.
// get from https://lpzie2.github.io/tacticus-gw-tile-mapping/
const WAR_SCHEDULE = [
    { startDate: 1774431000000, endDate: 1774818000000, season: 22, battle: 1 },
    { startDate: 1774819800000, endDate: 1775034000000, season: 22, battle: 2 },
    { startDate: 1775035800000, endDate: 1775250000000, season: 22, battle: 3 },
    { startDate: 1775251800000, endDate: 1775466000000, season: 22, battle: 4 },
    { startDate: 1775467800000, endDate: 1775682000000, season: 22, battle: 5 },
    { startDate: 1775683800000, endDate: 1775898000000, season: 22, battle: 6 },
    { startDate: 1777455000000, endDate: 1777842000000, season: 23, battle: 1 },
    { startDate: 1777843800000, endDate: 1778058000000, season: 23, battle: 2 },
    { startDate: 1778059800000, endDate: 1778274000000, season: 23, battle: 3 },
    { startDate: 1778275800000, endDate: 1778490000000, season: 23, battle: 4 },
    { startDate: 1778491800000, endDate: 1778706000000, season: 23, battle: 5 },
    { startDate: 1778707800000, endDate: 1778922000000, season: 23, battle: 6 },
];


// guild war tile-to-map mapping.
// get from https://lpzie2.github.io/tacticus-gw-tile-mapping/
const SEASON_MAPS = {
    '22.4': {
        'Trenches1':            'LHE_Desert_05',
        'Trenches2':            'C1_15',
        'Trenches3':            'C1_23',
        'HQ':                   'EC1_09',
        'ArtilleryPosition1':   'PVP_desert_10',
        'ArtilleryPosition2':   'LHE_Desert_02',
        'AntiAirBattery1':      'LHE_Desert_06',
        'AntiAirBattery2':      'EMC1_06',
        'Armoury':              'LHE_Desert_04',
        'Bunker1':              'MC1_31',
        'Bunker2':              'MC1_11',
        'SupplyDepot':          'CE2_06',
        'MedicaeStation1':      'C1_70',
        'MedicaeStation2':      'LHE_Desert_03',
        'ComsStation':          'C1_37'
    },
    '22.5': {
        "Trenches1":            "EMC1_06",
        "Trenches2":            "LHE_Desert_04",
        "Trenches3":            "LHE_Desert_05",
        "HQ":                   "MC1_11",
        "ArtilleryPosition1":   "C1_37",
        "ArtilleryPosition2":   "EC1_09",
        "AntiAirBattery1":      "C1_23",
        "AntiAirBattery2":      "CE2_06",
        "Armoury":              "LHE_Desert_02",
        "Bunker1":              "C1_70",
        "Bunker2":              "PVP_desert_10",
        "SupplyDepot":          "MC1_31",
        "MedicaeStation1":      "C1_15",
        "MedicaeStation2":      "LHE_Desert_03",
        "ComsStation":          "LHE_Desert_06"
    },
    '22.6': {
        "Trenches1":            "C1_70",
        "Trenches2":            "EC1_09",
        "Trenches3":            "MC1_11",
        "HQ":                   "LHE_Desert_04",
        "ArtilleryPosition1":   "C1_23",
        "ArtilleryPosition2":   "EMC1_06",
        "AntiAirBattery1":      "LHE_Desert_05",
        "AntiAirBattery2":      "C1_37",
        "Armoury":              "C1_15",
        "Bunker1":              "CE2_06",
        "Bunker2":              "MC1_31",
        "SupplyDepot":          "LHE_Desert_06",
        "MedicaeStation1":      "PVP_desert_10",
        "MedicaeStation2":      "LHE_Desert_02",
        "ComsStation":          "LHE_Desert_03"
    },
    '23.1': {
        "Trenches1":            "LHE_Desert_06",
        "Trenches2":            "CE2_06",
        "Trenches3":            "MC1_11",
        "HQ":                   "LHE_Desert_02",
        "ArtilleryPosition1":   "C1_37",
        "ArtilleryPosition2":   "LHE_Desert_04",
        "AntiAirBattery1":      "EMC1_06",
        "AntiAirBattery2":      "LHE_Desert_03",
        "Armoury":              "C1_23",
        "Bunker1":              "MC1_31",
        "Bunker2":              "C1_70",
        "SupplyDepot":          "C1_15",
        "MedicaeStation1":      "LHE_Desert_05",
        "MedicaeStation2":      "PVP_desert_10",
        "ComsStation":          "EC1_09"
    },
    '23.2': {
        "Trenches1":            "C1_37",
        "Trenches2":            "PVP_desert_10",
        "Trenches3":            "MC1_11",
        "HQ":                   "C1_70",
        "ArtilleryPosition1":   "C1_15",
        "ArtilleryPosition2":   "LHE_Desert_05",
        "AntiAirBattery1":      "MC1_31",
        "AntiAirBattery2":      "LHE_Desert_02",
        "Armoury":              "C1_23",
        "Bunker1":              "LHE_Desert_04",
        "Bunker2":              "LHE_Desert_03",
        "SupplyDepot":          "CE2_06",
        "MedicaeStation1":      "EC1_09",
        "MedicaeStation2":      "EMC1_06",
        "ComsStation":          "LHE_Desert_06"
    },
    '23.3': {
        "Trenches1":            "LHE_Desert_02",
        "Trenches2":            "C1_23",
        "Trenches3":            "LHE_Desert_05",
        "HQ":                   "C1_37",
        "ArtilleryPosition1":   "LHE_Desert_06",
        "ArtilleryPosition2":   "EC1_09",
        "AntiAirBattery1":      "LHE_Desert_04",
        "AntiAirBattery2":      "C1_15",
        "Armoury":              "CE2_06",
        "Bunker1":              "C1_70",
        "Bunker2":              "MC1_31",
        "SupplyDepot":          "EMC1_06",
        "MedicaeStation1":      "LHE_Desert_03",
        "MedicaeStation2":      "PVP_desert_10",
        "ComsStation":          "MC1_11"
    },
    '23.4': {
        "Trenches1":            "C1_23",
        "Trenches2":            "PVP_desert_10",
        "Trenches3":            "EC1_09",
        "HQ":                   "C1_70",
        "ArtilleryPosition1":   "MC1_11",
        "ArtilleryPosition2":   "LHE_Desert_02",
        "AntiAirBattery1":      "C1_15",
        "AntiAirBattery2":      "CE2_06",
        "Armoury":              "MC1_31",
        "Bunker1":              "LHE_Desert_06",
        "Bunker2":              "LHE_Desert_05",
        "SupplyDepot":          "LHE_Desert_03",
        "MedicaeStation1":      "EMC1_06",
        "MedicaeStation2":      "LHE_Desert_04",
        "ComsStation":          "C1_37"
    }
};