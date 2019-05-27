<template>
  <div class="wrapper">
    <h1>Home component</h1>
    <ul v-if="isLoaded">
      <router-link 
        class="film-list-item"
        v-for="(film, index) in films" 
        :key="index"
        :to="'/film/' + film.url.substr(27, 1)"
        tag="li"
      >
        {{ film.title }} ({{film.release_date}})
      </router-link>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "Main",
  data() {
    return {
      films: [],
      pending: true,
      isError: false,
    }
  },
  methods: {
     
  },
  computed: {
    isLoaded() {
      return !this.pending && !this.isError;
    },
  },
  mounted() {
    axios
      .get('https://swapi.co/api/films')
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          this.films = response.data.results;
        }
      })
      .catch(error => {
        console.log(error);
        this.isError = true;
      })
      .finally(() => { this.pending = false; });
  }
}
</script>

<style scoped lang="scss">
  .film-list-item {
    cursor: pointer;
  }
</style>
