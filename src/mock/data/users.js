/**
 * Created by kai.fantasy on 2017/6/20 0020.
 */
import Mock from 'mockjs';

const Token = {
    "account": "56abcdef12345678",
    "expiration": "2018-09-18 09:24:33",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
};

const LoginMap = {
    admin: {
        "_id": "56abcdef12345678",
        "nickname": "Sys管理员",
        "usertype": 9,
        "manage": {
            "remark": "admin",
            "agent": "admin"
        },
    },
    // intern
    intern: {
        "_id": "56abcdef12345678",
        "nickname": "见习领航员",
        "usertype": 9,
        "manage": {
            "remark": "intern",
            "agent": "水星~"
        },
    }
};

const Users = [];

for (let i = 0; i < 99; i++) {
    Users.push(Mock.mock({
        _created: Mock.Random.datetime(),
        _updated: Mock.Random.datetime(),
        id: Mock.Random.guid(),
        nickname: Mock.Random.cname(),
        avatar: Mock.Random.dataImage('48x48', 'Avatar'),
        seqid: Mock.Random.integer(10000000, 99999999),
        userId: Mock.Random.first(),
        telphone: /^1[0-9]{10}$/,
        sex: Mock.Random.integer(0, 2),
        sexual: Mock.Random.integer(0, 3),
        constellation: Mock.Random.integer(0, 11),
        sign: Mock.Random.cparagraph(),
        birthday: Mock.Random.date(),
        jobs: {
            "province": Mock.Random.province(),
            "city": Mock.Random.city(),
            "c": Mock.Random.csentence(),
            "b": Mock.Random.csentence(),
            "a": Mock.Random.csentence()
        },
        address: {
            "item2": {
                "province": Mock.Random.province(),
                "city": Mock.Random.city(),
                "region": Mock.Random.county(),
                "detail": Mock.Random.ctitle()
            },
            "item0": {
                "province": Mock.Random.province(),
                "city": Mock.Random.city(),
                "region": Mock.Random.county(),
                "detail": Mock.Random.ctitle()
            },
            "item1": {
                "province": Mock.Random.province(),
                "city": Mock.Random.city(),
                "region": Mock.Random.county(),
                "detail": Mock.Random.ctitle()
            }
        },
        schools: {
            "item0": {
                "city": Mock.Random.city(),
                "school": Mock.Random.cparagraph(),
                "region": Mock.Random.county()
            },
            "item1": {
                "city": Mock.Random.city(),
                "school": Mock.Random.cparagraph(),
                "region": Mock.Random.county()
            }
        },
        firsNum: Mock.Random.integer(100, 10000),
        newActiveNum: Mock.Random.integer(200, 20000),
        sendNum: Mock.Random.integer(1000, 999999),
        receNum: Mock.Random.integer(1000, 999999),
    }));
}

export {Token, LoginMap, Users};
