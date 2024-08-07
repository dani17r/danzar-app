<script setup lang="ts">
/* eslint-disable  @typescript-eslint/no-explicit-any */
import WrapperOfLoading from 'src/components/WrapperOfLoading.vue';
import { required, requiredSelect } from 'src/utils/validations';
import superComposable from 'src/composables/superComposable';
import { formResetDefault } from 'src/utils/actions';
import { superForm } from 'src/utils/super';
import { onMounted, watchEffect } from 'vue';

const { store, router, $q } = superComposable();

store.options.updateChanel();

const form = superForm({
  email: {
    value: '',
    rules: [required],
  },
  password: {
    value: '',
    view: false,
    rules: [required],
  },
  registerOptions: {
    data: [],
    value: '',
    rules: [requiredSelect],
  },
});

const onSubmit = () => {
  store.auth.signUp(
    {
      email: form.email.value,
      password: form.password.value,
      role: form.registerOptions.value,
    },
    () => {
      $q.notify({
        type: 'positive',
        message: 'Te haz registrado satisfactoriamente',
        onDismiss() {
          router.push({ name: 'login' });
        },
      });
    }
  );
};

const onReset = () => {
  form.resetValidation();
  formResetDefault(form);
};

watchEffect(() => {
  if (store.options.data) {
    const registersOption = store.options.data['registers'];
    form.registerOptions.data = Object.values(registersOption) as never[];
  }
});

onMounted(() => {
  store.options.getOptions('registers');
});
</script>

<template>
  <q-page class="flex flex-center">
    <WrapperOfLoading :status="store.options.loadings.init">
      <q-card
        class="q-pa-md box-card-content"
        v-if="store.options.isRegisterActive"
      >
        <q-form @submit="onSubmit" @reset="onReset" :ref="form.getRef">
          <q-card-section class="text-center t-px-2">
            <div class="text-primary text-h4 text-weight-bold">
              Registro de persona
            </div>
            <p class="text-grey-8 t-text-sm">
              Registrate aqui para crear y acceder a una cuenta.
            </p>
          </q-card-section>

          <q-card-section>
            <q-select
              :disable="!form.registerOptions.data.length"
              v-model="form.registerOptions.value"
              :loading="!form.registerOptions.data.length"
              :options="form.registerOptions.data"
              :rules="form.registerOptions.rules"
              option-label="title"
              label="soy ..."
              class="q-mt-md"
              clearable
              outlined
              dense
            >
              <template v-slot:option="scope">
                <q-item v-bind="scope.itemProps" v-if="scope.opt.status">
                  <q-item-section avatar>
                    <q-icon :name="scope.opt.icon" color="primary" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ scope.opt.title }}</q-item-label>
                  </q-item-section>
                </q-item>
              </template>
            </q-select>

            <q-input
              v-model="form.email.value"
              :rules="form.email.rules"
              label="Email Address"
              class="q-mt-md"
              outlined
              dense
            ></q-input>

            <q-input
              :type="!form.password.view ? 'password' : 'text'"
              v-model="form.password.value"
              :rules="form.password.rules"
              label="Constraseña"
              class="q-mt-md"
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
              label="Registrar"
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
              Quieres iniciar sesion ?
              <router-Link
                class="text-secondary text-weight-bold"
                style="text-decoration: none"
                :to="{ name: 'login' }"
                tag="a"
                >Inicia aqui</router-Link
              >
            </div>
          </q-card-section>
        </q-form>
      </q-card>
      <q-card class="q-pa-md box-card-content" v-else>
        <q-card-section class="text-center q-pt-none">
          <h2 class="text-h4 text-grey-9 text-weight-bold">
            Este registro no esta habilitado
          </h2>
          <p class="text-grey-8">
            contactate conmigo: <a href="#">Daniela Salazar</a>
          </p>
        </q-card-section>
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
