/**
 * Created by kai.fantasy on 2017/6/20 0020.
 */

import axios from 'axios';
import fetch from '../utils/fetch';
import MockAdapter from 'axios-mock-adapter';
import {Token, LoginMap, Users} from './data/users';

let _Users = Users;
import {MsgData} from './data/msgData';

let _MsgData = MsgData;
import {StsToken} from './data/ststoken';
import {
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
} from './data/dashboard';

import {addUserTrend, ActiveUserTrend, UserRelationThrend, UserMsgThrend} from './data/trendData';

export default {
    /**
     * mock bootstrap
     */
    bootstrap() {
        let mock = new MockAdapter(axios);
        let mock_fetch = new MockAdapter(fetch);
        let loginName = 'intern';
        //登录
        mock.onPost('/api/v1/tokens').reply(config => {

            loginName  = config.auth.username;
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, Token]);
                }, 1000);
            });
        });

        mock_fetch.onGet('/api/v1/users/56abcdef12345678?projection={"nickname":1,"usertype":1,"manage":1}').reply(config => {

            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, LoginMap[loginName]]);
                }, 1000);
            });
        });

        // 各种统计
        mock_fetch.onPost('/charts/v1/aggregate').reply(config => {

                let {statFunc, type} = JSON.parse(config.data);

                let Res = '';

                if ('devTypeStat' === statFunc) {
                    switch (type) {
                        case 0:
                            Res = TotalALL;
                            break;
                        case 1:
                            Res = TotalYesterday;
                            break;
                        case 7:
                            Res = TotalWeekly;
                            break;
                        case 30:
                            Res = TotalMonthly;
                            break;
                        case 190:
                            Res = TotalActive90;
                            break;
                        case 11:
                            Res = TotalActiveYesterday;
                            break;
                        case 17:
                            Res = TotalActive7;
                            break;
                        case 130:
                            Res = TotalActive30;
                            break;
                        default:
                            Res = TotalALL;
                    }
                }

                if ('channalStat' === statFunc) {
                    Res = StatChannel;
                }

                if ('sendMsgCountRank' === statFunc) {
                    Res = StatSendMsg;
                }

                if ('phoneModelStat' === statFunc) {
                    Res = StatDeviceModel;
                }

                if ('phoneBrandStat' === statFunc) {
                    Res = StatBrand;
                }

                if ('appVersionlStat' === statFunc) {
                    Res = StatZhuCeVer;
                }

                if ('appUseVersionlStat' === statFunc) {
                    Res = StatActiveVer;
                }

                if ('cycleUserNumsStat' === statFunc) {
                    Res = addUserTrend;
                }

                if ('cycleLoggedUserNumsStat' === statFunc) {
                    Res = ActiveUserTrend;
                }

                if ('cycleFrisNumStat' === statFunc) {
                    Res = UserRelationThrend;
                }

                if ('cycleMsgNumStat' === statFunc) {
                    Res = UserMsgThrend;
                }

                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve([200, Res]);
                    }, 1000);
                });
            }
        );

        // sts 模拟数据
        mock_fetch.onGet('/api/v1/ststoken').reply(config => {

            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, StsToken]);
                }, 1000);
            });
        });

        // 用户分页查询
        mock_fetch.onGet('/api/v1/users').reply(config => {
            let {page, where} = config.params;

            let {telphone, bluid, seqid} = JSON.parse(where);

            let mockUsers = _Users.filter(user => {
                if (telphone && user.name.indexOf(telphone) == -1 &&
                    bluid && user.name.indexOf(bluid) == -1 &&
                    seqid && user.name.indexOf(seqid) == -1
                ) return false;
                return true;
            });
            let total = mockUsers.length;
            mockUsers = mockUsers.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        _meta: {
                            max_results: 20,
                            total: total,
                            page: page
                        },
                        _items: mockUsers
                    }]);
                }, 5000);
            });
        });

        // 消息记录查询
        mock_fetch.onGet('/api/v1/messages').reply(config => {
            let {page} = config.params;
            let mockMsgs = _MsgData
            let total = _MsgData.length;
            mockMsgs = mockMsgs.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        _meta: {
                            max_results: 20,
                            total: total,
                            page: page
                        },
                        _items: mockMsgs
                    }]);
                }, 1000);
            });
        });
    }
};
