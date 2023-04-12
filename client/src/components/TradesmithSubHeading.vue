<template>
  <h1>{{ label }}</h1>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    label: String
  }
});
</script>

<style scoped>
h1 {
  color: #FFFFFF;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  text-align: center;

  background-color: #2730D6;
  border: 5px solid #FFFFFF;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);

  margin: 0;
  margin-bottom: 1rem;
  padding: 1rem;
  font-size: 2rem;
}

@media screen and (max-width: 33rem) {
  h1 {
    font-size: 1.2rem;
    padding: 1rem;
  }
}

@media screen and (max-width: 300px) {
  h1 {
    font-size: 1rem;
    padding: 0.5rem;
    letter-spacing: 0.05rem;
    border-width: 2px;
  }
}
</style>

