<template>
  <div class="label-group">
    <label :for="inputId" class="label">{{ text }}:</label>
    <div class="popup">
      <font-awesome-icon icon="question-circle" />
      <span class="popuptext">{{ text_info }}</span>
    </div>
  </div>
  <div class="input-group">
    <input :id="inputId" :type="input_type" v-model="input_value" :class="{ 'is-invalid': is_invalid }"
      @blur="validateInput" @keydown="handleKeyDown">
    <div v-if="is_invalid" class="invalid-feedback">{{ error_message }}</div>
  </div>
</template>
  
<script>
export default {
  emits: {
    "setInvalid": Function
  },
  props: {
    text: {
      type: String,
      required: true
    },
    input_type: {
      type: String,
      required: true,
      validator: (value) => ['text', 'email', 'number', 'whole_number', 'currency', 'percentage'].includes(value)
    },
    text_info: {
      type: String,
      required: false,
      default: ''
    }
  },
  data() {
    return {
      input_value: (() => {
        switch (this.input_type) {
          case 'currency': return "R ";
          default: return "";
        }
      })(),
      is_invalid: false,
      error_message: ''
    }
  },
  computed: {
    inputId() {
      return `input-${Math.random().toString(36).substr(2, 9)}`;
    }
  },
  methods: {
    getInitValue() {
      return "R ";
    },
    validateInput() {
      if (this.input_value == null) return;
      if (typeof this.input_value === "string" && !this.input_value.trim().length) return;

      switch (this.input_type) {
        case 'email':
          const email_regex = /^\w[\.\w-]*@([\w-]+\.)+[\w-]{2,4}$/; //eslint-disable-line
          if (!email_regex.test(this.input_value)) {
            this.is_invalid = true;
            this.error_message = 'Please enter a valid email address';
          }
          break;
        case "whole_number":
          if (isNaN(this.input_value)) {
            this.is_invalid = true;
            this.error_message = 'Please enter a valid number';
          }

          if (this.input_value < 1) {
            this.is_invalid = true;
            this.error_message = 'Please enter a number greater than 0.';
          }
          break;
        case 'number':
          if (isNaN(this.input_value)) {
            this.is_invalid = true;
            this.error_message = 'Please enter a valid number';
          }

          break;
        case 'currency':
          break;
        case 'percentage':
          if (!/^\d{1,3}(\.\d{1,2})?%/.test(this.input_value)) {
            this.is_invalid = true;
            this.error_message = "Please enter a valid percentage";
          }
          break;
        default:
          break;
      }
      this.$emit('setInvalid', this.is_invalid);
    },
    handleKeyDown(event) {
      if (this.input_type !== "percentage") return;
      // Move the cursor to the prior position if it is on the last character
      if (
        event.target.selectionEnd === this.input_value.length &&
        (event.key === 'ArrowLeft' || event.key === 'Backspace')
      ) {
        event.preventDefault();
        event.target.selectionEnd--;
      }
    },
  },
  watch: {
    input_value() {
      this.is_invalid = false;
      this.error_message = '';

      switch (this.input_type) {
        case 'currency':
          // eslint-disable-next-line
          this.input_value = `R ${this.input_value.replace(/[^0-9\.]/g, "").trim()}`;
          break;
        case 'percentage':
          // eslint-disable-next-line
          this.input_value = `${this.input_value.replace(/[^0-9\.]/g, "").trim()}%`;
          break;
      }
    }
  }
}
</script>

<style scoped>
.input-group {
  margin-bottom: 1rem;
  width: 100%;
}

.label {
  font-weight: bold;
  height: 1rem;
  text-align: left;
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
  border: 2px solid red;
}

.invalid-feedback {
  color: red;
  font-size: 0.8rem;
  margin-top: 0.25rem;
}

.popup {
  position: relative;
  display: inline-block;
}

.popup .popuptext {
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

.popup .popuptext::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #555 transparent transparent transparent;
}

.popup:hover .popuptext {
  visibility: visible;
  opacity: 1;
}
</style>
