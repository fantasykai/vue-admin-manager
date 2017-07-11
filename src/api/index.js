/**
 * Created by kai.fantasy on 2017/4/11 0011.
 * 两种封装调用的方式
 * 1. api.request(), 在调用的地方在输入uri
 * 2. 把请求的uri列表放在此js中，方便管理
 */
import axios from 'axios'
import config from '../config'

export default {
    request (method, uri, data = null) {
        if (!method) {
            console.error('API function call requires method argument')
            return
        }

        if (!uri) {
            console.error('API function call requires uri argument');
            return
        }

        var url = config.serverURI + uri
        axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
        return axios({method, url, data})
    }
}

/**
 * 登录接口
 * @param params
 * @returns {*}
 */
export const requestLogin = params => {
    return axios.create({
        baseURL: `${config.serverURI}/api/v1/tokens`,
        headers: {'deviceid': params.deviceId},
        auth: params.credentials,
    }).get().then(res => res.data);
};

/**
 * 登录接口 POST
 * @param params
 * @returns {*}
 */
export const login = params => {
    return axios.create({
        auth: params.credentials,
        timeout: 2000,
    }).post(`${config.serverURI}/api/v1/tokens`, params.postBody).then(res => res.data);
};

/**
 * 获取token 消息头
 * @returns {{headers: {token: string}}}
 */
function getToken() {

    let axiosConfig = {
        headers: {
            // 'content-type': 'application/json',
            'token': 'Bearer ' + localStorage.getItem('token')
        }
    };

    return axiosConfig;
}

/**
 * 获取OSS临时授权信息，STS
 * @param params
 * @returns {*}
 */
export const getSTSToken = params => {
    return axios.create({
        baseURL: `${config.serverURI}/api/v1/ststoken`,
        headers: {'token': 'Bearer ' + localStorage.getItem('token')},
    }).get().then(res => res.data);
};

/**
 * 获取用户昵称
 * @param params
 * @returns {*}
 */
export const getNickname = params => {
    return axios.create({
        baseURL: `${config.serverURI}/api/v1/users/` + params + `?projection={"nickname":1,"userId":1,"seqid":1}`,
        headers: {'token': 'Bearer ' + localStorage.getItem('token')},
    }).get().then(res => res.data);
};


/**
 * aggregate 统计通用接口
 * @param params
 * @returns {Promise.<TResult>|Promise<R>|Promise<R2|R1>}
 */
export const aggregate = params => {
    return axios.post(`${config.serverURI}/charts/v1/aggregate`, params, getToken()).then(res => res.data.result);
};

/**
 * 根据用户userId/seqid 查询用户的uid
 * @param params
 * @returns {AxiosPromise}
 */
export const getBluUid = params => {
    return axios.get(`${config.serverURI}/api/v1/users`, {
        params: params,
        headers: {'token': 'Bearer ' + localStorage.getItem('token')}
    });
};

/**
 * 获取消息记录, 强制不使用缓存
 * @param params
 * @returns {AxiosPromise}
 */
export const getChatRecordPage = params => {
    return axios.get(`${config.serverURI}/api/v1/messages`, {
        params: params,
        headers: {'token': 'Bearer ' + localStorage.getItem('token'), 'cache-control': 'max-age=0,no-cache'}
    });
};

/**
 * 获取用户列表
 * @param params
 * @returns {AxiosPromise}
 */
export const getUsersPage = params => {
    return axios.get(`${config.serverURI}/api/v1/users`, {
        params: params,
        headers: {'token': 'Bearer ' + localStorage.getItem('token')}
    });
};

/**
 * 获取好友列表
 * @param params
 * @returns {*}
 */
export const getFriendsPage = params => {
    return axios.create({
        baseURL: `${config.serverURI}/api/v1/users/` + params.userId + `/fris`,
        headers: {'token': 'Bearer ' + localStorage.getItem('token'), 'cache-control': 'max-age=0,no-cache'},
        params: params.queryParams
    }).get().then(res => res.data);
};

/**
 * 获取好友分组
 * @param params
 * @returns {*}
 */
export const getFriendRows = params => {
    return axios.create({
        baseURL: `${config.serverURI}/api/v1/users/` + params.userId + `/rows`,
        headers: {'token': 'Bearer ' + localStorage.getItem('token'), 'cache-control': 'max-age=0,no-cache'},
        params: params.queryParams
    }).get().then(res => res.data);
};

/**
 * 获取分组内的好友信息
 * @param params
 * @returns {*}
 */
export const getFriendsInRow = params => {
    return axios.create({
        baseURL: `${config.serverURI}/api/v1/users/` + params.userId + `/fris`,
        headers: {'token': 'Bearer ' + localStorage.getItem('token'), 'cache-control': 'max-age=0,no-cache'},
        params: params.queryParams
    }).get().then(res => res.data);
};


/**
 * 获取主播数据统计信息, 强制不使用缓存
 * @param params
 * @returns {AxiosPromise}
 */
export const getAnchorDataStatPage = params => {
    return axios.get(`${config.serverURI}/api/v1/userstats`, {
        params: params,
        headers: {'token': 'Bearer ' + localStorage.getItem('token'), 'cache-control': 'max-age=0,no-cache'}
    });
};

/**
 * aggregate 设置定时任务
 * @param params
 * @returns {Promise.<TResult>|Promise<R>|Promise<R2|R1>}
 */
export const setMsgTimingTask = params => {
    return axios.post(`${config.serverURI}/manage/v1/apschedul/sendtousera`, params, getToken()).then(res => res.data);
};

/**
 * aggregate 取消定时任务
 * @param params
 * @returns {Promise.<TResult>|Promise<R>|Promise<R2|R1>}
 */
export const cancelMsgTimingTask = params => {
    return axios.patch(params.uri, params.patchBody, getToken()).then(res => res.data);
};

/**
 * 获取账号自动回复设置信息
 * @param params
 * @returns {AxiosPromise}
 */
export const getMsgConfigs = params => {
    return axios.get(`${config.serverURI}/api/v1/msgconfigs`, {
        params: params,
        headers: {'token': 'Bearer ' + localStorage.getItem('token'), 'cache-control': 'max-age=0,no-cache'}
    });
};

/**
 * aggregate 设置自动回复配置
 * @param params
 * @returns {Promise.<TResult>|Promise<R>|Promise<R2|R1>}
 */
export const setMsgConfigs = params => {
    return axios.post(`${config.serverURI}/api/v1/msgconfigs`, params, getToken()).then(res => res.data);
};

/**
 * aggregate 触发消息发送任务
 * @param params
 * @returns {Promise.<TResult>|Promise<R>|Promise<R2|R1>}
 */
export const sendToUsersSchedul = params => {
    return axios.post(`${config.serverURI}/manage/v1/apschedul/sendtousers`, params, getToken()).then(res => res.data);
};

/**
 * aggregate 更新自动回复配置
 * @param params
 * @returns {Promise.<TResult>|Promise<R>|Promise<R2|R1>}
 */
export const updateMsgConfigs = params => {
    return axios.patch(params.uri, params.patchBody, getToken()).then(res => res.data);
};

/**
 * 删除自动回复配置信息
 * @param params
 * @returns {*}
 */
export const deleteMsgConfigs = params => {
    return axios.create({
        baseURL: `${config.serverURI}/api/v1/msgconfigs/` + params,
        headers: {'token': 'Bearer ' + localStorage.getItem('token')},
    }).delete().then(res => res.data);
};

