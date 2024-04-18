<script setup lang="ts">
import superComposable from 'src/composables/superComposable';
import { onMounted, ref } from 'vue'

const { store, router, $q } = superComposable()

store.options.updateChanel();

const optionsDefault = ref('Alumna/o');
const options = ref<string[]>([]);

const email = ref('');
const password = ref('');

const register = () => {
  store.auth.signUp(
    {
      email: email.value,
      password: password.value,
      role: optionsDefault.value,
    },
    () => {
      $q.notify({
        type: 'positive',
        message: 'Te haz registrado satisfactoriamente',
        onDismiss() {
          router.push({ name: 'login' })
        },
      })

    })
}

onMounted(() => {
  store.options.getOptions('registers');
  options.value = Object.values(store.roles.info)
  options.value.shift()
})
</script>

<template>
  <q-page class="flex flex-center">
    <template v-if="!store.options.loadings.init && store.options.data">
      <q-card class="q-pa-md box-card-content" v-if="store.options.data.json.junior">
        <q-card-section class="text-center">
          <div class="text-grey-9 text-h4 text-weight-bold">Registro de persona
          </div>
          <a href="#" class="text-grey-8">Inicia sesión a aqui para acceder a tu cuenta</a>
        </q-card-section>

        <q-card-section>
          <q-select dense outlined v-model="optionsDefault" :options="options" label="soy ..." />
        </q-card-section>
        <q-card-section>
          <q-input dense outlined v-model="email" label="Email Address"></q-input>
          <q-input dense outlined class="q-mt-md" v-model="password" type="password" label="Password"></q-input>
        </q-card-section>
        <q-card-section>
          <q-btn style="border-radius: 8px;" color="dark" rounded size="md" label="Sign in" no-caps class="full-width"
            @click="register()"></q-btn>
        </q-card-section>
        <q-card-section class="text-center q-pt-none">
          <div class="text-grey-8">Don't have an account yet?
            <a href="#" class="text-dark text-weight-bold" style="text-decoration: none">Sign
              up.</a>
          </div>
        </q-card-section>
      </q-card>
      <q-card class="q-pa-md box-card-content" v-else>
        <q-card-section class="text-center q-pt-none">
          <h2 class="text-h4 text-grey-9 text-weight-bold">Este registro no esta habilitado</h2>
          <p class="text-grey-8">contactate conmigo: <a href="#">Daniela Salazar</a> </p>
        </q-card-section>
      </q-card>
    </template>
    <template v-else>
      <div class="t-flex t-justify-center t-w-full">
        <q-spinner-dots color="blue" class="t-inline t-w-[40px] t-h-[40px]" />
      </div>
    </template>
  </q-page>
</template>

<style>
.box-card-content {
  width: 32em;
  box-shadow: none;
}
</style>