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

const INITIAL_TOKENS = 10

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