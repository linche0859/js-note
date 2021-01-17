<template>
  <button type="button" v-on="$listeners" :disabled="loading">
    <span 
      :class="['loader', 'mr-2', 'w-6', 'h-6', 'border-4', 
        'border-solid', 'rounded-full',
        {'border-green-500': outline},
        {'border-white': !outline} ]" 
      v-show="loading">
    </span>
    <span v-if="loading">loading</span>
    <slot v-else>Click</slot>
  </button>
</template>

<script>
export default {
  // 基本按鈕
  name: "BaseButton",
  components: {},
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    outline: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.baseButton {
}
@keyframes loader-rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
.loader {
  border-right-color: transparent;
  animation: loader-rotate 1s linear infinite;
}
</style>
