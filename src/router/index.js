import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../pages/Dashboard.vue";
import Users from "../pages/Users.vue";
import UserDetail from "../pages/UserDetail.vue";
import Events from "../pages/Events.vue";
import DefaultLayout from "../components/DefaultLayout.vue";
import LoginLayout from "../components/LoginLayout.vue";
import NotFound from "../components/NotFound.vue";
import store from "../store";
import { watch } from "vue";
import { getAuth } from "../util/auth";

const routes = [
  {
    path: "/",
    component: DefaultLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        name: "dashboard",
        component: Dashboard,
      },
      {
        path: "events",
        name: "events",
        component: Events,
      },
      {
        path: "users",
        name: "users",
        component: Users,
      },
      {
        path: "users/:id",
        name: "usersDetail",
        component: UserDetail,
      },
    ],
  },
  
  {
    path: "/login",
    component: LoginLayout,
  },
  
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

let isLoggedIn = store.state.login.isLogged;

watch(() => store.state.login.isLogged, (newVal) => {
  if (newVal) {
    router.push({ name: "dashboard" });
  }
});

router.beforeEach((to, from, next) => {
  isLoggedIn = store.state.login.isLogged;

  if (to.path === "/login" && isLoggedIn) {
    next({ path: "/", replace: true });
  } else if (to.meta.requiresAuth && !isLoggedIn) {
    next({ path: "/login", replace: true });
  } else if (to.matched.length === 0) {
    next({ name: "NotFound" });
  } else {
    next();
  }
});

export default router;
