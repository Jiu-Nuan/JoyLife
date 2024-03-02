<template>
    <LoadPannel @searchMore="searchMore">
      <div ref="refreshRef" class="reffresh-div">
        <!-- 简单的加载动画 -->
        <!-- <i class="iconfont icon-jiazai"></i> -->
        <canvas ref="refreshCanvasRef" width="80" height="80"></canvas>
      </div>
      <div ref="exploreRef">
        <HousekeepingCard
          v-for="(item, index) in exploreCards"
          :info="item"
          :key="item.id"
          @onImgLoaded="addImgCount"
        ></HousekeepingCard>
      </div>
    </LoadPannel>
  </template>
  
  <script setup>
  import { ref, reactive, toRefs, watch, onMounted, nextTick } from "vue";
  import LoadPannel from "../../components/LoadPannel.vue"; //上滑加载组件
  import HousekeepingCard from "../../components/HousekeepingCard.vue";
  import { exploreCardMock } from "../../mock/homeData";
  import computeWaterFallFlow from "../../utils/waterFallFlow";
  import useHooks from "../../hooks/useHooks";
  
  const { isRefresh } = toRefs(useHooks.state);
  const { changeRefresh } = useHooks;
  
  //父组件初始化卡片数据
  let exploreCards = reactive([]);
  //记录card中的image是否都已经加载完毕
  //笨方法：计算图片总数
  let imgCount = 0;
  let imgLen; //记录需要加载的总图片数
  const initData = async () => {
    imgCount = 0;
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
  
  const addImgCount = () => {
    imgCount++;
    if (imgCount === imgLen) {
      //开始计算瀑布流
      computeWaterFallFlow(exploreRef.value,1);
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
  
  //刷新
  const refreshRef = ref(null);
  const exploreRefresh = async (callback) => {
    exploreRef.value.parentNode.parentNode.scrollTop = 0;
    //刷新页面时，顶部展开一个面板，显示loading动画
    refreshRef.value.style.height = "100px";
    refreshRef.value.style.transition = "all 0.3s linear";
    refreshCanvasRef.value.style.animation = "refreshAni 1.2s ease infinite";
    refreshAnimate();
    await initData();
    refreshCanvasRef.value.style.animation = "";
    refreshRef.value.style.height = "0";
    cancelAnimationFrame(requestID);
    setTimeout(() => {
      refreshRef.value.style.transition = "";
    }, 300);
  
    callback ? callback() : "";
  };
  
  //refresh动画
  const refreshCanvasRef = ref(null);
  let ctx;
  let direction = 1;
  const R = 12;
  let angle = 0;
  const speed = 0.01;
  let centerX = 0;
  let centerY = 0;
  let requestID;
  
  //自转动画
  const refreshAnimate = () => {
    //开局清空画布
    ctx.clearRect(
      0,
      0,
      refreshCanvasRef.value.width,
      refreshCanvasRef.value.height
    );
    //配置线条样式-上半
    ctx.beginPath();
    ctx.strokeStyle = "rgb(204,204,204)";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.arc(
      centerX,
      centerY,
      R,
      Math.PI / 2 - angle / 2,
      Math.PI / 2 + angle / 2
    );
    ctx.stroke();
    ctx.closePath();
  
    //配置线条样式-下半
    ctx.beginPath();
    ctx.strokeStyle = "rgb(204,204,204)";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.arc(
      centerX,
      centerY,
      R,
      (Math.PI * 3) / 2 - angle / 2,
      (Math.PI * 3) / 2 + angle / 2
    );
    ctx.stroke();
    ctx.closePath();
  
    if (angle >= Math.PI - 0.4) {
      direction = -1;
    } else if (angle <= 0.4) {
      direction = 1;
    }
  
    angle += speed * direction;
  
    requestID = requestAnimationFrame(() => {
      refreshAnimate();
    });
  };
  
  //下拉时动画
  const refreshAnimateDown = (range) => {
    let angle = (range/110)*(range/110)*Math.PI;
  
    //开局清空画布
    ctx.clearRect(
      0,
      0,
      refreshCanvasRef.value.width,
      refreshCanvasRef.value.height
    );
    //配置线条样式-上半
    ctx.beginPath();
    ctx.strokeStyle = "rgb(204,204,204)";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.arc(
      centerX,
      centerY,
      R,
      Math.PI / 2 - angle / 2,
      Math.PI / 2 + angle / 2
    );
    ctx.stroke();
    ctx.closePath();
  
    //配置线条样式-下半
    ctx.beginPath();
    ctx.strokeStyle = "rgb(204,204,204)";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.arc(
      centerX,
      centerY,
      R,
      (Math.PI * 3) / 2 - angle / 2,
      (Math.PI * 3) / 2 + angle / 2
    );
    ctx.stroke();
    ctx.closePath();
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
    //待页面挂载完成后，计算圆弧的圆心位置
    ctx = refreshCanvasRef.value.getContext("2d");
    centerX = refreshCanvasRef.value.width / 2;
    centerY = refreshCanvasRef.value.height / 2;
  
    //判断当前滚动条是否在最顶端
    const isTop = () => {
      return document.documentElement.scrollTop === 0;
    };
  
    //下拉刷新
    //过程:触碰屏幕(touchstart),开始下拉(touchmove),松手(touchend)
    //记录手指拖动的初始位置
    let startY = 0;
    let endY = 0;
    let topFlag = false;
    exploreRef.value.addEventListener("touchstart", function (e)  {
      if (isTop()) {
        topFlag = true;
        startY = e.touches[0].pageY;
      }
    });
  
    exploreRef.value.addEventListener("touchmove", function (e)  {
      //设置拖动的最大高度
      let scapeY = e.touches[0].pageY - startY;
      if (topFlag && scapeY > 0) {
        if (scapeY <= 100) {
          refreshRef.value.style.height = scapeY + "px";
          refreshAnimateDown(scapeY);
        } else {
          refreshRef.value.style.height = "100px";
        }
      }
    });
  
    exploreRef.value.addEventListener("touchend", async function (e)  {
      //松手时,如果加载宽度小于100,canvas圈大小随高度变化而变化
      if (topFlag) {
        let refreshDivH = refreshRef.value.style.height;
        if (refreshDivH.substring(0, refreshDivH.length - 2) / 1 <= 99) {
          refreshRef.value.style.transition = "all 0.3s linear";
          refreshRef.value.style.height = "0";
          setTimeout(() => {
            refreshRef.value.style.transition = "";
          }, 300);
        } else {
          refreshCanvasRef.value.style.animation = "refreshAni 1.2s ease infinite";
          refreshAnimate();
  
          imgCount = 0;
          await initData();
            refreshCanvasRef.value.style.animation = "all 0.3s linear";
            refreshRef.value.style.transition = "0";
            refreshRef.value.style.height = "0";
            //面板缩小之后取消帧动画计时器
            cancelAnimationFrame(requestID);
            //瀑布流计数器清空
            setTimeout(() => {
              refreshRef.value.style.transition = "";
            }, 300);
        }
      }
    });
  
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
  }
  </style>
  