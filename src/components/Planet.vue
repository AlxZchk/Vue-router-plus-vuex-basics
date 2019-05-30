<template>
  <div class="wrapper">
    <h1>Planet Component</h1>
    <p>{{ planet && planet.name }}</p>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Planet",
  computed: {
    data() {
      return { planetId: -1, wasActionCalled: false };
    },
    planet() {
      const planet = this.$store.getters.getPlanetById(this.planetId);
      if (!planet && this.wasActionCalled) {
        this.$router.push("/notFound");
        return null;
      }
      return planet;
    }
  },
  methods: {
    initData(id) {
      this.planetId = parseInt(id);
      if (Number.isNaN(this.planetId) || this.planetId < 0) {
        this.$router.push("/notFound");
      }

      if (!this.$store.getters.getPlanetById(this.planetId)) {
        this.$store
          .dispatch("loadPlanets", [
            `https://swapi.co/api/planets/${this.planetId}`
          ])
          .then(() => {
            this.wasActionCalled = true;
          });
      }
    }
  },
  mounted() {
    this.initData(this.$route.params.planetId);
  },
  beforeRouteUpdate(to, from, next) {
    this.initData(to.params.planetId);
  }
};
</script>

<style scoped lang="scss">
</style>
