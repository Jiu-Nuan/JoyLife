<template>
  <div class="popCard" ref="popCardRef">
    <!-- 小卡片 -->
    <div
      ref="cardSmallRef"
      class="card-detail-small"
    >
      <div class="card-top">
        <div class="card-tri-bg" v-if="popPara.info.isVideo">
          <!-- 绘制播放按钮：svg画法——————图标未对齐
        <svg viewBox = "-70 -50 200 300" class="card-svg">
          <polygon class="card-tri" stroke-linejoin = "round" points = "0,0 0,200 170,100"></polygon>
        </svg> -->
          <i class="iconfont icon-bofang"></i>
        </div>
        <img
          ref="contentImg"
          :src="popPara.info.imageUrl[0]"
          alt=""
          class="card-source"
        />
      </div>
      <div class="card-title">
        {{ popPara.info.title ? popPara.info.title : "" }}
        {{ popPara.info.content ? popPara.info.content.replaceAll('<br />','') :
        '' }}
      </div>
      <div class="card-bottom">
        <div class="card-b-left">
          <img :src="popPara.info.avatar" alt="" class="card-head" />
          <div class="card-name">{{ popPara.info.author }}</div>
        </div>
        <div class="card-b-right">
          <p class="card-like" v-if="popPara.info.likeCount < 10000">
            {{ popPara.info.likeCount }}
          </p>
          <p class="card-like" v-if="popPara.info.likeCount >= 10000">
            {{ (popPara.info.likeCount / 10000).toFixed(1) + "万" }}
          </p>
          <i
            class="iconfont icon-aixin_shixin icon-card-small-liked"
            v-if="popPara.info.isLiked"
          ></i>
          <i class="iconfont icon-aixin icon-card-small-not-liked" v-else></i>
        </div>
      </div>
    </div>

    <!-- 详情弹层 -->
    <div class="" ref=""></div>
  </div>
</template>

<script setup>
import { ref, reactive, watch, nextTick, toRefs } from "vue";
import useHooks from "@/hooks/useHooks";

const { popPara, isOpenDetail } = toRefs(useHooks.state);
const { changeOpenStatus } = useHooks;

const cardSmallRef = ref(null);
const popCardRef = ref(null);

let scaleRate = 1;
//监听isOpenDetail
watch(
  () => isOpenDetail.value,
  (newVal, oldVal) => {
    if (newVal) {
      nextTick(() => {
        //计算卡片缩放比例=小卡片宽度 / 屏幕宽度
        scaleRate = popPara.value.imgW / document.body.clientWidth;
        //small pos
        console.log(popPara.value);
        cardSmallRef.value.style.top = `${popPara.value.y}px`;
        cardSmallRef.value.style.left = `${popPara.value.x}px`;
        cardSmallRef.value.style.width = `${popPara.value.width}px`;
        cardSmallRef.value.style.height = `${popPara.value.height}px`;

        setTimeout(() => {
            popCardRef.value.style.backgroundColor = "rgba(0,0,0,0.5)";

            //small
            cardSmallRef.value.style.opacity = 0;
            cardSmallRef.value.style.top = '0px';
            cardSmallRef.value.style.left = '0px';
            cardSmallRef.value.style.transform = `scale(${1/scaleRate})`;
        }, 0);
      });
    }
  },{
    immediate: true
  }
);
</script>

<style lang="scss" scoped>
.popCard {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 900;
  overflow: hidden;
  transform: all 0.3 linear;
  background-color: rgb(0, 0, 0);
}
.card-detail-small {
  //   height: auto;
  //   width: 50vw;
  //   background-color: #fefefe;
  //   border-radius: 0.5rem;
  //   box-shadow: 0.125rem 0.3125rem rgba(181, 181, 191, 0.1);
  //   overflow: hidden;
  //   position: absolute;

  position: absolute;
  opacity: 1;
  z-index: 920;
  pointer-events: none;
  height: auto;
  background-color: #fefefe;
  overflow: hidden;
  border-radius: 8px;
  transition: all 0.3s linear;
  transform-origin: 0 0;
  .card-top {
    position: relative;

    .card-tri-bg {
      position: absolute;
      right: 0.675rem;
      top: 0.625rem;
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 50%;
      background-color: rgba(0, 0, 0, 0.2);
      @include flexcc;

      // .caed-svg{
      //   width: 0.8rem;
      //   height: 0.8rem;

      //   .card-tri{
      //     fill: rgb(254,254,254);
      //     stroke: rgb(254,254,254);
      //     stroke-width: 50;
      //   }
      // }
      .icon-bofang {
        font-size: 1.2rem;
        color: rgb(254, 254, 254);
      }
    }

    .card-source {
      width: 100%;
    }
  }
  .card-title {
    width: calc(100% - 1rem);
    font-size: 0.9rem;
    letter-spacing: 0.05rem;
    color: rgb(51, 51, 51);
    line-height: 1.125rem;
    font-weight: 600;
    padding: 0 0.5rem;

    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .card-bottom {
    padding: 0.8rem 0.5rem;
    @include flexlr;

    .card-b-left {
      @include flexxl;

      .card-head {
        width: 1.2rem;
        height: 1.2rem;
        border-radius: 50%;
      }

      .card-name {
        color: rgb(153, 153, 153);
        font-size: 0.9rem;
        margin: 0 0 0 0.4375rem;
      }
    }
    .card-b-right {
      @include flexxl;
      font-size: 0.9rem;

      .icon-card-small-not-liked {
        font-size: 0.9rem;
        color: rgb(153, 153, 153);
      }
      .icon-card-small-liked {
        font-size: 0.9rem;
        color: red;
      }
      .card-like {
        margin: 0 0.3rem 0 0.3rem;
        color: rgb(153, 153, 153);
      }
    }
  }
}
</style>
