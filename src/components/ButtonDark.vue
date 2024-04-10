<script setup>
import { useDarkModeStore } from '../stores/darkModeStore';
const darkModeStore = useDarkModeStore();

darkModeStore.init();
</script>

<template>
  <q-btn flat round color="primary" :icon="darkModeStore.isDark ? 'wb_sunny' : 'dark_mode'"
    @click="darkModeStore.toggle()" />
</template>