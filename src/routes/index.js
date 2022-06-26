const routes = [
  {
    path: '/',
    component: () => import('@/views/Wrapper.vue'),
    children: [
      {
        path: 'castles',
        component: () => import('@/views/Listings.vue'),
      },
    ],
  },
  // {
  //   path: '/',
  //   component: () => import('@/views/Index.vue'),
  // },
];

export default routes;
