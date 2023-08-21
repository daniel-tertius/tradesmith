<template>
  <base-container>
    <teleport to="body">
      <base-banner :message="bannerMessage" type="success" ref="banner" />
    </teleport>
    <teleport to="body">
      <error-alert v-if="showAlert" title="Input Issue Found" message="Please check you input values before continuing.">
        <base-button-group>
          <base-button label="Close" icon="times" @click="showAlert = false" />
        </base-button-group>
      </error-alert>
    </teleport>

    <div>
      <tradesmith-heading />
      <tradesmith-sub-heading label="Settings" />
    </div>

    <div v-if="isDoneLoading">
      <string-input label="Bot Name" info="Your name for the bot." :initialValue="botName" @setInvalid="setInvalid"
        @input="updateBotName" />

      <currency-input label="Base Order Size"
        info="The Base Order is the first trade that the bot will make when starting a new deal."
        :initialValue="baseOrderSize" @setInvalid="setInvalid" @input="updateBaseOrderSize" />
      <percentage-input label="Target profit (%)"
        info="Configure the bot's 'take profit %' target for successful trades; exchange fees factored in."
        :initialValue="takeProfit" @setInvalid="setInvalid" @input="updateTakeProfit" />
    </div>
    <base-spinner v-else />

    <base-button-group mode="row">
      <base-button label="Back" icon="arrow-left" :index="0" @click="$router.go(-1)" />
      <base-button label="Save" icon="save" :index="1" @click="saveData" v-if="isDoneLoading" />
    </base-button-group>
  </base-container>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue'
import PostService from "../setup/PostService";

import StringInput from '@/components/inputs/StringInput.vue';
import PercentageInput from '@/components/inputs/PercentageInput.vue';
import CurrencyInput from '@/components/inputs/CurrencyInput.vue';

export default defineComponent({
  name: "BotSettings",
  components: { StringInput, CurrencyInput, PercentageInput },
  props: {
    isNewBot: Boolean
  },
  async created() {
    if (!this.isNewBot) {
      await this.populateInputValues();
    }
    this.isDoneLoading = true;
  },

  data: () => {
    const data: {
      _id: string | null,
      botName: string,
      isBotNameRequired: boolean,
      baseOrderSize: string,
      isBaseOrderSizeRequired: boolean,
      takeProfit: string,
      isTakeProfitRequired: boolean,


      isDoneLoading: boolean,
      isInvalid: number,
      showAlert: boolean,

      bannerMessage: string,
      banner_type: string
    } = {
      _id: null,
      botName: "",
      isBotNameRequired: true,
      baseOrderSize: "",
      isBaseOrderSizeRequired: true,
      takeProfit: "",
      isTakeProfitRequired: true,


      isDoneLoading: false,
      isInvalid: 0,
      showAlert: false,

      bannerMessage: "",
      banner_type: ""
    }
    return data;
  },

  methods: {
    setInvalid(value: number) {
      this.isInvalid += value;
      console.log("Setting Value to:", this.isInvalid, value)
    },
    async saveData() {
      const isValid = this.isSettingsValid();
      this.showAlert = !isValid;
      if (!isValid) return;

      const data = {
        _id: this._id,
        bot_name: this.botName,
        target_profit: this.takeProfit,
        base_order_size: this.baseOrderSize
      }
      await PostService.savePost(data);

      // this.showNotification();

      // navigate away.
      if (this.isNewBot)
        this.$router.replace('/bot-landing');
      else
        this.$router.go(-1);
    },
    isSettingsValid(): boolean {
      if (this.isInvalid) return false;

      const isBlank = (text: string | null) => text == null || (typeof text === "string" && !text.trim().length);
      if (this.isBotNameRequired && isBlank(this.botName)) {
        return false;
      }

      if (this.isTakeProfitRequired && isBlank(this.takeProfit)) {
        return false;
      }

      if (this.isBaseOrderSizeRequired && isBlank(this.baseOrderSize)) {
        return false;
      }

      return true;
    },
    async populateInputValues() {
      this.botName = "Test";
      const post = await PostService.getFirstPost();
      if (!post) return;

      this._id = post._id;
      this.botName = post.bot_title;
      this.baseOrderSize = post.base_order_size;
      this.takeProfit = post.target_profit;
    },
    showNotification() {
      this.bannerMessage = "Hello, world!";
      this.banner_type = "info";
      //@ts-ignore
      this.$refs['banner'].show();
    },
    updateBotName(newValue: string) {
      this.botName = newValue;
    },
    updateBaseOrderSize(newValue: string) {
      this.baseOrderSize = newValue;
    },
    updateTakeProfit(newValue: string) {
      this.takeProfit = newValue;
    }
  }
})
</script>