/**
 * Created by kai.fantasy on 2017/6/21 0021.
 */
const addUserTrend = {
    "result": [{
        "_id": {"deviceType": 1, "day": "2017-06-14"},
        "num": 11827
    }, {"_id": {"deviceType": 2, "day": "2017-06-14"}, "num": 10223}, {
        "_id": {"deviceType": 2, "day": "2017-06-15"},
        "num": 102251
    }, {"_id": {"deviceType": 1, "day": "2017-06-15"}, "num": 12183}, {
        "_id": {"deviceType": 1, "day": "2017-06-16"},
        "num": 11234
    }, {"_id": {"deviceType": 2, "day": "2017-06-16"}, "num": 18125}, {
        "_id": {"deviceType": 1, "day": "2017-06-17"},
        "num": 10121
    }, {"_id": {"deviceType": 2, "day": "2017-06-17"}, "num": 16223}, {
        "_id": {"deviceType": 1, "day": "2017-06-18"},
        "num": 14291
    }, {"_id": {"deviceType": 2, "day": "2017-06-18"}, "num": 11235}, {
        "_id": {"deviceType": 1, "day": "2017-06-19"},
        "num": 12217
    }, {"_id": {"deviceType": 2, "day": "2017-06-19"}, "num": 14257}, {
        "_id": {"deviceType": 2, "day": "2017-06-20"},
        "num": 13625
    }, {"_id": {"deviceType": 1, "day": "2017-06-20"}, "num": 19225}]
};

const ActiveUserTrend = {
    "result": [{
        "_id": {"deviceType": 1, "day": "2017-06-14"},
        "num": 111847
    }, {"_id": {"deviceType": 2, "day": "2017-06-14"}, "num": 1105223}, {
        "_id": {"deviceType": 2, "day": "2017-06-15"},
        "num": 1102251
    }, {"_id": {"deviceType": 1, "day": "2017-06-15"}, "num": 112583}, {
        "_id": {"deviceType": 1, "day": "2017-06-16"},
        "num": 111234
    }, {"_id": {"deviceType": 2, "day": "2017-06-16"}, "num": 119125}, {
        "_id": {"deviceType": 1, "day": "2017-06-17"},
        "num": 110121
    }, {"_id": {"deviceType": 2, "day": "2017-06-17"}, "num": 116513}, {
        "_id": {"deviceType": 1, "day": "2017-06-18"},
        "num": 114291
    }, {"_id": {"deviceType": 2, "day": "2017-06-18"}, "num": 115237}, {
        "_id": {"deviceType": 1, "day": "2017-06-19"},
        "num": 114217
    }, {"_id": {"deviceType": 2, "day": "2017-06-19"}, "num": 114255}, {
        "_id": {"deviceType": 2, "day": "2017-06-20"},
        "num": 113635
    }, {"_id": {"deviceType": 1, "day": "2017-06-20"}, "num": 120215}]
};

const UserRelationThrend = {
    "result": [{
        "_id": {"state": 3, "secret": 0, "day": "2017-06-14"},
        "num": 20315
    }, {"_id": {"state": 0, "day": "2017-06-14"}, "num": 4150}, {
        "_id": {"state": 1, "day": "2017-06-14"},
        "num": 10321
    }, {"_id": {"state": 0, "secret": 0, "day": "2017-06-14"}, "num": 3152}, {
        "_id": {"state": 3, "day": "2017-06-14"},
        "num": 21367
    }, {"_id": {"state": 2, "secret": 0, "day": "2017-06-14"}, "num": 10317}, {
        "_id": {
            "state": 3,
            "secret": 0,
            "day": "2017-06-15"
        }, "num": 31363
    }, {"_id": {"state": 3, "day": "2017-06-15"}, "num": 22317}, {
        "_id": {"state": 3, "day": "2017-06-16"},
        "num": 12317
    }, {"_id": {"state": 3, "secret": 0, "day": "2017-06-16"}, "num": 20337}, {
        "_id": {"state": 3, "day": "2017-06-17"},
        "num": 11317
    }, {"_id": {"state": 3, "secret": 0, "day": "2017-06-17"}, "num": 19367}, {
        "_id": {"state": 0, "day": "2017-06-18"},
        "num": 12317
    }, {"_id": {"state": 0, "secret": 0, "day": "2017-06-18"}, "num": 12332}, {
        "_id": {"state": 3, "day": "2017-06-18"},
        "num": 19157
    }, {"_id": {"state": 3, "secret": 0, "day": "2017-06-18"}, "num": 19127}, {
        "_id": {"state": 3, "day": "2017-06-19"},
        "num": 12317
    }, {"_id": {"state": 3, "secret": 0, "day": "2017-06-19"}, "num": 21351}, {
        "_id": {"state": 3, "day": "2017-06-20"},
        "num": 11351
    }, {"_id": {"state": 2, "secret": 0, "day": "2017-06-20"}, "num": 10527}, {
        "_id": {"state": 1, "day": "2017-06-20"},
        "num": 11351
    }, {"_id": {"state": 3, "secret": 0, "day": "2017-06-20"}, "num": 16351}]
};

const UserMsgThrend = {
    "result": [{
        "_id": {"day": "2017-06-14", "objectName": "app:receiptMedia"},
        "num": 1231234
    }, {"_id": {"day": "2017-06-14", "objectName": "app:screenshoot"}, "num": 131234}, {
        "_id": {
            "day": "2017-06-14",
            "objectName": "app:video"
        }, "num": 1231234
    }, {"_id": {"day": "2017-06-14", "objectName": "app:image"}, "num": 1231234}, {
        "_id": {
            "day": "2017-06-15",
            "objectName": "app:receiptMedia"
        }, "num": 1231234
    }, {"_id": {"day": "2017-06-15", "objectName": "app:image"}, "num": 1231234}, {
        "_id": {
            "day": "2017-06-15",
            "objectName": "app:video"
        }, "num": 1231234
    }, {"_id": {"day": "2017-06-16", "objectName": "app:video"}, "num": 1231234}, {
        "_id": {
            "day": "2017-06-16",
            "objectName": "app:image"
        }, "num": 1231234
    }, {"_id": {"day": "2017-06-16", "objectName": "app:receiptMedia"}, "num": 1231234}, {
        "_id": {
            "day": "2017-06-16",
            "objectName": "app:screenshoot"
        }, "num": 1
    }, {"_id": {"day": "2017-06-17", "objectName": "app:receiptMedia"}, "num": 1231234}, {
        "_id": {
            "day": "2017-06-17",
            "objectName": "app:image"
        }, "num": 1231234
    }, {"_id": {"day": "2017-06-17", "objectName": "app:video"}, "num": 1231234}, {
        "_id": {
            "day": "2017-06-18",
            "objectName": "app:image"
        }, "num": 1231234
    }, {"_id": {"day": "2017-06-19", "objectName": "app:image"}, "num": 1231234}, {
        "_id": {
            "day": "2017-06-19",
            "objectName": "app:receiptMedia"
        }, "num": 1231234
    }, {"_id": {"day": "2017-06-19", "objectName": "app:video"}, "num": 1231234}, {
        "_id": {
            "day": "2017-06-20",
            "objectName": "app:video"
        }, "num": 1231234
    }, {"_id": {"day": "2017-06-20", "objectName": "app:image"}, "num": 1231234}, {
        "_id": {
            "day": "2017-06-20",
            "objectName": "app:receiptMedia"
        }, "num": 1231234
    }]
};

export  {addUserTrend, ActiveUserTrend, UserRelationThrend, UserMsgThrend}
