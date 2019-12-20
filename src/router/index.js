import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import firebase from 'firebase'

Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/user/join', component: () => import('../views/user/UserJoin.vue')
  },
  {
    path: '/user/login', component: () => import('../views/user/UserLogin.vue')
  },
  {
    path: '/queue/', redirect: '/queue/list'
  },
  {
    path: '/queue/new',
    component: () => import('../views/queue/NewQueue.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/queue/list',
    component: () => import('../views/queue/ListQueue.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/ticket/new/', component: () => import('../views/ticket/NewTicket.vue'),
  },
  {
    path: '/ticket/:id', component: () => import('../views/ticket/Ticket.vue'), props: true,
  },
  {
    path: '*',
    redirect: '/'
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const usuarioAtual = firebase.auth().currentUser;
  console.log(usuarioAtual)
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !usuarioAtual) next('/user/login');
  // else if (!requiresAuth && usuarioAtual) next('/');
  else next()
})

export default router
