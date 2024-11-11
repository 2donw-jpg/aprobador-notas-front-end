import { createVuetify } from 'vuetify';
import { aliases } from 'vuetify/iconsets/mdi-svg';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { DefaultTheme } from '@/theme/LightTheme';
import '@mdi/font/css/materialdesignicons.css';


export default createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi: {
        component: 'mdi', // Specify MDI icons font-based if not using SVGs
      },
    },
  },
  theme: {
    defaultTheme: 'DefaultTheme',
    themes: {
      DefaultTheme,
    },
  },
  defaults: {
    VBtn: {},
    VCard: {
      rounded: 'md',
    },
    VTextField: {
      rounded: 'lg',
    },
    VTooltip: {
      location: 'top',
    },
  },
});
