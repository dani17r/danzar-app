<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps({
  status: {
    type: Boolean,
    default: true,
  },
  auto: {
    type: Boolean,
    default: false,
  },
  time: {
    type: Number,
    default: 400,
  },
});

const status = ref(props.status);

watch(
  () => props.status,
  (val) => {
    if (!props.auto) status.value = val;
  }
);

if (props.auto) {
  status.value = true;
  setTimeout(() => {
    status.value = false;
  }, props.time);
}
</script>

<template>
  <template v-if="!status">
    <slot></slot>
  </template>
  <div v-else class="t-flex t-justify-center t-w-full">
    <q-spinner-dots color="primary" class="t-inline t-w-[30px] t-h-[30px]" />
  </div>
</template>
