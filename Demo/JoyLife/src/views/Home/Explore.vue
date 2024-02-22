<template>
  <div class="explore-main">
    <div class="explore-outer">
      <div ref="exploreRef">
      <MiniCard v-for="(item,index) in exploreCards" :info="item" :key="item.id" @onImgLoaded="addImgCount"></MiniCard>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import MiniCard from "../../components/MiniCard.vue";
import { exploreCardMock } from "../../mock/homeData";
import computeWaterFallFlow from '../../utils/waterFallFlow';

//父组件初始化卡片数据
let exploreCards = reactive([])
let imgLen //记录需要加载的总图片数
const initData = () => {
  let res = exploreCardMock();
  imgLen = res.length;
  res.forEach(item =>{
    exploreCards.push(item);
  })
};

initData();

// 瀑布流计算每个card的位置（卡片位置的计算需要所有卡片加载完毕进行）
const exploreRef = ref(null);
//记录card中的image是否都已经加载完毕
//笨方法：计算图片总数
let imgCount = 0;
const addImgCount = () => {
  imgCount++;
  if(imgCount === imgLen){
    //开始计算瀑布流
    computeWaterFallFlow(exploreRef.value)
  }
};
</script>

<style lang="scss" scoped>
.explore-main {
  overflow: auto;
  height: 100vh;
  .explore-outer {
    position: relative;
    margin-top: 3rem;
    margin-bottom: 3rem;
  }
}
</style>
