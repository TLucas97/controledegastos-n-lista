import Vue from "vue";
import VueRouter from "vue-router";
import Control from "../views/Control.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Control",
    component: Control,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
