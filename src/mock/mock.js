/**
 * Created by kai.fantasy on 2017/6/20 0020.
 */

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {Token, LoginUsers} from './data/users';

export default  {
    /**
     * mock bootstrap
     */
    bootstrap() {
        let mock = new MockAdapter(axios);

        //登录
        mock.onPost('/api/v1/tokens').reply(config => {

            console.log("用户登录。。。。。。。。。。。。。。");
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, Token]);
                }, 1000);
            });
        });

        //获取用户昵称
        mock.onGet(`/v1/users/56abcdef12345678?projection={%22nickname%22:1}`).reply(config => {

            console.log("获取用户昵称。。。。。。。。。。。。。。");

            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, LoginUsers]);
                }, 1000);
            });
        });

    }
};
