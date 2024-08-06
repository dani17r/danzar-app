import { useAcountsStore } from 'src/stores/acountsStore';
import { useOptionsStore } from 'src/stores/optionsStore';
import { useRolesStore } from 'src/stores/rolesStore';
import { useAuthStore } from 'src/stores/authStore';
import { useRouter, useRoute } from 'vue-router';
import { useQuasar } from 'quasar'

const acounts = useAcountsStore();
const options = useOptionsStore();
const roles = useRolesStore();
const auth = useAuthStore();

export default () => {
  const $q = useQuasar()
  const router = useRouter();
  const route = useRoute();

  const reset = () => {
    acounts.reset();
    options.reset();
    auth.reset();
  }

  return {
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