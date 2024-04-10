<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/authStore';
import { ref } from 'vue';

const authStore = useAuthStore();
const route = useRouter();

const email = ref('');
const password = ref('');

const register = async () => {
  await authStore.signInWithPass({
    email: email.value,
    password: password.value
  }).then(({ error }) => {
    if (!error) route.push({ name: 'home' });
  });
}
</script>

<template>
  <q-page class="flex flex-center">
    <q-card class="q-pa-md box-card-content">
      <q-card-section class="text-center">
        <div class="text-grey-9 text-h4 text-weight-bold">Inicio de sesion</div>
        <i class="text-grey-8">Academia de danza Daniela Salazar</i>
      </q-card-section>
      <q-card-section>
        <q-input dense outlined v-model="email" label="E-mail"></q-input>
        <q-input dense outlined class="q-mt-md" v-model="password" type="password" label="Contraseña"></q-input>
      </q-card-section>
      <q-card-section>
        <q-btn style="border-radius: 8px;" color="dark" rounded size="md" label="Sign in" no-caps class="full-width"
          @click="register()"></q-btn>
      </q-card-section>
      <q-card-section class="text-center q-pt-none">
        <div class="text-grey-8">Crea una cuenta nueva
          <a href="#" class="text-dark text-weight-bold" style="text-decoration: none">Registrate
            aqui.</a>
        </div>
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