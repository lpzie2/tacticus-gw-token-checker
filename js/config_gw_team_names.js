// TODO: add more to this as it becomes important.
// note: make sure to order them from more specific to least; order matters!
// note: numbers at the end will be ignored when counting the teams.
// null in the requiredMOW slot means any mow is fine

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
    "CRIMJ": {
        metaTeam: "GSC",
        requiredUnits: ["genesPrimus", "genesKelermorph", "tauCrisis", "adeptCelestine", "bloodMephiston"],
        requiredMOW: null
    },
    "CRImJ": {
        metaTeam: "GSC",
        requiredUnits: ["genesPrimus", "genesKelermorph", "tauCrisis", "adeptCelestine", "bloodIntercessor"],
        requiredMOW: null
    },
    "RIMmJ": {
        metaTeam: "GSC",
        requiredUnits: ["genesPrimus", "genesKelermorph", "tauCrisis", "bloodMephiston", "bloodIntercessor"],
        requiredMOW: null
    },
    "CRILJ": {
        metaTeam: "GSC",
        requiredUnits: ["genesPrimus", "genesKelermorph", "tauCrisis", "adeptCelestine", "emperLucius"],
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
    "Overwatch Hell [JkT]": {
        metaTeam: "Overwatch",
        requiredUnits: ["ultraCalgar", "templChampion", "eldarMauganRa", "eldarRanger", "astraOrdnance"],
        requiredMOW: null
    },
    "Overwatch Hell Alt 1 [JkT]": {
        metaTeam: "Overwatch",
        requiredUnits: ["ultraCalgar", "templChampion", "admecDestroyer", "eldarRanger", "astraOrdnance"],
        requiredMOW: null
    },
    "Overwatch Hell Alt 2 [JkT]": {
        metaTeam: "Overwatch",
        requiredUnits: ["ultraCalgar", "darkaCompanion", "eldarMauganRa", "eldarRanger", "astraOrdnance"],
        requiredMOW: null
    },
    "Overwatch Hell Alt 3 [JkT]": {
        metaTeam: "Overwatch",
        requiredUnits: ["ultraCalgar", "darkaCompanion", "admecDestroyer", "eldarRanger", "astraOrdnance"],
        requiredMOW: null
    },
    "Friendly Fire": {
        metaTeam: "Astra Mil.",
        requiredUnits: ["adeptCelestine", "astraYarrick", "adeptHospitaller", "astraDreir", "adeptRetributor"],
        requiredMOW: null
    },
    "Beefy Chaos w/ Spice": {
        metaTeam: "Terminator",
        requiredUnits: ["blackTerminator", "blackAbaddon", "deathBlightbringer", "worldKharn", "worldTerminator"],
        requiredMOW: null
    },
    "S-Tier Death Guard": {
        metaTeam: "Death Guard",
        requiredUnits: ["deathBlightlord", "deathRotbone", "blackAbaddon", "emperLucius", "blackObliterator"],
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
    "Basic Overwatch Hell [JkT]": {
        metaTeam: "Overwatch",
        requiredUnits: ["ultraCalgar", "eldarMauganRa", "eldarRanger"],
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
    "Babby's First Double Howl": {
        metaTeam: "Howl",
        requiredUnits: ["spaceBlackmane", "tauAunShi", "worldKharn"],
        requiredMOW: null
    },
    "Standard Double Howl": {
        metaTeam: "Howl",
        requiredUnits: ["spaceBlackmane", "tauAunShi", "custoBladeChampion"],
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