<template>
  <div class="tool-container">
    <div class="big-square">
      <i class="iconfont icon-yaowan"></i>
      <p>按时吃药</p>
    </div>
    <div class="small-square">
      <div
        v-for="(toolFunction, index) in toolFunctions"
        :key="index"
        class="tool-item"
      >
        {{ toolFunction }}
      </div>
    </div>
  </div>
</template>
  
  <script setup>
import { ref } from "vue";

const toolFunctions = ref([
  "手电",
  "付款码",
  "打车",
  "微信视频",
  "声音",
  "远程协助",
]);
</script>
  
  <style lang="scss" scoped>
.tool-container {
  @include flexlr;
  height: auto;
  width: 100%;
  padding: 0.3rem 0 0.3rem 0;
  background-color: #fefefe;
  .big-square {
    @include flexxl; /* 如果这个 mixin 已经定义了 flex 属性，请确保它包含 align-items: center; */
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    color: #fefefe;
    width: 10rem;
    height: 10.2rem;
    margin-right: 0.2rem;
    background-color: #ee7934;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 10px 15px rgba(0, 0, 0, 0.1);

    & > div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .iconfont {
      font-size: 3rem;
      margin-bottom: 0.5rem; /* 添加间距，根据实际情况调整 */
    }
  }

  .small-square {
    @include flexxl;
    width: auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 0.2rem; /* 用于控制元素之间的间距 */
  }

  .tool-item {
    width: 5rem;
    height: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
    color: goldenrod;
    background-color: #86d2ec;
    text-align: center;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1),
      /* 水平偏移 垂直偏移 模糊半径 阴影颜色透明度 */ 0 10px 15px
        rgba(0, 0, 0, 0.1); /* 可以添加多个阴影效果 */
  }

  /* 根据颜色设置背景色 */
  &.tool-item-orange {
    background-color: orange;
  }
  &.tool-item-red {
    background-color: red;
  }
  &.tool-item-aqua {
    background-color: aqua;
  }
  &.tool-item-yellow {
    background-color: yellow;
  }
  &.tool-item-black {
    background-color: black;
  }
  &.tool-item-purple {
    background-color: purple;
  }
}
</style>