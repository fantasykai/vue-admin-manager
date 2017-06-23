/**
 * Created by kai.fantasy on 2017/6/20 0020.
 */
const TotalALL = {"result": [{"_id": {"deviceType": 1}, "num": 13042123}, {"_id": {"deviceType": 2}, "num": 15125189}]};
const TotalYesterday = {"result": [{"_id": {"deviceType": 1}, "num": 9871}, {"_id": {"deviceType": 2}, "num": 12252}]};
const TotalWeekly = {"result": [{"_id": {"deviceType": 1}, "num": 10837}, {"_id": {"deviceType": 2}, "num": 15129}]};
const TotalMonthly = {"result": [{"_id": {"deviceType": 1}, "num": 33652}, {"_id": {"deviceType": 2}, "num": 41078}]};
const TotalActive90 = {
    "result": [{"_id": {"deviceType": 1}, "num": 1311429}, {
        "_id": {"deviceType": 2},
        "num": 1617462
    }]
};
const TotalActiveYesterday = {
    "result": [{"_id": {"deviceType": 1}, "num": 826915}, {
        "_id": {"deviceType": 2},
        "num": 936613
    }]
};
const TotalActive7 = {"result": [{"_id": {"deviceType": 1}, "num": 866313}, {"_id": {"deviceType": 2}, "num": 896214}]};
const TotalActive30 = {
    "result": [{"_id": {"deviceType": 1}, "num": 923942}, {
        "_id": {"deviceType": 2},
        "num": 991316
    }]
};
const StatChannel = {
    "result": [{"_id": {"channel": "20036812"}, "num": 10725191 },
        {"_id": {"channel": "20036811"}, "num": 12325142 },
        {"_id": {"channel": "AppStore"}, "num": 15125189},
        {"_id": {"channel": "Google Play"}, "num": 16042123},]
};
const StatDeviceModel = {
    "result": [{
        "_id": {"deviceType": 2, "deviceModel": "iPhone 6 Plus"},
        "num": 3121332
    }, {"_id": {"deviceType": 2, "deviceModel": "iPhone 6"}, "num": 3013451}, {
        "_id": {
            "deviceType": 2,
            "deviceModel": "iPhone 7"
        }, "num": 3010041
    }, {"_id": {"deviceType": 2, "deviceModel": "iPhone 5"}, "num": 2923621}, {
        "_id": {
            "deviceType": 2,
            "deviceModel": "iPhone 6s"
        }, "num": 2821669
    }, {"_id": {"deviceType": 2, "deviceModel": "iPhone 7 Plus"}, "num": 1423682}, {
        "_id": {
            "deviceType": 2,
            "deviceModel": "iPhone 6s Plus"
        }, "num": 1228381
    }, {"_id": {"deviceType": 1.0, "deviceModel": "vivo X7"}, "num": 1034321}, {
        "_id": {
            "deviceType": 1.0,
            "deviceModel": "vivo X7Plus"
        }, "num": 934712
    }, {"_id": {"deviceType": 1.0, "deviceModel": "vivo X9"}, "num": 928776}, {
        "_id": {
            "deviceType": 1.0,
            "deviceModel": "vivo X6S A"
        }, "num": 878715
    }, {"_id": {"deviceType": 1.0, "deviceModel": "vivo V3Max A"}, "num": 858712}, {
        "_id": {
            "deviceType": 1.0,
            "deviceModel": "vivo X6D"
        }, "num": 801313
    }, {"_id": {"deviceType": 1.0, "deviceModel": "vivo Y51A"}, "num": 752623}, {
        "_id": {
            "deviceType": 1.0,
            "deviceModel": "vivo Y51"
        }, "num": 692214
    }, {"_id": {"deviceType": 1.0, "deviceModel": "vivo X5Pro D"}, "num": 632336}, {
        "_id": {
            "deviceType": 1.0,
            "deviceModel": "vivo V3M A"
        }, "num": 562273
    }, {"_id": {"deviceType": 1.0, "deviceModel": "vivo Xplay5A"}, "num": 512982}]
};
const StatSendMsg = {
    "result": [
        {
            "_id": {
                "recv": 1202361112,
                "seqid": 123456,
                "nickname": "旋涡鸣人",
                "send": 1135234011
            }
        },
        {
            "_id": {
                "recv": 1102351292,
                "seqid": 1323451,
                "nickname": "幕府",
                "send": 1192150210
            }
        },
        {
            "_id": {
                "recv": 1101352231,
                "seqid": 1147172,
                "nickname": "仙人",
                "send": 1147172811
            }
        },
        {
            "_id": {
                "recv": 1001352187,
                "seqid": 1128418,
                "nickname": "Fant_",
                "send": 1128418081
            }
        },
        {
            "_id": {
                "recv": 1601322501,
                "seqid": 11187152,
                "nickname": "ViK123",
                "send": 1590331512
            }
        },
        {
            "_id": {
                "recv": 1290331614,
                "seqid": 1161603201,
                "nickname": "letSts",
                "send": 1571331557
            }
        },
        {
            "_id": {
                "recv": 1243331513,
                "seqid": 11773006,
                "nickname": "HTTP.EFF",
                "send": 1177300626
            }
        },
        {
            "_id": {
                "recv": 1020331355,
                "seqid": 110121540,
                "nickname": ".S碎羽。",
                "send": 1101961540
            }
        },
        {
            "_id": {
                "recv": 1010352382,
                "seqid": 10000282,
                "nickname": "DA拿破仑",
                "send": 1001961540
            }
        },
        {
            "_id": {
                "recv": 1000334615,
                "seqid": 1033599,
                "nickname": "路飞·D",
                "send": 1000763156
            }
        }
    ]
};

