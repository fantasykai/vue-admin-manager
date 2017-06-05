const getters = {
    token: state => state.user.token,
    avatar: state => state.user.avatar,
    nickname: state => state.user.nickname,
    uid: state => state.user.account,
    ossSts: state => state.user.ossSts,
    ossClient: state => state.user.ossClient,
};
export default getters
