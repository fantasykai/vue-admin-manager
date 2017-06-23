/**
 * Created by kai.fantasy on 2017/6/21 0021.
 */
import moment from 'moment';
import Mock from 'mockjs';

const addUserTrend = {
    "result": [{
        "_id": {"deviceType": 1, "day": moment().subtract(7, 'days').format('YYYY-MM-DD')},
        "num": 11827
    }, {"_id": {"deviceType": 2, "day": moment().subtract(7, 'days').format('YYYY-MM-DD')}, "num": 10223}, {
        "_id": {"deviceType": 2, "day": moment().subtract(6, 'days').format('YYYY-MM-DD')},
        "num": 102251
    }, {"_id": {"deviceType": 1, "day": moment().subtract(6, 'days').format('YYYY-MM-DD')}, "num": 12183}, {
        "_id": {"deviceType": 1, "day": moment().subtract(5, 'days').format('YYYY-MM-DD')},
        "num": 11234
    }, {"_id": {"deviceType": 2, "day": moment().subtract(5, 'days').format('YYYY-MM-DD')}, "num": 18125}, {
        "_id": {"deviceType": 1, "day": moment().subtract(4, 'days').format('YYYY-MM-DD')},
        "num": 10121
    }, {"_id": {"deviceType": 2, "day": moment().subtract(4, 'days').format('YYYY-MM-DD')}, "num": 16223}, {
        "_id": {"deviceType": 1, "day": moment().subtract(3, 'days').format('YYYY-MM-DD')},
        "num": 14291
    }, {"_id": {"deviceType": 2, "day": moment().subtract(3, 'days').format('YYYY-MM-DD')}, "num": 11235}, {
        "_id": {"deviceType": 1, "day": moment().subtract(2, 'days').format('YYYY-MM-DD')},
        "num": 12217
    }, {"_id": {"deviceType": 2, "day": moment().subtract(2, 'days').format('YYYY-MM-DD')}, "num": 14257}, {
        "_id": {"deviceType": 2, "day": moment().subtract(1, 'days').format('YYYY-MM-DD')},
        "num": 13625
    }, {"_id": {"deviceType": 1, "day": moment().subtract(1, 'days').format('YYYY-MM-DD')}, "num": 19225}]
};

const ActiveUserTrend = {
    "result": [{
        "_id": {"deviceType": 1, "day": moment().subtract(7, 'days').format('YYYY-MM-DD')},
        "num": 111847
    }, {"_id": {"deviceType": 2, "day": moment().subtract(7, 'days').format('YYYY-MM-DD')}, "num": 1105223}, {
        "_id": {"deviceType": 2, "day": moment().subtract(6, 'days').format('YYYY-MM-DD')},
        "num": 1102251
    }, {"_id": {"deviceType": 1, "day": moment().subtract(6, 'days').format('YYYY-MM-DD')}, "num": 112583}, {
        "_id": {"deviceType": 1, "day": moment().subtract(5, 'days').format('YYYY-MM-DD')},
        "num": 111234
    }, {"_id": {"deviceType": 2, "day": moment().subtract(5, 'days').format('YYYY-MM-DD')}, "num": 119125}, {
        "_id": {"deviceType": 1, "day": moment().subtract(4, 'days').format('YYYY-MM-DD')},
        "num": 110121
    }, {"_id": {"deviceType": 2, "day": moment().subtract(4, 'days').format('YYYY-MM-DD')}, "num": 116513}, {
        "_id": {"deviceType": 1, "day": moment().subtract(3, 'days').format('YYYY-MM-DD')},
        "num": 114291
    }, {"_id": {"deviceType": 2, "day": moment().subtract(3, 'days').format('YYYY-MM-DD')}, "num": 115237}, {
        "_id": {"deviceType": 1, "day": moment().subtract(2, 'days').format('YYYY-MM-DD')},
        "num": 114217
    }, {"_id": {"deviceType": 2, "day": moment().subtract(2, 'days').format('YYYY-MM-DD')}, "num": 114255}, {
        "_id": {"deviceType": 2, "day": moment().subtract(1, 'days').format('YYYY-MM-DD')},
        "num": 113635
    }, {"_id": {"deviceType": 1, "day": moment().subtract(1, 'days').format('YYYY-MM-DD')}, "num": 120215}]
};

