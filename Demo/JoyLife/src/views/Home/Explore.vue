<template>
  <LoadPannel @searchMore="searchMore">
    <div ref="refreshRef" class="reffresh-div">
      <!-- 简单的加载动画 -->
      <i class="iconfont icon-jiazai"></i>
    </div>
    <div ref="exploreRef">
      <MiniCard
        v-for="(item, index) in exploreCards"
        :info="item"
        :key="item.id"
        @onImgLoaded="addImgCount"
      ></MiniCard>
    </div>
  </LoadPannel>
</template>

<script setup>
import { ref, reactive, toRefs, watch, onMounted, nextTick } from "vue";
import LoadPannel from "../../components/LoadPannel.vue"; //上滑加载组件
import MiniCard from "../../components/MiniCard.vue";
import { exploreCardMock } from "../../mock/homeData";
import computeWaterFallFlow from "../../utils/waterFallFlow";
import useHooks from "../../hooks/useHooks";

const { isRefresh } = toRefs(useHooks.state);
const { changeRefresh } = useHooks;

//父组件初始化卡片数据
let exploreCards = reactive([]);
let imgLen; //记录需要加载的总图片数
const initData = async () => {
  let res = await exploreCardMock();

  //将刷新后的数据push入数组前，数据查询完后需要清空数组
  exploreCards.splice(0, exploreCards.length);
  nextTick(() => {
    imgLen = res.length;
    res.forEach((item) => {
      exploreCards.push(item);
    });
  });
};

initData();

// 瀑布流计算每个card的位置（卡片位置的计算需要所有卡片加载完毕进行）
const exploreRef = ref(null);
//记录card中的image是否都已经加载完毕
//笨方法：计算图片总数
let imgCount = 0;
const addImgCount = () => {
  imgCount++;
  if (imgCount === imgLen) {
    //开始计算瀑布流
    computeWaterFallFlow(exploreRef.value);
  }
};

//加载更多
const searchMore = async (callback) => {
  let res = await exploreCardMock(20);
  //把请求的数据push数组
  res.forEach((item) => {
    exploreCards.push(item);
  });
  //更新瀑布流数组长度
  imgLen = exploreCards.length;
  //callback参数，传入回调函数
  callback ? callback() : "";
};

const refreshRef = ref(null);
const exploreRefresh = async (callback) => {
  exploreRef.value.parentNode.parentNode.scrollTop = 0;
  //刷新页面时，顶部展开一个面板，显示loading动画
  refreshRef.value.style.height = "100px";
  refreshRef.value.style.transition = "all 0.3s linear";
  //面板展开后，查询数据
  imgCount = 0; //卡片数置零，否则瀑布流计算出错
  await initData();
  refreshRef.value.style.height = "0";
  //数据查询完毕后，关闭面板
  setTimeout(() => {
    refreshRef.value.style.transition = "";
  }, 300);

  callback ? callback() : "";
};
watch(
  () => isRefresh.value,
  async (newValue, oldValue) => {
    //如果isRefresh为true，刷新方法
    if (newValue) {
      await exploreRefresh();
      changeRefresh(false);
    }
  }
);

//首次打开刷新数据
onMounted(() => {
  exploreRefresh();
});
</script>

<style lang="scss" scoped>
//消除重复（在LoadPannel中已有）
// .explore-main {
//   overflow: auto;
//   height: 100vh;
//   .explore-outer {
//     position: relative;
//     margin-top: 3rem;
//     margin-bottom: 3rem;
//   }
// }

.reffresh-div {
  height: 0;
  width: 100%;
  overflow: hidden;
  @include flexcc;

  i {
    color: rgb(154, 154, 154);
    animation: rotate 0.8s linear infinite;
  }
}
</style>
