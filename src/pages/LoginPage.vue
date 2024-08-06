<script setup lang="ts">
/* eslint-disable  @typescript-eslint/no-explicit-any */
import WrapperOfLoading from 'src/components/WrapperOfLoading.vue';
import { superForm, formResetDefault } from 'src/utils/actions';
import superComposable from 'src/composables/superComposable';
import { required } from 'src/utils/validations';

const { store, router, $q } = superComposable();

const form = superForm({
  email: {
    value: 'dan@dan.com',
    rules: [required],
  },
  password: {
    value: '123456',
    view: false,
    rules: [required],
  },
});

const onSubmit = () => {
  store.auth
    .signInWithPass(
      {
        email: form.email.value,
        password: form.password.value,
      },
      () => {
        router.push({ name: 'home' });
      }
    )
    .catch((error) => {
      if (error.message.includes('Invalid login credentials')) {
        $q.notify({
          type: 'negative',
          message: 'Usuario o contraseña incorrecta.',
        });
      }
    });
};

const onReset = () => {
  form.resetValidation();
  formResetDefault(form);
};
</script>

<template>
  <q-page class="flex flex-center">
    <WrapperOfLoading :auto="true">
      <q-card class="q-pa-md box-card-content">
        <q-form :ref="form.getRef" @submit="onSubmit" @reset="onReset">
          <q-card-section class="text-center">
            <div class="text-h4 text-weight-bold text-primary">
              Inicio de sesion
            </div>
            <i class="text-grey-8 t-block">Academia de danza Daniela Salazar</i>
          </q-card-section>
          <q-card-section>
            <q-input
              v-model="form.email.value"
              :rules="form.email.rules"
              label="E-mail"
              clearable
              outlined
              dense
            ></q-input>
            <q-input
              :type="!form.password.view ? 'password' : 'text'"
              v-model="form.password.value"
              :rules="form.password.rules"
              label="Contraseña"
              class="q-mt-md"
              clearable
              outlined
              dense
            >
              <template v-slot:append>
                <q-icon
                  :name="!form.password.view ? 'visibility_off' : 'visibility'"
                  @click="form.password.view = !form.password.view"
                  class="cursor-pointer"
                />
              </template>
            </q-input>
          </q-card-section>
          <q-card-section>
            <q-btn
              class="full-width t-rounded-lg no-shadow"
              label="Iniciar"
              color="primary"
              type="submit"
              unelevated
              no-caps
            />
            <q-btn
              class="full-width t-rounded-lg no-shadow"
              color="primary"
              label="Limpiar"
              type="reset"
              no-caps
              flat
            />
          </q-card-section>
          <q-card-section class="text-center q-pt-none">
            <div class="text-grey-8">
              Olvidaste tu contraseña?
              <router-Link
                class="text-secondary text-weight-bold"
                :to="{ name: 'reset-password' }"
                style="text-decoration: none"
                tag="a"
                >Restaurala aqui</router-Link
              >
            </div>
            <div class="text-grey-8">
              Quiero crear una
              <router-Link
                class="t-underline t-inline-flex t-mt-2 text-secondary text-weight-bold"
                style="text-decoration: none"
                :to="{ name: 'register' }"
                tag="a"
                >cuenta nueva.</router-Link
              >
            </div>
          </q-card-section>
        </q-form>
      </q-card>
    </WrapperOfLoading>
  </q-page>
</template>

<style>
.box-card-content {
  width: 32em;
  box-shadow: none;
}
</style>
