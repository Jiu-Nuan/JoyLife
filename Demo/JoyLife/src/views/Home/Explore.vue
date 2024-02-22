<template>
  <div class="explore-main">
    <div class="explore-outer">
      <MiniCard></MiniCard>
    </div>
  </div>

  <!-- <MiniCard></MiniCard> -->

</template>

<script setup>
import { ref, reactive } from "vue";
import MiniCard from "../../components/MiniCard.vue";
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
