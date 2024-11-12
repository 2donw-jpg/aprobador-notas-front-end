// icons
import {
  QuestionOutlined,
  DashboardOutlined,
  ChromeOutlined,
  LoginOutlined,
  ProfileOutlined,
  FontSizeOutlined,
  BgColorsOutlined,
  BarcodeOutlined,
  CrownOutlined
} from '@ant-design/icons-vue';

export interface menu {
  header?: string;
  title?: string;
  icon?: object;
  to?: string;
  divider?: boolean;
  chip?: string;
  chipColor?: string;
  chipVariant?: string;
  chipIcon?: string;
  children?: menu[];
  disabled?: boolean;
  type?: string;
  subCaption?: string;
}
/* 
const sidebarItem: menu[] = [
  { header: 'Navigation' },
  {
    title: 'Dashboard',
    icon: DashboardOutlined,
    to: '/dashboard'
  },
  { header: 'Authentication' },
  {
    title: 'Login',
    icon: LoginOutlined,
    to: '/auth/login'
  },
  {
    title: 'Register',
    icon: ProfileOutlined,
    to: '/auth/register'
  },
  { header: 'Utilities' },
  {
    title: 'Notes',
    icon: FontSizeOutlined,
    to: '/typography'
  },
  {
    title: 'Color',
    icon: BgColorsOutlined,
    to: '/colors'
  },
  {
    title: 'Shadow',
    icon: BarcodeOutlined,
    to: '/shadow'
  },
  {
    title: 'Ant Icons',
    icon: CrownOutlined,
    to: '/icon/ant'
  },
  { header: 'Support' },
  {
    title: 'Sample Page',
    icon: ChromeOutlined,
    to: '/sample-page'
  },
  {
    title: 'Documentation',
    icon: QuestionOutlined,
    to: 'https://codedthemes.gitbook.io/mantis-vuetify/',
    type: 'external',
    chip: 'gitbook',
    chipColor: 'secondary',
    chipVariant: 'flat'
  }
]; */


const sidebarItem: menu[] = [
  { header: 'Itenirario' },
  {
    title: 'Horario de clases',
    icon: ProfileOutlined,
    to: '/schedule'
  },
  {
    title: 'Reporte de Notas',
    icon: ProfileOutlined,
    to: '/grade-report'
  },
  { header: 'Información y Datos' },
  {
    title: 'Catedráticos',
    icon: ProfileOutlined,
    to: '/teachers'
  },
  {
    title: 'Clases',
    icon: ProfileOutlined,
    to: '/classes'
  },
  {
    title: 'Periodos y Parciales',
    icon: ProfileOutlined,
    to: '/periods'
  },
  
  { header: 'Authentication' },
  {
    title: 'Login',
    icon: LoginOutlined,
    to: '/auth/login'
  },
  {
    title: 'Register',
    icon: ProfileOutlined,
    to: '/auth/register'
  },
  { header: 'Utilities' },
  {
    title: 'Ant Icons',
    icon: CrownOutlined,
    to: '/icon/ant'
  },

/*   {
    title: 'Documentation',
    icon: QuestionOutlined,
    to: 'https://codedthemes.gitbook.io/mantis-vuetify/',
    type: 'external',
    chip: 'gitbook',
    chipColor: 'secondary',
    chipVariant: 'flat'
  } */
];

export default sidebarItem;
