const routes = [
  {
    path: '/',
    component: () => import('@/views/Wrapper.vue'),
  },
  {
    path: '/map',
    component: () => import('@/views/MapView.vue'),
  },
  // {
  //   path: '/',
  //   component: () => import('@/views/Index.vue'),
  // },
];

export default routes;
