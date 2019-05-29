<template>
  <div class="wrapper">
    <h1>Home component</h1>
    <ul>
      <router-link 
        class="film-list-item"
        v-for="(film, index) in allFilms" 
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
    }
  },
  methods: {
     
  },
  computed: {
    allFilms() {
      return this.$store.state.films;
    }
  },
}
</script>

<style scoped lang="scss">
  .film-list-item {
    cursor: pointer;
  }
</style>
