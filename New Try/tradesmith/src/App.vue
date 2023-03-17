<template>
  <main-container>
    <TradesmithHeading />
    <component @navigate="changeStep" v-bind:is="selected_component"></component>
  </main-container>
</template>

<script>
import TradesmithHeading from './components/tradesmith-heading.vue';
import Landing from './views/main-landing.vue';
import Settings from './views/main-settings.vue';
import BotLanding from './views/bot-landing.vue';

export default {
  name: 'App',
  components: {
    TradesmithHeading, Landing, Settings, BotLanding
  },
  data() {
    return {
      selected_component: "Landing"
    }
  },
  methods: {
    changeStep(step) {
      this.selected_component = step;
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
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
