<template>
  <div class="load-pannel" ref="pannelRef">
    <div class="outer">
      <slot></slot>
      <Loading v-show="isBottomLoading"></Loading>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import Loading from "@/components/Loading.vue";

const pannelRef = ref(null);

let isBottomLoading = ref(false);

onMounted(() => {
  //获取可视域高度
  //监听页面尺寸变化
  //改变加载页高度
  //兼容底部导航栏
  pannelRef.value.style.height = window.innerHeight + "px";
  window.addEventListener("resize", () => {
    pannelRef.value.style.height = window.innerHeight + "px";
  });

  //监听滚动事件，判断是否滑到底部
  let nowScrollHeight = 0;
  pannelRef.value.addEventListener("scroll", function () {
    let scrollTop = this.scrollTop;
    let clientHeight = this.clientHeight;  
    let scrollHeight = this.scrollHeight;
    console.log(scrollTop, clientHeight, scrollHeight);
    //如果scrollTop + client Height >= scrollHeight，说明已经滑到底部
    //手机端触底一次触发多次
    //所以触底时记录当前的scrollHeight,确保在当前scrollHeight下只触发一次
    if (
      Math.ceil(scrollTop + clientHeight) >= scrollHeight &&
      !isBottomLoading.value
    ) {
      if (nowScrollHeight != scrollHeight) {
        nowScrollHeight = scrollHeight;
        isBottomLoading.value = true;
      }
    }
  });
});
</script>

<style lang="scss" scoped>
.load-pannel {
  overflow: auto;
  .outer {
    position: relative;
    margin-top: 3rem;
    margin-bottom: 3rem;
  }
}
</style>
