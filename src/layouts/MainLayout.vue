<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-transparent">
      <q-toolbar>
        <q-btn flat round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" class="t-text-black" />

        <q-toolbar-title class="t-text-black">
          Academia
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above>
      <q-list>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-avatar avatar>
              <q-img src="https://www.delvinia.com/wp-content/uploads/2020/05/placeholder-headshot.png" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-primary">{{ startCase(store.acounts.current?.full_name) }}</q-item-label>
            <q-item-label caption lines="2">
              {{ startCase(store.acounts.current?.role) }}
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-separator class="t-mb-2" />

        <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
      </q-list>
      <q-item clickable v-ripple class="t-absolute t-bottom-0 t-mb-2 t-w-full" @click="closeSession()">
        <q-item-section avatar>
          <q-icon name="logout" />
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-primary">Cerrar Sesion</q-item-label>
          <q-item-label caption>Sesion de usuario</q-item-label>
        </q-item-section>
      </q-item>
    </q-drawer>

    <q-page-container>
      <buttonDark class="t-fixed t-bottom-1 t-right-2 t-z-[100]" />
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import superComposable from 'src/composables/superComposable';
import EssentialLink from 'src/components/EssentialLink.vue';
import buttonDark from 'src/components/ButtonDark.vue';
import { linksList } from 'src/data/menuDrawer';
import { startCase } from 'lodash';
import { ref } from 'vue';

defineOptions({ name: 'MainLayout' });

const { store, router } = superComposable();

const leftDrawerOpen = ref(false);
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

const closeSession = async () => {
  store.auth.signOut(() => {
    store.reset();
    router.push({ name: 'login' });
  });
}
</script>
