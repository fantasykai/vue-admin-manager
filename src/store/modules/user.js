/**
 * Created by kai.fantasy on 2017/5/22 0022.
 */
// import {getSTSToken, getNickname} from '../../api';
import {getNickname} from '../../api/users';
import {getSTSToken} from '../../api/sts';

const user = {
    state: {
        token: localStorage.getItem('token'),
        account: localStorage.getItem('account'),
        expiration: '',
        nickname: localStorage.getItem('nickname'),
        avatar: '',
        roles: [],
        internAgent: '',
        ossSts: {
            AccessKeySecret: '',
            SecurityToken: '',
            Expiration: '',
            AccessKeyId: ''
        },
        ossClient: localStorage.getItem('ossClient'),
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token;
        },
        SET_ACCOUNT: (state, account) => {
            state.account = account;
        },
        SET_EXPIRATION: (state, expiration) => {
            state.expiration = expiration;
        },
        SET_NICKNAME: (state, nickname) => {
            state.nickname = nickname;
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles;
        },
        SET_INTERNAGENT: (state, internAgent) => {
            state.internAgent = internAgent;
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar;
        },
        SET_OSSSTS_ACCESSKEYSECRET: (state, accessKeySecret) => {
            state.ossSts.AccessKeySecret = accessKeySecret;
        },
        SET_OSSSTS_SECURITYTOKEN: (state, securityToken) => {
            state.ossSts.SecurityToken = securityToken;
        },
        SET_OSSSTS_EXPIRATION: (state, expiration) => {
            state.ossSts.Expiration = expiration;
        },
        SET_OSSSTS_ACCESSKEYID: (state, accessKeyId) => {
            state.ossSts.AccessKeyId = accessKeyId;
        },
        SET_OSS_CLIENT: (state, ossClient) => {
            state.ossClient = ossClient;
        }

    },
    actions: {
        //获取管理员昵称
        GetUserInfo({commit, state}) {
            return new Promise((resolve, reject) => {
                getNickname(state.account).then((res) => {
                    let {nickname, usertype, manage} = res;
                    if (usertype) {
                        let role = ['user'];
                        let internAgent = '';
                        if (10 === usertype) {
                            role = ['admin'];
                        } else if (9 === usertype) {
                            if (manage) {
                                if (manage.agent) {
                                    if ('admin' === manage.agent) {
                                        role = ['admin'];
                                    } else if ('intern' === manage.agent) {
                                        role = ['intern'];
                                        if (manage.remark) {
                                            internAgent = manage.remark;
                                            commit('SET_INTERNAGENT', internAgent);
                                            localStorage.setItem("internAgent", internAgent)
                                        }
                                    }
                                }
                            }
                        }
                        commit('SET_ROLES', role);
                        localStorage.setItem("roles", role)
                    }
                    if (nickname) {
                        commit('SET_NICKNAME', nickname);
                        localStorage.setItem("nickname", nickname)
                    }
                    resolve(res);
                }).catch(error => {
                    reject(error);
                });
            });
        },
        // 获取OSS的访问OSS的临时访问权限
        GetStsToken({commit}) {

            return new Promise((resolve, reject) => {
                getSTSToken().then((data) => {

                    let {AccessKeySecret, SecurityToken, Expiration, AccessKeyId} = data;

                    commit('SET_OSSSTS_ACCESSKEYSECRET', AccessKeySecret);
                    commit('SET_OSSSTS_SECURITYTOKEN', SecurityToken);
                    commit('SET_OSSSTS_EXPIRATION', Expiration);
                    commit('SET_OSSSTS_ACCESSKEYID', AccessKeyId);

                    let ossSts = {
                        'AccessKeySecret': AccessKeySecret,
                        'SecurityToken': SecurityToken,
                        'Expiration': Expiration,
                        'AccessKeyId': AccessKeyId
                    };

                    localStorage.removeItem('ossSts');
                    localStorage.setItem('ossSts', JSON.stringify(ossSts));
                }).catch(error => {
                    reject(error);
                });

            });
        },
        // 登出时，清空store状态
        LogOut({commit}) {
            commit('SET_ACCOUNT', '');
            commit('SET_TOKEN', '');
            commit('SET_NICKNAME', '');
            commit('SET_OSSSTS_ACCESSKEYSECRET', '');
            commit('SET_OSSSTS_SECURITYTOKEN', '');
            commit('SET_OSSSTS_EXPIRATION', '');
            commit('SET_OSSSTS_ACCESSKEYID', '');
            commit('SET_ROLES', []);
            commit('SET_INTERNAGENT', '');


            localStorage.removeItem('account');
            localStorage.removeItem('token');
            localStorage.removeItem('expiration');
            localStorage.removeItem('nickname');
            localStorage.removeItem('roles');
            localStorage.removeItem('internAgent');

        },
        //初始化 OSS 客户端
        // initOssClient({commit, state}) {
        //
        //     let Oss = OSS.Wrapper;
        //
        //     let ossClient = new Oss({
        //         region: 'oss-cn-beijing',
        //         accessKeyId: state.ossSts.AccessKeyId,
        //         accessKeySecret: state.ossSts.AccessKeySecret,
        //         stsToken: state.ossSts.SecurityToken,
        //         bucket: 'dianxinonline',
        //     });
        //     commit('SET_OSS_CLIENT', ossClient);
        //     localStorage.setItem("ossClient", ossClient)
        // },
    }
};
export default user;
