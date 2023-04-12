<template>
  <teleport to="body">
    <error-alert v-if="showAlert" title="Work In Progress" message="The Load functionality is not yet implemented.">
      <base-button-group>
        <base-button label="Close" icon="times" :index="0" @click="showAlert = false" />
      </base-button-group>
    </error-alert>
  </teleport>

  <div>
    <tradesmith-heading />
    <tradesmith-sub-heading label="Welcome!" />
  </div>

  <div>
    <img style="width: 100%; max-width: 20rem; min-width: 10rem" src="../assets/bitcoin_logo.png" />
    <div>Version: 0.0.6 - 2 April 2023</div>
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
  emits: ['navigate'],

  methods: {
    createNewBot(): void {
      this.$emit("navigate", "Settings");
    },

    loadBot(): void {
      // TODO: Implement logic for loading existing bots
      this.showAlert = true;
    }
  },

  data() {
    return {
      showAlert: false
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
