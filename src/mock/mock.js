/**
 * Created by kai.fantasy on 2017/6/20 0020.
 */

import axios from 'axios';
import fetch from '../utils/fetch';
import MockAdapter from 'axios-mock-adapter';
import {Token, LoginUsers} from './data/users';
import {StsToken} from './data/ststoken';
import {TotalALL} from './data/dashboard';

export default  {
    /**
     * mock bootstrap
     */
    bootstrap() {
        let mock = new MockAdapter(axios);
        let mock_fetch = new MockAdapter(fetch);
        //登录
        mock.onPost('/api/v1/tokens').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, Token]);
                }, 1000);
            });
        });

        //获取用户昵称 projection={"nickname":1}
        // mock_fetch.onGet('/api/v1/users/56abcdef12345678', {params: {projection: {"nickname": 1}}}).reply(config => {
        mock_fetch.onGet('/api/v1/users/56abcdef12345678?projection={"nickname":1}').reply(config => {

            console.log("获取用户昵称。。。。。。。。。。。。。。");

            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, LoginUsers]);
                }, 1000);
            });
        });

        // 各种统计
        mock_fetch.onPost('/charts/v1/aggregate').reply(config => {

            let {collections} = JSON.parse(config.data);

            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, TotalALL]);
                }, 1000);
            });
        });

        // sts 模拟数据
        mock_fetch.onGet('/api/v1/ststoken').reply(config => {

            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, StsToken]);
                }, 1000);
            });
        });

    }
};
