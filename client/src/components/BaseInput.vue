<template>
  <div class="label-group">
    <label :for="inputId" class="label">{{ text }}:</label>
    <div class="popup">
      <font-awesome-icon class="icon" icon="question-circle" />
      <span class="popuptext">{{ text_info }}</span>
    </div>
  </div>
  <div class="input-group">
    <input :id="inputId" :type="input_type" v-model="inputValue" :class="{ 'is-invalid': isInvalid }" @blur="validateInput" @keydown="handleKeyDown">
    <div v-if="isInvalid" class="invalid-feedback">{{ error_message }}</div>
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
    },
    initValue: {
      require: false,
      default: ""
    }
  },
  data() {
    return {
      inputValue: (() => {
        switch (this.input_type) {
          case 'currency': return `R ${this.initValue}`;
          default: return this.initValue;
        }
      })(),
      isInvalid: false,
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
      let input_value, pattern;//: string | number;

      if (this.inputValue == null) return;
      if (typeof this.inputValue === "string" && !this.inputValue.trim().length) return;

      switch (this.input_type) {
        case 'email':
          const email_regex = /^\w[\.\w-]*@([\w-]+\.)+[\w-]{2,4}$/; //eslint-disable-line
          if (!email_regex.test(this.inputValue)) {
            this.isInvalid = true;
            this.error_message = 'Please enter a valid email address';
          }
          break;
        case "whole_number":
          if (isNaN(this.inputValue)) {
            this.isInvalid = true;
            this.error_message = 'Please enter a valid number.';
          }

          if (this.inputValue < 1) {
            this.isInvalid = true;
            this.error_message = 'Please enter a number greater than 0.';
          }
          break;
        case 'number':
          if (isNaN(this.inputValue)) {
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
      this.$emit('setInvalid', this.isInvalid);
    },
    handleKeyDown(event) {
      if (this.input_type !== "percentage") return;
      // Move the cursor to the prior position if it is on the last character
      if (
        event.target.selectionEnd === this.inputValue.length &&
        (event.key === 'ArrowLeft' || event.key === 'Backspace')
      ) {
        event.preventDefault();
        event.target.selectionEnd--;
      }
    },
  },
  watch: {
    inputValue() {
      this.isInvalid = false;
      this.error_message = '';

      switch (this.input_type) {
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
