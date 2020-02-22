const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Index.vue'),
        hideInMenu: true,
        name: 'home',
        title: 'Home'
      },
      {
        path: 'location',
        component: () => import('pages/location/Index.vue'),
        icon: 'my_location',
        name: 'location',
        title: 'Location'
      },
      {
        path: 'energy',
        component: () => import('pages/energy/Usage.vue'),
        icon: 'energy',
        name: 'energy',
        title: 'Energy',
        children: [{ path: 'usage', name: 'energy_usage', title: 'Usage' }]
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
