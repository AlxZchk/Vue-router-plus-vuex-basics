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
import * as _ from "lodash";

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    films: [],
    planets: [],
    species: [],
    starships: [],
    vehicles: []
  },
  mutations: {
    setFilms(state, films) {
      store.replaceState({ ...state, films });
    },
    setPlanets(state, planets) {
      store.replaceState({
        ...state,
        planets: _.uniqBy([...state.planets, ...planets], "url")
      });
    },
    setSpecies(state, species) {
      store.replaceState({
        ...state,
        species: _.uniqBy([...state.species, ...species], "url")
      });
    },
    setStarships(state, starships) {
      store.replaceState({
        ...state,
        starships: _.uniqBy([...state.starships, ...starships], "url")
      });
    },
    setVehicles(state, vehicles) {
      store.replaceState({
        ...state,
        vehicles: _.uniqBy([...state.vehicles, ...vehicles], "url")
      });
    }
  },
  getters: {
    getFilmById: state => id => {
      return state.films.find(
        film => parseInt(film.url.substring(27, film.url.length - 1)) === id
      );
    },
    getPlanetById: state => id => {
      return state.planets.find(
        planet =>
          parseInt(planet.url.substring(29, planet.url.length - 1)) === id
      );
    },
    getSpeciesById: state => id => {
      return state.species.find(
        species =>
          parseInt(species.url.substring(29, species.url.length - 1)) === id
      );
    },
    getStarshipById: state => id => {
      return state.starships.find(
        starship =>
          parseInt(starship.url.substring(30, starship.url.length - 1)) === id
      );
    },
    getVehicleById: state => id => {
      return state.vehicles.find(
        vehicle =>
          parseInt(vehicle.url.substring(30, vehicle.url.length - 1)) === id
      );
    }
  },
  actions: {
    async loadFilms({ commit }) {
      const films = await getFilmData();
      commit("setFilms", films);
    },
    async loadPlanets({ commit }, urls) {
      const planets = await sendCategoryRequests(urls)
        .then(responses => {
          return responses.map(item => item.data);
        })
        .catch(() => {
          router.push("/notFound");
          return [];
        });
      commit("setPlanets", planets);
    },
    async loadSpecies({ commit }, urls) {
      const species = await sendCategoryRequests(urls)
        .then(responses => {
          return responses.map(item => item.data);
        })
        .catch(() => {
          router.push("/notFound");
          return [];
        });
      commit("setSpecies", species);
    },
    async loadStarships({ commit }, urls) {
      const starships = await sendCategoryRequests(urls)
        .then(responses => {
          return responses.map(item => item.data);
        })
        .catch(() => {
          router.push("/notFound");
          return [];
        });
      commit("setStarships", starships);
    },
    async loadVehicles({ commit }, urls) {
      const vehicles = await sendCategoryRequests(urls)
        .then(responses => {
          return responses.map(item => item.data);
        })
        .catch(() => {
          router.push("/notFound");
          return [];
        });
      commit("setVehicles", vehicles);
    }
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
  store
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

function getPlanetsData(urls) {
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

function sendCategoryRequests(urls) {
  const requests = urls.map(url => sendGetRequest(url));
  return axios.all(requests);
}

function sendGetRequest(url) {
  return axios.get(url);
}
