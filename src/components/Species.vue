<template>
  <div class="wrapper" v-if="species">
    <h1 class="species-title">{{ species.name }}</h1>
    <div class="details-wrapper">
      <div class="detail">
        <div class="detail-name">Average Height</div>
        <div class="detail-value">{{ species.average_height }}</div>
      </div>
      <div class="detail">
        <div class="detail-name">Average Lifespan</div>
        <div class="detail-value">{{ species.average_lifespan }}</div>
      </div>
      <div class="detail">
        <div class="detail-name">Designation</div>
        <div class="detail-value">{{ species.designation }}</div>
      </div>
      <div class="detail">
        <div class="detail-name">Eye Colors</div>
        <div class="detail-value">{{ species.eye_colors }}</div>
      </div>
      <div class="detail">
        <div class="detail-name">Hair Colors</div>
        <div class="detail-value"> {{ species.hair_colors }}</div>
      </div>
      <div class="detail">
        <div class="detail-name">Language</div>
        <div class="detail-value">{{ species.language }}</div>
      </div>
      <div class="detail">
        <div class="detail-name">Skin Colors</div>
        <div class="detail-value">{{ species.skin_colors }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Species",
  data() {
    return { speciesId: -1, wasActionCalled: false };
  },
  computed: {
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
};
</script>

<style scoped lang="scss">
.species-title {
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
