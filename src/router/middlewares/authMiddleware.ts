
import { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
import { useAuthStore } from 'src/stores/authStore';

type ToT = RouteLocationNormalized;
type FromT = RouteLocationNormalized;
type NextT = NavigationGuardNext;

export const isLogin = async (to: ToT, _from: FromT, next: NextT) => {
  const isVerifyAuth = to.meta.auth;

  const authStore = useAuthStore();
  const isUser = await authStore.getUser();

  if (isVerifyAuth) {
    if (isUser.data) return next();
    else return next({ name: 'login' })
  }
  else {
    if (isUser.data) return next({ name: 'home' });
    else return next()
  }
}