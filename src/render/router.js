import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
        path: '/',
        name: 'index',
        component: () => import('./views/Index.vue'),
        meta: {
            title: 'Home'
        }
    },
    {
        path: '/create',
        name: 'create',
        component: () => import('./views/Create.vue'),
        meta: {
            title: 'Create'
        }
    },
    {
        path: '/loading',
        name: 'loading',
        component: () => import('./views/Loading.vue'),
        meta: {
            title: 'Cargando...'
        }
    },
    {
      path: '/init',
      name: 'init',
      component: () => import('./views/init/Init.vue'),
      meta: {
        title: 'Configurar Aplicación'
      }
    },
    { 
      path: "/configure",
      name: 'configure',
      component: () => import('./views/init/Configure.vue'),
      meta: {
        title: 'Configurar Aplicación'
      }
    }
  ]
})

export default router
