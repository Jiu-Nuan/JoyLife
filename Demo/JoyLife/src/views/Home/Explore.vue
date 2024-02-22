<!-- 发现的卡片小组件 -->
<template>
  <div class="explore-main">
    <div class="explore-outer">
      <MiniCard></MiniCard>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import MiniCard from "../../components/MiniCard.vue";
</script>

<style lang="scss" scoped>
.explore-main {
  overflow: auto;
  //width: 100vh;
  height: 100%;
  .explore-outer {
    position: relative;
    margin-top: 3rem;
    margin-bottom: 3rem;
  }
}
</style>
