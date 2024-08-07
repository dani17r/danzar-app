import { useQuasar } from 'quasar';

export default () => {
  const $q = useQuasar();

  return {
    error: (message: string) => $q.notify({
      color: 'negative',
      progress: true,
      position: 'top',
      icon: 'error',
      message,
    }),
  }

}