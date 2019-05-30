<template>
  <div class="wrapper" v-if="planet">
    <h1 class="planet-title">{{ planet.name }}</h1>
    <div class="details-wrapper">
      <div class="detail">
        <div class="detail-name">Climate</div>
        <div class="detail-value">{{ planet.climate }}</div>
      </div>
      <div class="detail">
        <div class="detail-name">Diameter</div>
        <div class="detail-value">{{ planet.diameter }}</div>
      </div>
      <div class="detail">
        <div class="detail-name">Gravity</div>
        <div class="detail-value">{{ planet.gravity }}</div>
      </div>
      <div class="detail">
        <div class="detail-name">Orbital Period</div>
        <div class="detail-value">{{ planet.orbital_period }}</div>
      </div>
      <div class="detail">
        <div class="detail-name">Population</div>
        <div class="detail-value"> {{ planet.population }}</div>
      </div>
      <div class="detail">
        <div class="detail-name">Rotation Period</div>
        <div class="detail-value">{{ planet.rotation_period }}</div>
      </div>
      <div class="detail">
        <div class="detail-name">Surface Water</div>
        <div class="detail-value">{{ planet.surface_water }}</div>
      </div>
      <div class="detail">
        <div class="detail-name">Terrain</div>
        <div class="detail-value">{{ planet.terrain }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Planet",
  data() {
    return { planetId: -1, wasActionCalled: false };
  },
  computed: {
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
.planet-title {
  font-size: 40px;
  color: #ffe300;
  font-weight: 300;
  text-transform: uppercase;
  margin-bottom: 20px;
}

.details-wrapper {
  list-style: none;
  border: 1px solid darken(#1c1e22, 10);
  background: #1c1e22;
  border-radius: 5px;
  width: 900px;
  margin: 0 auto;
}

.detail {
  cursor: unset;
  color: #c8c8c8;
  padding: 15px 0;
  border-bottom: 1px solid darken(#1c1e22, 10);
  display: flex;
  flex-flow: row nowrap;
}

.detail-name {
  flex: 1;
  font-size: 18px;
  color: #ffe300;
  font-weight: 300;
}

.detail-value {
  flex: 1;
  font-size: 16px;
  color: #c8c8c8;
  font-weight: 300;
  text-transform: capitalize
}
</style>
