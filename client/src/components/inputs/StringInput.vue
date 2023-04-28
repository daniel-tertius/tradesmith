<template>
    <div>
        <div class="label-group">
            <!-- Title of the input -->
            <label>{{ label }}:</label>

            <!-- Question mark and additional text -->
            <div class="popup" v-if="info">
                <font-awesome-icon class="icon" icon="question-circle" />
                <span class="popup-text">{{ info }}</span>
            </div>
        </div>

        <div class="input-group">
            <!-- Input area -->
            <input v-model="input" :class="{ 'is-invalid': !!errorMessage }" />

            <!-- Invalid text -->
            <div v-if="!!errorMessage" class="invalid-feedback">{{ errorMessage }}</div>
        </div>
    </div>
</template>
    
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    emits: ["setInvalid", "input"],
    props: {
        label: {
            type: String,
            required: true
        },
        info: String,
        initialValue: String,
    },
    data() {
        const data: {
            input: string
            errorMessage: string | null
        } = {
            input: this.initialValue ?? "",
            errorMessage: null
        }
        return data;
    },
    watch: {
        // Synchronize the input prop with the user input
        input(newValue: string) {
            this.input = newValue;
            this.$emit('input', newValue);
        }
    },
    methods: {
        validateInput() {
            this.$emit('setInvalid', !!this.errorMessage);
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
  