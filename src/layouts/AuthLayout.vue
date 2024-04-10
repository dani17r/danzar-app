<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <buttonDark class="fixed-top-right" style="z-index: 100;" />
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
