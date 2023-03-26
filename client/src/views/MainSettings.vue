<template>
  <teleport to="body">
    <notification-banner :message="banner_message" type="success" ref="banner" />
  </teleport>
  <teleport to="body">
    <error-alert v-if="isInvalid">
      <h2>Input is invalid!</h2>
      <p>Please enter correct input.</p>
      <base-button-group>
        <base-button @click="isInvalid = false">Okay</base-button>
      </base-button-group>
    </error-alert>
  </teleport>

  <div>
    <tradesmith-heading />
    <tradesmith-sub-heading label="Settings" />
  </div>
  <div>
    <base-input @setInvalid="setInvalid" v-for="(input) in inputs" v-bind:text="input.text" v-bind:text_info="input.textInfo" v-bind:input_type="input.inputType"
      v-bind:initValue="input.initValue" v-bind:key="input.text" />
    <p v-for="(input) in inputs" v-bind:key="input.text">{{ input.initValue }}</p>
    <!--     
    <base-input @setInvalid="setInvalid" text="Base Order Size" input_type="currency" :initValue="base_order"
      text_info="The Base Order is the first order the bot will create when starting a new deal." />
    <base-input @setInvalid="setInvalid" text="Target profit (%)" input_type="percentage" :initValue="target_profit"
      text_info="Configure the percentage Take Profit target the bot will use to close successful trades, the bot will automatically account for exchange fees." /> -->
    <button @click="refresh">REFRESH</button>
  </div>

  <base-button-group mode="row">
    <base-button label="Back" icon="arrow-left" :index="0" @click="back" />
    <base-button label="Save" icon="save" :index="1" @click="saveData" />
  </base-button-group>
</template>
  
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import PostService from "../PostService";

@Options({
  name: "MainSettings",
  async created() {
    try {
      const posts = await PostService.getPosts();
      const post = posts[0];
      const translate: Record<string, string> = {
        "Base Order Size": "zar_bid_amount",
        "Target profit (%)": "buy_percentage"
      }
      this.inputs = this.inputs.map((input: { text: string; textInfo: string; inputType: string; initValue: string; }) => {
        input.initValue = post[translate[input.text]];
        return input
      });

      console.log("this.inputs", this.inputs)

    } catch (error: unknown) {
      console.error("ERROR:", error instanceof Error ? error.message : error);
    }
  },

  emits: {
    navigate: Function,
  },
})

export default class MainSettings extends Vue {
  inputs = [
    {
      text: "Base Order Size",
      textInfo: "The Base Order is the first order the bot will create when starting a new deal.",
      inputType: "currency",
      initValue: ""
    },
    {
      text: "Target profit (%)",
      textInfo: "Configure the percentage Take Profit target the bot will use to close successful trades, the bot will automatically account for exchange fees.",
      inputType: "percentage",
      initValue: ""
    }
  ];

  banner_message = "";
  banner_type = "";
  isInvalid = false;

  setInvalid(value: boolean) {
    console.log("setting Invalid", !!value);
    this.isInvalid = !!value;
  }
  saveData() {
    this.showNotification();
    this.$emit("navigate", "BotLanding");
  }
  showNotification() {
    this.banner_message = "Hello, world!";
    this.banner_type = "info";
    // this.$refs.banner.show();
  }
  back() {
    this.$emit("navigate", "Landing");
  }
  async refresh() {
    try {
      const posts = await PostService.getPosts();
      const post = posts[0];
      const translate: Record<string, string> = {
        "Base Order Size": "zar_bid_amount",
        "Target profit (%)": "buy_percentage"
      }
      this.inputs = this.inputs.map((input: { text: string; textInfo: string; inputType: string; initValue: string; }) => {
        input.initValue = post[translate[input.text]];
        return input
      });

      console.log("this.inputs", this.inputs)

    } catch (error: unknown) {
      console.error("ERROR:", error instanceof Error ? error.message : error);
    }
  }
}
</script>