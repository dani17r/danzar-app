<template>
  <q-item clickable tag="a" target="_blank" @click="$router.push(link)">
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { EssentialLinkProps } from 'src/interfaces/global';

defineOptions({
  name: 'EssentialLink'
});

withDefaults(defineProps<EssentialLinkProps>(), {
  caption: '',
  link: '',
  icon: '',
});
</script>