const UserRelationThrend = {
    "result": [{
        "_id": {"state": 3, "secret": 0, "day": moment().subtract(7, 'days').format('YYYY-MM-DD')},
        "num": 20315
    }, {"_id": {"state": 0, "day": moment().subtract(7, 'days').format('YYYY-MM-DD')}, "num": 4150}, {
        "_id": {"state": 1, "day": moment().subtract(7, 'days').format('YYYY-MM-DD')},
        "num": 10321
    }, {"_id": {"state": 0, "secret": 0, "day": moment().subtract(7, 'days').format('YYYY-MM-DD')}, "num": 3152}, {
        "_id": {"state": 3, "day": moment().subtract(7, 'days').format('YYYY-MM-DD')},
        "num": 21367
    }, {"_id": {"state": 2, "secret": 0, "day": moment().subtract(7, 'days').format('YYYY-MM-DD')}, "num": 10317}, {
        "_id": {
            "state": 3,
            "secret": 0,
            "day": moment().subtract(6, 'days').format('YYYY-MM-DD')
        }, "num": 31363
    }, {"_id": {"state": 3, "day": moment().subtract(6, 'days').format('YYYY-MM-DD')}, "num": 22317}, {
        "_id": {"state": 3, "day": moment().subtract(5, 'days').format('YYYY-MM-DD')},
        "num": 12317
    }, {"_id": {"state": 3, "secret": 0, "day": moment().subtract(5, 'days').format('YYYY-MM-DD')}, "num": 20337}, {
        "_id": {"state": 3, "day": moment().subtract(4, 'days').format('YYYY-MM-DD')},
        "num": 11317
    }, {"_id": {"state": 3, "secret": 0, "day": moment().subtract(4, 'days').format('YYYY-MM-DD')}, "num": 19367}, {
        "_id": {"state": 0, "day": moment().subtract(3, 'days').format('YYYY-MM-DD')},
        "num": 12317
    }, {"_id": {"state": 0, "secret": 0, "day": moment().subtract(3, 'days').format('YYYY-MM-DD')}, "num": 12332}, {
        "_id": {"state": 3, "day": moment().subtract(3, 'days').format('YYYY-MM-DD')},
        "num": 19157
    }, {"_id": {"state": 3, "secret": 0, "day": moment().subtract(3, 'days').format('YYYY-MM-DD')}, "num": 19127}, {
        "_id": {"state": 3, "day": moment().subtract(2, 'days').format('YYYY-MM-DD')},
        "num": 12317
    }, {"_id": {"state": 3, "secret": 0, "day": moment().subtract(2, 'days').format('YYYY-MM-DD')}, "num": 21351}, {
        "_id": {"state": 3, "day": moment().subtract(1, 'days').format('YYYY-MM-DD')},
        "num": 11351
    }, {"_id": {"state": 2, "secret": 0, "day": moment().subtract(1, 'days').format('YYYY-MM-DD')}, "num": 10527}, {
        "_id": {"state": 1, "day": moment().subtract(1, 'days').format('YYYY-MM-DD')},
        "num": 11351
    }, {"_id": {"state": 3, "secret": 0, "day": moment().subtract(1, 'days').format('YYYY-MM-DD')}, "num": 16351}]
};

