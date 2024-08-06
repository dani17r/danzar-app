import { supabase } from 'src/boot/supabase';
import { defineStore } from 'pinia';

interface JsonDataI {
  teacher: {
    title: string;
    status: boolean;
    icon: string;
  };
  adult: {
    title: string;
    status: boolean;
    icon: string;
  };
  junior: {
    title: string;
    status: boolean;
    icon: string;
  };
}
interface StoreI {
  lifecycles: {
    onMounted: boolean;
  };
  loadings: {
    init: boolean;
    update: boolean;
  };
  data:
    | null
    | {
        [key in string]: {
          id: string;
          json: JsonDataI;
          description: string;
          name: string;
        };
      };
}

export const useOptionsStore = defineStore('options', {
  state: () =>
    <StoreI>{
      lifecycles: {
        onMounted: false,
      },
      loadings: {
        init: false,
      },
      data: null,
    },
  getters: {
    isRegisterActive: (state) => {
      if (state.data) {
        const registersOption = state.data['registers'] as never as JsonDataI;
        return !Object.values(registersOption).every((val) => !val.status);
      }
      return true;
    },
  },
  actions: {
    getOptions(name = '') {
      if (!this.lifecycles.onMounted) {
        this.lifecycles.onMounted = true;

        this.loadings.init = true;
        supabase
          .from('options')
          .select('json')
          .eq('name', name)
          .then(({ data, error }) => {
            if (error) throw error;
            setTimeout(() => (this.loadings.init = false), 400);
            this.data = { [name]: data[0].json };
          });
      }
    },
    updateOptions(name = '') {
      if (this.data) {
        supabase
          .from('options')
          .update(this.data[name])
          .eq('name', name)
          .select()
          .then(({ error }) => {
            if (error) throw error;
          });
      }
    },
    updateChanel() {
      supabase
        .channel('custom-update-channel')
        .on(
          'postgres_changes',
          { event: 'UPDATE', schema: 'public', table: 'options' },
          (payload) => {
            if (this.data) {
              this.data[payload.new.name] = payload.new.json;
            }
          }
        )
        .subscribe();
    },

    reset() {
      this.lifecycles.onMounted = false;
      this.loadings.init = false;
      this.data = null;
    },
  },
});
