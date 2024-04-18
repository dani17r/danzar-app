<template>
  <q-item clickable v-ripple @click="$router.push(link)">
    <q-item-section avatar>
      <q-icon :name="icon" class="text-primary" />
    </q-item-section>

    <q-item-section>
      <q-item-label class="text-primary">{{ title }}</q-item-label>
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
