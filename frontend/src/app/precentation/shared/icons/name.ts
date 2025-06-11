import {
  faHome,
  faUser,
  faCog,
  faProjectDiagram,
  faChartSimple,
  faBuildingColumns,
  faUsers,
  faGlassCheers,
  faMagnifyingGlass,
  faAdd,
  faDeleteLeft,
  faTrash,
  faEdit,
} from '@fortawesome/free-solid-svg-icons';

export const ICONS = {
  home: faHome,
  user: faUser,
  users: faUsers,
  settings: faCog,
  proyect: faProjectDiagram,
  chart: faChartSimple,
  unidades: faBuildingColumns,
  search: faMagnifyingGlass,
  add: faAdd,
  delete: faTrash,
  edit: faEdit,
} as const;
