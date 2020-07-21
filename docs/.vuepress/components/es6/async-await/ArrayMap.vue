<template>
  <div class="arrayMap">
    <button
      :class="['btn', 'btn-success', {'mb-3': consoleList.length}]"
      :disabled="loading"
      @click="clickHandler"
    >
      <span v-if="loading">
        <span class="spinner-border spinner-border-sm" role="status">
          <span class="sr-only">Loading...</span>
        </span>
        <span>loading</span>
      </span>
      <span v-else>Click</span>
    </button>
    <ul class="my-0">
      <li
        v-for="item in consoleList"
        :key="'id' + item.currentItem"
      >{{ `目前讀取的值：${item.currentItem}，等待時間：${item.wait}秒` }}</li>
    </ul>
    <p v-show="resultList.length">最終取得的資料：{{ JSON.stringify(resultList) }}</p>
  </div>
</template>

<script>
export default {
  // 非同步執行陣列的 map 方法
  name: "ArrayMap",
  components: {},
  props: {},
  data() {
    return {
      // 載入狀態
      loading: false,
      // 陣列資料
      list: [1, 2, 3],
      // 畫面顯示的列表
      consoleList: [],
      // 非同步執行後的資料
      resultList: []
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    /**
     * 非同步執行 map 方法
     * @param {array} array 陣列資料
     * @param {function} callback 回乎函式
     */
    async asyncMap(array, callback) {
      const result = [];
      for (let index = 0; index < array.length; index++) {
        const data = await callback(array[index], index, array);
        result.push(data);
      }
      return result;
    },
    /**
     * 延遲事件
     * @param {function} callback 回乎函式
     * @param {number} seconds 延遲秒數
     */
    timeout(callback, seconds) {
      return new Promise(resolve =>
        setTimeout(() => {
          callback();
          resolve();
        }, seconds)
      );
    },
    /**
     * 點擊按紐事件
     */
    clickHandler() {
      this.loading = true;
      this.consoleList = [];
      this.resultList = [];
      this.$nextTick(async () => {
        this.resultList = await this.asyncMap(this.list, async item => {
          const wait = Math.floor(Math.random() * 10);
          await this.timeout(() => {
            this.consoleList.push({ currentItem: item, wait });
          }, wait * 1000);
          return item;
        });
        this.loading = false;
      });
    }
  }
};
</script>

<style lang="scss" scope>
.arrayMap {
}
</style>
