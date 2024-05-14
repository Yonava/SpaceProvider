const buildingAliases = {
    'WORC': ['worc', 'worcester', 'dining', 'hall', 'commons'],// Worcester Dining Hall
    'WHEEL': ['wheel', 'wheeler', 'hall'], // Wheeler Hall
    'TOTM': ['totm', 'totman', 'gym', 'gymnasium'], // Totman Gym
    'TOBN': ['tobn', 'tobin', 'hall'], // Tobin Hall
    'THOM': ['thom', 'thompson', 'hall'], // Thompson Hall
    'THCH': ['thch', 'thatcher', 'hall', 'house'], // Thatcher House
    'STUDENTUN': ['studentun', 'student', 'union'], // Student Union
    'STK': ['stk', 'stockbridge', 'hall'], // Stockbridge Hall
    'SOM': ['som', 'isenberg', 'school', 'management'], // School of Management
    'SKIN': ['skin', 'skinner', 'hall'], // Skinner Hall
    'SC': ['sc', 'south', 'college'], // South College
    'SAB': ['sab', 'studio', 'arts', 'building'], // Studio Arts Building
    'REG': ['reg', 'research', 'education', 'greenhouse'], // Research & Educ Greenhouse
    'RANDUPPR': ['randuppr', 'rand', 'upper', 'lobby'], // Rand Upper Lobby
    'RANDSTAGE': ['randstage', 'rand', 'stage'], // Rand Stage
    'PAIG': ['paig', 'paige', 'laboratory', 'lab'], // Paige Laboratory
    'NAH': ['nah', 'new', 'africa', 'house'], // New Africa House
    'MRST': ['mrst', 'marston', 'hall'], // Marston Hall
    'MOR4': ['mor4', 'morrill', 'science', 'center', '4', 'iv'], // Morrill IV
    'MOR3': ['mor3', 'morrill', 'science', 'center', '3', 'iii'], // Morrill III
    'MOR2': ['mor2', 'morrill', 'science', 'center', '2', 'ii'], // Morrill II
    'MOR1': ['mor1', 'morrill', 'science', 'center', '1', 'i'], // Morrill I
    'MOR': ['mor', 'morrill', 'science', 'center'], // Morrill
    'MONT': ['mont', 'montague', 'house'], // Montague House
    'MELV': ['melv', 'melville', 'hall'], // Melville Hall
    'MARC': ['marc', 'marcus', 'hall'], // Marcus Hall
    'MAH': ['mah', 'mahar', 'auditorium'], // Mahar Auditorium
    'MACH': ['mach', 'machmer', 'hall'], // Machmer Hall
    'LYON': ['lyon', 'mary', 'lyon', 'house', 'hall'], // Mary Lyon House
    'LSL': ['lsl', 'life', 'sciences', 'laboratory', 'lab'], // Life Sciences Lab
    'LIB': ['lib', 'web', 'dubois', 'library'], // WEB DuBois Library
    'LGRT': ['lgrt', 'lederle', 'graduate', 'research', 'tower', 'highrise'], // Lederle Graduate Research Tower
    'LGRC': ['lgrc', 'lederle', 'graduate', 'research', 'center', 'lowrise'], // Lederle Graduate Research Center
    'ISB': ['isb', 'integrated', 'sciences', 'building'], // Integrated Sciences Building
    'ILC': ['ilc', 'integrative', 'learning', 'center'], // Integrative Learning Center
    'HOLD': ['hold', 'holdsworth', 'hall'], // Holdsworth Hall
    'HICKPOOL': ['hickpool', 'curry', 'hicks', 'physical', 'phys', 'education', 'ed', 'building', 'pool'], // Curry Hicks Phys. Ed Bldg Pool
    'HERT': ['hert', 'herter', 'hall'], // Herter Hall
    'HASA': ['hasa', 'hasbrouck', 'laboratory', 'lab', 'addition'], // Hasbrouck Laboratory addn.
    'HAS': ['has', 'hasbrouck', 'laboratory', 'lab'], // Hasbrouck Laboratory
    'GUN': ['gun', 'gunness', 'hall'], // Gunness Hall
    'GSMN': ['gsmn', 'goessmann', 'laboratory', 'lab', 'addition'], // Goessmann Hall addn.
    'GP': ['gp', 'george', 'parks', 'building', 'band'], // George Parks Bldg
    'GORM': ['gorm', 'gorman', 'hall', 'house'], // Gorman House
    'GORDNHALL': ['gordnhall', 'gordon', 'hall'], // Gordon Hall
    'GOES': ['goes', 'goessmann', 'laboratory', 'lab'], // Goessmann Hal
    'FURC': ['furc', 'furcolo', 'hall'], // Furcolo Hall
    'FREN': ['fren', 'french', 'hall'], // French Hall
    'FLIN': ['flin', 'flint', 'laboratory', 'lab'], // Flint Laboratory
    'FERN': ['fern', 'fernald', 'hall'], // Fernald Hall
    'EMER': ['emer', 'emerson', 'hall'], // Emerson Hall
    'ELM': ['elm', 'hall', 'house'], // Elm Hall/House
    'ELABII': ['elabii', 'engineering', 'laboratory', 'lab', 'ii', '2'], // Engineering Lab II
    'ELAB': ['elab', 'engineering', 'laboratory', 'lab', 'i', '1'], // Engineering Lab
    'DWGT': ['dwgt', 'dwight', 'house', 'hall'], // Dwight House
    'DRA': ['dra', 'draper', 'hall'], // Draper Hall
    'DKSN': ['dksn', 'dickinson', 'hall', 'house'], // Dickinson Hall
    'DB': ['db', 'design', 'building', 'john', 'olver', 'w'], // Design Building
    'CURTTHEAT': ['curttheat', 'curtain', 'theater'], // Curtain Theater
    'CNTE': ['cnte', 'silvio', 'o', 'conte', 'polymer', 'research', 'center'], // Conte Polymer Res Ctr
    'CMPS': ['cmps', 'computer', 'science', 'building'], // Computer Science Building
    'CHNWPLNT': ['chnwplnt', 'chenoweth', 'pilot', 'plant'], // Chenoweth Pilot Plant
    'CHNW': ['chnw', 'chenoweth', 'laboratory', 'lab'], // Chenoweth Lab
    'CHEN': ['chen', 'chenoweth', 'laboratory', 'lab', 'addition'], // Chenoweth Lab addn.
    'CC': ['cc', 'campus', 'center', 'murray', 'd', 'lincoln'], // Campus Center
    'BOYD': ['boyd', 'boyden', 'gym', 'gymnasium'], // Boyden Gym
    'BOWD': ['bowd', 'bowditch', 'hall'], // Bowditch Hall
    'BFLD': ['bfld', 'butterfield', 'house', 'hall'], // Butterfield House
    'BCABZSN': ['bcabzsn', 'fine', 'arts', 'building', 'bromery', 'center', 'arts', 'bezanson', 'recital', 'hall'], // Bromery Center Bezanson Hall
    'BCA': ['bca', 'fine', 'arts', 'building', 'bromery', 'center', 'arts'], // Bromery Center for Arts
    'BART': ['bart', 'bartlett', 'hall'], // Bartlett Hall
    'ARND': ['arnd', 'arnold', 'hall', 'house'], // Arnold Hall
    'AEBN': ['aebn', 'agricultural', 'engineering', 'building'], // Ag. Engineering Bldg
    'AEBCXB': ['aebcxb', 'agricultural', 'engineering', 'building', 'annex', 'b'], // Ag. Engin. Bldg Annex B
    'AEBC': ['aebc', 'agricultural', 'engineering', 'building', 'central'], // Ag. Engin. Central
};

module.exports = buildingAliases;