const StatBrand = {

    "result": [
        {
            "_id": {
                "brand": "iPhone"
            },
            "num": 15125189
        },
        {
            "_id": {
                "brand": "vivo"
            },
            "num": 1804212
        },
        {
            "_id": {
                "brand": "Xiaomi"
            },
            "num": 1714818
        },
        {
            "_id": {
                "brand": "OPPO"
            },
            "num": 1664347
        },
        {
            "_id": {
                "brand": "HUAWEI"
            },
            "num": 1631229
        },
        {
            "_id": {
                "brand": "samsung"
            },
            "num": 1638268
        },
        {
            "_id": {
                "brand": "Meizu"
            },
            "num": 1231262
        }
    ]
};

const StatZhuCeVer = {
    "result": [
        {
            "_id": {
                "deviceType": 2,
                "bluVer": "v2.0.0"
            },
            "num": 457234
        },
        {
            "_id": {
                "deviceType": 2,
                "bluVer": "1.0.1"
            },
            "num": 417231
        },
        {
            "_id": {
                "deviceType": 2,
                "bluVer": "v0.0.1"
            },
            "num": 367234
        },
        {
            "_id": {
                "deviceType": 2,
                "bluVer": "v1.2.3"
            },
            "num": 327216
        },
        {
            "_id": {
                "deviceType": 2,
                "bluVer": "v1.1.1"
            },
            "num": 320124
        },
        {
            "_id": {
                "deviceType": 2,
                "bluVer": "v2.2.0"
            },
            "num": 300229
        },
        {
            "_id": {
                "deviceType": 2,
                "bluVer": "v2.0"
            },
            "num": 280213
        },
        {
            "_id": {
                "deviceType": 1,
                "bluVer": "v1.2.3"
            },
            "num": 250934
        },
        {
            "_id": {
                "deviceType": 1,
                "bluVer": "v2.1.1"
            },
            "num": 210935
        },
        {
            "_id": {
                "deviceType": 1,
                "bluVer": "v2.0.0"
            },
            "num": 190825
        },
        {
            "_id": {
                "deviceType": 1,
                "bluVer": "v1.1.1"
            },
            "num": 190021
        },
        {
            "_id": {
                "deviceType": 1,
                "bluVer": "v2.1.0"
            },
            "num": 180151
        },
        {
            "_id": {
                "deviceType": 1,
                "bluVer": "v1.0.0"
            },
            "num": 171153
        },
        {
            "_id": {
                "deviceType": 1,
                "bluVer": "v1.0.2"
            },
            "num": 168361
        },
        {
            "_id": {
                "deviceType": 1,
                "bluVer": "v2.2.0"
            },
            "num": 160669
        },
        {
            "_id": {
                "deviceType": 1,
                "bluVer": "v1.0.3"
            },
            "num": 158139
        },
        {
            "_id": {
                "deviceType": 1,
                "bluVer": "v1.0.1"
            },
            "num": 148129
        },
        {
            "_id": {
                "deviceType": 1,
                "bluVer": "v1.1.0"
            },
            "num": 141140
        },
        {
            "_id": {
                "deviceType": 1,
                "bluVer": "v2.0.1"
            },
            "num": 159181
        }
    ]
};

const StatActiveVer = {
    "result": [
        {
            "_id": {
                "deviceType": 2,
                "bluVer": "v2.2.0"
            },
            "num": 9125139
        },
        {
            "_id": {
                "deviceType": 2,
                "bluVer": "v2.0.0"
            },
            "num": 8825631
        },
        {
            "_id": {
                "deviceType": 1,
                "bluVer": "v2.2.0"
            },
            "num": 8725632
        },
        {
            "_id": {
                "deviceType": 1,
                "bluVer": "v2.0.0"
            },
            "num": 8023951
        }
    ]
};

export  {
    TotalALL,
    TotalYesterday,
    TotalWeekly,
    TotalMonthly,
    TotalActive90,
    TotalActiveYesterday,
    TotalActive7,
    TotalActive30,
    StatChannel,
    StatDeviceModel,
    StatSendMsg,
    StatBrand,
    StatZhuCeVer,
    StatActiveVer
};
