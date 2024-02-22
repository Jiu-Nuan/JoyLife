<template>
  <div class="card-content">
    <div class="card-top">
      <div class="card-tri-bg" v-if="info.isVideo">
        <!-- 绘制播放按钮：svg画法 -->
        <svg viewBox = "-70 -50 200 300" class="card-svg">
          <polygon class="card-tri" stroke-linejoin = "round" points = "0,0 0,200 170,100"></polygon>
        </svg>
      </div>
      <img :src="info.imageUrl" class="card-source"/>
    </div>
    <div class="card-title">2</div>
    <div class="card-bottom">3</div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
//引入mock数据
import { exploreCardMock } from "../mock/homeData";

let info = reactive({});
info = exploreCardMock();
</script>

<style lang="scss" scoped>
.card-content {
  height: auto;
  width: 50vw;
  background-color: #fefefe;
  border-radius: 0.5rem;
  box-shadow: 0.125rem 0.3125rem rgba(181, 181, 191, 0.1);
  overflow: hidden;
  position: absolute;
  .card-top {
    position: relative;

    .card-tri-bg{
      position: absolute;
      right: 0.675rem;
      top: 0.625rem;
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 50%;
      background-color: rgba(0, 0, 0, 0.2);
      @include flexcc;

      .caed-svg{
        width: 0.8rem;
        height: 0.8rem;

        .card-tri{
          fill: rgb(254,254,254);
          stroke: rgb(254,254,254);
          stroke-width: 50;
        }
      }
    }

    .card-source{
      width: 100%;
    }
  }
  .card-title {
  }
  .card-bottom {
    padding: 0.8rem 0.5rem;
    @include flexlr;
  }
}
</style>
