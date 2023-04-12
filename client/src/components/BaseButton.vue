<template>
  <button>
    <font-awesome-icon class="icon" v-if="leftIcon" :icon="leftIcon" />
    <span>{{ label }}</span>
    <font-awesome-icon class="icon" v-if="rightIcon" :icon="rightIcon" />
  </button>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    label: { type: String, required: true },
    index: Number,
    icon: String,
    iconPosition: {
      type: String,
      default: 'left',
      validator: (value: string) => ['left', 'right'].includes(value)
    }
  },
  computed: {
    leftIcon() {
      return this.iconPosition === 'left' ? this.icon : null;
    },
    rightIcon() {
      return this.iconPosition === 'right' ? this.icon : null;
    }
  }
})
</script>

<style scoped>
button {
  font-size: 1.6rem;
  border: none;
  align-self: center;
  align-content: center;
  border-radius: 5px;
  background-color: #444444;
  color: #FFFFFF;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  margin-right: 1rem;

  width: 100%;
  margin: 0;
  padding: 1.25rem 1rem;
}

button:hover {
  background-color: #666666;
}

.icon {
  padding-inline: 1rem;
}

span {
  text-align: center;
  width: 100%;
}

@media screen and (max-width: 33rem) {
  button {
    font-size: 1.2rem;
    padding: 0.75rem;
  }
}

@media screen and (max-width: 300px) {
  button {
    padding: 0.5rem;
  }
}
</style>
