/**
 * Gets the room capacity given the building and room, as long as it is contained in the data.
 * @param buildingCode string
 * @param roomCode string
 * @returns room capacity given the building and room are contained in data, undefined otherwise
 */
export const getOfficialCapacity = (buildingCode: string, roomCode: string) => {
  return roomCapacities?.[buildingCode]?.[roomCode]
};

type RoomCapacities = Record<string, Record<string, number>>

const roomCapacities: RoomCapacities = {
  "MAH": {
    "108": 469
  },
  "SOM": {
    "106": 59,
    "108": 88,
    "112": 44,
    "117": 36,
    "118": 44,
    "119": 46,
    "120": 25,
    "122": 34,
    "123": 35,
    "124": 44,
    "125": 34,
    "126": 56,
    "127": 44,
    "129": 35,
    "137": 220,
    "208": 44,
    "210": 60,
    "219": 18,
    "237": 20,
    "G035": 31,
    "G031": 32,
    "G023": 48,
    "N135": 65,
    "G026": 42,
    "N301": 10,
    "G027": 42,
    "G020": 48,
    "N145": 65,
    "G008": 32,
    "N125": 48,
    "N220": 20,
    "N327": 25,
    "N390": 20
  },
  "DKSN": {
    "109": 45,
    "110": 48,
    "112": 43,
    "114": 46,
    "206": 25,
    "209": 43,
    "212": 48,
    "214": 44,
    "216": 46
  },
  "NAH": {
    "3": 40,
    "21": 40,
    "26": 20,
    "302": 11,
    "311": 45
  },
  "FREN": {
    "102": 56,
    "106": 27,
    "209": 85
  },
  "MOR2": {
    "129": 60,
    "131": 208,
    "134": 15,
    "222": 92,
    "225": 38,
    "245": 20,
    "339": 24,
    "343": 25,
    "243A": 5
  },
  "HERT": {
    "19": 10,
    "102": 30,
    "106": 18,
    "107": 29,
    "108": 21,
    "110": 22,
    "111": 36,
    "112": 18,
    "113": 35,
    "114": 22,
    "116": 42,
    "117": 34,
    "118": 34,
    "119": 36,
    "121": 15,
    "201": 44,
    "202": 22,
    "204": 18,
    "205": 50,
    "206": 35,
    "207": 32,
    "208": 15,
    "209": 35,
    "210": 30,
    "211": 32,
    "212": 29,
    "214": 14,
    "217": 50,
    "222": 23,
    "224": 25,
    "225": 44,
    "227": 150,
    "231": 150,
    "342": 16,
    "400": 16,
    "444": 15,
    "503": 15,
    "546": 16,
    "601": 16,
    "640": 16,
    "746": 16
  },
  "EMER": {
    "140": 31
  },
  "BART": {
    "3": 30,
    "35": 26,
    "61": 62,
    "65": 300,
    "109": 30,
    "119": 41,
    "121": 28,
    "125": 41,
    "127": 30,
    "131": 27,
    "203": 30,
    "206": 55,
    "207": 20
  },
  "AEBCXB": {
    "140": 30,
    "150": 40
  },
  "ISB": {
    "135": 300,
    "221": 85,
    "260": 48,
    "264": 37,
    "268": 48,
    "321": 48,
    "329": 48,
    "355": 30,
    "360": 25,
    "364": 30,
    "368": 28,
    "427R": 25,
    "427L": 45,
    "363A": 12
  },
  "HAS": {
    "130": 31,
    "134": 120,
    "136": 24,
    "137": 42,
    "138": 56,
    "202": 20,
    "204": 24,
    "210": 24,
    "228": 35,
    "230": 30,
    "235": 20,
    "236": 30,
    "242": 33
  },
  "GOES": {
    "12": 37,
    "20": 159
  },
  "ILC": {
    "N101": 62,
    "S140": 102,
    "S211": 102,
    "N111": 63,
    "S220": 99,
    "S311": 81,
    "S120": 99,
    "S110": 99,
    "S131": 115,
    "S331": 150,
    "N151": 340,
    "N211": 52,
    "N155": 33,
    "S240": 125,
    "N345": 30,
    "S350": 50,
    "N255": 40,
    "N321": 14,
    "S312": 12,
    "N317": 20,
    "S416": 15,
    "S418": 15,
    "S231": 60,
    "N400": 25,
    "S404": 25,
    "S407": 16,
    "S413": 30,
    "S308": 16,
    "S405": 25,
    "S412": 20,
    "S415": 8,
    "N451": 25,
    "N458": 25,
    "N417": 10
  },
  "MOR1": {
    "N444": 24,
    "N326": 70,
    "N338": 17,
    "N375": 235,
    "N345": 30,
    "N347": 32,
    "N336": 20,
    "N349": 22
  },
  "STK": {
    "124": 49,
    "301": 46,
    "303": 35,
    "7B": 20
  },
  "THOM": {
    "102": 229,
    "104": 301,
    "106": 229,
    "420": 16,
    "620": 36,
    "714": 10,
    "919": 26,
    "1028": 15
  },
  "MACH": {
    "317": 8,
    "E16": 22,
    "E33": 36,
    "W17": 22,
    "W25": 42,
    "E14": 15,
    "W11": 34,
    "W26": 52,
    "W22": 36,
    "E35": 43,
    "E10": 35,
    "E17": 25,
    "E24": 12,
    "W13": 35,
    "W21": 34,
    "W24": 42,
    "W27": 37,
    "E37": 53,
    "W15": 42,
    "W32": 15,
    "E32": 35,
    "W23": 42,
    "E23": 35
  },
  "LYON": {
    "119": 30
  },
  "SC": {
    "W245": 106,
    "E480": 30,
    "E245": 40,
    "W369": 16,
    "W201": 36,
    "W101": 36,
    "E241": 40,
    "E470": 55,
    "W205": 30,
    "W211": 30,
    "W219": 30,
    "E370": 30,
    "E250": 20,
    "W365": 25,
    "E301": 20,
    "W465": 24
  },
  "LIB": {
    "1201": 15,
    "1203": 15,
    "1206": 15,
    "1301": 15,
    "R1667": 25
  },
  "DB": {
    "130": 20,
    "160": 40,
    "162": 80,
    "170": 50,
    "221": 26,
    "225": 34,
    "260": 50,
    "270": 13,
    "280": 40,
    "312": 20,
    "314": 15,
    "370": 55,
    "380": 30,
    "480": 25
  },
  "BCA": {
    "36": 100,
    "44": 100,
    "112": 35,
    "150": 50,
    "151": 13,
    "152": 30,
    "154": 25,
    "155": 25,
    "157": 30,
    "204": 20,
    "253": 6,
    "410": 25,
    "413": 50,
    "419": 56,
    "421": 25,
    "423": 40,
    "427": 40,
    "431": 40,
    "435": 40,
    "439": 30,
    "441": 16,
    "450": 30,
    "465": 25,
    "TBA": 50,
    "25A": 16
  },
  "SAB": {
    "10": 12,
    "16": 16,
    "101": 25,
    "110": 19,
    "155": 15,
    "156": 16,
    "240": 30,
    "247": 16,
    "142C": 15
  },
  "HASA": {
    "20": 305,
    "106": 20,
    "107": 28,
    "109": 37,
    "111": 37,
    "113": 52,
    "124": 120,
    "126": 120,
    "210": 24,
    "214": 24,
    "104B": 24,
    "104A": 26
  },
  "LGRT": {
    "121": 72,
    "123": 77,
    "141": 35,
    "143": 33,
    "145": 33,
    "147": 31,
    "171": 34,
    "173": 34,
    "177": 33,
    "201": 50,
    "202": 36,
    "204": 36,
    "206": 34,
    "219": 60,
    "224": 34,
    "533": 20,
    "644": 20,
    "1033": 30,
    "1114": 18,
    "1234": 21,
    "1322": 18,
    "1334": 21,
    "1569": 18,
    "419B": 15
  },
  "FURC": {
    "101": 40,
    "102": 45,
    "110": 40,
    "125": 195,
    "W016": 25,
    "W009": 35,
    "W015": 32,
    "W007": 25,
    "W201": 40,
    "W163": 5,
    "W107": 42,
    "N113": 30,
    "N125": 25,
    "W014": 24,
    "W001": 25,
    "S115": 25,
    "S125": 25,
    "S167": 10
  },
  "MOR": {
    "311": 50,
    "317": 28,
    "319": 50,
    "337": 15
  },
  "MOR3": {
    "108": 34,
    "203": 63,
    "204": 24,
    "206": 21,
    "212": 99,
    "301": 26,
    "302": 26,
    "303": 26,
    "304": 26
  },
  "GSMN": {
    "42": 32,
    "51": 65,
    "61": 24,
    "62": 35,
    "64": 180,
    "67": 35,
    "151": 60,
    "152": 60,
    "153": 30,
    "223": 15
  },
  "SKIN": {
    "6": 15,
    "8": 15,
    "12": 72,
    "106": 36,
    "112": 90,
    "201": 52
  },
  "ARND": {
    "15": 20,
    "101": 43,
    "104": 17,
    "108": 19,
    "140": 45
  },
  "MRST": {
    "15": 31,
    "23": 30,
    "24": 15,
    "32": 25,
    "33": 22,
    "132": 80,
    "211": 50,
    "220": 44
  },
  "ELAB": {
    "303": 81,
    "304": 64,
    "305": 33,
    "306": 52,
    "307": 48,
    "323": 62,
    "325": 35,
    "327": 29
  },
  "GUN": {
    "5": 18,
    "18": 24,
    "19": 24
  },
  "ELABII": {
    "115": 25,
    "119": 193
  },
  "MARC": {
    "5": 30,
    "6": 15,
    "25": 6,
    "131": 325,
    "137": 15
  },
  "LGRC": {
    "A301": 66,
    "A203": 38,
    "A201": 42,
    "A104A": 55,
    "A310": 24,
    "A210": 30,
    "A19": 10
  },
  "FLIN": {
    "103": 41,
    "105": 65,
    "201": 65
  },
  "HOLD": {
    "105": 50,
    "202": 58,
    "203": 80,
    "211": 40,
    "301": 30,
    "302": 36,
    "305": 51,
    "308": 42,
    "103A": 40,
    "312A": 15
  },
  "AEBN": {
    "119": 109,
    "302": 13
  },
  "CMPS": {
    "140": 36,
    "142": 85
  },
  "MELV": {
    "130": 31
  },
  "ELM": {
    "210": 24,
    "212": 24,
    "214": 24,
    "224": 24,
    "226": 24,
    "227": 24,
    "228": 24,
    "230": 24,
    "301": 24
  },
  "TOBN": {
    "204": 64,
    "207": 20,
    "304": 68,
    "307": 38,
    "423": 30,
    "504": 16,
    "520": 30,
    "521B": 30
  },
  "TOTM": {
    "3": 15,
    "8": 25,
    "10": 35,
    "13": 25,
    "29": 12,
    "153": 50,
    "156": 35,
    "162": 12,
    "204": 20,
    "GYM": 300,
    "8A": 30,
    "134A": 25
  },
  "CHEN": {
    "329": 32
  },
  "CHNW": {
    "108": 32,
    "113": 41
  },
  "BFLD": {
    "7": 25
  },
  "GORDNHALL": {
    "": 20
  },
  "DRA": {
    "124": 41
  },
  "MONT": {
    "120": 20
  },
  "AEBC": {
    "308": 38
  },
  "BOWD": {
    "209": 21
  },
  "DWGT": {
    "132": 15
  },
  "BOYD": {
    "51": 49,
    "GYM": 330
  },
  "CNTE": {
    "411": 50,
    "A111": 200,
    "A110": 200,
    "A524": 50,
    "A309": 30,
    "A624": 20
  },
  "GORM": {
    "21": 31
  },
  "CHNWPLNT": {
    "": 35
  },
  "MOR4": {
    "N301": 60,
    "S159": 25,
    "N303": 60,
    "N116": 20
  },
  "THCH": {
    "101": 15
  },
  "CC": {
    "922": 15,
    "1101": 35,
    "1106": 32
  },
  "FERN": {
    "11": 128,
    "107": 16,
    "201": 20,
    "202B": 15,
    "202E": 25
  },
  "BCABZSN": {
    "": 50
  },
  "GP": {
    "101": 300
  },
  "HICKPOOL": {
    "": 32
  },
  "LSL": {
    "N615": 15
  },
  "WORC": {
    "333": 15,
    "343": 20,
    "MED": 30
  },
  "REG": {
    "103": 10
  },
  "PAIG": {
    "202": 40
  },
  "RANDSTAGE": {
    "": 50
  },
  "CURTTHEAT": {
    "": 50
  },
  "RANDUPPR": {
    "": 20
  },
  "WHEEL": {
    "B05": 30
  }
};