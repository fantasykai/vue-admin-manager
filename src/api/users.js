/**
 * Created by kai.fantasy on 2017/6/15 0015.
 */
import fetch from '../utils/fetch'
/**
 * 获取用户昵称
 * @returns {*|Promise.<TResult>}
 */
export function getNickname(uid) {
    return fetch({
        url: `/api/v1/users/` + uid + `?projection={"nickname":1,"usertype":1,"manage":1}`,
        method: 'get'
    }).then(res => res.data);
}

/**
 * 获取用户列表
 * @param params
 * @returns {*}
 */
export function getUsersPage(params) {
    return fetch({
        url: '/api/v1/users',
        method: 'get',
        params: params
    });
}

/**
 * 更新用户信息
 * @param data
 * @returns {*|Promise.<TResult>}
 */
export function updateUserInfo(params) {
    let data = params.patchBody;
    return fetch({
        url: params.uri,
        method: 'patch',
        data
    }).then(res => res.data);
}

/**
 * 根据用户userId/seqid/tel 查询用户的uid
 * @param params
 * @returns {*}
 */
export function getBluUid(params) {
    return fetch({
        url: '/api/v1/users',
        method: 'get',
        params: params
    });
}

/**
 * 查询好友列表
 * @param params
 * @returns {Promise.<TResult>|*}
 */
export function getFriendsPage(params) {
    return fetch({
        url: `/api/v1/users/` + params.userId + `/fris`,
        headers: {'cache-control': 'max-age=0,no-cache'},
        method: 'get',
        params: params.queryParams
    }).then(res => res.data);
}

/**
 * 查询好友分组
 * @param params
 * @returns {Promise.<TResult>|*}
 */
export function getFriendRows(params) {
    return fetch({
        url: `/api/v1/users/` + params.userId + `/rows`,
        headers: {'cache-control': 'max-age=0,no-cache'},
        method: 'get',
        params: params.queryParams
    }).then(res => res.data);
}

/**
 * 查询好友分组内的好友
 * @param params
 * @returns {Promise.<TResult>|*}
 */
export function getFriendsInRow(params) {
    return fetch({
        url: `/api/v1/users/` + params.userId + `/fris`,
        headers: {'cache-control': 'max-age=0,no-cache'},
        method: 'get',
        params: params.queryParams
    }).then(res => res.data);
}
