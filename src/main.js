import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import firebase from './plugins/firebase'

Vue.config.productionTip = false

let app = ''
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    new Vue({
      router,
      vuetify,
      render: h => h(App)
    }).$mount('#app')

  }
})
