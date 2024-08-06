<script setup lang="ts">
import superComposable from 'src/composables/superComposable';
import { ref } from 'vue';

const { store, router } = superComposable();

/* eslint-disable  @typescript-eslint/no-explicit-any */
const isSendEmail = ref(false);
const isChangePassword = ref(false);

const form = {
  email: {
    val: ref(''),
    refs: ref<any>(null),
    rules: [(val: string) => (val && val.length > 0) || 'No puede estar vacio'],
  },
  code: {
    val: ref(''),
    refs: ref<any>(null),
    rules: [(val: string) => (val && val.length > 0) || 'No puede estar vacio'],
  },
  newPassword: {
    val: ref(''),
    view: ref(false),
    refs: ref<any>(null),
    rules: [(val: string) => (val && val.length > 0) || 'No puede estar vacio'],
  },
  checkPassword: {
    val: ref(''),
    view: ref(false),
    refs: ref<any>(null),
    rules: [(val: string) => (val && val.length > 0) || 'No puede estar vacio'],
  },
};

const onSubmit = () => {
  if (!isSendEmail.value) {
    form.email.refs.value?.validate();

    if (!form.email.refs.value?.hasError) {
      store.auth.resetPasswordForEmail(form.email.val.value, () => {
        console.log('se envio');
        isSendEmail.value = true;
      });
    }
  } else {
    form.code.refs.value?.validate();

    if (!form.code.refs.value?.hasError) {
      store.auth.VerifyCodeResetPassword(
        {
          email: form.email.val.value,
          token: form.code.val.value,
        },
        () => {
          isSendEmail.value = false;
          isChangePassword.value = true;
        }
      );
    }
  }

  if (isChangePassword.value) {
    form.newPassword.refs.value?.validate();
    form.code.refs.value?.validate();

    if (!form.code.refs.value?.hasError) {
      store.auth.resetPassword(
        {
          password: form.newPassword.val.value,
        },
        () => {
          isChangePassword.value = false;
          router.push({ name: 'login' });
        }
      );
    }
  }
};

const onReset = () => {
  if (!isSendEmail.value) {
    form.email.val.value = '';
    setTimeout(() => form.email.refs.value.resetValidation(), 10);
  } else {
    form.code.val.value = '';
    setTimeout(() => form.code.refs.value.resetValidation(), 10);
  }

  if (isChangePassword.value) {
    form.newPassword.val.value = '';
    form.checkPassword.val.value = '';
    setTimeout(() => {
      form.newPassword.refs.value.resetValidation();
      form.checkPassword.refs.value.resetValidation();
    }, 10);
  }
};
</script>

<template>
  <q-page class="flex flex-center">
    <q-card class="q-pa-md box-card-content">
      <form @submit.prevent.stop="onSubmit" @reset.prevent.stop="onReset">
        <q-card-section class="text-center">
          <div class="text-h4 text-weight-bold text-primary">
            Restablecimiento de contraseña.
          </div>
          <i class="text-grey-8 t-block">Academia de danza Daniela Salazar</i>
        </q-card-section>
        <q-card-section v-if="!isChangePassword">
          <q-input
            v-if="!isSendEmail"
            dense
            outlined
            v-model="form.email.val.value"
            label="E-mail"
            :ref="(val) => (form.email.refs.value = val)"
            :rules="form.email.rules"
          ></q-input>
          <q-input
            v-else
            dense
            outlined
            v-model="form.code.val.value"
            label="Code"
            :ref="(val) => (form.code.refs.value = val)"
            :rules="form.code.rules"
          ></q-input>
        </q-card-section>
        <q-card-section v-else>
          <q-input
            dense
            outlined
            class="q-mt-md"
            v-model="form.newPassword.val.value"
            label="Nueva Contraseña"
            :ref="(val) => (form.newPassword.refs.value = val)"
            :rules="form.newPassword.rules"
            :type="form.newPassword.view.value ? 'password' : 'text'"
          >
            <template v-slot:append>
              <q-icon
                :name="
                  form.newPassword.view.value ? 'visibility_off' : 'visibility'
                "
                class="cursor-pointer"
                @click="
                  form.newPassword.view.value = !form.newPassword.view.value
                "
              />
            </template>
          </q-input>
          <q-input
            dense
            outlined
            class="q-mt-md"
            v-model="form.checkPassword.val.value"
            label="Verificacion de Contraseña"
            :ref="(val) => (form.checkPassword.refs.value = val)"
            :rules="[
              ...form.checkPassword.rules, 
              (val: string) => (val == form.newPassword.val.value) || 'Contraseña diferente',
            ]"
            :type="form.checkPassword.view.value ? 'password' : 'text'"
          >
            <template v-slot:append>
              <q-icon
                :name="
                  form.checkPassword.view.value
                    ? 'visibility_off'
                    : 'visibility'
                "
                class="cursor-pointer"
                @click="
                  form.checkPassword.view.value = !form.checkPassword.view.value
                "
              />
            </template>
          </q-input>
        </q-card-section>
        <q-card-section>
          <q-btn
            unelevated
            color="primary"
            label="Resetear"
            no-caps
            class="full-width t-rounded-lg no-shadow"
            type="submit"
          />
          <q-btn
            flat
            color="primary"
            label="Limpiar"
            no-caps
            class="full-width t-rounded-lg no-shadow"
            type="reset"
          />
        </q-card-section>
        <q-card-section class="text-center q-pt-none">
          <div class="text-grey-8">
            Quiero iniciar
            <router-Link
              tag="a"
              :to="{ name: 'login' }"
              class="t-underline t-inline-flex t-mt-2 text-secondary text-weight-bold"
              style="text-decoration: none"
              >Sesion.</router-Link
            >
          </div>
          <div class="text-grey-8">
            Quiero crear una
            <router-Link
              tag="a"
              :to="{ name: 'register' }"
              class="t-underline t-inline-flex t-mt-2 text-secondary text-weight-bold"
              style="text-decoration: none"
              >cuenta nueva.</router-Link
            >
          </div>
        </q-card-section>
      </form>
    </q-card>
  </q-page>
</template>

<style>
.box-card-content {
  width: 32em;
  box-shadow: none;
}
</style>
