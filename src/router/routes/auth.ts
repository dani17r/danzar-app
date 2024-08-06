import { isLogin } from '../middlewares/authMiddleware';

export default [
  {
    path: '/',
    component: () => import('layouts/AuthLayout.vue'),
    beforeEnter: [isLogin],

    children: [
      {
        path: 'inicio-de-sesion',
        name: 'login',
        meta: {
          auth: false,
        },
        component: () => import('src/pages/LoginPage.vue'),
      },
      {
        path: 'registro',
        name: 'register',
        meta: {
          auth: false,
        },
        component: () => import('src/pages/RegisterPage.vue'),
      },
      {
        path: 'restablecer-cuenta',
        name: 'reset-password',
        meta: {
          auth: false,
        },
        component: () => import('src/pages/ResetPassword.vue'),
      },
    ],
  },
];
