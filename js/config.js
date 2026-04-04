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

const GW_DURATION_HOURS = 35;

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
        text:        '#2c2c2c',
        textMuted:   '#5e5e5e',
        win:         '#4cec86',
        loss:        '#e45858',
        cleanup:     '#fbbf24',
        dead:        '#e45858',
        didNotFight: '#555555',
        token:       '#a1a1a1',
        hpHigh:      '#4cec86',
        hpMid:       '#fbbf24',
        hpLow:       '#e45858',
        vs:          '#555555',
    },
    uncommon: {
        bg:          'color-mix(in srgb, #8f6930 70%, #1a1a1a)',
        border:      '#8f6930',
        text:        '#fcfcfc',
        textMuted:   '#d6d6d6',
        win:         '#4cec86',
        loss:        '#ce4343',
        cleanup:     '#fbbf24',
        dead:        '#e23030',
        didNotFight: '#dddddd',
        token:       '#d8c620',
        hpHigh:      '#4cec86',
        hpMid:       '#fbbf24',
        hpLow:       '#e45858',
        vs:          '#e0e0e0',
    },
    rare: {
        bg:          'color-mix(in srgb, #ffffff 70%, #1a1a1a)',
        border:      '#ffffff',
        text:        '#0f0f0f',
        textMuted:   '#252525',
        win:         '#2d8d50',
        loss:        '#bd5555',
        cleanup:     '#886e2c',
        dead:        '#bd4747',
        didNotFight: '#444444',
        token:       '#ffffff',
        hpHigh:      '#4cec86',
        hpMid:       '#fbbf24',
        hpLow:       '#e45858',
        vs:          '#444444',
    },
    epic: {
        bg:          'color-mix(in srgb, #fffd6e 60%, #1a1a1a)',
        border:      '#fffd6e',
        text:        '#141414',
        textMuted:   '#2e2e2e',
        win:         '#29864b',
        loss:        '#e45858',
        cleanup:     '#947014',
        dead:        '#bd4747',
        didNotFight: '#4a4a20',
        token:       '#63600e',
        hpHigh:      '#4cec86',
        hpMid:       '#fbbf24',
        hpLow:       '#e45858',
        vs:          '#4a4a20',
    },
    legendary: {
        bg:          'color-mix(in srgb, #3be8ff 60%, #1a1a1a)',
        border:      '#3be8ff',
        text:        '#b6f6ff',
        textMuted:   '#85efff',
        win:         '#7bffac',
        loss:        '#e45858',
        cleanup:     '#fbbf24',
        dead:        '#b84444',
        didNotFight: '#1a4a4a',
        token:       '#ffdb3c',
        hpHigh:      '#4cec86',
        hpMid:       '#fbbf24',
        hpLow:       '#e45858',
        vs:          '#1a4a4a',
    },
    mythic: {
        bg:          'color-mix(in srgb, #ff4800 60%, #1a1a1a)',
        border:      '#ff4800',
        text:        '#ffe3d8',
        textMuted:   '#ffc0ad',
        win:         '#4cec86',
        loss:        '#ff5555',
        cleanup:     '#fbbf24',
        dead:        '#fd7474',
        didNotFight: '#4a2010',
        token:       '#ffdb3c',
        hpHigh:      '#4cec86',
        hpMid:       '#fbbf24',
        hpLow:       '#e45858',
        vs:          '#4a2010',
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
    '0medToughTeam':        0.10,
    'weightsPerformance':   0.67,
    'weightsScore':         0.33
};

const PERFORMANCE_TOUGH_MAPS = [
    'MC1_31', 'EC1_09', 'LHE_Desert_03', 'C1_70', 'MC1_11'
];

// TODO: add more to this as it becomes important.
// note: make sure to order them from more specific to least; order matters!
// note: numbers at the end will be ignored when counting the teams.
// null means any mow is fine
const TEAM_META_DEFINITIONS = {

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
    "Judh Going Solo": {
        metaTeam: "GSC",
        requiredUnits: ["genesKelermorph", "custoVexilusPraetor", "eldarAutarch", "spaceWolfPriest", "genesMagus"],
        requiredMOW: "darkaStormSpeeder"
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

    "Basic Death Guard": {
        metaTeam: "Death Guard",
        requiredUnits: ["deathBlightlord", "deathRotbone"],
        requiredMOW: null
    },
    "Basic Double Howl": {
        metaTeam: "Howl",
        requiredUnits: ["spaceBlackmane", "tauAunShi"],
        requiredMOW: null
    },
    "Single Howl": {
        metaTeam: "Howl",
        requiredUnits: ["spaceBlackmane", "worldKharn"],
        requiredMOW: null
    },
    "Basic Orks": {
        metaTeam: "Waarg!",
        requiredUnits: ["orksWarboss", "orksRuntherd"],
        requiredMOW: null
    },

    // 1 man teams (very risky to put units here, will mask a lot of different teams.)
    "Sad Single Howl": {
        metaTeam: "Howl",
        requiredUnits: ["spaceBlackmane"],
        requiredMOW: null
    }
};