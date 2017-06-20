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
        mock.onPost('/login').reply(config => {
            let {username, password} = JSON.parse(config.data);
            return new Promise((resolve, reject) => {
                let user = null;
                setTimeout(() => {
                    let hasUser = LoginUsers.some(u => {
                        if (u.username === username && u.password === password) {
                            user = JSON.parse(JSON.stringify(u));
                            user.password = undefined;
                            return true;
                        }
                    });

                    console.log("hasUser : " + hasUser);
                    if (hasUser) {
                        resolve([200, Token]);
                    } else {
                        resolve([200, {"_status": false, "_error": {"message": "pwd_error", "code": "601101"}}]);
                    }
                }, 1000);
            });
        });

        //获取用户列表
        mock.onGet(`/api/v1/users/56abcdef12345678?projection={"nickname":1}`).reply(config => {

            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        users: LoginUsers[0]
                    }]);
                }, 1000);
            });
        });

    }
};
