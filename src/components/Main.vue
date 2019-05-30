<template>
  <div class="wrapper">
    <h1 class="title">Star Wars Films</h1>
    <ul class="film-list">
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
  .film-list {
    display: flex;
    flex-flow: column nowrap;
    border: 1px solid darken(#1c1e22, 10);
    background: #1c1e22;
    max-width: 950px;
    margin: 0 auto;
    list-style: none;
    border-radius: 5px;
  }

  .film-list-item {
    cursor: pointer;
    color: #c8c8c8;
    padding: 15px 0;
    border-bottom: 1px solid darken(#1c1e22, 10);
  }

  .title {
    font-size: 40px;
    color: #ffe300;
    font-weight: 300;
    text-transform: uppercase;
    margin-bottom: 30px;
  }
</style>
