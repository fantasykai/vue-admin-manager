/**
 * Created by kai.fantasy on 2017/6/15 0015.
 */
import fetch from 'utils/fetch';

export function getSTSToken() {
    return fetch({
        url: '/api/v1/ststoken',
        method: 'get'
    }).then(res => res.data);
}

