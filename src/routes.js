import Login from './components/page/Login.vue';
import NotFoundView from './components/common/error/404.vue';
import NotPermission from './components/common/error/401.vue';
import Home from './components/common/HomeMenu.vue';
import Dashboard from './components/page/Dashboard.vue';
import CycleCharts from './components/page/UserNumCycleCharts.vue';
import LoggedUserNumCharts from './components/page/LoggedUserNumCycleCharts.vue';
// import ChatRecord from './components/page/ChatRecord.vue';
import AnchorMsgMass from './components/page/AnchorMsgMass.vue';
import AnchorDataStat from './components/page/AnchorDataStat.vue';
import AnchorDetail from './components/page/AnchorDetail.vue';
import UserManage from './components/page/UserManage.vue';
import FriendsManage from './components/page/friends/FriendsManage.vue';
import FirendInRow from './components/page/friends/FriendsInRow.vue';
import OperatingAccountManage from './components/page/operation/OperatingAccountManage.vue';
import AutoReplyCfg from './components/page/operation/AutoReplyCfg.vue';
import NewsMassManage from './components/page/operation/NewsMassManage.vue';
import FriendNumRanked from './components/page/friends/FriendNumRanked.vue';
import FrisNumCycleCharts from './components/page/friends/stat/FrisNumCycleCharts.vue';
import MsgNumCycleCharts from './components/page/msg/stat/MsgNumCycleCharts.vue';
import SendMsgNumRanked from './components/page/msg/SendMsgNumRanked.vue';


let routes = [
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
        iconCls: 'el-icon-star-on',
        leaf: true,//只有一个节点
        children: [
            {path: '/dashboard', component: Dashboard, name: '应用概况'}
        ]
    },
    {
        path: '/',
        component: Home,
        name: '数据趋势',
        iconCls: 'el-icon-menu',
        children: [
            {path: '/cycleCharts', component: CycleCharts, name: '注册用户趋势'},
            {path: '/loggedUserNumCharts', component: LoggedUserNumCharts, name: '活跃用户趋势'},
            {path: '/frisNumCycleCharts', component: FrisNumCycleCharts, name: '用户关系趋势'},
            {path: '/msgNumCycleCharts', component: MsgNumCycleCharts, name: '用户聊天消息数量趋势'}
        ]
    },
    {
        path: '/',
        component: Home,
        name: '用户管理',
        iconCls: 'el-icon-star-off',
        children: [
            {path: '/userManage', component: UserManage, name: 'Sys用户管理'},
            {path: '/friendNumRanked', component: FriendNumRanked, name: '好友数量 TOP50'},
            {path: '/sendMsgNumRanked', component: SendMsgNumRanked, name: '发送消息数量 TOP50'},
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
        iconCls: 'el-icon-date',
        children: [
            // {path: '/videoTest', component: VideoTest, name: '视频播放测试'},
            {path: '/anchorMsgMass', component: AnchorMsgMass, name: '主播消息转发管理'},
            {path: '/anchorDataStat', component: AnchorDataStat, name: '主播数据统计'},
            {
                path: '/anchorDetail/:fromUserId',
                component: AnchorDetail,
                name: '主播详情',
                hidden: true
            },
            {path: '/operatingAccountManage', component: OperatingAccountManage, name: '推广试验田'},
            {
                path: '/autoReplyCfg',
                component: AutoReplyCfg,
                name: '自动回复设置',
                hidden: true
            },
            {
                path: '/newsMassManage',
                component: NewsMassManage,
                name: '运营账号消息群发',
                hidden: true
            },
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: {path: '/404'}
    }
];

export default routes;
