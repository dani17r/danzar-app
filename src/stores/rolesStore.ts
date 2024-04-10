import { defineStore } from 'pinia';

type RoleT = 'admin' | 'teacher' | 'adult' | 'junior';
interface RoleI {
  admin: string;
  teacher: string;
  adult: string;
  junior: string;
}

interface StoreI {
  isActiveRegister: {
    teacher: boolean;
    adult: boolean;
    junior: boolean;
  };
  roles: string[];
  info: RoleI;
  role: RoleT;
}

export const useRolesStore = defineStore('roles', {
  state: () => <StoreI>({
    roles: ['admin', 'teacher', 'adult', 'junior'],
    info: {
      admin: 'Administrador/a',
      teacher: 'Maestro/a',
      adult: 'Representante',
      junior: 'Alumno'
    },
    role: 'admin',
    isActiveRegister: {
      adult: false,
      junior: false,
      teacher: false,
    }
  }),
  actions: {
    isRole(value: RoleT) {
      this.role = value
    },
  },
});
