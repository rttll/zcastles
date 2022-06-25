const routes = [
  {
    path: '/',
    component: () => import('@/views/Index.vue'),
  },
  {
    path: '/castles',
    component: () => import('@/views/Listings.vue'),
  },
];

export default routes;
