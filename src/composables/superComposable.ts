import { useAcountsStore } from 'src/stores/acountsStore';
import { useOptionsStore } from 'src/stores/optionsStore';
import { useRolesStore } from 'src/stores/rolesStore';
import { useAuthStore } from 'src/stores/authStore';
import { useRouter, useRoute } from 'vue-router';
import notifications from 'src/utils/notifications';
import { useQuasar } from 'quasar';

const acounts = useAcountsStore();
const options = useOptionsStore();
const roles = useRolesStore();
const auth = useAuthStore();

export default () => {
  const notify = notifications();
  const router = useRouter();
  const route = useRoute();
  const $q = useQuasar();

  const reset = () => {
    acounts.reset();
    options.reset();
    auth.reset();
  }

  return {
    notify,
    router,
    route,
    store: {
      reset,
      acounts,
      options,
      roles,
      auth,
    },
    $q
  }
}