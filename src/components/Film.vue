<template>
  <div class="wrapper">
    <div class="main-info-wrapper" v-if="isMainDataLoaded">
      <p>{{ data.title }}</p>
      <p>{{ data.opening_crawl }}</p>
    </div>
    <div class="additional-info-block">
      <div class="planets" v-if="arePlanetsLoaded">
        <h4>Planets</h4>
        <ul>
          <router-link 
            class="film-list-item"
            v-for="(planet, index) in planets" 
            :key="index"
            :to="'/planet/' + planet.url.substr(29, 1)"
            tag="li"
          >
            {{ planet.name }}
          </router-link>
        </ul>
      </div>
      <div class="species" v-if="areSpeciesLoaded">
        <h4>Species</h4>
        <ul>
          <router-link 
            class="film-list-item"
            v-for="(specie, index) in species" 
            :key="index"
            :to="'/species/' + specie.url.substr(30, 1)"
            tag="li"
          >
            {{ specie.name }}
          </router-link>
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
          >
            {{ starship.name }}
          </li>
        </ul>
      </div>
      <div class="vehicles" v-if="areVehiclesLoaded">
        <h4>Vehicles</h4>
        <ul>
          <li
            class="film-list-item"
            v-for="(vehicle, index) in vehicles" 
            :key="index"
          >
            {{ vehicle.name }}
          </li>
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
      data: null,
      planets: null,
      species: null,
      starships: null,
      vehicles: null,
      pending: true,
      isError: false
    };
  },
  methods: {
    fetchFilmData(id) {
      let title;
      let opening_crawl;
      this.sendGetRequest(`https://swapi.co/api/films/${id}`)
        .then(response => {
          console.log(response);
          if (response.status === 200) {
            console.log({ response });
            title = response.data.title;
            opening_crawl = response.data.opening_crawl;
            this.data = {
              title,
              opening_crawl
            };
          }
          return response;
        })
        .then(response => {
          const planetRequests = this.sendCategoryRequests(
            response.data.planets
          );
          const speciesRequests = this.sendCategoryRequests(
            response.data.species
          );
          const starshipsRequests = this.sendCategoryRequests(
            response.data.starships
          );
          const vehiclesRequests = this.sendCategoryRequests(
            response.data.vehicles
          );
          return Promise.all([
            planetRequests,
            speciesRequests,
            starshipsRequests,
            vehiclesRequests
          ]);
        })
        .then(
          ([
            planetResponse,
            speciesResponse,
            starshipsResponse,
            vehiclesResponse
          ]) => {
            this.planets = planetResponse.map((item) => item.data);
            this.species = speciesResponse.map((item) => item.data);
            this.starships = starshipsResponse.map((item) => item.data);
            this.vehicles = vehiclesResponse.map((item) => item.data);
          }
        )
        .catch(error => {
          console.log(error);
          this.isError = true;
        })
        .finally(() => {
          this.pending = false;
        });
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
    isMainDataLoaded() {
      return !!this.data;
    },
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
    }
  },
  mounted() {
    const filmId = parseInt(this.$route.params.filmId);
    if (Number.isNaN(filmId)) {
      this.$router.push("/notFound");
    }

    this.fetchFilmData(filmId);
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
