<template>
    <div class="input">
        <label :for="inputId" class="label">{{ labelText }}:</label>
        <div class="form-group">
            <input :id="inputId" :type="inputType" v-model="input_value" :class="{ 'is-invalid': is_invalid }"
                @blur="validateInput">
            <div v-if="is_invalid" class="invalid-feedback">{{ error_message }}</div>
        </div>
    </div>
</template>
  
<script>
export default {
    props: {
        labelText: {
            type: String,
            required: true
        },
        inputType: {
            type: String,
            required: true,
            validator: (value) => ['text', 'email', 'number', 'whole_number'].includes(value)
        }
    },
    data() {
        return {
            input_value: '',
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
        validateInput() {
            if (this.input_value == null) return;
            if (typeof this.input_value === "string" && !this.input_value.trim().length) return;

            switch (this.inputType) {
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
                default:
                    break;
            }
        }
    },
    watch: {
        input_value() {
            this.is_invalid = false;
            this.error_message = '';
        }
    }
}
</script>
  
<style scoped>
.form-group {
    display: flex;
    flex-direction: column;
    /* margin-bottom: 1rem; */
}

.input {
    display: flex;
    flex-direction: row;
}

.label {
    width: 20%;
}

input {
    padding: 0.5rem;
    border: none;
    border-radius: 5px;
    background-color: #444444;
    color: #FFFFFF;
    font-size: 1rem;
    transition: background-color 0.2s ease-in-out;
}

input:focus {
    outline: none;
    background-color: #666666;
}

.is-invalid {
    border: 2px solid red;
}

.invalid-feedback {
    color: red;
    font-size: 0.8rem;
    margin-top: 0.25rem;
}
</style>
  