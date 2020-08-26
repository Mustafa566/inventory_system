import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import 'firebase/firestore'
import { firestorePlugin } from 'vuefire'
import { mdiAccount } from '@mdi/js'
 
Vue.use(mdiAccount)
Vue.use(firestorePlugin)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
