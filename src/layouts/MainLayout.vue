<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-transparent">
      <q-toolbar>
        <q-btn flat round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" class="text-black" />

        <q-toolbar-title class="text-black">
          Academia
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-btn flat round icon="close" @click="toggleLeftDrawer" class="text-black float-right q-mr-md" />
      <q-list>
        <q-item-label header>
          Menu
        </q-item-label>

        <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
      </q-list>
      <q-btn icon="logout" flat label="Cerrar Sesion" @click="closeSession()" class="absolute-bottom q-mb-sm" />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EssentialLink from 'components/EssentialLink.vue';
import { useAuthStore } from '../stores/authStore';
import { linksList } from 'src/data/menuDrawer';
import { useRouter } from 'vue-router';

defineOptions({ name: 'MainLayout' });

const authStore = useAuthStore();
const router = useRouter();

const leftDrawerOpen = ref(false);
const toggleLeftDrawer = () => leftDrawerOpen.value = !leftDrawerOpen.value;

const closeSession = async () => {
  await authStore.signOut().then(() => {
    router.push({ name: 'login' });
  });
}
</script>
