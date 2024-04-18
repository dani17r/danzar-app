import { isLogin } from '../middlewares/authMiddleware';

export default [
  {
    path: '/inicio-de-sesion',
    component: () => import('layouts/AuthLayout.vue'),
    beforeEnter: [isLogin],
    meta: {
      auth: false,
    },
    children: [
      {
        path: '',
        name: 'login',
        component: () => import('src/pages/LoginPage.vue'),
      },
    ]
  },
  {
    path: '/registro',
    component: () => import('layouts/AuthLayout.vue'),
    beforeEnter: [isLogin],
    meta: {
      auth: false,
    },
    children: [
      {
        path: '',
        name: 'register',
        component: () => import('src/pages/registers/RegisterPage.vue'),
      },
    ],
  },
]