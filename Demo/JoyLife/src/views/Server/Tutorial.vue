<template>
  <div class="tutorial-carousel">
    <el-carousel indicator-position="inside">
      <el-carousel-item v-for="item in 4" :key="item">
        <!-- <h3 text="2xl" justify="center">{{ item }}</h3> -->
        <!-- <img src="../../mock/source/img0{{item}}.jpg" alt=""> -->
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
  
  <script setup>
import { ref, reactive } from "vue";
</script>

<style lang="scss" scoped>

.tutorial-carousel {
  position: relative;
  width: 100vw;
  height: auto;
  top: 3rem;
  background-color: #fefefe;
  border-radius: 0.5rem;
  box-shadow: 0.125rem 0.3125rem rgba(181, 181, 191, 0.1);
  overflow: hidden;
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
}
</style>
  