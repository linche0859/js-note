<template>
  <iframe
    class="w-full"
    frameborder="0" 
    sandbox="allow-forms allow-modals allow-pointer-lock allow-presentation allow-same-origin allow-scripts" 
    scrolling="no"
    :src="url"
    :height="height"
  >
  </iframe>
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
      return `//codepen.io/linche0859/embed/${this.urlId}/?theme-id=modal`;
    },
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>
