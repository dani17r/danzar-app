/* eslint-disable  @typescript-eslint/no-explicit-any */
import { reactive } from 'vue';

export const messages = reactive({
  required: 'No puede estar vacio',
  requiredSelect: 'No puede estar vacio',
});

export const required = (val: string) => {
  return (val && val.length > 0) || messages.required;
};

export const requiredSelect = (val: any) => {
  return (val.title && val.title.length) || messages.requiredSelect;
};
