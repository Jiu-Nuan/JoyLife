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
const moduleList = reactive(['发现','关注', '附近', '广场舞', '音乐']);

//点击切换标题
// 使用ref来创建一个响应式的变量
const moduleIdx = ref(0);

// 定义changeSwiper函数，用于切换标题
const changeSwiper = (idx) => {
  moduleIdx.value = idx;
  mySwiper?.slidTo(idx);//滑动到对应标题
};

//初始化swiper
let mySwiper = null;
const onSwiper = (swiper) => {
  mySwiper = swiper;
};

//把头部切换与swiper切换关联
const onSlideChange = ({activeIndex}) => {
  console.log(mySwiper.activeIndex);
  moduleIdx.value = activeIndex;
};


</script>

<style lang="scss" scoped>
.home-container {
  .my-swiper {
    height: 100vh;
    background-color: rgb(249, 250, 249);

    .slid-contet {
      @include flexcc;
      height: 50vh;
    }
  }
  .home-swiper-head {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 1rem;
    background-color: #fff;
    padding: 1rem;
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
        padding: 0.9375rem;
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
