<template>
  <component @navigate="changeStep" v-bind:is="selected_component" />
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  emits: ["setInvalid", "inputValue"],
  props: {
    text: {
      type: String,
      required: true
    },
    inputType: {
      type: String,
      required: true,
      validator: (value: string) => ['string', 'email', 'number', 'whole_number', 'currency', 'percentage'].includes(value)
    },
    text_info: {
      type: String,
      required: false,
      default: ''
    },
    initValue: {
      require: false,
      default: ""
    }
  },
  data() {
    return {
      inputValue: this.initValue,
      isInvalid: false,
      error_message: ''
    }
  },
  computed: {
    inputId() {
      return `input-${Math.random().toString(36).substring(2, 9)}`;
    }
  },
  methods: {
    validateInput() {
      let input_value, pattern;//: string | number;

      if (this.inputValue == null) return;
      if (typeof this.inputValue === "string" && !this.inputValue.trim().length) return;

      switch (this.inputType) {
        case 'email':
          const email_regex = /^\w[\.\w-]*@([\w-]+\.)+[\w-]{2,4}$/; // eslint-disable-line
          if (!email_regex.test(this.inputValue)) {
            this.isInvalid = true;
            this.error_message = 'Please enter a valid email address';
          }
          break;
        case "whole_number":
          if (isNaN(+this.inputValue)) {
            this.isInvalid = true;
            this.error_message = 'Please enter a valid number.';
          }

          if (+this.inputValue < 1) {
            this.isInvalid = true;
            this.error_message = 'Please enter a number greater than 0.';
          }
          break;
        case 'number':
          if (isNaN(+this.inputValue)) {
            this.isInvalid = true;
            this.error_message = 'Please enter a valid number.';
          }

          break;
        case 'currency':
          // eslint-disable-next-line
          input_value = this.inputValue.substring(2).trim();
          if (+input_value <= 0) {
            this.isInvalid = true;
            this.error_message = "Please enter a number greater than zero.";
            break;
          }

          // eslint-disable-next-line
          pattern = /^\d+(?:\.\d{1,2})?$/;
          if (!pattern.test(input_value)) {
            this.isInvalid = true;
            this.error_message = "Please enter a number with up to two decimal places.";
            break;
          }

          break;
        case 'percentage':
          // eslint-disable-next-line
          input_value = this.inputValue.substring(0, (this.inputValue.length - 1)).trim();
          if (+input_value <= 0) {
            this.isInvalid = true;
            this.error_message = "Please enter a number greater than zero.";
            break;
          }

          if (+input_value > 100) {
            this.isInvalid = true;
            this.error_message = "Please enter a number smaller or equal to 100.";
            break;
          }

          // eslint-disable-next-line
          pattern = /^\d{1,3}(\.\d{1,2})?$/;
          if (!pattern.test(input_value)) {
            this.isInvalid = true;
            this.error_message = "Please enter a valid percentage.";
            break;
          }

          break;
        default:
          break;
      }
      this.$emit('setInvalid', `${!!this.isInvalid}`);
    },
    handleKeyDown(event: any) {
      if (this.inputType !== "percentage") return;
      // Move the cursor to the prior position if it is on the last character
      if (
        event.target.selectionEnd === this.inputValue.length &&
        (event.key === 'ArrowLeft' || event.key === 'Backspace')
      ) {
        event.preventDefault();
        event.target.selectionEnd--;
      }

      this.$emit('inputValue', this.inputValue);
    },
  },
  watch: {
    inputValue() {
      this.isInvalid = false;
      this.error_message = '';

      switch (this.inputType) {
        case 'currency':
          // eslint-disable-next-line
          this.inputValue = `R ${this.inputValue.replace(/[^0-9\.]/g, "").trim()}`;
          break;
        case 'percentage':
          // eslint-disable-next-line
          this.inputValue = `${this.inputValue.replace(/[^0-9\.]/g, "").trim()}%`;
          break;
      }
    }
  }
})
</script>

<style scoped>
.input-group {
  margin-bottom: 1rem;
  width: 100%;
}

label {
  font-size: 1rem;
  font-weight: bold;
  height: 1rem;
  text-align: left;
  padding: 0.2rem;
}

input {
  padding: 0.5rem;
  border: none;
  border-radius: 5px;
  background-color: #444444;
  color: #FFFFFF;
  font-size: 1rem;
  transition: background-color 0.2s ease-in-out;
  width: calc(100% - 1rem);
  text-align: left;
}

.icon {
  padding: 0.2rem;
  height: 1rem;
}

input:focus {
  outline: none;
  background-color: #666666;
}

.label-group {
  display: flex;
  align-content: left;
  width: 100%;
}

.is-invalid {
  border: 2px solid #8B0000;
}

.invalid-feedback {
  color: #8B0000;
  font-size: 0.9rem;
  margin-top: 0.25rem;
}

.popup {
  position: relative;
  display: inline-block;
}

.popup .popup-text {
  visibility: hidden;
  width: 200px;
  background-color: #555;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 8px 0;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -100px;
  opacity: 0;
  transition: opacity 0.3s;
}

.popup .popup-text::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #555 transparent transparent transparent;
}

.popup:hover .popup-text {
  visibility: visible;
  opacity: 1;
}

@media screen and (max-width: 33rem) {
  .invalid-feedback {
    font-size: 0.7rem;
  }

  .icon {
    height: 0.8rem;
  }

  label {
    font-size: 0.8rem;
  }
}
</style>
