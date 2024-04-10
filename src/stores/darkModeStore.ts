import { defineStore } from 'pinia';
import { Dark, LocalStorage } from 'quasar'

export const useDarkModeStore = defineStore('darkMode', {
  state: () => ({
    value: LocalStorage.getItem('darkMode'),
  }),

  getters: {
    isDark: (state) => state.value,
  },

  actions: {
    init() {
      Dark.set(this.value);
    },
    toggle() {
      this.value = !this.value
      LocalStorage.set('darkMode', this.value);
      Dark.set(this.value)
    },
  },
});
