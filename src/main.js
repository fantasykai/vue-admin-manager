// import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css';// Progress 进度条 样式
import './assets/iconfont/iconfont';
import IconSvg from './components/common/Icon-svg';// svg 组件
import store from './store'
import router from './routes'
import {sync} from 'vuex-router-sync'
import VueVideoPlayer from 'vue-video-player'
import * as filters from './filters'; // 全局vue filter

// 开启Mock测试
import Mock from './mock';
Mock.bootstrap();

Vue.component('icon-svg', IconSvg);
Vue.use(ElementUI);
Vue.use(VueVideoPlayer);

// register global utility filters.
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
});

// permissiom judge
function hasPermission(roles, permissionRoles) {
    if (roles.indexOf('admin') >= 0) return true; // admin权限 直接通过
    if (!permissionRoles) return true;
    return roles.some(role => permissionRoles.indexOf(role) >= 0)
}

// register global progress.
const whiteList = ['/login'];// 不重定向白名单
router.beforeEach((to, from, next) => {
    NProgress.start(); // 开启Progress
    if (localStorage.getItem("token")) { // 判断是否有token
        if (to.path === '/login') {
            localStorage.removeItem('account');
            localStorage.removeItem('token');
            localStorage.removeItem('expiration');
            localStorage.removeItem('nickname');
            next({path: '/'});
        } else {
            if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
                store.dispatch('GetUserInfo').then(() => { // 拉取user_info
                    const roles = store.getters.roles;
                    store.dispatch('GenerateRoutes', {roles}).then(() => { // 生成可访问的路由表
                        router.addRoutes(store.getters.addRouters); // 动态添加可访问路由表
                        next({...to}); // hack方法 确保addRoutes已完成
                    })
                }).catch(() => {
                    store.dispatch('LogOut').then(() => {
                        next({path: '/login'});
                    })
                })
            } else {
                // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
                if (hasPermission(store.getters.roles, to.meta.role)) {
                    next();//
                } else {
                    next({path: '/401', query: {noGoBack: true}});
                }
                // 可删 ↑
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
            next()
        } else {
            next('/login'); // 否则全部重定向到登录页
            NProgress.done(); // 在hash模式下 改变手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
        }
    }
});

router.afterEach(() => {
    NProgress.done(); // 结束Progress
});


sync(store, router);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');

