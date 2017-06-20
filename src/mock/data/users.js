/**
 * Created by kai.fantasy on 2017/6/20 0020.
 */
import Mock from 'mockjs';

const Token = {
    "account": "56abcdef12345678",
    "expiration": "2018-09-18 09:24:33",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
};

const LoginUsers = [{
    username: 'admin',
    password: '123456',
    _id: "56abcdef12345678",
    nickname: "Sys管理员",
}];

export {Token, LoginUsers};
