/**
 * Created by kai.fantasy on 2017/6/15 0015.
 */
import axios from 'axios';
import {Message} from 'element-ui';
import store from '../store';
import router from '../routes';

// 创建axios实例
const service = axios.create({
    baseURL: process.env.BASE_API,
    timeout: 5000
});

// request 拦截器
service.interceptors.request.use(config => {
    //发送请求前，统一加上token
    if (store.getters.token) {
        config.headers['token'] = 'Bearer ' + store.getters.token;
    }
    return config;
}, error => {
    console.log(error);
    Promise.reject(error);
});

// response 拦截器
service.interceptors.response.use(
    response => {
        const code = response.data.code;
        if (401 === code) {
            Message({
                message: response.message,
                type: 'error',
                duration: 5 * 1000
            });
            // 退出登录
            localStorage.removeItem('account');
            localStorage.removeItem('token');
            localStorage.removeItem('expiration');
            localStorage.removeItem('nickname');
            router.push({path: '/login'});
        } else {
            return response;
        }
    },
    error => {
        console.log('err' + error);// for debug
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        });
        return Promise.reject(error);
    });

export default service;
