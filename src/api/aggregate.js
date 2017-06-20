/**
 * Created by kai.fantasy on 2017/6/15 0015.
 */
import fetch from '../utils/fetch';

export function aggregate(data) {
    return fetch({
        url: '/charts/v1/aggregate',
        method: 'post',
        data
    }).then(res => res.data.result);
}

