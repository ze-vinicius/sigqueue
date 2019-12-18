import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Fila from "../views/Fila"
import Senha from "../views/Senha"
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
    path: '/user/criar', component: () => import('../views/user/CriarUsuario.vue')
  },
  {
    path: '/user/entrar', component: () => import('../views/user/Entrar.vue')
  },
  {
    path: '/fila/', component: Fila,
    children: [
      {
        path: 'criar',
        name: 'CriarFila',
        component: () => import('../components/CriarFila.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'lista',
        name: 'ListarFilas',
        component: () => import('../components/ListaFilas.vue'),
        meta: {
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: '/senha/', component: Senha, children: [
      {
        path: 'gerar',
        name: 'GerarSenha',
        component: () => import('../components/GerarSenha.vue')
      }
    ]
  }
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

  if (requiresAuth && !usuarioAtual) next('/user/entrar');
  // else if (!requiresAuth && usuarioAtual) next('/');
  else next()
})

export default router
