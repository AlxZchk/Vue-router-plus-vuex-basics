<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "app",
  mounted() {
    this.$store.dispatch('loadFilms');
    // this.$store.dispatch('loadPlanets');
    // this.$store.dispatch('loadSpecies');
    // this.$store.dispatch('loadStarships');
    // this.$store.dispatch('loadVehicles');
  },
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
