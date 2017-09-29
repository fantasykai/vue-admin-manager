const getters = {
    token: state => state.user.token,
    roles: state => state.user.roles,
    avatar: state => state.user.avatar,
    nickname: state => state.user.nickname,
    uid: state => state.user.account,
    ossSts: state => state.user.ossSts,
    ossClient: state => state.user.ossClient,
    permission_routers: state => state.permission.routers,
    addRouters: state => state.permission.addRouters,
};
export default getters
