const MainRoutes = {
  path: '/main',
  meta: {
    requiresAuth: true
  },
  redirect: '/main',
  component: () => import('@/layouts/dashboard/DashboardLayout.vue'),
  children: [
    {
      name: 'LandingPage',
      path: '/',
      component: () => import('@/views/dashboard/DefaultDashboard.vue')
    },
    {
      name: 'Dashboard',
      path: '/dashboard',
      component: () => import('@/views/dashboard/DefaultDashboard.vue')
    },
    {
      name: 'Horario de Clases',
      path: '/schedule',
      component: () => import('@/views/schedule-viewer/ScheduleView.vue')
    },
    {
      name: 'Aprobador de Notas',
      path: '/grade-report',
      component: () => import('@/views/grades-reporter/GradeReport.vue')
    },
    {
      name: 'Listado de Catedráticos',
      path: '/teachers',
      component: () => import('@/views/grades-reporter/TeachersView.vue')
    },
    {
      name: 'Listado de Clases',
      path: '/classes',
      component: () => import('@/views/grades-reporter/ClassesView.vue')
    },

    {
      name: 'Listado de Clases',
      path: '/classes',
      component: () => import('@/views/grades-reporter/ClassesView.vue')
    },
    {
      name: 'Periodos y Parciales',
      path: '/periods',
      component: () => import('@/views/grades-reporter/PeriodsView.vue')
    },
    {
      name: 'Color',
      path: '/icon/ant',
      component: () => import('@/views/icons/AntDesignIcons.vue')
    },
    {
      name: 'Testing',
      path: '/testing',
      component: () => import('@/views/_testing/IconLoad.vue')
    },
  ]
};

export default MainRoutes;
