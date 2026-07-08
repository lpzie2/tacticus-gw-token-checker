// since the rarity of a tile can change between seasons, we must 
//  keep track of this list on a per season basis.

// since i started this project, the tiles have been static. but i need
//  to go back and document previous seasons too.  

const TILE_RARITY = {
    '22': {
        '1': {
            'HQ':                   'RRUUU',
            'Bunker1':              'RRUUU',
            'Bunker2':              'RRUUU',
            'AntiAirBattery1':      'RRUUU',
            'AntiAirBattery2':      'RRUUU',
            'Armoury':              'RRUUU',
            'Garrison1':            'RRUUU',
            'Garrison2':            'RRUUU',
            'LandingPad':           'RRUUU',
            'WarpRift':             'RRUUU',
            'SupplyDepot':          'RRUUU',
            'MedicaeStation1':      'RRUUU',
            'MedicaeStation2':      'RRUUU',
            'ComsStation':          'RRUUU',
            'ArtilleryPosition1':   'RRUUU',
            'ArtilleryPosition2':   'RRUUU',
            'Trenches1':            'RRUUU',
            'Trenches2':            'RRUUU',
            'Trenches3':            'RRUUU',
        },
        '2': {
            'HQ':                   'EERRR',
            'Bunker1':              'EERRR',
            'Bunker2':              'EERRR',
            'AntiAirBattery1':      'EERRR',
            'AntiAirBattery2':      'EERRR',
            'Armoury':              'EERRR',
            'Garrison1':            'EERRR', // from wiki.
            'Garrison2':            'EERRR', // from wiki.
            'LandingPad':           'EERRR', // from wiki.
            'WarpRift':             'EERRR',
            'SupplyDepot':          'RRUUU',
            'MedicaeStation1':      'RRUUU',
            'MedicaeStation2':      'RRUUU',
            'ComsStation':          'RRUUU', // wiki says EERRR, 23.6 data says RRUUU.
            'ArtilleryPosition1':   'RRUUU',
            'ArtilleryPosition2':   'RRUUU',
            'Trenches1':            'RRUUU',
            'Trenches2':            'RRUUU',
            'Trenches3':            'RRUUU',
        },
        '3': {
            'HQ':                   'LLEEE',
            'Bunker1':              'LLEEE',
            'Bunker2':              'LLEEE',
            'AntiAirBattery1':      'EERRR',
            'AntiAirBattery2':      'EERRR',
            'Armoury':              'EERRR',
            'Garrison1':            'EERRR', // from wiki.
            'Garrison2':            'EERRR', // from wiki.
            'LandingPad':           'EERRR', // from wiki.
            'WarpRift':             'EERRR', // from wiki.
            'SupplyDepot':          'EERRR',
            'MedicaeStation1':      'EERRR',
            'MedicaeStation2':      'EERRR',
            'ComsStation':          'RRUUU',
            'ArtilleryPosition1':   'RRUUU',
            'ArtilleryPosition2':   'RRUUU',
            'Trenches1':            'RRUUU',
            'Trenches2':            'RRUUU',
            'Trenches3':            'RRUUU',
        },
        '4': {
            'HQ':                   'LLEEE',
            'Bunker1':              'LLEEE',
            'Bunker2':              'LLEEE',
            'AntiAirBattery1':      'LLEEE',
            'AntiAirBattery2':      'LLEEE',
            'Armoury':              'LLEEE',
            'Garrison1':            'LLEEE', // from wiki.
            'Garrison2':            'LLEEE', // from wiki.
            'LandingPad':           'LLEEE', // from wiki.
            'WarpRift':             'EERRR', // from wiki.
            'SupplyDepot':          'EERRR',
            'MedicaeStation1':      'EERRR',
            'MedicaeStation2':      'EERRR',
            'ComsStation':          'EERRR',
            'ArtilleryPosition1':   'EERRR',
            'ArtilleryPosition2':   'EERRR',
            'Trenches1':            'EERRR',
            'Trenches2':            'EERRR',
            'Trenches3':            'EERRR',
        },
        '5': {
            'HQ':                   'MMLLL',
            'Bunker1':              'MMLLL',
            'Bunker2':              'MMLLL',
            'AntiAirBattery1':      'LLEEE',
            'AntiAirBattery2':      'LLEEE',
            'Armoury':              'LLEEE',
            'Garrison1':            'LLEEE', // from wiki.
            'Garrison2':            'LLEEE', // from wiki.
            'LandingPad':           'LLEEE', // from wiki.
            'WarpRift':             'LLEEE', // from wiki.
            'SupplyDepot':          'LLEEE',
            'MedicaeStation1':      'LLEEE',
            'MedicaeStation2':      'LLEEE',
            'ComsStation':          'EERRR',
            'ArtilleryPosition1':   'EERRR',
            'ArtilleryPosition2':   'EERRR',
            'Trenches1':            'EERRR',
            'Trenches2':            'EERRR',
            'Trenches3':            'EERRR',
        },
    },
    '23': {
        '1': {
            'HQ':                   'RRUUU',
            'Bunker1':              'RRUUU',
            'Bunker2':              'RRUUU',
            'AntiAirBattery1':      'RRUUU',
            'AntiAirBattery2':      'RRUUU',
            'Armoury':              'RRUUU',
            'Garrison1':            'RRUUU',
            'Garrison2':            'RRUUU',
            'LandingPad':           'RRUUU',
            'WarpRift':             'RRUUU',
            'SupplyDepot':          'RRUUU',
            'MedicaeStation1':      'RRUUU',
            'MedicaeStation2':      'RRUUU',
            'ComsStation':          'RRUUU',
            'ArtilleryPosition1':   'RRUUU',
            'ArtilleryPosition2':   'RRUUU',
            'Trenches1':            'RRUUU',
            'Trenches2':            'RRUUU',
            'Trenches3':            'RRUUU',
        },
        '2': {
            'HQ':                   'EERRR',
            'Bunker1':              'EERRR',
            'Bunker2':              'EERRR',
            'AntiAirBattery1':      'EERRR',
            'AntiAirBattery2':      'EERRR',
            'Armoury':              'EERRR',
            'Garrison1':            'EERRR', // from wiki.
            'Garrison2':            'EERRR', // from wiki.
            'LandingPad':           'EERRR', // from wiki.
            'WarpRift':             'EERRR',
            'SupplyDepot':          'RRUUU',
            'MedicaeStation1':      'RRUUU',
            'MedicaeStation2':      'RRUUU',
            'ComsStation':          'RRUUU', // wiki says EERRR, 23.6 data says RRUUU.
            'ArtilleryPosition1':   'RRUUU',
            'ArtilleryPosition2':   'RRUUU',
            'Trenches1':            'RRUUU',
            'Trenches2':            'RRUUU',
            'Trenches3':            'RRUUU',
        },
        '3': {
            'HQ':                   'LLEEE',
            'Bunker1':              'LLEEE',
            'Bunker2':              'LLEEE',
            'AntiAirBattery1':      'EERRR',
            'AntiAirBattery2':      'EERRR',
            'Armoury':              'EERRR',
            'Garrison1':            'EERRR', // from wiki.
            'Garrison2':            'EERRR', // from wiki.
            'LandingPad':           'EERRR', // from wiki.
            'WarpRift':             'EERRR', // from wiki.
            'SupplyDepot':          'EERRR',
            'MedicaeStation1':      'EERRR',
            'MedicaeStation2':      'EERRR',
            'ComsStation':          'RRUUU',
            'ArtilleryPosition1':   'RRUUU',
            'ArtilleryPosition2':   'RRUUU',
            'Trenches1':            'RRUUU',
            'Trenches2':            'RRUUU',
            'Trenches3':            'RRUUU',
        },
        '4': {
            'HQ':                   'LLEEE',
            'Bunker1':              'LLEEE',
            'Bunker2':              'LLEEE',
            'AntiAirBattery1':      'LLEEE',
            'AntiAirBattery2':      'LLEEE',
            'Armoury':              'LLEEE',
            'Garrison1':            'LLEEE', // from wiki.
            'Garrison2':            'LLEEE', // from wiki.
            'LandingPad':           'LLEEE', // from wiki.
            'WarpRift':             'EERRR', // from wiki.
            'SupplyDepot':          'EERRR',
            'MedicaeStation1':      'EERRR',
            'MedicaeStation2':      'EERRR',
            'ComsStation':          'EERRR',
            'ArtilleryPosition1':   'EERRR',
            'ArtilleryPosition2':   'EERRR',
            'Trenches1':            'EERRR',
            'Trenches2':            'EERRR',
            'Trenches3':            'EERRR',
        },
        '5': {
            'HQ':                   'MMLLL',
            'Bunker1':              'MMLLL',
            'Bunker2':              'MMLLL',
            'AntiAirBattery1':      'LLEEE',
            'AntiAirBattery2':      'LLEEE',
            'Armoury':              'LLEEE',
            'Garrison1':            'LLEEE', // from wiki.
            'Garrison2':            'LLEEE', // from wiki.
            'LandingPad':           'LLEEE', // from wiki.
            'WarpRift':             'LLEEE', // from wiki.
            'SupplyDepot':          'LLEEE',
            'MedicaeStation1':      'LLEEE',
            'MedicaeStation2':      'LLEEE',
            'ComsStation':          'EERRR',
            'ArtilleryPosition1':   'EERRR',
            'ArtilleryPosition2':   'EERRR',
            'Trenches1':            'EERRR',
            'Trenches2':            'EERRR',
            'Trenches3':            'EERRR',
        },
    },
    '24': {
        '1': {
            'HQ':                   'RRUUU',
            'Bunker1':              'RRUUU',
            'Bunker2':              'RRUUU',
            'AntiAirBattery1':      'RRUUU',
            'AntiAirBattery2':      'RRUUU',
            'Armoury':              'RRUUU',
            'Garrison1':            'RRUUU',
            'Garrison2':            'RRUUU',
            'LandingPad':           'RRUUU',
            'WarpRift':             'RRUUU',
            'SupplyDepot':          'RRUUU',
            'MedicaeStation1':      'RRUUU',
            'MedicaeStation2':      'RRUUU',
            'ComsStation':          'RRUUU',
            'ArtilleryPosition1':   'RRUUU',
            'ArtilleryPosition2':   'RRUUU',
            'Trenches1':            'RRUUU',
            'Trenches2':            'RRUUU',
            'Trenches3':            'RRUUU',
        },
        '2': {
            'HQ':                   'EERRR',
            'Bunker1':              'EERRR',
            'Bunker2':              'EERRR',
            'AntiAirBattery1':      'EERRR',
            'AntiAirBattery2':      'EERRR',
            'Armoury':              'EERRR',
            'Garrison1':            'EERRR', // from wiki.
            'Garrison2':            'EERRR', // from wiki.
            'LandingPad':           'EERRR', // from wiki.
            'WarpRift':             'EERRR',
            'SupplyDepot':          'RRUUU',
            'MedicaeStation1':      'RRUUU',
            'MedicaeStation2':      'RRUUU',
            'ComsStation':          'RRUUU', // wiki says EERRR, 23.6 data says RRUUU.
            'ArtilleryPosition1':   'RRUUU',
            'ArtilleryPosition2':   'RRUUU',
            'Trenches1':            'RRUUU',
            'Trenches2':            'RRUUU',
            'Trenches3':            'RRUUU',
        },
        '3': {
            'HQ':                   'LLEEE',
            'Bunker1':              'LLEEE',
            'Bunker2':              'LLEEE',
            'AntiAirBattery1':      'EERRR',
            'AntiAirBattery2':      'EERRR',
            'Armoury':              'EERRR',
            'Garrison1':            'EERRR', // from wiki.
            'Garrison2':            'EERRR', // from wiki.
            'LandingPad':           'EERRR', // from wiki.
            'WarpRift':             'EERRR', // from wiki.
            'SupplyDepot':          'EERRR',
            'MedicaeStation1':      'EERRR',
            'MedicaeStation2':      'EERRR',
            'ComsStation':          'RRUUU',
            'ArtilleryPosition1':   'RRUUU',
            'ArtilleryPosition2':   'RRUUU',
            'Trenches1':            'RRUUU',
            'Trenches2':            'RRUUU',
            'Trenches3':            'RRUUU',
        },
        '4': {
            'HQ':                   'LLEEE',
            'Bunker1':              'LLEEE',
            'Bunker2':              'LLEEE',
            'AntiAirBattery1':      'LLEEE',
            'AntiAirBattery2':      'LLEEE',
            'Armoury':              'LLEEE',
            'Garrison1':            'LLEEE', // from wiki.
            'Garrison2':            'LLEEE', // from wiki.
            'LandingPad':           'LLEEE', // from wiki.
            'WarpRift':             'EERRR', // from wiki.
            'SupplyDepot':          'EERRR',
            'MedicaeStation1':      'EERRR',
            'MedicaeStation2':      'EERRR',
            'ComsStation':          'EERRR',
            'ArtilleryPosition1':   'EERRR',
            'ArtilleryPosition2':   'EERRR',
            'Trenches1':            'EERRR',
            'Trenches2':            'EERRR',
            'Trenches3':            'EERRR',
        },
        '5': {
            'HQ':                   'MMLLL',
            'Bunker1':              'MMLLL',
            'Bunker2':              'MMLLL',
            'AntiAirBattery1':      'LLEEE',
            'AntiAirBattery2':      'LLEEE',
            'Armoury':              'LLEEE',
            'Garrison1':            'LLEEE', // from wiki.
            'Garrison2':            'LLEEE', // from wiki.
            'LandingPad':           'LLEEE', // from wiki.
            'WarpRift':             'LLEEE', // from wiki.
            'SupplyDepot':          'LLEEE',
            'MedicaeStation1':      'LLEEE',
            'MedicaeStation2':      'LLEEE',
            'ComsStation':          'EERRR',
            'ArtilleryPosition1':   'EERRR',
            'ArtilleryPosition2':   'EERRR',
            'Trenches1':            'EERRR',
            'Trenches2':            'EERRR',
            'Trenches3':            'EERRR',
        },
    },
    '25': {
        '1': {
            'HQ':                   'RRUUU',
            'Bunker1':              'RRUUU',
            'Bunker2':              'RRUUU',
            'LandingPad1':          'RRUUU', // guess from s24 aa1
            'LandingPad2':          'RRUUU', // guess from s24 aa1
            'Armoury':              'RRUUU',
            'SupplyDepot':          'RRUUU',
            'MedicaeStation1':      'RRUUU',
            'MedicaeStation2':      'RRUUU',
            'AntiAirBattery':       'RRUUU', // guess from s24 vox
            'ArtilleryPosition1':   'RRUUU',
            'ArtilleryPosition2':   'RRUUU',
            'Trenches1':            'RRUUU',
            'Trenches2':            'RRUUU',
            'Trenches3':            'RRUUU',
        },
        '2': {
            'HQ':                   'EERRR',
            'Bunker1':              'EERRR',
            'Bunker2':              'EERRR',
            'LandingPad1':          'EERRR', // guess from aa1
            'LandingPad2':          'EERRR', // guess from aa2
            'Armoury':              'EERRR',
            'SupplyDepot':          'RRUUU',
            'MedicaeStation1':      'RRUUU',
            'MedicaeStation2':      'RRUUU',
            'AntiAirBattery':       'RRUUU', // guess from vox
            'ArtilleryPosition1':   'RRUUU',
            'ArtilleryPosition2':   'RRUUU',
            'Trenches1':            'RRUUU',
            'Trenches2':            'RRUUU',
            'Trenches3':            'RRUUU',
        },
        '3': {
            'HQ':                   'LLEEE',
            'Bunker1':              'LLEEE',
            'Bunker2':              'LLEEE',
            'LandingPad1':          'EERRR', // guess from aa1
            'LandingPad2':          'EERRR', // guess from aa2
            'Armoury':              'EERRR',
            'SupplyDepot':          'EERRR',
            'MedicaeStation1':      'EERRR',
            'MedicaeStation2':      'EERRR',
            'AntiAirBattery':       'RRUUU', // guess from vox
            'ArtilleryPosition1':   'RRUUU',
            'ArtilleryPosition2':   'RRUUU',
            'Trenches1':            'RRUUU',
            'Trenches2':            'RRUUU',
            'Trenches3':            'RRUUU',
        },
        '4': {
            'HQ':                   'LLEEE',
            'Bunker1':              'LLEEE',
            'Bunker2':              'LLEEE',
            'LandingPad1':          'LLEEE', // guess from aa1
            'LandingPad2':          'LLEEE', // guess from aa2
            'Armoury':              'LLEEE',
            'SupplyDepot':          'EERRR',
            'MedicaeStation1':      'EERRR',
            'MedicaeStation2':      'EERRR',
            'AntiAirBattery':       'EERRR', // guess from vox
            'ArtilleryPosition1':   'EERRR',
            'ArtilleryPosition2':   'EERRR',
            'Trenches1':            'EERRR',
            'Trenches2':            'EERRR',
            'Trenches3':            'EERRR',
        },
        '5': {
            'HQ':                   'MMLLL',
            'Bunker1':              'MMLLL',
            'Bunker2':              'MMLLL',
            'LandingPad1':          'LLEEE', // guess from aa1
            'LandingPad2':          'LLEEE', // guess from aa2
            'Armoury':              'LLEEE',
            'SupplyDepot':          'LLEEE',
            'MedicaeStation1':      'LLEEE',
            'MedicaeStation2':      'LLEEE',
            'AntiAirBattery':       'EERRR', // guess from vox
            'ArtilleryPosition1':   'EERRR',
            'ArtilleryPosition2':   'EERRR',
            'Trenches1':            'EERRR',
            'Trenches2':            'EERRR',
            'Trenches3':            'EERRR',
        },
    },
};