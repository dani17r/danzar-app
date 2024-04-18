
import { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
import { useAcountsStore } from 'src/stores/acountsStore';
import { useAuthStore } from 'src/stores/authStore';

type ToT = RouteLocationNormalized;
type FromT = RouteLocationNormalized;
type NextT = NavigationGuardNext;

export const isLogin = (to: ToT, _from: FromT, next: NextT) => {
  const isVerifyAuth = to.meta.auth;

  const acountsStore = useAcountsStore();
  const authStore = useAuthStore();

  authStore.getUser((user) => {
    if (isVerifyAuth) {
      if (user) {
        acountsStore.getAcount(user.id);
        next();
      }
      else next({ name: 'login' })
    }
    else {
      if (user) {
        next({ name: 'home' });
        acountsStore.getAcount(user.id);
      }
      else next();
    }
  }, true);
}