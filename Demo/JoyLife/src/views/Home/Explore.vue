<template>
  <div class="explore-main">
    <div class="explore-outer">
      <MiniCard v-for="(item,index) in exploreCards" :info="item" :key="item.id"></MiniCard>
    </div>
  </div>

  <!-- <MiniCard></MiniCard> -->

</template>

<script setup>
import { ref, reactive } from "vue";
import MiniCard from "../../components/MiniCard.vue";
import { exploreCardMock } from "../../mock/homeData";

//父组件初始化卡片数据
let exploreCards = reactive([])
const initData = () => {
  let res = exploreCardMock();
  res.forEach(item =>{
    exploreCards.push(item);
  })
};

initData();
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
