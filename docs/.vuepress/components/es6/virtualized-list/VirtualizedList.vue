<script>
const ItemComponent = ({props, data, attrs}) => {
  return (
    <li class="item" style={data.style}>
      Index {props.index}
    </li>
  )
}

// 虛擬列表的範例
export default {
  name: 'VirtualizedList',
  components: {},
  props: {},
  data() {
    return {
      // 全部的項目數量
      numItems: 100,
      // 項目的高度
      itemHeight: 40,
      // 可滾動的區域高度
      scrollableAreaHeight: 400,
      // 滾動條距離最上方的距離
      scrollTop: 0
    };
  },
  computed: {
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    /**
     * 滾動事件
     * @param {object} e - scroll event
     */
    scrollHandler(e) {
      this.scrollTop = e.currentTarget.scrollTop;
    }
  },
  render() {
    const innerHeight = this.numItems * this.itemHeight;
    const startIndex = Math.floor(this.scrollTop / this.itemHeight);
    const endIndex = Math.min(
      this.numItems, // don't render past the end of the list
      Math.floor((this.scrollTop + this.scrollableAreaHeight) / this.itemHeight)
    );

    return(
      <div
        class="scroll" 
        style={{height: `${this.scrollableAreaHeight}px`}}
        onScroll={this.scrollHandler}>
        <ul class="inner" style={{height: `${innerHeight}px`}}>
          {
            Array.from({length: (endIndex - startIndex )}, (item, index) => (
              <ItemComponent 
                index={index + startIndex + 1} 
                style={{
                  top: `${(index + startIndex) * this.itemHeight}px`, 
                  height: `${this.itemHeight}px`,
                  lineHeight: `${this.itemHeight}px`}} />
            ))
          }
        </ul>
      </div>
    )
  }
};
</script>

<style lang="scss" scope>
  .scroll {
    overflow-y: auto;
  }
  .inner {
    position: relative;
    margin-bottom: 0;
    list-style: none;
    &:first-child {
      border-top: 1px solid;
    }
  }
  .item {
    position: absolute;
    left: 0;
    right: 0;
    text-align: center;
    border-width: 0 1px 1px 1px;
    border-style: solid;
  }
</style>
