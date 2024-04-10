import { supabase } from 'src/boot/supabase';
import { defineStore } from 'pinia';

interface UserI {
  instance_id?: string;
  id: string;
  aud?: string;
  role?: string;
  email?: string;
  encrypted_password?: string;
  email_confirmed_at?: Date;
  invited_at?: Date;
  confirmation_token?: string;
  confirmation_sent_at?: Date;
  recovery_token?: string;
  recovery_sent_at?: Date;
  email_change_token_new?: string;
  email_change?: string;
  email_change_sent_at?: Date;
  last_sign_in_at?: Date;
  raw_app_meta_data?: Record<string, unknown>;
  raw_user_meta_data?: Record<string, unknown>;
  is_super_admin?: boolean;
  created_at?: Date;
  updated_at?: Date;
  phone?: string;
  phone_confirmed_at?: Date;
  phone_change?: string;
  phone_change_token?: string;
  phone_change_sent_at?: Date;
  confirmed_at?: Date;
  email_change_token_current?: string;
  email_change_confirm_status?: number;
  banned_until?: Date;
  reauthentication_token?: string;
  reauthentication_sent_at?: Date;
  is_sso_user?: boolean;
  deleted_at?: Date;
  is_anonymous?: boolean;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    counter: 0,
  }),
  actions: {

    async signUp() {
      const { data, error } = await supabase.auth.signUp({
        email: 'someone@email.com',
        password: 'xlnnJTcWWeaseTwoNsfC'
      })
      return { data, error }
    },

    async signInWithPass(user: { email: string, password: string }) {
      const { data, error } = await supabase.auth.signInWithPassword(user)
      return { data, error }
    },

    async signOut() {
      const { error } = await supabase.auth.signOut()
      return error
    },

    async getUser() {
      const { data: { user } } = await supabase.auth.getUser()
      return { data: user };
    },

    async resetPasswordForEmail(email: string) {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email)
      return { data, error }
    },

    async updateUser(user: UserI) {
      const { data, error } = await supabase.auth.updateUser(user);

      return { data, error }
    },

    async inviteUserByEmail(email: string) {
      const { data, error } = await supabase.auth.admin.inviteUserByEmail(email)
      return { data, error }
    },
  },
});
