/**
 * Created by kai.fantasy on 2017/6/19 0019.
 */
import fetch from '../utils/fetch'

/**
 * 设置定时任务
 * @param data
 * @returns {*|Promise.<TResult>}
 */
export function setMsgTimingTask(data) {
    return fetch({
        url: '/manage/v1/apschedul/sendtousera',
        method: 'post',
        data
    }).then(res => res.data);
}

/**
 * 取消定时任务
 * @param data
 * @returns {*|Promise.<TResult>}
 */
export function cancelMsgTimingTask(params) {
    let data = params.patchBody;
    return fetch({
        url: params.uri,
        method: 'patch',
        data
    }).then(res => res.data);
}

/**
 * 获取账号自动回复设置信息
 * @param params
 * @returns {*}
 */
export function getMsgConfigs(params) {
    return fetch({
        url: '/api/v1/msgconfigs',
        headers: {'cache-control': 'max-age=0,no-cache'},
        params: params,
        method: 'get'
    });
}

/**
 * 设置自动回复配置
 * @param data
 * @returns {*|Promise.<TResult>}
 */
export function setMsgConfigs(data) {
    return fetch({
        url: '/api/v1/msgconfigs',
        method: 'post',
        data
    }).then(res => res.data);
}

/**
 * 触发消息发送任务
 * @param data
 * @returns {*|Promise.<TResult>}
 */
export function sendToUsersSchedul(data) {
    return fetch({
        url: '/manage/v1/apschedul/sendtousers',
        method: 'post',
        data
    }).then(res => res.data);
}

/**
 * 更新自动回复配置
 * @param data
 * @returns {*|Promise.<TResult>}
 */
export function updateMsgConfigs(params) {
    let data = params.patchBody;
    return fetch({
        url: params.uri,
        method: 'patch',
        data
    }).then(res => res.data);
}
/**
 * 删除自动回复配置信息
 * @param params
 * @returns {*}
 */
export function deleteMsgConfigs(params) {
    return fetch({
        url: '/api/v1/msgconfigs/' + params,
        method: 'delete'
    }).then(res => res.data);
}
