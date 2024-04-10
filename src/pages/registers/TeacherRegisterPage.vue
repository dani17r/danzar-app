<script setup lang="ts">
import { ref } from 'vue'
import { useRolesStore } from '../../stores/rolesStore';

const email = ref('');
const password = ref('');
const rolesStore = useRolesStore();
</script>

<template>
  <q-page class="flex flex-center">
    <q-card class="q-pa-md box-card-content" v-if="rolesStore.isActiveRegister['teacher']">
      <q-card-section class="text-center">
        <div class="text-grey-9 text-h4 text-weight-bold">Registro de {{ rolesStore.info['teacher'] }}</div>
        <a href="#" class="text-grey-8">Inicia sesión a aqui para acceder a tu cuenta</a>
      </q-card-section>
      <q-card-section>
        <q-input dense outlined v-model="email" label="Email Address"></q-input>
        <q-input dense outlined class="q-mt-md" v-model="password" type="password" label="Password"></q-input>
      </q-card-section>
      <q-card-section>
        <q-btn style="border-radius: 8px;" color="dark" rounded size="md" label="Sign in" no-caps
          class="full-width"></q-btn>
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
  </q-page>
</template>

<style>
.box-card-content {
  width: 32em;
  box-shadow: none;
}
</style>