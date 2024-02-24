<template>
  <div ref="contentTab" class="card-content" @click="handleClick(this)">
    <div class="card-top">
      <div class="card-tri-bg" v-if="props.info.isVideo">
        <!-- 绘制播放按钮：svg画法——————图标未对齐
        <svg viewBox = "-70 -50 200 300" class="card-svg">
          <polygon class="card-tri" stroke-linejoin = "round" points = "0,0 0,200 170,100"></polygon>
        </svg> -->
        <i class="iconfont icon-bofang"></i>
      </div>
      <img
        ref="contentImg"
        :src="props.info.imageUrl[0]"
        alt=""
        class="card-source"
        @load="emits('onImgLoaded')"
      />
    </div>
    <div class="card-title">
      {{ props.info.title ? props.info.title : '' }}
      {{ props.info.content ? props.info.content.replaceAll('<br>','') : '' }}

    </div>
    <div class="card-bottom">
      <div class="card-b-left">
        <img :src="props.info.avatar" alt="" class="card-head" />
        <div class="card-name">{{ props.info.author }}</div>
      </div>
      <div class="card-b-right">
        <p class="card-like" v-if="props.info.likeCount < 10000">
          {{ props.info.likeCount }}
        </p>
        <p class="card-like" v-if="props.info.likeCount >= 10000">
          {{ (props.info.likeCount / 10000).toFixed(1) + "万" }}
        </p>
        <i
          class="iconfont icon-aixin_shixin icon-card-small-liked"
          v-if="props.info.isLiked"
        ></i>
        <i class="iconfont icon-aixin icon-card-small-not-liked" v-else></i>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, toRefs} from "vue";
import useHooks from "@/hooks/useHooks";

//在小卡片子组件中获取父组件传过来的数据
const props = defineProps(["info"]);
//监听卡片是否加载完成
const emits = defineEmits(["onImgLoaded"]);

const { popPara, isOpenDetail } = toRefs(useHooks.state);
const { changeOpenStatus } = useHooks;

const contentTab = ref(null);
const contentImg = ref(null);

function handleClick(_this) {
  console.log("小卡片被点击");
  popPara.value = {
    x     :_this.$el.getBoundingClientRect().x,
    y     :_this.$el.getBoundingClientRect().y,
    width :_this.$el.getBoundingClientRect().width,
    height:_this.$el.getBoundingClientRect().height,
    imgH  :contentImg.value.height,
    imgW  :contentImg.value.width,
  }
  popPara.value.info = props.info;
  changeOpenStatus(true);
  contentTab.value.style.opacity = 0;
}
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
