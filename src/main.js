import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueRouter from 'vue-router'
import store from './store'
import Vuex from 'vuex'
import routes from './routes'
import {sync} from 'vuex-router-sync'
import VueVideoPlayer from 'vue-video-player'

import Mock from './mock';
Mock.bootstrap();


Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(VueVideoPlayer)

const router = new VueRouter({
    routes
})

// Some middleware to help us ensure the user is authenticated.
router.beforeEach((to, from, next) => {
    //NProgress.start();
    if (to.path === '/login') {
        localStorage.removeItem('account');
        localStorage.removeItem('token');
        localStorage.removeItem('expiration');
        localStorage.removeItem('nickname');
    }
    let token = localStorage.getItem('token');
    if (!token && to.path != '/login') {
        next({path: '/login'})
    } else if (token && to.path === '/') {
        next({path: '/dashboard'})
    }
    else {
        next()
    }
})

sync(store, router)


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

