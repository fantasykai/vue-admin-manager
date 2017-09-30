import Vue from 'vue';
import Router from 'vue-router';
import Login from './components/page/Login.vue';
import NotFoundView from './components/common/error/404.vue';
import NotPermission from './components/common/error/401.vue';
import Home from './components/common/HomeMenu.vue';
import Dashboard from './components/page/dashboard/index.vue';
import CycleCharts from './components/page/userDataStat/UserNumCycleCharts.vue';
import LoggedUserNumCharts from './components/page/userDataStat/LoggedUserNumCycleCharts.vue';
import AnchorMsgMass from './components/page/operation/AnchorMsgMass.vue';
import UserManage from './components/page/userManage/UserManage.vue';
import FriendsManage from './components/page/friends/FriendsManage.vue';
import FirendInRow from './components/page/friends/FriendsInRow.vue';
import OperatingAccountManage from './components/page/operation/OperatingAccountManage.vue';
import AutoReplyCfg from './components/page/operation/AutoReplyCfg.vue';
import FrisNumCycleCharts from './components/page/friends/stat/FrisNumCycleCharts.vue';
import MsgNumCycleCharts from './components/page/msg/stat/MsgNumCycleCharts.vue';
import GeoUserNumCityRanked from './components/page/userDataStat/GeoUserNumCityRanked.vue';

Vue.use(Router);

export const defaultRouterMap = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFoundView,
        name: '',
        hidden: true
    },
    {
        path: '/401',
        component: NotPermission,
        name: '',
        hidden: true
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '',
        // iconCls: 'el-icon-star-on',
        icon: 'favorfill',
        leaf: true,//只有一个节点
        children: [
            {path: '/dashboard', component: Dashboard, name: '应用概况'}
        ]
    }
];

export default new Router({
    // mode: 'history', //后端支持可开
    scrollBehavior: () => ({y: 0}),
    routes: defaultRouterMap
});

export const asyncRouterMap = [
    {
        path: '/',
        component: Home,
        name: '数据趋势',
        meta: {role: ['admin']},
        // iconCls: 'el-icon-menu',
        icon: 'statsbars',
        children: [
            {path: '/cycleCharts', component: CycleCharts, name: '注册用户趋势'},
            {path: '/loggedUserNumCharts', component: LoggedUserNumCharts, name: '活跃用户趋势'},
            {path: '/frisNumCycleCharts', component: FrisNumCycleCharts, name: '用户关系趋势'},
            {path: '/msgNumCycleCharts', component: MsgNumCycleCharts, name: '用户聊天消息数量趋势'},
            {path: '/geoUserNumCityRanked', component: GeoUserNumCityRanked, name: '城市用户分布图'},
        ]
    },
    {
        path: '/',
        component: Home,
        name: '用户管理',
        meta: {role: ['admin']},
        // iconCls: 'el-icon-star-off',
        icon: 'users',
        children: [
            {path: '/userManage', component: UserManage, name: 'Sys用户管理'},
            {
                path: '/friendsManage',
                component: FriendsManage,
                name: 'Sys好友管理',
                hidden: true
            },
            {
                path: '/firendInRow',
                component: FirendInRow,
                name: '分组中的好友',
                hidden: true
            }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '运营数据',
        meta: {role: ['admin']},
        // iconCls: 'el-icon-date',
        icon: 'unie67e',
        children: [
            // {path: '/videoTest', component: VideoTest, name: '视频播放测试'},
            {path: '/anchorMsgMass', component: AnchorMsgMass, name: '消息转发管理'},
            {path: '/operatingAccountManage', component: OperatingAccountManage, name: '推广试验田'},
            {
                path: '/autoReplyCfg',
                component: AutoReplyCfg,
                name: '自动回复设置',
                hidden: true
            }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: {path: '/404'}
    }
];

