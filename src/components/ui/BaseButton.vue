<template>
  <button v-if="!link" :class="mode">
    <slot></slot>
  </button>
  <router-link v-else :to="to" :class="mode">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    mode: {
      type: String,
      required: false,
      default: null
    },
    link: {
      type: Boolean,
      required: false,
      default: false
    },
    to: {
      type: String,
      required: false,
      default: '/'
    }
  },
};
</script>

<style scoped>
button,
a {
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  font: inherit;
  background-color: #328b0f;
  border: 1px solid #328b0f;
  color: white;
  cursor: pointer;
  border-radius: 30px;
  margin-right: 0.5rem;
  display: inline-block;
}

a:hover,
a:active,
button:hover,
button:active {
  background-color: #256e08;
  border-color: #256e08;
}

.flat {
  background-color: transparent;
  color: #256e08;
  border: none;
}

.outline {
  background-color: transparent;
  border-color: #256e08;
  color: #256e08;
}

.flat:hover,
.flat:active,
.outline:hover,
.outline:active {
  background-color: #a2dc9a;
}
</style>