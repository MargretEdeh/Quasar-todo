
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue'), meta: { requiresAuth: true } },
      { path: '/help', component: () => import('pages/HelpPage.vue'), meta: { requiresAuth: true } }
    ]
  },
  {
    path: '/google',
    component: () => import('pages/RegisterPage.vue'),
    meta: { requiresAuth: false } 
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
