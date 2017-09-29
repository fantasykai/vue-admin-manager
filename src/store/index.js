import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import actions from './actions'
import mutations from './mutations'
import user from './modules/user';
import permission from './modules/permission';
import getters from './getters'

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        user,
        permission
    },
    getters,
    state,
    actions,
    mutations
});

export default store
