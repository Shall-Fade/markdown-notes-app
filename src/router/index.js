import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [],
  scrollBehavior() {
    document.getElementById("app").scrollIntoView();
  },
});

export default router;
