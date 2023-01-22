<template>
  <section>
    <header>
      <h1>TradeSmith</h1>
    </header>
    <form @submit.prevent="saveConfig">
      <header>Instellings</header>

      <div>
        <label>Stop Kope nr:</label>
        <input v-model="max_buys" type="text" />
        <div class="info">
          Maksimum opeenvolgende kope wat TradeSmith mag maak voor dit stop.
        </div>
      </div>

      <div>
        <label>Kapitaal:</label>
        <input v-model="btc_bid_amount" type="tel" />
        <div class="info">Aantal BTC waarmee TradeSmith aankope gaan maak.</div>
      </div>

      <div>
        <label>Kyk Intervalle:</label>
        <input v-model="minutes_interval_loop" type="email" />
        <div class="info">
          Minute tussen elke 'kyk' om te weet of Tradesmith moet koop/verkoop.
        </div>
      </div>

      <div>
        <label>Koop Persentasie:</label>
        <input v-model="buy_percentage" type="text" />
      </div>

      <div>
        <label>Verkoop Persentasie:</label>
        <input v-model="sell_percentage" type="text" />
      </div>

      <button>Save</button>
    </form>
    <div id="main-div">
      <div>
        <label>{{ getBotStatusDescription() }}</label>
      </div>
      <button @click="toggleBotRunning">
        {{ is_bot_running ? "Stop" : "Start" }} Trading
      </button>
      <button @click="toggleBotPaused">
        {{ is_bot_paused ? "Continue" : "Pause" }} Trading
      </button>
      <div>
        <label>Aktiwiteit:</label>
      </div>
      <div>
        <textarea />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      is_bot_running: false,
      is_bot_paused: false,
      temp_config: {},
      temp_saved_data: {},
    };
  },
  methods: {
    toggleBotRunning() {
      this.is_bot_running = !this.is_bot_running;
      if (!this.is_bot_running) {
        this.is_bot_paused = false;
      } else {
        // run();
      }
    },
    toggleBotPaused() {
      if (!this.is_bot_running) return;

      this.is_bot_paused = !this.is_bot_paused;
    },
    getBotStatusDescription() {
      if (!this.is_bot_running) {
        return "TradeSmith is gestop.";
      }

      if (this.is_bot_paused) {
        return "TradeSmith is op halt gesit.";
      }

      return "TradeSmith is besig om te hardloop.";
    },
    saveConfig() {},
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Jost&display=swap");
* {
  box-sizing: border-box;
}

html {
  font-family: "Jost", sans-serif;
}

body {
  margin: 0;
  background-image: url("assets/cover_image.jpg");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  position: relative;
}

textarea {
  width: 90%;
  max-width: 40rem;
  height: 20rem;
}

header {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  margin: 3rem auto;
  border-radius: 10px;
  padding: 1rem;
  background-color: #58004d;
  color: white;
  text-align: center;
  width: 90%;
  max-width: 40rem;
}

#app ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

#app li {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  margin: 1rem auto;
  border-radius: 10px;
  padding: 1rem;
  text-align: center;
  width: 90%;
  max-width: 40rem;
}

#app form {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  background-color: rgba(255, 255, 255, 0.75);
  margin: 1rem auto;
  border-radius: 10px;
  padding: 1rem;
  text-align: center;
  width: 90%;
  max-width: 40rem;
}

#app h2 {
  font-size: 2rem;
  border-bottom: 4px solid #ccc;
  color: #58004d;
  margin: 0 0 1rem 0;
}

#app button {
  font: inherit;
  margin-inline: 0.5rem;
  cursor: pointer;
  border: 1px solid #ff0077;
  background-color: #ff0077;
  color: white;
  padding: 0.05rem 1rem;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.26);
}

#app button:hover,
#app button:active {
  background-color: #ec3169;
  border-color: #ec3169;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.26);
}

#app input {
  font: inherit;
  padding: 0.15rem;
}

#app label {
  font-weight: bold;
  margin-right: 1rem;
  width: 8rem;
  display: inline-block;
}

#app form div {
  margin: 1rem 0;
}

.info {
  color: #3d3d3d;
}

#main-div {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  background-color: rgba(255, 255, 255, 0.75);
  margin: 1rem auto;
  border-radius: 10px;
  padding: 1rem;
  text-align: center;
  width: 90%;
  max-width: 40rem;
}
</style>