<template>
    <el-carousel indicator-position="inside">
      <el-carousel-item v-for="item in 4" :key="item">
        <!-- <h3 text="2xl" justify="center">{{ item }}</h3> -->
        <!-- <img src="../../mock/source/img0{{item}}.jpg" alt=""> -->
      </el-carousel-item>
    </el-carousel>
  </template>
  
  <script setup>
import { ref, reactive } from "vue"
</script>

<style lang="scss" scoped>
  .el-carousel__item h3 {
    display: flex;
    color: #475669;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
  </style>
  