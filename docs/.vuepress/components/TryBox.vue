<template>
  <div class="tryBox">
    <div class="tryBox__title">試一試</div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TryBox",
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>

<style lang="scss" scope>
.tryBox {
  position: relative;
  margin: 3rem 0;
  padding: 3rem 2rem 2rem;
  background: #fff;
  border: 2px solid #c4ead9;
  &__title {
    position: absolute;
    top: -2px;
    left: -2px;
    padding: 4px 8px;
    background-color: #66c89c;
    color: #fff;
    font-size: 80%;
  }
}
</style>
