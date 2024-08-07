<script setup lang="ts">
import WrapperOfLoading from 'src/components/WrapperOfLoading.vue';
import superComposable from 'src/composables/superComposable';
import { onMounted } from 'vue';

const { store } = superComposable();

defineOptions({ name: 'OptionsPage' });

onMounted(() => {
  store.options.getOptions('registers');
});
</script>

<template>
  <q-page class="row justify-center t-mt-5">
    <q-list style="width: 100%">
      <q-item class="t-flex t-items-center">
        <q-icon name="tune" class="t-mr-2 t-text-gray-500" size="25px" />
        <span class="t-text-lg t-text-gray-500">Opciones del sistema</span>
      </q-item>

      <template
        v-if="store.acounts.current && store.acounts.current.role == 'admin'"
      >
        <q-expansion-item
          icon="person_add"
          label="Registro de usuarios"
          default-opened
        >
          <q-card>
            <q-card-section class="text-center flex">
              <WrapperOfLoading :status="store.options.loadings.init">
                <q-toggle
                  v-if="store.options.data"
                  color="blue"
                  v-model="store.options.data['registers']!.json.junior.status"
                  label="Activar registro para junior"
                  @update:model-value="store.options.updateOptions('registers')"
                />
              </WrapperOfLoading>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </template>

      <q-expansion-item icon="signal_wifi_off" label="Wifi settings">
        <q-card>
          <q-card-section>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem,
            eius reprehenderit eos corrupti commodi magni quaerat ex numquam,
            dolorum officiis modi facere maiores architecto suscipit iste
            eveniet doloribus ullam aliquid.
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-expansion-item icon="drafts" label="Drafts" header-class="text-purple">
        <q-card>
          <q-card-section>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem,
            eius reprehenderit eos corrupti commodi magni quaerat ex numquam,
            dolorum officiis modi facere maiores architecto suscipit iste
            eveniet doloribus ullam aliquid.
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-list>
  </q-page>
</template>
