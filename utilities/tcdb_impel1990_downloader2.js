(async () => {
  const cards = {
    1: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-1Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-1Bk.jpg'},
    2: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-2Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-2Bk.jpg'},
    3: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-3Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-3Bk.jpg'},
    4: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-4Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-4Bk.jpg'},
    5: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-5Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-5Bk.jpg'},
    6: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-6Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-6Bk.jpg'},
    7: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-7Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-7Bk.jpg'},
    8: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-8Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-8Bk.jpg'},
    9: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-5316337RepFr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-5316337RepBk.jpg'},
    10: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-10Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-10Bk.jpg'},
    11: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-11Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-11Bk.jpg'},
    12: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-12Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-12Bk.jpg'},
    13: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-13Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-13Bk.jpg'},
    14: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-14Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-14Bk.jpg'},
    15: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-15Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-15Bk.jpg'},
    16: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-16Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-16Bk.jpg'},
    17: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-17Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-17Bk.jpg'},
    18: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-18Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-18Bk.jpg'},
    19: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-19Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-19Bk.jpg'},
    20: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-20Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-20Bk.jpg'},
    21: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-5316349RepFr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-5316349RepBk.jpg'},
    22: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-22Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-22Bk.jpg'},
    23: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-23Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-23Bk.jpg'},
    24: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-24Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-24Bk.jpg'},
    25: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-25Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-25Bk.jpg'},
    26: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-26Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-26Bk.jpg'},
    27: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-27Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-27Bk.jpg'},
    28: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-28Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-28Bk.jpg'},
    29: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-29Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-29Bk.jpg'},
    30: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-30Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-30Bk.jpg'},
    31: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-31Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-31Bk.jpg'},
    32: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-5316360RepFr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-5316360RepBk.jpg'},
    33: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-33Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-33Bk.jpg'},
    34: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-34Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-34Bk.jpg'},
    35: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-35Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-35Bk.jpg'},
    36: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-36Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-36Bk.jpg'},
    37: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-5316365RepFr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-5316365RepBk.jpg'},
    38: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-38Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-38Bk.jpg'},
    39: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-5316367RepFr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-5316367RepBk.jpg'},
    40: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-40Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-40Bk.jpg'},
    41: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-5316369RepFr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-5316369RepBk.jpg'},
    42: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-42Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-42Bk.jpg'},
    43: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-43Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-43Bk.jpg'},
    44: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-44Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-44Bk.jpg'},
    45: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-45Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-45Bk.jpg'},
    46: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-5316374RepFr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-5316374RepBk.jpg'},
    47: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-47Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-47Bk.jpg'},
    48: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-5316376RepFr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-5316376RepBk.jpg'},
    49: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-49Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-49Bk.jpg'},
    50: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-50Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-50Bk.jpg'},
    51: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-51Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-51Bk.jpg'},
    52: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-52Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-52Bk.jpg'},
    53: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-5316381RepFr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-5316381RepBk.jpg'},
    54: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-54Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-54Bk.jpg'},
    55: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-5316383RepFr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-5316383RepBk.jpg'},
    56: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-5316384RepFr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-5316384RepBk.jpg'},
    57: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-5316385RepFr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-5316385RepBk.jpg'},
    58: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-58Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-58Bk.jpg'},
    59: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-59Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-59Bk.jpg'},
    60: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-60Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-60Bk.jpg'},
    61: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-61Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-61Bk.jpg'},
    62: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-5316390RepFr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-5316390RepBk.jpg'},
    63: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-63Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-63Bk.jpg'},
    64: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-64Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-64Bk.jpg'},
    65: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-65Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-65Bk.jpg'},
    66: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-5316394RepFr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-5316394RepBk.jpg'},
    67: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-5316395RepFr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-5316395RepBk.jpg'},
    68: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-68Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-68Bk.jpg'},
    69: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-69Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-69Bk.jpg'},
    70: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-70Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-70Bk.jpg'},
    71: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-71Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-71Bk.jpg'},
    72: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-72Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-72Bk.jpg'},
    73: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-5316401RepFr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-5316401RepBk.jpg'},
    74: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-74Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-74Bk.jpg'},
    75: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-5316403RepFr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-5316403RepBk.jpg'},
    76: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-76Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-76Bk.jpg'},
    77: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-77Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-77Bk.jpg'},
    78: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-78Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-78Bk.jpg'},
    79: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-79Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-79Bk.jpg'},
    80: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-80Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-80Bk.jpg'},
    81: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-81Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-81Bk.jpg'},
    82: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-5316410RepFr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-5316410RepBk.jpg'},
    83: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-5316411RepFr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-5316411RepBk.jpg'},
    84: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-84Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-84Bk.jpg'},
    85: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-5316413RepFr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-5316413RepBk.jpg'},
    86: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-86Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-86Bk.jpg'},
    87: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-87Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-87Bk.jpg'},
    88: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-88Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-88Bk.jpg'},
    89: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-89Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-89Bk.jpg'},
    90: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-90Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-90Bk.jpg'},
    91: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-91Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-91Bk.jpg'},
    92: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-5316420RepFr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-5316420RepBk.jpg'},
    93: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-93Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-93Bk.jpg'},
    94: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-94Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-94Bk.jpg'},
    95: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-95Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-95Bk.jpg'},
    96: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-96Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-96Bk.jpg'},
    97: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-97Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-97Bk.jpg'},
    98: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-98Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-98Bk.jpg'},
    99: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-99Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-99Bk.jpg'},
    100: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-100Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-100Bk.jpg'},
    101: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-101Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-101Bk.jpg'},
    102: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-102Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-102Bk.jpg'},
    103: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-103Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-103Bk.jpg'},
    104: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-104Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-104Bk.jpg'},
    105: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-105Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-105Bk.jpg'},
    106: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-106Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-106Bk.jpg'},
    107: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-107Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-107Bk.jpg'},
    108: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-108Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-108Bk.jpg'},
    109: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-109Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-109Bk.jpg'},
    110: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-110Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-110Bk.jpg'},
    111: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-5316439RepFr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-5316439RepBk.jpg'},
    112: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-112Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-112Bk.jpg'},
    113: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-113Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-113Bk.jpg'},
    114: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-114Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-114Bk.jpg'},
    115: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-115Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-115Bk.jpg'},
    116: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-116Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-116Bk.jpg'},
    117: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-117Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-117Bk.jpg'},
    118: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-118Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-118Bk.jpg'},
    119: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-119Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-119Bk.jpg'},
    120: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-120Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-120Bk.jpg'},
    121: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-121Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-121Bk.jpg'},
    122: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-122Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-122Bk.jpg'},
    123: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-123Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-123Bk.jpg'},
    124: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-124Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-124Bk.jpg'},
    125: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-125Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-125Bk.jpg'},
    126: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-126Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-126Bk.jpg'},
    127: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-5316455RepFr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-5316455RepBk.jpg'},
    128: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-5316456RepFr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-5316456RepBk.jpg'},
    129: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-5316457RepFr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-5316457RepBk.jpg'},
    130: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-130Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-130Bk.jpg'},
    131: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-131Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-131Bk.jpg'},
    132: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-132Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-132Bk.jpg'},
    133: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-133Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-133Bk.jpg'},
    134: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-134Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-134Bk.jpg'},
    135: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-135Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-135Bk.jpg'},
    136: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-5316464RepFr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-5316464RepBk.jpg'},
    137: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-137Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-137Bk.jpg'},
    138: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-138Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-138Bk.jpg'},
    139: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-139Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-139Bk.jpg'},
    140: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-140Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-140Bk.jpg'},
    141: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-141Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-141Bk.jpg'},
    142: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-142Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-142Bk.jpg'},
    143: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-5316471RepFr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-5316471RepBk.jpg'},
    144: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-144Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-144Bk.jpg'},
    145: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-145Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-145Bk.jpg'},
    146: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-5316474RepFr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-5316474RepBk.jpg'},
    147: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-147Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-147Bk.jpg'},
    148: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-148Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-148Bk.jpg'},
    149: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-5316477RepFr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-5316477RepBk.jpg'},
    150: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-150Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-150Bk.jpg'},
    151: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-151Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-151Bk.jpg'},
    152: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-152Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-152Bk.jpg'},
    153: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-153Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-153Bk.jpg'},
    154: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-5316482RepFr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-5316482RepBk.jpg'},
    155: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-155Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-155Bk.jpg'},
    156: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-5316484RepFr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-5316484RepBk.jpg'},
    157: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-157Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-157Bk.jpg'},
    158: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-5316486RepFr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-5316486RepBk.jpg'},
    159: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-159Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-159Bk.jpg'},
    160: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-160Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-160Bk.jpg'},
    161: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-5316489RepFr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-5316489RepBk.jpg'},
    162: {frontUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-162Fr.jpg', backUrl: 'https://www.tcdb.com/Images/Cards/Non-Sport/74396/74396-162Bk.jpg'}
  };

  const cardNums = Object.keys(cards).map(Number);
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  // BYPASS FUNCTION: Creates a natural link interaction instead of an XHR/Fetch network pipeline
  function downloadImgViaNavigation(src, filename) {
    try {
      const a = document.createElement('a');
      a.href = src;
      a.download = filename;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      return true;
    } catch (e) {
      console.error(` X ${filename}:`, e.message);
      return false;
    }
  }

  let ok = 0;
  const total = cardNums.length * 2;
  console.log(` Starting CSP-bypass download for ${total} images...`);

  // Fronts first
  for (const n of cardNums) {
    const num = String(n).padStart(3, '0');
    downloadImgViaNavigation(cards[n].frontUrl, `front_${num}.jpg`);
    ok++;
    if (n % 20 === 0) console.log(` Triggered Fronts: ${n}/162...`);
    // Increased delay slightly to make sure the browser window handles the download stack smoothly
    await delay(300); 
  }

  // Backs second
  for (const n of cardNums) {
    const num = String(n).padStart(3, '0');
    downloadImgViaNavigation(cards[n].backUrl, `back_${num}.jpg`);
    ok++;
    if (n % 20 === 0) console.log(` Triggered Backs: ${n}/162...`);
    await delay(300);
  }
  
  console.log(` Done! All ${ok} images passed directly to browser download queue.`);
})();