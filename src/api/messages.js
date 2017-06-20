/**
 * Created by kai.fantasy on 2017/6/15 0015.
 */
import fetch from '../utils/fetch'

/**
 * 获取消息记录，强制不使用缓存
 * @param params
 * @returns {*}
 */
export function getChatRecordPage(params) {
    return fetch({
        url: '/api/v1/messages',
        headers: {'cache-control': 'max-age=0,no-cache'},
        params: params,
        method: 'get'
    });
}
