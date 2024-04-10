<template>
  <q-page class="row items-center justify-center">
    <q-list style="width: 100%">
      <q-expansion-item icon="person_add" label="Registro de usuarios" default-opened>
        <q-card>
          <q-card-section class="text-center flex" v-if="registerOptions">
            <!-- @update:model-value="" -->
            <q-toggle color="blue" v-model="registerOptions.json.junior" :label="'Activar registro para'" />

          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-expansion-item icon="signal_wifi_off" label="Wifi settings">
        <q-card>
          <q-card-section>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
            commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
            eveniet doloribus ullam aliquid.
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-expansion-item icon="drafts" label="Drafts" header-class="text-purple">
        <q-card>
          <q-card-section>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
            commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
            eveniet doloribus ullam aliquid.
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-list>
  </q-page>
</template>

<script setup lang="ts">
import { supabase } from 'src/boot/supabase';
import { onMounted, ref } from 'vue';

defineOptions({ name: 'OptionsPage' });

const registerOptions = ref();

const getOptions = (name = '') => {
  return supabase.from('options').select('*').eq('name', name)
    .then(({ data, error }) => {
      if (error) throw error;
      return data[0];
    });
}

onMounted(async () => {
  registerOptions.value = await getOptions('registers');
})

</script>
