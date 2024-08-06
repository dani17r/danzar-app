/* eslint-disable  @typescript-eslint/no-explicit-any */
import { isBoolean, isNumber, isObject, isString } from 'lodash';
import { reactive, ref, VNodeRef } from 'vue';

export const formResetDefault = function (data: any) {
  for (const key in data) {
    if (data.hasOwnProperty && data.hasOwnProperty(key)) {
      if (isObject(data[key])) formResetDefault(data[key]);
      if (key == 'value') {
        if (isString(data[key])) data[key] = '';
        else if (isBoolean(data[key])) data[key] = false;
        else if (isNumber(data[key])) data[key] = 0;
      }
    }
  }
};

export const superForm = <T>(data: T) => {
  const reference = ref<VNodeRef | null>(null);

  return reactive({
    getRef: (val: VNodeRef) => (reference.value = val),
    resetValidation: () => {
      setTimeout(() => reference.value?.resetValidation(), 100);
    },
    validate: () => {
      const result = ref(false);
      reference.value?.validate().then((val: boolean) => (result.value = val));
      return result;
    },
    ...data,
  });
};
