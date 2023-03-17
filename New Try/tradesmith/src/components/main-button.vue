<template>
  <button>
    <font-awesome-icon class="icon" v-if="leftIcon" :icon="leftIcon" />
    <span>
      <slot></slot>
    </span>
    <font-awesome-icon class="icon" v-if="rightIcon" :icon="rightIcon" />
  </button>
</template>

<script>
export default {
  props: {
    index: Number,
    icon: String,
    iconPosition: {
      type: String,
      default: 'left',
      validator: (value) => ['left', 'right'].includes(value)
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
};
</script>

<style scoped>
button {
  font-family: 'Helvetica Neue', sans-serif;
  font-size: 1.6rem;
  padding: 1rem 1rem;
  border: none;
  align-self: center;
  align-content: center;
  border-radius: 5px;
  background-color: #444444;
  color: #FFFFFF;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  margin: 0;
  margin-right: 1rem;
  width: 100%;
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

@media screen and (max-width: 300px) {
  button {
    font-size: 1.2rem;
    padding: 0.5rem 1rem;
  }
}
</style>