const UserMsgThrend = {
    "result": [{
        "_id": {"day": moment().subtract(7, 'days').format('YYYY-MM-DD'), "objectName": "app:receiptMedia"},
        "num": Mock.Random.integer(100000,99999999)
    }, {"_id": {"day": moment().subtract(7, 'days').format('YYYY-MM-DD'), "objectName": "app:screenshoot"}, "num": Mock.Random.integer(100000,99999999)}, {
        "_id": {
            "day": moment().subtract(7, 'days').format('YYYY-MM-DD'),
            "objectName": "app:video"
        }, "num": Mock.Random.integer(100000,99999999)
    }, {"_id": {"day": moment().subtract(7, 'days').format('YYYY-MM-DD'), "objectName": "app:image"}, "num": Mock.Random.integer(100000,99999999)}, {
        "_id": {
            "day": moment().subtract(6, 'days').format('YYYY-MM-DD'),
            "objectName": "app:receiptMedia"
        }, "num": Mock.Random.integer(100000,99999999)
    }, {"_id": {"day": moment().subtract(6, 'days').format('YYYY-MM-DD'), "objectName": "app:image"}, "num": Mock.Random.integer(100000,99999999)}, {
        "_id": {
            "day": moment().subtract(6, 'days').format('YYYY-MM-DD'),
            "objectName": "app:video"
        }, "num": Mock.Random.integer(100000,99999999)
    }, {"_id": {"day": moment().subtract(5, 'days').format('YYYY-MM-DD'), "objectName": "app:video"}, "num": Mock.Random.integer(100000,99999999)}, {
        "_id": {
            "day": moment().subtract(5, 'days').format('YYYY-MM-DD'),
            "objectName": "app:image"
        }, "num": Mock.Random.integer(100000,99999999)
    }, {"_id": {"day": moment().subtract(5, 'days').format('YYYY-MM-DD'), "objectName": "app:receiptMedia"}, "num": Mock.Random.integer(100000,99999999)}, {
        "_id": {
            "day": moment().subtract(5, 'days').format('YYYY-MM-DD'),
            "objectName": "app:screenshoot"
        }, "num": Mock.Random.integer(100000,99999999)
    }, {"_id": {"day": moment().subtract(4, 'days').format('YYYY-MM-DD'), "objectName": "app:receiptMedia"}, "num": Mock.Random.integer(100000,99999999)}, {
        "_id": {
            "day": moment().subtract(4, 'days').format('YYYY-MM-DD'),
            "objectName": "app:image"
        }, "num": Mock.Random.integer(100000,99999999)
    }, {"_id": {"day": moment().subtract(4, 'days').format('YYYY-MM-DD'), "objectName": "app:video"}, "num": Mock.Random.integer(100000,99999999)}, {
        "_id": {
            "day": moment().subtract(3, 'days').format('YYYY-MM-DD'),
            "objectName": "app:image"
        }, "num": Mock.Random.integer(100000,99999999)
    }, {"_id": {"day": moment().subtract(2, 'days').format('YYYY-MM-DD'), "objectName": "app:image"}, "num": Mock.Random.integer(100000,99999999)}, {
        "_id": {
            "day": moment().subtract(2, 'days').format('YYYY-MM-DD'),
            "objectName": "app:receiptMedia"
        }, "num": Mock.Random.integer(100000,99999999)
    }, {"_id": {"day": moment().subtract(2, 'days').format('YYYY-MM-DD'), "objectName": "app:video"}, "num": Mock.Random.integer(100000,99999999)}, {
        "_id": {
            "day": moment().subtract(1, 'days').format('YYYY-MM-DD'),
            "objectName": "app:video"
        }, "num": Mock.Random.integer(100000,99999999)
    }, {"_id": {"day": moment().subtract(1, 'days').format('YYYY-MM-DD'), "objectName": "app:image"}, "num": Mock.Random.integer(100000,99999999)}, {
        "_id": {
            "day": moment().subtract(1, 'days').format('YYYY-MM-DD'),
            "objectName": "app:receiptMedia"
        }, "num": Mock.Random.integer(100000,99999999)
    }]
};

export  {addUserTrend, ActiveUserTrend, UserRelationThrend, UserMsgThrend}
