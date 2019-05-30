<template>
  <div class="wrapper">
    <div class="main-info-wrapper">
      <p>{{ film.title }}</p>
      <p>{{ film.opening_crawl }}</p>
    </div>
    <div class="additional-info-block">
      <div class="planets" v-if="arePlanetsLoaded">
        <h4>Planets</h4>
        <ul>
          <router-link
            class="film-list-item"
            v-for="(planet, index) in planets"
            :key="index"
            :to="'/planet/' + planet.url.substring(29, planet.url.length - 1)"
            tag="li"
          >{{ planet.name }}</router-link>
        </ul>
      </div>
      <div class="species" v-if="areSpeciesLoaded">
        <h4>Species</h4>
        <ul>
          <router-link
            class="film-list-item"
            v-for="(specie, index) in species"
            :key="index"
            :to="'/species/' + specie.url.substring(29, specie.url.length - 1)"
            tag="li"
          >{{ specie.name }}</router-link>
        </ul>
      </div>
    </div>
    <div class="additional-info-block">
      <div class="starships" v-if="areStarshipsLoaded">
        <h4>StarShips</h4>
        <ul>
          <li
            class="film-list-item"
            v-for="(starship, index) in starships"
            :key="index"
          >{{ starship.name }}</li>
        </ul>
      </div>
      <div class="vehicles" v-if="areVehiclesLoaded">
        <h4>Vehicles</h4>
        <ul>
          <li
            class="film-list-item"
            v-for="(vehicle, index) in vehicles"
            :key="index"
          >{{ vehicle.name }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Film",
  data() {
    return {
      filmId: -1,
      didGetData: false,
      data: null,
    };
  },
  methods: {
    fetchFilmData(film) {
      this.$store.dispatch("loadPlanets", film.planets);
      this.$store.dispatch("loadSpecies", film.species);
      this.$store.dispatch("loadStarships", film.starships);
      this.$store.dispatch("loadVehicles", film.vehicles);
    },
    sendGetRequest(url) {
      return axios.get(url);
    },
    sendCategoryRequests(urls) {
      const requests = urls.map(url => this.sendGetRequest(url));
      return axios.all(requests);
    }
  },
  computed: {
    arePlanetsLoaded() {
      return !!this.planets;
    },
    areSpeciesLoaded() {
      return !!this.species;
    },
    areStarshipsLoaded() {
      return !!this.starships;
    },
    areVehiclesLoaded() {
      return !!this.vehicles;
    },
    planets() {
      return this.$store.state.planets;
    },
    species() {
      return this.$store.state.species;
    },
    starships() {
      return this.$store.state.starships;
    },
    vehicles() {
      return this.$store.state.vehicles;
    },
    film() {
      const film = this.$store.getters.getFilmById(this.filmId);
      if (film && !this.didGetData) {
        this.didGetData = true;
        this.fetchFilmData(film);
      }

      return film || {};
    }
  },
  mounted() {
    this.filmId = parseInt(this.$route.params.filmId);
    if (Number.isNaN(this.filmId)) {
      this.$router.push("/notFound");
    }
  }
};
</script>

<style scoped lang="scss">
ul {
  padding: 0;
  margin: 0;
}

.film-list-item {
  cursor: pointer;
}
</style>
