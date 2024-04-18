import { supabase } from 'src/boot/supabase';
import { defineStore } from 'pinia';

interface StoreI {
  lifecycles: {
    onMounted: boolean;
  };
  loadings: {
    init: boolean;
    update: boolean;
  },
  data: null | {
    id: string;
    json: {
      adult: boolean;
      junior: boolean;
      teacher: boolean;
    };
    description: string;
    name: string;
  }
}

export const useOptionsStore = defineStore('options', {
  state: () => <StoreI>({
    lifecycles: {
      onMounted: false,
    },
    loadings: {
      init: false,
    },
    data: null,
  }),
  getters: {
    // doubleCount: (state) => state.counter * 2,
  },
  actions: {
    getOptions(name = '') {
      if (!this.lifecycles.onMounted) {
        this.lifecycles.onMounted = true;

        this.loadings.init = true;
        supabase.from('options').select('*').eq('name', name)
          .then(({ data, error }) => {
            if (error) throw error;
            this.loadings.init = false;
            this.data = data[0];
          })
      }
    },
    updateOptions(name = '') {
      supabase
        .from('options')
        .update(this.data)
        .eq('name', name)
        .select()
        .then(({ error }) => {
          if (error) throw error;
        })
    },
    updateChanel() {
      supabase.channel('custom-update-channel')
        .on(
          'postgres_changes',
          { event: 'UPDATE', schema: 'public', table: 'options' },
          (payload) => {
            this.data = payload.new as StoreI['data']
          }
        )
        .subscribe()
    },

    reset() {
      this.lifecycles.onMounted = false;
      this.loadings.init = false;
      this.data = null;
    },
  },
});
