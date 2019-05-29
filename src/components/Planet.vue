<template>
  <div class="wrapper">
    <h1>Planet Component</h1>
    <p>{{ data && data.name }}</p>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Planet",
  data() {
    return { 
      data: null,
      pending: true,
      isError: false,
    }
  },
  computed: {
    isDataLoaded() {
      return !this.isError && !this.pending;
    }
  },
  methods: {
    loadPlanetData(id) {
      axios.get(`https://swapi.co/api/planets/${id}`)
        .then(response => {
          if (response.status === 200) {
            this.data = response.data;
          }
          return response;
        })
        .catch(error => {
          console.log(error);
          this.isError = true;
        })
        .finally(() => {
          this.pending = false;
        });
    }
  },
  mounted() {
    const planetId = parseInt(this.$route.params.planetId);
    if (Number.isNaN(planetId)) {
      this.$router.push("/notFound");
    }

    this.loadPlanetData(planetId);
  },
  beforeRouteUpdate (to, from, next) {
    const planetId = parseInt(to.params.planetId);
    if (Number.isNaN(planetId)) {
      this.$router.push("/notFound");
    }

    this.loadPlanetData(planetId);
  },
}
</script>

<style scoped lang="scss">

</style>
