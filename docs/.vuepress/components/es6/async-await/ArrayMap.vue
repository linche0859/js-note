<template>
  <div class="arrayMap">
    <h2 class="border-bottom-0">Get [1,2,3] order by order</h2>
    <base-button
      :class="['btn', 'btn-success', {'mb-3': consoleList.length}]"
      :loading="loading"
      @click="clickHandler"
    ></base-button>
    <ul class="my-0">
      <li
        v-for="item in consoleList"
        :key="'id' + item.currentItem"
      >{{ `Current value：${item.currentItem}，Waiting time：${item.wait}秒` }}</li>
    </ul>
    <p v-show="resultList.length">The final data：{{ JSON.stringify(resultList) }}</p>
  </div>
</template>

<script>
import BaseButton from "../../BaseButton";

export default {
  // 非同步執行陣列的 map 方法
  name: "ArrayMap",
  components: {
    BaseButton,
  },
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
      resultList: [],
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
      return new Promise((resolve) =>
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
        this.resultList = await this.asyncMap(this.list, async (item) => {
          const wait = Math.floor(Math.random() * 5);
          await this.timeout(() => {
            this.consoleList.push({ currentItem: item, wait });
          }, wait * 1000);
          return item;
        });
        this.loading = false;
      });
    },
  },
};
</script>

<style lang="scss" scope>
.arrayMap {
}
</style>
