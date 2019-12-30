import Vue from 'vue'
import VueComposition from '@vue/composition-api'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible/flexible'
import {Button, Image, NavBar, Icon,Field,TreeSelect,Checkbox,CheckboxGroup,Cell,CellGroup,Toast,Row, Col } from 'vant';

Vue.use(Button).use(Image).use(NavBar).use(Icon).use(Field).use(TreeSelect).use(Checkbox).use(CheckboxGroup).use(Cell)
    .use(CellGroup).use(Toast).use(Row).use(Col).use(VueComposition)
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

