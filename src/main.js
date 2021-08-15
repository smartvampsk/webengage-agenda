import Vue from 'vue'
import VueRouter from 'vue-router';
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'

import App from './App.vue'
import Index from './components/Index.vue'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(VueRouter);
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
// Vue.use(require('vue-moment'))


Vue.config.productionTip = false

const routes = [
    {
        name: 'Index',
        path: '/',
        component: Index
    },
];

const router = new VueRouter({mode: 'history', routes: routes});

new Vue({
    render: h => h(App),
    router
}).$mount('#app')
