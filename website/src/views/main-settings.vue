<template>
  <teleport to="body">
    <notification-banner
      :message="banner_message"
      type="success"
      ref="banner"
    />
  </teleport>
  <teleport to="body">
    <error-alert v-if="isInvalid">
      <h2>Input is invalid!</h2>
      <p>Please enter correct input.</p>
      <button-group>
        <base-button @click="isInvalid = false">Okay</base-button>
      </button-group>
    </error-alert>
  </teleport>

  <div>
    <tradesmith-heading />
    <tradesmith-sub-heading label="Settings" />
  </div>
  <div>
    <base-input
      @setInvalid="setInvalid"
      text="Base Order Size"
      input_type="currency"
      text_info="The Base Order is the first order the bot will create when starting a new deal."
    />
    <base-input
      @setInvalid="setInvalid"
      text="Target profit (%)"
      input_type="percentage"
      text_info="Configure the percentage Take Profit target the bot will use to close successful trades, the bot will automatically account for exchange fees."
    />
  </div>

  <base-button-group mode="row">
    <base-button label="Back" icon="arrow-left" :index="0" @click="back" />
    <base-button label="Save" icon="save" :index="1" @click="saveData" />
  </base-button-group>
</template>
  
<script>
import Config from "../../../database/config.ts";

export default {
  emits: {
    navigate: Function,
  },
  data() {
    return {
      banner_message: "",
      banner_type: "",
      isInvalid: false,
    };
  },
  methods: {
    setInvalid(value) {
      console.log("setting Invalid", !!value);
      this.isInvalid = !!value;
    },
    saveData() {
      this.showNotification();
      this.$emit("navigate", "BotLanding");
    },
    showNotification() {
      this.banner_message = "Hello, world!";
      this.banner_type = "info";
      this.$refs.banner.show();
    },
    back() {
      this.$emit("navigate", "Landing");
    },
  },

  async created() {
    const config = new Config();
    const config_object = await config.findOne();

    console.log("Config:", JSON.stringify(config_object, null, 2));
  },
};
</script>