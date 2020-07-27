<template>
  <div class="lazyloadImage">
    <div class="container">
      <div class="row flex-wrap">
        <div class="col-4" v-for="item in list" :key="'id' + item">
          <picture class="position-relative d-block mb-3 rounded">
            <div class="lazyloadImage__mockup rounded"></div>
            <img
              src
              :data-src="'https://picsum.photos/500/500?random=' + item"
              alt
              class="lazyloadImage__img lazy rounded"
            />
          </picture>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // lazy loading 延遲載入圖片範例
  name: 'LazyloadImage',
  components: {},
  props: {},
  data() {
    return {
      list: []
    };
  },
  computed: {},
  watch: {},
  created() {},
  async mounted() {
    this.list = Array.apply(null, { length: 60 }).map(
      (item, index) => index + 1
    );
    await this.$nextTick();

    const removeMockup = (event) => {
      const mockup = event.target.previousElementSibling;
      mockup.classList.remove('lazyloadImage--loading');
      mockup.classList.add('lazyloadImage--fadeOut');
      mockup.addEventListener('transitionend', mockup.remove);
    };

    const loadImage = (img) => {
      img.previousElementSibling.classList.add('lazyloadImage--loading');
      img.setAttribute('src', img.dataset.src);
      img.removeAttribute('data-src');
      img.addEventListener('load', removeMockup);
    };

    const onEnterView = (entries, observer) => {
      for (let entry of entries) {
        if (entry.isIntersecting) {
          loadImage(entry.target);
          observer.unobserve(entry.target);
        }
      }
    };
    const watcher = new IntersectionObserver(onEnterView);
    const lazyImages = document.querySelectorAll('.lazyloadImage__img.lazy');
    for (let image of lazyImages) {
      watcher.observe(image);
    }
  },
  methods: {}
};
</script>

<style lang="scss" scope>
/* 載入動畫，從右到左 */
@keyframes loading {
  from {
    background-position-x: 100%;
  }
  to {
    background-position-x: 0%;
  }
}
.lazyloadImage {
  height: 300px;
  overflow-y: auto;
  &__mockup {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(
      -90deg,
      rgb(236, 236, 236) 0%,
      rgb(236, 236, 236) 40%,
      rgb(232, 232, 232) 50%,
      rgb(236, 236, 236) 60%,
      rgb(236, 236, 236) 100%
    );
    background-repeat: repeat;
    transition: opacity 0.6s ease-in;
  }
  &__img {
    display: block;
    width: 100%;
    height: 250px;
    object-fit: cover;
  }
  &--loading {
    animation: loading 1.5s ease infinite;
  }
  &--fadeOut {
    opacity: 0;
  }
}
</style>
