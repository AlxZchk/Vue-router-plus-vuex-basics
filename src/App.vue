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
  },
};
</script>

<style lang="scss">
$element-background: #1c1e22;
$default-background: #272b30;
$title-color: #ffe300;
$default-color: #c8c8c8;

* {
  padding: 0;
  margin: 0;
}

html {
  box-sizing: border-box;
}
*, *:before, *:after {
  box-sizing: inherit;
}

body {
  background-color: $default-background;
}

#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
