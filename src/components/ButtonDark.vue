<script setup>
import darkModeComp from 'src/composables/darkMode';
const darkMode = darkModeComp();

darkMode.init();
</script>

<template>
  <q-btn flat round color="primary" :icon="darkMode.isDark ? 'wb_sunny' : 'dark_mode'" @click="darkMode.toggle()" />
</template>