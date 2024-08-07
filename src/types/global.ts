/* eslint-disable  @typescript-eslint/no-explicit-any */
import { Ref } from 'vue';

export interface DialogI<Status> {
  value: boolean;
  id: string | null;
  status: Status;
  changeId: (id: string | null) => void;
  toggle: (value?: Status) => void;
}

interface BasicInputI {
  value: any;
  rules: ((val: string) => boolean | string)[];
}

interface InputI {
  set(val: string | number | boolean): void;
  isChange(): boolean;
  validate(): boolean;
  isErrors(): boolean;
  ref?: Ref | any;
  view?: boolean;
  reset(): void;
  copy: any;
  data?: any;
  error: {
    status: boolean;
    on: () => void;
    off: () => void;
  },
}

interface FormI<T> {
  verifyIsNotChanges(): boolean;
  checkValidation(): boolean;
  checkIsErrors(): boolean;
  getValues(): { [key in keyof T]: keyof T };
  update(): void;
  reset(): void;
  reset(): void;
  getRef(val: any): void;
  resetValidation(): void;
  validate(): boolean;
}

export type SuperInputUnionT = InputI & BasicInputI;
export type SuperInputT<T> = { [key in keyof T]: SuperInputUnionT };
export type SuperFormT<T> = SuperInputT<T> & FormI<T>;