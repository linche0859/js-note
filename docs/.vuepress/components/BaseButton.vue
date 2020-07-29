<template>
  <button type="button" v-on="$listeners" :disabled="loading">
    <span class="spinner-border spinner-border-sm" role="status" v-show="loading">
      <span class="sr-only">Loading...</span>
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

<style lang="scss" scope>
.baseButton {
}
</style>
