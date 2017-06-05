import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import actions from './actions'
import mutations from './mutations'
import user from './modules/user';
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        user,
    },
    getters,
    state,
    actions,
    mutations
})
