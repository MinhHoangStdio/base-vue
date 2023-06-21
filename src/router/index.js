import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../pages/Dashboard.vue";
import Users from "../pages/Users.vue";
import Events from "../pages/Events.vue";
import DefaultLayout from "../components/DefaultLayout.vue";

const routes = [
  {
    path: "/",
    component: DefaultLayout,
    children: [
      {
        path: "/",
        name: "dashboard",
        component: Dashboard,
      },
      {
        path: "/events",
        name: "events",
        component: Events,
      },
      {
        path: "/users",
        name: "users",
        component: Users,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
