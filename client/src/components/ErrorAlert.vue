<template>
  <div class="overlay"></div>
  <dialog open>
    <h1>{{ title }}</h1>
    <p>{{ message }}</p>
    <slot></slot>
  </dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true
    }
  }
});
</script>
  
<style scoped>
p {
  margin-top: 2rem;
  margin-bottom: 2rem;
  text-align: center;
  color: white;
  font-size: 1.2rem;
}

dialog {
  margin: 0;
  position: fixed;
  background-color: #555555;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.9);
  border-radius: 5px;
  padding: 1rem;
  
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 75%;
  max-width: 30rem;
  /* make sure the dialog is on top of the overlay */
  z-index: 1000;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* set the opacity value to create the fade effect */
  background-color: rgba(0, 0, 0, 0.6);
  /* make sure the overlay is on top of other elements */
  z-index: 999;
}

slot {
  color: #dddddd;
}

h1 {
  color: #FFFFFF;
  
  text-transform: uppercase;
  letter-spacing: 0.04em;
  text-align: center;

  background-color: #959595;
  border: 5px solid #FFFFFF;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);

  margin: 0;
  margin-bottom: 1rem;
  padding: 1rem;
  font-size: 1.5rem;
}

@media screen and (max-width: 33rem) {
  h1 {
    font-size: 1rem;
    padding: 1rem;
  }

  p {
    font-size: 1rem;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
  }
}

@media screen and (max-width: 300px) {
  h1 {
    font-size: 0.75rem;
    padding: 0.5rem;
    letter-spacing: 0.05rem;
    border-width: 2px;
  }

  p {
    font-size: 0.75rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
}
</style>
  