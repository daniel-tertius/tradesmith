<template>
  <div>
    <tradesmith-heading />
    <tradesmith-sub-heading label="Welcome!" />
  </div>

  <div>
    <img style="width: 100%; max-width: 20rem; min-width: 10rem" src="../assets/bitcoin_logo.png" />
    <div>Version: 0.0.8 - 17 June 2023</div>
  </div>

  <base-button-group mode="row">
    <base-button label="New" icon="seedling" :index="0" @click="createNewBot" />
    <base-button label="Load" icon="history" :index="1" @click="loadBot" />
  </base-button-group>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: "MainLanding",
  methods: {
    createNewBot(): void {
      this.$router.push({ path: "settings/new" });
    },

    loadBot(): void {
      this.$router.push({ name: 'BotLanding' })
    }
  }
});
</script>

<style scoped>
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
