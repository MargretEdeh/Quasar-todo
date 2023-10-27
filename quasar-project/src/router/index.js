import { route } from 'quasar/wrappers';
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router';
import routes from './routes';
import { getCurrentInstance } from 'vue';

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory);

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE),
  });

  // Access the Vue app instance using getCurrentInstance
  let app;

  Router.beforeEach((to, from, next) => {
    const instance = getCurrentInstance();
    if (instance) {
      app = instance.app;
    }

    const store = app?.config.globalProperties.$store;

    // Check if the route requires authentication
    if (to.meta.requiresAuth) {
      // If the user is authenticated, allow access
      if (store?.getters.isAuthenticated) {
        next();
      } else {
        // If not authenticated, redirect to the login page
        next('/google'); // Adjust the login route path as needed
      }
    } else {
      // If the route doesn't require authentication, allow access
      next();
    }
  });

  return Router;
});
