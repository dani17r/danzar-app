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

interface StateI {
  lifecycles: {
    onMounted: boolean;
  };
  current: UserI | null;
  data: UserI[] | null;
}

interface InputsI {
  RegisterI: { email: string; password: string; role: string };
  LoginI: { email: string; password: string };
  ResetPasswordI: { password: string };
  VerifyCodeResetPasswordI: { email: string; token: string };
}

type ActionT = (data: UserI | null) => void;

export const useAuthStore = defineStore('auth', {
  state: () =>
    <StateI>{
      lifecycles: {
        onMounted: false,
      },
      current: null,
      data: null,
    },
  actions: {
    signUp(user: InputsI['RegisterI'], action?: ActionT) {
      supabase.auth.signUp(user).then(({ data, error }) => {
        if (error) throw error;
        action && action(data.user as unknown as UserI);
      });
    },

    signInWithPass(user: InputsI['LoginI'], action?: ActionT) {
      return supabase.auth.signInWithPassword(user).then(({ data, error }) => {
        if (error) throw error;
        action && action(data.user as unknown as UserI);
      });
    },

    signOut(action?: ActionT) {
      supabase.auth.signOut().then(({ error }) => {
        if (error) throw error;
        action && action(null);
      });
    },

    getUser(action?: ActionT, isMounted = false) {
      if (!this.lifecycles.onMounted || isMounted) {
        this.lifecycles.onMounted = true;
        supabase.auth.getUser().then(({ data, error }) => {
          if (error) {
            action && action(null);
            throw 'Usuario no Autenticado';
          }
          action && action(data.user as unknown as UserI);
          this.current = data.user as unknown as UserI;
        });
      }
    },

    resetPassword(payload: InputsI['ResetPasswordI'], action?: ActionT) {
      supabase.auth.updateUser(payload).then(({ data, error }) => {
        if (error) throw error;
        action && action(data as unknown as UserI);
      });
    },

    resetPasswordForEmail(email: string, action?: ActionT) {
      supabase.auth.resetPasswordForEmail(email).then(({ data, error }) => {
        if (error) throw error;
        action && action(data as unknown as UserI);
      });
    },

    VerifyCodeResetPassword(
      payload: InputsI['VerifyCodeResetPasswordI'],
      action?: ActionT
    ) {
      supabase.auth
        .verifyOtp({ ...payload, type: 'recovery' } as never)
        .then(({ data, error }) => {
          if (error) throw error;
          action && action(data as unknown as UserI);
        });
    },

    updateUser(user: UserI, action?: ActionT) {
      supabase.auth.updateUser(user).then(({ data, error }) => {
        if (error) throw error;
        action && action(data as unknown as UserI);
      });
    },

    inviteUserByEmail(email: string, action?: ActionT) {
      supabase.auth.admin.inviteUserByEmail(email).then(({ data, error }) => {
        if (error) throw error;
        action && action(data as unknown as UserI);
      });
    },

    reset() {
      this.lifecycles.onMounted = false;
      this.current = null;
      this.data = null;
    },
  },
});
