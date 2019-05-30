<template>
  <div class="wrapper">
    <h1>Species Component</h1>
    <p> {{ species && species.name }} </p>
  </div>
</template>

<script>
export default {
  name: "Species",
  computed: {
    data() {
      return { speciesId: -1, wasActionCalled: false };
    },
    species() {
      const species = this.$store.getters.getSpeciesById(this.speciesId);
      if (!species && this.wasActionCalled) {
        this.$router.push("/notFound");
        return null;
      }
      return species;
    }
  },
  methods: {
    initData(id) {
      this.speciesId = parseInt(id);
      if (Number.isNaN(this.speciesId) || this.speciesId < 0) {
        this.$router.push("/notFound");
      }

      if (!this.$store.getters.getSpeciesById(this.speciesId)) {
        this.$store
          .dispatch("loadSpecies", [
            `https://swapi.co/api/species/${this.speciesId}`
          ])
          .then(() => {
            this.wasActionCalled = true;
          });
      }
    }
  },
  mounted() {
    this.initData(this.$route.params.speciesId);
  },
  beforeRouteUpdate(to, from, next) {
    this.initData(to.params.speciesId);
  }
}
</script>

<style scoped lang="scss">

</style>
