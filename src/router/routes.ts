import { RouteRecordRaw } from 'vue-router';
import { isLogin } from './middlewares/authMiddleware';
import authRoutes from './routes/auth';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    beforeEnter: [isLogin],
    meta: {
      auth: true,
    },
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('pages/IndexPage.vue')
      },
      {
        path: 'opciones',
        name: 'options',
        component: () => import('pages/OptionsPage.vue')
      },
      {
        path: 'alumnos',
        name: 'juniors',
        component: () => import('pages/UsersJuniorPage.vue')
      },
      {
        path: 'representantes',
        name: 'adults',
        component: () => import('pages/UsersAdultPage.vue')
      },
    ],
  },
  ...authRoutes,

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
