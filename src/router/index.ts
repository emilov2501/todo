import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import routeOptions from "./routes";
Vue.use(VueRouter);

const routes: Array<RouteConfig> = routeOptions.map(route => {
  return {
    path: route.path,
    name: route.name,
    props: route.props,
    component: () => import(`@/pages/${route.name}.vue`)
  };
});

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
