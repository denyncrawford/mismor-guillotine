import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
        path: '/',
        name: 'scan',
        component: () => import('./views/Index.vue'),
        meta: {
            title: 'Marcar turno'
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
    },
    {
      path: "/mode",
      name: 'mode',
      component: () => import('./views/Mode.vue'),
      meta: {
        title: 'Seleccionar modo'
      }
    },
    {
        path: '/auth/:go',
        name: 'auth',
        component: () => import('./views/Auth.vue'),
        meta: {
            title: 'Autenticar usuario'
        }
    },
    {
      path: "/logOut",
      name: 'logout',
      component: () => import('./views/LogOut.vue'),
      meta: {
        title: 'Cerrar sesión'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue'),
      meta: {
          title: 'Ingresar al sistema'
      }
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('./views/admin/Admin.vue'),
      meta: {
          title: 'Panel de control'
      }
    },
    {
      path: '/newUser',
      name: 'newUser',
      component: () => import('./views/admin/CreateUser.vue'),
      meta: {
          title: 'Crear nuevo colaborador'
      }
    },
    {
      path: '/editUser/:id',
      name: 'editUser',
      component: () => import('./views/admin/EditUser.vue'),
      meta: {
          title: 'Editar colaborador'
      }
    },
    {
      path: '/profile/:id',
      name: 'profile',
      component: () => import('./views/admin/UserProfile.vue'),
      meta: {
          title: 'Perfil de usuario'
      }
    },
    {
      path: '/inning/:id',
      name: 'inning',
      component: () => import('./views/admin/InningView.vue'),
      meta: {
          title: 'Vista de turno'
      }
    },
  ]
})

export default router
