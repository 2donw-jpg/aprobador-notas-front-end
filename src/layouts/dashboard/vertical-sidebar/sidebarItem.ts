// icons
import {

  LoginOutlined,
  ProfileOutlined,
  TeamOutlined,
  BookOutlined,
  FieldTimeOutlined,
  SolutionOutlined,
  CalendarOutlined,

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
    icon: CalendarOutlined,
    to: '/schedule'
  },
  {
    title: 'Reporte de Notas',
    icon: SolutionOutlined,
    to: '/grade-report'
  },
  { header: 'Información y Datos' },
  {
    title: 'Catedráticos',
    icon: TeamOutlined,
    to: '/teachers'
  },
  {
    title: 'Clases',
    icon: BookOutlined,
    to: '/classes'
  },
  {
    title: 'Periodos y Parciales',
    icon: FieldTimeOutlined,
    to: '/periods'
  },
  
/*   { header: 'Authentication' },
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

   {
    title: 'Documentation',
    icon: QuestionOutlined,
    to: 'https://codedthemes.gitbook.io/mantis-vuetify/',
    type: 'external',
    chip: 'gitbook',
    chipColor: 'secondary',
    chipVariant: 'flat'
  }  */
];

export default sidebarItem;
