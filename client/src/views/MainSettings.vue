<template>
  <teleport to="body">
    <base-banner :message="bannerMessage" type="success" ref="banner" />
  </teleport>
  <teleport to="body">
    <error-alert v-if="showAlert" title="Input Issue Found" message="Please check you input values before continuing.">
      <base-button-group>
        <base-button label="Close" icon="times" :index="0" @click="showAlert = false" />
      </base-button-group>
    </error-alert>
  </teleport>

  <div>
    <tradesmith-heading />
    <tradesmith-sub-heading label="Settings" />
  </div>

  <div v-if="isDoneLoading">
    <base-input @setInvalid="setInvalid" v-for="(input) in inputs" v-bind:text="input.text" v-bind:text_info="input.textInfo" v-bind:inputType="input.inputType"
      v-bind:initValue="input.initValue" v-bind:key="input.text" :v-model:inputValue="input.enteredValue" />
  </div>
  <base-spinner v-else />

  <base-button-group mode="row">
    <base-button label="Back" icon="arrow-left" :index="0" @click="back" />
    <base-button label="Save" icon="save" :index="1" @click="saveData" v-if="isDoneLoading" />
  </base-button-group>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue'
import PostService from "../PostService";

export default defineComponent({
  name: "MainSettings",
  emits: ['navigate', 'inputValue'],

  async created() {
    try {
      type inputType = {
        text: string;
        propertyName: string;
        textInfo: string;
        inputType: string;
        required: boolean;
        initValue: string;
        enteredValue: null;
        // eslint-disable-next-line
        extractValue: (value: any) => any;
      };

      const post = await PostService.getFirstPost();

      this.inputs = this.inputs.map((input: inputType) => {
        input.enteredValue = post[input.propertyName];
        return input;
      });
    } catch (error: unknown) {
      console.error("ERROR:", error instanceof Error ? error.message : error);
    }
    this.isDoneLoading = true;
  },

  data: () => {
    return {
      inputs: [
        {
          text: "Bot Title",
          propertyName: "bot_title",
          textInfo: "The Bot title is the display value for the bot.",
          inputType: "string",
          required: true,
          initValue: "",
          enteredValue: null,
          extractValue: (value: any) => value
        },
        {
          text: "Base Order Size",
          propertyName: "base_order_size",
          textInfo: "The Base Order is the first order the bot will create when starting a new deal.",
          inputType: "currency",
          required: true,
          initValue: "R ",
          enteredValue: null,
          extractValue: (value: any) => value.substring(2, value.length - 1)
        },
        {
          text: "Target profit (%)",
          propertyName: "target_profit",
          textInfo: "Configure the percentage Take Profit target the bot will use to close successful trades, the bot will automatically account for exchange fees.",
          inputType: "percentage",
          required: true,
          initValue: "%",
          enteredValue: null,
          extractValue: (value: any) => value.substring(0, value.length - 2)
        }
      ],

      isDoneLoading: false,
      isInvalid: false,
      showAlert: false,

      bannerMessage: "",
      banner_type: ""
    }
  },

  methods: {
    setInvalid(value: boolean) {
      this.isInvalid = !!value;
    },
    saveData() {
      this.showAlert = this.isInvalid;
      if (this.isInvalid) return;

      const is_complete_info = this.inputs.every((input) => {
        console.log(input, input.enteredValue, input.extractValue(input.enteredValue));
        return input.required && input.extractValue(input.enteredValue) != null && input.extractValue(input.enteredValue).trim().length
      }
      );

      if (!is_complete_info) {
        this.showAlert = true;
        return;
      }

      this.showNotification();
      this.$emit("navigate", "BotLanding");
    },
    showNotification() {
      this.bannerMessage = "Hello, world!";
      this.banner_type = "info";
      //@ts-ignore
      this.$refs['banner'].show();
    },
    back() {
      this.$emit("navigate", "Landing");
    }
  }
})
</script>