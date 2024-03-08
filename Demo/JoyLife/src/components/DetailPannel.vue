<template>
  <div class="popCard" ref="popCardRef">
    <!-- 小卡片 -->
    <div ref="cardSmallRef" class="card-detail-small">
      <div class="card-top">
        <div class="card-tri-bg" v-if="popPara.info.isVideo">
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
          <p class="card-like" >
            {{ popPara.info.likeCount }}
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
    <div class="card-detail-frame" ref="cardFrameRef">
      <CardDetail ref="cardDetailRef" @click="goBack"></CardDetail>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch, nextTick, toRefs } from "vue";
import useHooks from "@/hooks/useHooks";
import CardDetail from "@/components/CardDetail.vue";

const { popPara, isOpenDetail } = toRefs(useHooks.state);
const { changeOpenStatus } = useHooks;

const cardSmallRef = ref(null);
const popCardRef = ref(null);
const cardFrameRef = ref(null);
const cardDetailRef = ref(null);

//返回
const goBack = () => {
  popCardRef.value.style.backgroundColor = "rgba(0,0,0,0)";
  cardSmallRef.value.style.opacity = 1;
  cardSmallRef.value.style.transform = "scale(1)";
  cardSmallRef.value.style.top = `${popPara.value.y}px`;
  cardSmallRef.value.style.left = `${popPara.value.x}px`;
  cardSmallRef.value.style.width = `${popPara.value.width}px`;
  cardSmallRef.value.style.height = `${popPara.value.height}px`;

  cardFrameRef.value.classList.remove("frame-style");
  cardFrameRef.value.style.top = `${popPara.value.y}px`;
  cardFrameRef.value.style.left = `${popPara.value.x}px`;
  cardFrameRef.value.style.height = `${popPara.value.height / scaleRate}px`;
  cardFrameRef.value.style.transform = `scale(${scaleRate})`;
  cardFrameRef.value.style.opacity = 0;
  cardFrameRef.value.style.borderRadius = '8px';

  cardDetailRef.value.cardContentRef.style.height = `${popPara.value.height / scaleRate}px`
  cardDetailRef.value.cardBottomRef.classList.remove("bottom-style");

  //等一系列动画结束后，关闭detailPannel
  setTimeout(() => {
    changeOpenStatus(false);
  }, 3000);
};

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

        //big pos
        cardFrameRef.value.style.top = `${popPara.value.y}px`;
        cardFrameRef.value.style.left = `${popPara.value.x}px`;
        cardFrameRef.value.style.height = `${
          popPara.value.height / scaleRate
        }px`;
        cardFrameRef.value.style.transform = `scale(${scaleRate})`;
      });

      setTimeout(() => {
        popCardRef.value.style.backgroundColor = "rgba(0,0,0,0.5)";

        //small
        let sh = 100 / (1 / scaleRate);
        cardSmallRef.value.style.opacity = 0;
        cardSmallRef.value.style.top = "0px";
        cardSmallRef.value.style.left = "0px";
        cardSmallRef.value.style.height = `${sh}vh`;
        cardSmallRef.value.style.transform = `scale(${1 / scaleRate})`;

        //big
        cardFrameRef.value.style.transform = "scale(1)";
        cardFrameRef.value.style.transition = "all 0.5s linear";
        cardFrameRef.value.style.borderRadius = "0px";
        cardFrameRef.value.style.height = `${document.body.clientHeight}px`;
        //一些class样式统一写到frame-style中
        //透明度从0--1，卡片位置一律往左上角移动
        cardFrameRef.value.classList.add("frame-style");
      }, 0);
    }
  },
  {
    immediate: true,
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
  transition: all 0.5s linear;
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

.card-detail-frame {
  overflow: hidden;
  position: absolute;
  z-index: 950;
  height: 100vh;
  width: 100vw;
  border-radius: 8px;
  transform-origin: 0 0;
}

.frame-style {
  opacity: 1 !important;
  top: 0 !important;
  left: 0 !important;
}
</style>
