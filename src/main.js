import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import vuetify from './plugins/vuetify';
import 'firebase/firestore'
import { firestorePlugin } from 'vuefire'
import { mdiAccount } from '@mdi/js'
import 'zingchart/es6';
import zingchartVue from 'zingchart-vue';

Vue.component('zingchart', zingchartVue)
Vue.use(mdiAccount)
Vue.use(firestorePlugin)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
