/**
 * Created by kai.fantasy on 2017/6/15 0015.
 */
import fetch from '../utils/fetch'

/**
 * 获取主播数据统计信息
 * @param params
 * @returns {Promise.<TResult>|*}
 */
export function getAnchorDataStatPage(params) {
    return fetch({
        url: '/api/v1/userstats',
        headers: {'cache-control': 'max-age=0,no-cache'},
        method: 'get',
        params: params
    });
}
