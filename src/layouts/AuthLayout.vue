<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <buttonDark class="t-fixed t-top-1 t-right-1 t-z-[100]" />
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import buttonDark from '../components/ButtonDark.vue';

defineOptions({
  name: 'AuthLayout'
});
</script>
