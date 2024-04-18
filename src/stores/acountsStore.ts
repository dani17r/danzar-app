import { supabase } from 'src/boot/supabase';
import { defineStore } from 'pinia';

interface AcountI {
  id: bigint;
  number: string;
  auth_user_id: string;
  full_name: string;
  role: string;
  address: string;
  cedula: string;
  phone: string;
  image_url: string;
  birthdate: Date;
  created_at: Date;
}

type ActionT = <T = AcountI>(data: T) => void;

interface StateI {
  lifecycles: {
    onMounted: boolean;
  };
  current: AcountI | null;
  data: AcountI[] | null;
}

export const useAcountsStore = defineStore('acounts', {
  state: () => <StateI>({
    lifecycles: {
      onMounted: false,
    },
    current: null,
    data: null
  }),
  actions: {
    getAcount(user_id: string, action?: ActionT) {
      if (!this.lifecycles.onMounted) {
        this.lifecycles.onMounted = true;

        supabase
          .from('acounts')
          .select('*')
          .eq('user_id', user_id)
          .then(({ data, error }) => {
            if (error) throw error;
            this.current = data[0] as unknown as AcountI;
            action && action(data[0])
          })
      }
    },

    reset() {
      this.lifecycles.onMounted = false;
      this.current = null;
      this.data = null;
    },

  },
});
