<template>
  <base-container>
    <component @navigate="changeStep" v-bind:is="selected_component"></component>
  </base-container>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

import TradesmithHeading from './components/TradesmithHeading.vue';
import Landing from './views/main-landing.vue';
import Settings from './views/main-settings.vue';
import BotLanding from './views/bot-landing.vue';

@Options({
  components: {
    TradesmithHeading, Landing, Settings, BotLanding
  },
})

export default class App extends Vue {
  selected_component = "Landing";

  changeStep(step: 'TradesmithHeading' | 'Landing' | 'Settings' | 'BotLanding') {
    this.selected_component = step;
  }
}
</script>

<style>
#app {
  font-family: 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

h2 {
  font-size: 3rem;
  text-align: center;
  margin-bottom: 2rem;
  color: #333333;
  text-decoration: underline;
}

@media screen and (max-width: 700px) {
  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
}

@media screen and (max-width: 280px) {
  h2 {
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }
}
</style>