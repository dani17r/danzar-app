<template>
  <q-page class="row justify-center t-mt-5">
    <q-list style="width: 100%">
      <q-item class="t-flex t-items-center">
        <q-icon name="tune" class="t-mr-2 t-text-gray-500" size="25px" />
        <span class="t-text-lg t-text-gray-500">Opciones del sistema</span>
      </q-item>

      <template v-if="acountsStore.current && acountsStore.current.role == 'admin'">
        <q-expansion-item icon="person_add" label="Registro de usuarios" default-opened>
          <q-card>
            <q-card-section class="text-center flex">
              <div v-if="!optionsStore.loadings.init && optionsStore.data">
                <q-toggle color="blue" v-model="optionsStore.data.json.junior" label="Activar registro para junior"
                  @update:model-value="optionsStore.updateOptions('registers')" />
              </div>

              <div v-else class="t-flex t-justify-center t-w-full">
                <q-spinner-dots color="blue" class="t-inline t-w-[30px] t-h-[30px]" />
              </div>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </template>

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
import { onMounted } from 'vue';
import { useOptionsStore } from 'src/stores/optionsStore';
import { useAcountsStore } from 'src/stores/acountsStore';

defineOptions({ name: 'OptionsPage' });

const optionsStore = useOptionsStore();
const acountsStore = useAcountsStore();

onMounted(() => {
  optionsStore.getOptions('registers');
});
</script>
