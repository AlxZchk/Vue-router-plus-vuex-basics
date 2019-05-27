import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import Main from "./components/Main.vue";
import Film from "./components/Film.vue";
import NotFound from "./components/NotFound.vue";
import Planet from "./components/Planet.vue";
import Species from "./components/Species.vue";

Vue.config.productionTip = false;

Vue.use(VueRouter);

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: Main },
  { path: '/film/:filmId', component: Film },
  { path: '/planet/:planetId', component: Planet },
  { path: '/species/:speciesId', component: Species },
  { path: '*', component: NotFound },
];

const router = new VueRouter({
  routes
});

new Vue({
  render: h => h(App),
  router
}).$mount("#app");
