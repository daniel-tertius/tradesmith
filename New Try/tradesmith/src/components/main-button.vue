<template>
  <button :style="style">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    styleProps: {
      type: Object,
      default: () => ({}),
    },
    index: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      button_group_mode: this.$parent.$props.mode
    }
  },
  computed: {
    style() {
      return {
        "margin-left": this.$parent.mode === "row" ? this.index === 0 ? "0" : "0.5rem" : "0",
        "margin-right": this.$parent.mode === "row" ? this.index === this.$parent.$slots.default().length - 1 ? "0" : "0.5rem" : "0",
        "width": this.$parent.mode === "row" ? `${(100 / this.$parent.$slots.default().length).toFixed(2)}%` : "100%",
      };
    },
  },
};
</script>

<style>
button {
  font-family: 'Helvetica Neue', sans-serif;
  font-size: 1.5rem;
  padding: 1rem 2rem;
  border: none;
  align-self: center;
  align-content: center;
  border-radius: 5px;
  background-color: #444444;
  color: #FFFFFF;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  margin-top: 0;
  margin-bottom: 0.5rem;
}

button:hover {
  background-color: #666666;
}

@media screen and (max-width: 700px) {
  button {
    font-size: 1rem;
    padding: 0.5rem 1rem;
  }
}

@media screen and (max-width: 280px) {
  button {
    font-size: 0.5rem;
    padding: 0.25rem 0.5rem;
  }
}
</style>