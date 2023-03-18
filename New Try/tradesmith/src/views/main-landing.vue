<template>
  <div>
    <tradesmith-heading />
    <tradesmith-sub-heading label="Welcome!" />
  </div>
  <!-- <h2>Welcome!</h2> -->
  <div>
    <img style="width: 100%; max-width: 20rem; min-width: 10rem" src="../assets/bitcoin_logo.png" />
    <div>Version: 0.0.4 - 18 March 2023</div>
  </div>
  <base-button-group mode="row">
    <base-button label="New" icon="seedling" :index="0" @click="createNewBot" />
    <base-button label="Load" icon="history" :index="1" @click="loadBot" />
  </base-button-group>
</template>

<script>
export default {
  methods: {
    createNewBot() {
      this.$emit("navigate", "Settings");
    },

    loadBot() {
      // TODO: Implement logic for loading existing bots
      alert("Loading existing bots is not yet implemented");
    }
  }
}
</script>

<style>
img {
  width: 100%;
  max-width: 20rem;
}

@media screen and (max-width: 33rem) {
  img {
    max-width: 10rem;
  }
}
</style>