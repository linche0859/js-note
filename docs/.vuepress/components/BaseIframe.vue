<template>
  <div class="iframe">
    <iframe
      class="w-full"
      frameborder="0"
      scrolling="no"
      allowtransparency="true"
      allowfullscreen="true"
      :src="url"
      :height="height"
    ></iframe>
  </div>
</template>

<script>
export default {
  name: "BaseIframe",
  components: {},
  props: {
    urlId: {
      type: String,
      required: true,
    },
    height: {
      type: String,
      default: "560",
    },
  },
  data() {
    return {};
  },
  computed: {
    url() {
      return `//codepen.io/linche0859/embed/${this.urlId}/?theme-id=0&default-tab=html,result&embed-version=2`;
    },
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.iframe {
}
</style>
