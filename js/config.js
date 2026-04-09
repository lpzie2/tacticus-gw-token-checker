const DEV_MODE = false; // hides a few tools that i used to place icons on maps.

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
    '2medWin4':     3.00,
    '2medWin3':     3.00,
    '2medWin2':     3.00,
    '2medWin1':     3.00,
    '2medWin0':     3.00,
    '2medCleanup':  2.00,
    '2medLoss':     1.00,
    '1medWin5':     2.75,
    '1medWin4':     2.75,
    '1medWin3':     2.75,
    '1medWin2':     2.75,
    '1medWin1':     2.75,
    '1medWin0':     2.75,
    '1medCleanup':  1.75,
    '1medLoss':     1.00,
    '0medWin5':     2.50,
    '0medWin4':     2.50,
    '0medWin3':     2.50,
    '0medWin2':     2.50,
    '0medWin1':     2.50,
    '0medWin0':     2.50,
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

const PERFORMANCE_WEIGHTS = {
    'weightsPerformance':   0.67,
    'weightsScore':         0.33
};

const PERFORMANCE_TOUGH_MAPS = [
    'MC1_31', 'EC1_09', 'LHE_Desert_03', 'C1_70', 'MC1_11'
];

const PERFORMANCE_TOUGH_LINES = {
    'GSC_01':   ['genesPrimus', 'genesKelermorph'],
    'DG_01':    ['deathRotbone']
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
    "Perfect Orks": {
        metaTeam: "Waarg!",
        requiredUnits: ["orksWarboss", "orksRuntherd", "orksBigmek", "orksKillaKan", "orksNob"],
        requiredMOW: null
    },
    "BT Orks": {
        metaTeam: "Waarg!",
        requiredUnits: ["orksWarboss", "orksRuntherd", "orksBigmek", "templChampion", "templSwordBrother"],
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
        metaTeam: "Mechanical",
        requiredUnits: ["orksWarboss", "orksRuntherd", "orksBigmek"],
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
    'C1_15': {
        def: [  { x: 35.0, y: 24.5 }, // unit 01
                { x: 42.5, y: 29.0 }, // unit 02
                { x: 50.0, y: 24.5 }, // unit 03
                { x: 57.5, y: 29.0 }, // unit 04
                { x: 65.0, y: 24.5 }  // unit 05
        ],
        att: [  { x: 50.1, y: 85.9 },
                { x: 57.1, y: 82.5 },
                { x: 64.8, y: 86.3 },
                { x: 72.1, y: 81.8 },
                { x: 72.1, y: 74.1 },
        ]
    },
    'C1_23': {
        def: [  { x: 57.6, y: 27.7 },
                { x: 58.3, y: 21.3 },
                { x: 64.8, y: 24.8 },
                { x: 73.0, y: 28.7 },
                { x: 73.0, y: 20.2 }
        ],
        att: [  { x: 35.3, y: 77.9 },
                { x: 35.5, y: 85.2 },
                { x: 42.3, y: 83.4 },
                { x: 49.9, y: 78.9 },
                { x: 49.4, y: 87.1 }
        ]
    },
    'C1_37': {
        def: [  { x: 27.6, y: 34.8 },
                { x: 34.8, y: 30.9 },
                { x: 49.9, y: 30.4 },
                { x: 57.4, y: 34.5 },
                { x: 64.4, y: 30.7 }
        ],
        att: [  { x: 27.1, y: 82.1 },
                { x: 34.6, y: 86.1 },
                { x: 42.6, y: 82.0 },
                { x: 65.3, y: 85.7 },
                { x: 72.4, y: 81.4 }
        ]
    },
    'C1_70': {
        def: [  { x: 27.4, y: 26.6 },
                { x: 35.1, y: 23.4 },
                { x: 50.3, y: 29.8 },
                { x: 64.9, y: 23.8 },
                { x: 72.4, y: 19.1 }
        ],
        att: [  { x: 27.4, y: 73.4 },
                { x: 34.9, y: 77.7 },
                { x: 50.3, y: 85.0 },
                { x: 65.3, y: 79.3 },
                { x: 71.4, y: 82.9 }
        ]
    },
    'CE2_06': {
        def: [  { x: 30.3, y: 23.0 },
                { x: 36.9, y: 19.5 },
                { x: 51.0, y: 20.7 },
                { x: 64.4, y: 18.9 },
                { x: 70.3, y: 22.7 }
        ],
        att: [  { x: 30.3, y: 72.5 },
                { x: 36.9, y: 77.5 },
                { x: 44.0, y: 81.6 },
                { x: 58.1, y: 81.4 },
                { x: 63.9, y: 77.0 }
        ]
    },
    'EC1_09': {
        def: [  { x: 35.3, y: 25.7 },
                { x: 42.4, y: 29.1 },
                { x: 49.9, y: 24.6 },
                { x: 57.4, y: 28.2 },
                { x: 65.3, y: 32.5 }
        ],
        att: [  { x: 35.3, y: 86.4 },
                { x: 42.4, y: 82.3 },
                { x: 51.5, y: 87.7 },
                { x: 58.1, y: 82.7 },
                { x: 65.1, y: 78.4 }
        ]
    },
    
    'EMC1_06': {
        def: [  { x: 35.8, y: 22.5 },
                { x: 43.1, y: 18.2 },
                { x: 57.6, y: 19.3 },
                { x: 65.3, y: 22.5 },
                { x: 49.8, y: 22.9 }
        ],
        att: [  { x: 27.4, y: 73.2 },
                { x: 34.8, y: 69.1 },
                { x: 50.1, y: 77.3 },
                { x: 57.4, y: 81.4 },
                { x: 72.6, y: 81.1 }
        ]
    },
    'LHE_Desert_02': {
        def: [  { x: 34.9, y: 25.2 },
                { x: 42.4, y: 20.0 },
                { x: 50.3, y: 23.2 },
                { x: 57.4, y: 19.8 },
                { x: 64.6, y: 24.8 }
        ],
        att: [  { x: 35.1, y: 78.0 },
                { x: 42.3, y: 73.6 },
                { x: 49.2, y: 79.3 },
                { x: 57.1, y: 74.1 },
                { x: 65.1, y: 77.3 }
        ]
    },
    'LHE_Desert_03': {
        def: [  { x: 65.1, y: 30.7 },
                { x: 72.6, y: 25.9 },
                { x: 65.1, y: 22.9 },
                { x: 34.8, y: 33.2 },
                { x: 28.3, y: 36.8 }
        ],
        att: [  { x: 36.0, y: 78.4 },
                { x: 41.4, y: 83.0 },
                { x: 35.8, y: 87.3 },
                { x: 57.6, y: 83.4 },
                { x: 66.4, y: 87.5 }
        ]
    },
    'LHE_Desert_04': {
        def: [  { x: 57.4, y: 26.8 },
                { x: 49.8, y: 30.7 },
                { x: 49.9, y: 23.4 },
                { x: 43.7, y: 26.6 },
                { x: 64.9, y: 39.6 }
        ],
        att: [  { x: 49.8, y: 78.9 },
                { x: 43.0, y: 83.4 },
                { x: 37.4, y: 86.6 },
                { x: 57.1, y: 81.8 },
                { x: 63.1, y: 85.9 }
        ]
    },
    'LHE_Desert_05': {
        def: [  { x: 72.8, y: 37.0 },
                { x: 49.9, y: 25.0 },
                { x: 64.2, y: 25.9 },
                { x: 57.1, y: 28.7 },
                { x: 72.6, y: 28.2 }
        ],
        att: [  { x: 27.3, y: 73.9 },
                { x: 34.4, y: 78.4 },
                { x: 42.3, y: 73.4 },
                { x: 42.1, y: 82.3 },
                { x: 65.3, y: 78.8 }
        ]
    },
    'LHE_Desert_06': {
        def: [  { x: 72.6, y: 27.0 },
                { x: 64.9, y: 23.8 },
                { x: 57.4, y: 27.5 },
                { x: 42.3, y: 26.3 },
                { x: 49.9, y: 22.7 }
        ],
        att: [  { x: 42.6, y: 82.5 },
                { x: 49.8, y: 78.2 },
                { x: 57.4, y: 82.7 },
                { x: 65.1, y: 78.9 },
                { x: 72.8, y: 82.1 }
        ]
    },
    'MC1_11': {
        def: [  { x: 72.1, y: 21.1 },
                { x: 72.3, y: 29.5 },
                { x: 72.1, y: 81.8 },
                { x: 72.6, y: 73.2 },
                { x: 72.1, y: 43.0 }
        ],
        att: [  { x: 28.5, y: 19.3 },
                { x: 27.3, y: 26.8 },
                { x: 27.3, y: 42.3 },
                { x: 27.1, y: 74.5 },
                { x: 28.5, y: 83.6 }
        ]
    },
    'MC1_31': {
        def: [  { x: 42.3, y: 27.3 },
                { x: 49.8, y: 23.2 },
                { x: 64.9, y: 29.8 },
                { x: 64.9, y: 23.0 },
                { x: 57.3, y: 19.1 }
        ],
        att: [  { x: 35.3, y: 70.5 },
                { x: 43.0, y: 73.9 },
                { x: 50.5, y: 77.9 },
                { x: 57.4, y: 73.6 },
                { x: 64.9, y: 76.6 }
        ]
    },
    'PVP_desert_10': {
        def: [  { x: 30.3, y: 16.6 },
                { x: 43.1, y: 17.7 },
                { x: 49.9, y: 21.6 },
                { x: 63.5, y: 22.3 },
                { x: 69.8, y: 18.6 }
        ],
        att: [  { x: 29.2, y: 68.2 },
                { x: 36.2, y: 64.1 },
                { x: 49.2, y: 77.3 },
                { x: 63.9, y: 85.4 },
                { x: 69.9, y: 81.3 }
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
    }
};