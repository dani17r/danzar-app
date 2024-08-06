import { Dark, LocalStorage } from 'quasar'
import { computed, ref } from 'vue';

export default () => {

  const val = ref(LocalStorage.getItem('darkMode') as boolean);
  const isDark = computed(() => val.value)

  const init = () => {
    Dark.set(val.value);
  }

  const toggle = () => {
    val.value = !val.value
    LocalStorage.set('darkMode', val.value);
    Dark.set(val.value)
  };

  return {
    init,
    toggle,
    isDark,
  }

};
