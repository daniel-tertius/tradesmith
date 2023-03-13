<template>
  <h2>Welcome!</h2>
  <button-group mode="row">
    <main-button :index="0" @click="createNewBot">New</main-button>
    <main-button :index="1" @click="loadBot">Load</main-button>
  </button-group>
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
* {
  box-sizing: border-box;
  margin: 0.1rem;
  padding: 0;
}

.container {
  font-family: 'Helvetica Neue', sans-serif;
  font-size: 16px;
  line-height: 1.5;
  color: #333333;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50vh;
}

h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

p {
  margin-bottom: 1rem;
}
</style>