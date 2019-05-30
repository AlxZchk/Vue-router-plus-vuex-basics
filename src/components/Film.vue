<template>
  <div class="wrapper">
    <div class="main-info-wrapper">
      <p class="film-title">{{ film.title }}</p>
      <p class="film-opening">{{ film.opening_crawl }}</p>
    </div>
    <div class="additional-info-block">
      <div class="planets category" v-if="arePlanetsLoaded">
        <h4 class="category-title">Planets</h4>
        <ul class="category-list">
          <router-link
            class="film-list-item"
            v-for="(planet, index) in planets"
            :key="index"
            :to="'/planet/' + planet.url.substring(29, planet.url.length - 1)"
            tag="li"
          >{{ planet.name }}</router-link>
        </ul>
      </div>
      <div class="species category" v-if="areSpeciesLoaded">
        <h4 class="category-title">Species</h4>
        <ul class="category-list">
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
      <div class="starships category" v-if="areStarshipsLoaded">
        <h4 class="category-title">StarShips</h4>
        <ul class="category-list">
          <li
            class="film-list-item"
            v-for="(starship, index) in starships"
            :key="index"
          >{{ starship.name }}</li>
        </ul>
      </div>
      <div class="vehicles category" v-if="areVehiclesLoaded">
        <h4 class="category-title">Vehicles</h4>
        <ul class="category-list">
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
      data: null
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
.film-title {
  font-size: 40px;
  color: #ffe300;
  font-weight: 300;
  text-transform: uppercase;
  margin-bottom: 20px;
}

.film-opening {
  width: 900px;
  margin: 0 auto;
  font-size: 16px;
  color: #ffe300;
  font-weight: 300;
  margin-bottom: 20px;
}

ul {
  padding: 0;
  margin: 0;
}

.additional-info-block {
  display: flex;
  flex-flow: row nowrap;
  width: 900px;
  flex: 1;
  margin: 0 auto;
}

.category {
  flex: 1;
  margin: 30px 20px;
}

.category-title {
  font-size: 24px;
  color: #ffe300;
  font-weight: 300;
  margin-bottom: 15px;
}

.category-list {
  list-style: none;
  border: 1px solid darken(#1c1e22, 10);
  background: #1c1e22;
  border-radius: 5px;
}

.film-list-item {
  cursor: pointer;
  color: #c8c8c8;
  padding: 15px 0;
  border-bottom: 1px solid darken(#1c1e22, 10);
}
</style>
