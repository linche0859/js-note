<template>
  <div class="downloadRandomImage flex flex-col items-center">
    <img :src="imageUrl" class="mb-4 rounded" alt="photo" />
    <div class="flex">
      <base-button
        class="btn-outline-success mr-4"
        :outline="true"
        :loading="loading"
        @click="randomHandler"
      >Random</base-button>
      <base-button
        class="btn-outline-success"
        :outline="true"
        :loading="loading"
        @click="downloadHandler"
      >Download</base-button>
    </div>
  </div>
</template>

<script>
import BaseButton from "../../BaseButton";

export default {
  // 下載隨機圖片的範例
  name: "DownloadRandomImage",
  components: {
    BaseButton,
  },
  props: {},
  data() {
    return {
      random: 1,
      loading: false,
    };
  },
  computed: {
    imageUrl() {
      return `https://picsum.photos/200/300?random=${this.random}`;
    },
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async render(callback = () => {}) {
      this.loading = true;
      await this.$nextTick();
      await callback();
      this.loading = false;
    },
    async randomHandler() {
      this.render(async () => {
        this.random = Math.floor(Math.random() * 10);
      });
    },
    downloadHandler() {
      this.render(async () => {
        const stream = await fetch(this.imageUrl);
        const blob = await stream.blob();
        const href = URL.createObjectURL(blob);
        const link = document.createElement("a");
        document.body.appendChild(link);
        link.href = href;
        link.download = "photo.jpeg";
        link.click();
        document.body.removeChild(link);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.downloadRandomImage {
}
</style>
