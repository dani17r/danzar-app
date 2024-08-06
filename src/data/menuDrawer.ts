import { EssentialLinkProps } from 'src/interfaces/global'

export const linksList: EssentialLinkProps[] = [
  {
    title: 'Opciones',
    caption: 'Acciones sobre el sistema',
    icon: 'tune',
    link: { 'name': 'options' }
  },
  {
    title: 'Alumnos',
    caption: 'Estudiante de academia',
    icon: 'person',
    link: { name: 'juniors' }
  },
  {
    title: 'Representantes',
    caption: 'Padres o representantes',
    icon: 'person',
    link: { name: 'adults' }
  },
  {
    title: 'Mensajes',
    caption: 'conversaciones',
    icon: 'chat',
    link: ''
  },
  {
    title: 'Grupos',
    caption: 'Informaciones',
    icon: 'record_voice_over',
    link: ''
  },
];