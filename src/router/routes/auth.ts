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
    meta: {
      auth: false,
    },
    children: [
      {
        path: '',
        redirect: { name: 'junior' }
      },
      {
        path: 'representantes',
        name: 'adult',
        component: () => import('src/pages/registers/AdultRegisterPage.vue'),
      },
      {
        path: 'alumnos',
        name: 'junior',
        component: () => import('src/pages/registers/JuniorRegisterPage.vue')
      },
      {
        path: 'maestros',
        name: 'teacher',
        component: () => import('src/pages/registers/TeacherRegisterPage.vue')
      }
    ],
  },
]