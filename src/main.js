import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import VueFire from 'vuefire'
import firebase from 'firebase';

Vue.use(VueFire);

const config = {
  apiKey: "AIzaSyB-SUTKSlbwjkitO3tn7NtHrmGNDFq0uc8",
  authDomain: "sigqueue-4a1e0.firebaseapp.com",
  databaseURL: "https://sigqueue-4a1e0.firebaseio.com",
  projectId: "sigqueue-4a1e0",
  storageBucket: "sigqueue-4a1e0.appspot.com",
  messagingSenderId: "318596839699",
  appId: "1:318596839699:web:58ec6ecb863145677002e6",
  measurementId: "G-XVTS92Y39T"
};

let firebaseapp = firebase.initializeApp(config);
let db = firebaseapp.firestore();

let filasRef = db.ref('filas');
console.log(filasRef)
// Vue.prototype.$firebase = firebase;

Vue.config.productionTip = false

let app = ''
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      vuetify,
      render: h => h(App)
    }).$mount('#app')

  }
})
