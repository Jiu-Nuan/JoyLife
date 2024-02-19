<template>
  <div class="home-container">
    <div class="home-swiper-head">
      <i class="iconfont icon-huiyuan2"></i>
      <div class="swpier-name">
        <span
          v-for="(item, idx) in moduleList"
          @click="changeSwiper(idx)"
          :class="{ active: idx === moduleIdx }"
          >{{ item }}</span
        >
      </div>
      <i class="iconfont icon-sousuo"></i>
    </div>
    <swiper
      @swiper="onSwiper"
      @slideChange="onSlideChange"
      :initialSlide="moduleIdx"
      class="my-swiper"
    >
      <swiper-slide>
        <div class="slid-contet">1</div>
      </swiper-slide>
      <swiper-slide>
        <div class="slid-contet">2</div> 
      </swiper-slide>
      <swiper-slide>
        <div class="slid-contet">3</div> 
      </swiper-slide>
      <swiper-slide>
        <div class="slid-contet">4</div> 
      </swiper-slide>
      <swiper-slide>
        <div class="slid-contet">5</div> 
      </swiper-slide>
      ...
    </swiper>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
//引入swiper插件样式
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";

//加入头部内容
const moduleList = reactive(["关注", "发现", "附近", "广场舞", "音乐"]);

//初始化swiper
let mySwiper = null;
const onSwiper = (swiper) => {
  mySwiper = swiper;
};

const onSlideChange = () => {
  console.log(mySwiper.activeIndex);
};


//点击切换标题
let moduleIdx = ref(1);
const changeSwiper = (idx) => {
  moduleIdx.value = idx
};

</script>

<style lang="scss" scoped>
.home-container {
  .my-swiper {
    height: 100vh;
    background-color: rgb(249, 250, 249);

    .slid-contet{
      @include flexcc;
      height: 50vh;
    }
  }
  .home-swiper-head {
    position: fixed;
    top: 0;
    left: 0;
    height: 3rem;
    background-color: #fff;
    padding: 0.1rem;
    z-index: 2;
    @include flexbc;

    .iconfont {
      font-size: 1.2rem;
      color: rgb(51, 51, 51);
    }
    .iconfont:nth-child(1) {
      color: rgb(248, 230, 28);
    }
    .swpier-name {
      @include flexcc;
      font-size: 0.9rem;
      color: rgb(149, 149, 149);

      span {
        padding: 1rem;
        box-sizing: content-box; //表示元素的宽度和高度只包括内容部分，不包括内边距、边框和外边距。

        &.active {
          font-size: 1rem;
          color: rgb(51, 51, 51);
          font-weight: bold;
        }
      }
    }
  }
}
</style>
