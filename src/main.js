import Vue from "vue";
import Vuex from "vuex";
import VueRouter from "vue-router";
import App from "./App.vue";
import Main from "./components/Main.vue";
import Film from "./components/Film.vue";
import NotFound from "./components/NotFound.vue";
import Planet from "./components/Planet.vue";
import Species from "./components/Species.vue";
import axios from "axios";

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    films: [],
    planets: [],
    species: [],
    starships: [],
    vehicles: [],
  },
  mutations: {
    setFilms(state, films) {
      state.films = films;
    },
    setPlanets(state, planets) {
      state.planets = planets;
    },
    setSpecies(state, species) {
      state.species = species;
    },
    setStarships(state, starships) {
      state.starships = starships;
    },
    setVehicles(state, vehicles) {
      state.vehicles = vehicles;
    }
  },
  getters: {
    getFilmById: state => id => {
      return state.films.find(
        film => parseInt(film.url.substr(27, film.url.length - 1)) === id
      );
    },
    getPlanetById: state => id => {
      return state.planets.find(
        planet => parseInt(planet.url.substr(28, planet.url.length - 1)) === id
      );
    },
    getSpeciesById: state => id => {
      return state.species.find(
        species => parseInt(species.url.substr(28, species.url.length - 1)) === id
      );
    },
    getStarshipById: state => id => {
      return state.starships.find(
        starship => parseInt(starship.url.substr(30, starship.url.length - 1)) === id
      );
    },
    getVehicleById: state => id => {
      return state.vehicles.find(
        vehicle => parseInt(vehicle.url.substr(30, vehicle.url.length - 1)) === id
      );
    },
  },
  actions: {
    async loadFilms({ commit }) {
      const films = await getFilmData();
      commit('setFilms', films);
    },
    async loadPlanets({ commit }) {
      const planets = await getPlanetsData();
      commit('setPlanets', planets);
    },
    async loadSpecies({ commit }) {
      const species = await getSpeciesData();
      commit('setSpecies', species);
    },
    async loadStarships({ commit }) {
      const starships = await getStarshipsData();
      commit('setStarships', starships);
    },
    async loadVehicles({ commit }) {
      const vehicles = await getVehiclesData();
      commit('setVehicles', vehicles);
    },
  }
});

const routes = [
  { path: "/", redirect: "/home" },
  { path: "/home", component: Main },
  { path: "/film/:filmId", component: Film },
  { path: "/planet/:planetId", component: Planet },
  { path: "/species/:speciesId", component: Species },
  { path: "*", component: NotFound }
];

const router = new VueRouter({
  routes
});

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount("#app");

function getFilmData() {
  return axios.get("https://swapi.co/api/films").then(response => {
    console.log(response);
    if (response.status === 200) {
      return response.data.results;
    } else {
      return null;
    }
  });
}

function getPlanetsData() {
  return axios.get("https://swapi.co/api/planets").then(response => {
    console.log(response);
    if (response.status === 200) {
      return response.data.results;
    } else {
      return null;
    }
  });
}

function getSpeciesData() {
  return axios.get("https://swapi.co/api/species").then(response => {
    console.log(response);
    if (response.status === 200) {
      return response.data.results;
    } else {
      return null;
    }
  });
}

function getStarshipsData() {
  return axios.get("https://swapi.co/api/starships").then(response => {
    console.log(response);
    if (response.status === 200) {
      return response.data.results;
    } else {
      return null;
    }
  });
}

function getVehiclesData() {
  return axios.get("https://swapi.co/api/vehicles").then(response => {
    console.log(response);
    if (response.status === 200) {
      return response.data.results;
    } else {
      return null;
    }
  });
}


