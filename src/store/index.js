import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const Store = new Vuex.Store({
    state: {
      token:localStorage.getItem('token')?localStorage.getItem('token'):null
    },
    getters: {},
    mutations: {
        //这是执行同步操作
        increment(state) {
            state.count += 1;
        },
        decrement(state) {
            state.count -= 1;
        },
        set_token(state,token){
            localStorage.setItem('token',token)
            state.token=localStorage.getItem('token')
        }

    },
    actions: {
        //这是执行异步操作
        increment(context) {
            context.state.count += 1;
            context.commit('increment')
        }
    },
    modules: {}
})

export default Store