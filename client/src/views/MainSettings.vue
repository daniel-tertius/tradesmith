<template>
  <teleport to="body">
    <base-banner :message="bannerMessage" type="success" ref="banner" />
  </teleport>
  <teleport to="body">
    <error-alert v-if="showAlert">
      <h2>Input is invalid!</h2>
      <p>Please enter correct input.</p>
      <base-button-group>
        <base-button @click="showAlert = false">Okay</base-button>
      </base-button-group>
    </error-alert>
  </teleport>

  <div>
    <tradesmith-heading />
    <tradesmith-sub-heading label="Settings" />
  </div>


  <div v-if="isDoneLoading">
    <base-input @setInvalid="setInvalid" v-for="(input) in inputs" v-bind:text="input.text" v-bind:text_info="input.textInfo" v-bind:input_type="input.inputType"
      v-bind:initValue="input.initValue" v-bind:key="input.text" :v-model:initValue="input.initValue" />
  </div>
  <base-spinner v-if="!isDoneLoading" />

  <base-button-group mode="row">
    <base-button label="Back" icon="arrow-left" :index="0" @click="back" />
    <base-button label="Save" icon="save" :index="1" @click="saveData" v-if="isDoneLoading" />
  </base-button-group>
</template>
  
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import PostService from "../PostService";

@Options({
  name: "MainSettings",
  async created() {
    try {
      type inputType = { text: string; textInfo: string; inputType: string; initValue: string; };
      const posts = await PostService.getPosts();
      const post = posts[0];
      const translate: Record<string, string> = {
        "Base Order Size": "zar_bid_amount",
        "Target profit (%)": "buy_percentage"
      }

      this.inputs = this.inputs.map((input: inputType) => {
        input.initValue = post[translate[input.text]];
        if (input.inputType === "percentage") {
          input.initValue += "%";
        }
        return input;
      });

      this.isDoneLoading = true;
    } catch (error: unknown) {
      console.error("ERROR:", error instanceof Error ? error.message : error);
    }
  },

  emits: {
    navigate: Function,
  }
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

  isDoneLoading = false;
  isInvalid = false;
  showAlert = false;

  bannerMessage = "";
  banner_type = "";

  setInvalid(value: boolean) {
    this.isInvalid = !!value;
  }
  saveData() {
    this.showAlert = this.isInvalid;
    if (this.isInvalid) return;

    this.showNotification();
    this.$emit("navigate", "BotLanding");
  }
  showNotification() {
    this.bannerMessage = "Hello, world!";
    this.banner_type = "info";
    //@ts-ignore
    this.$refs['banner'].show();
  }
  back() {
    this.$emit("navigate", "Landing");
  }
}
</script>