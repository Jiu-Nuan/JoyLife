<template>
  <div class="home-container">
    <div class="home-swiper-head">
      <i class="iconfont icon-huiyuan2"></i>
      <div class="swpier-name" ref="moduleRef">
        <span
          v-for="(item, idx) in moduleList"
          @click="changeSwiper(idx)"
          :class="{ active: idx === moduleIdx }"
          >{{ item }}</span
        >
        <div class="under-line" ref="underLineRef"></div>
      </div>
      <i class="iconfont icon-sousuo"></i>
    </div>
    <swiper
      @swiper="onSwiper"
      @slideChange="onSlideChange"
      @progress="onProgress"
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
import { ref, reactive, onMounted } from "vue";
//引入swiper插件样式
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";

//初始化swiper
let mySwiper = null;
const onSwiper = (swiper) => {
  mySwiper = swiper;
};

//加入头部内容
const moduleList = reactive(["关注", "发现", "附近", "广场舞", "音乐"]);

//点击切换标题
// 使用ref来创建一个响应式的变量
const moduleIdx = ref(1);

// 确保moduleIdx和mySwiper在组件中被正确声明和初始化
const changeSwiper = (idx) => {
  // 验证idx是否是一个有效的索引值
  if (idx >= 0 && idx < mySwiper.slides.length) {
    // 如果mySwiper存在，则滑动到对应的标题位置
    mySwiper?.slideTo(idx);
    // 更新moduleIdx的值
    moduleIdx.value = idx;
  } else {
    console.error("Invalid index provided for changing the swiper.");
  }
};

//把头部切换与swiper切换关联
const onSlideChange = ({ activeIndex }) => {
  // console.log(mySwiper.activeIndex);
  moduleIdx.value = activeIndex;
};

//下标线与选中的module进行平移和缩放
const underLineRef = ref(null);
const moduleRef = ref(null);

//计算每个关键位置时，下标线的偏移量
const posList = []; //下标线的偏移量
const getModuleParams = () => {
  const modules = moduleRef.value.querySelectorAll("span");
  //获取下标线宽度
  const underLineWidth = underLineRef.value.getBoundingClientRect().width;
  //遍历每个头部标题，计算其到窗口左侧的距离
  for (let i = 0; i < modules.length; i++) {
    let moduleRect = modules[i].getBoundingClientRect();
    //下标线在每个标题正下方时的距离窗口左侧的距离=当前标题距左侧的距离+当前标题宽度的一半-下标线宽度的一半
    posList.push(moduleRect.left + moduleRect.width / 2 - underLineWidth / 2);
  }
};

// //监听滑动过程，使用progress计算
const onProgress = ({ progress }) => {
  if (posList.length === 0) return;
  //滑动到最后一个
  if (progress === 1) {
    //当滑动到最后一个时，下标线偏移量设置为距离数组最后一个值
    underLineRef.value.style.transform = `translateX(${ posList[posList.length - 1]}px)`;
    return;
  }
  //其他情况
  //计算出当前progress处于哪两个标题之间
  let nowPosIdx = progress * (moduleList.length - 1);
  //结果向下取整
  let nowPosIdxInt = Math.floor(nowPosIdx);
  //计算当前progress下标线的偏移量
  let trans = (posList[nowPosIdxInt + 1] - posList[nowPosIdxInt]) *(nowPosIdx - nowPosIdxInt) +posList[nowPosIdxInt];

  underLineRef.value.style.transform = `translateX(${trans}px)`;
  //return;
};

//getModuleParams()方法需要等页面真实dom加载完毕后才可以执行
onMounted(() => {
  getModuleParams();
  console.log(posList);
});
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
    padding: 0.8rem;
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

      .under-line {
        //相对整个头部进行定位
        position: absolute;
        bottom: 0.5rem;
        left: 0;
        transform: all 0.2s linear;
        width: 1.875rem;
        height: 0.1875rem;
        background-color: rgb(248, 230, 28);
        border-radius: 0.1875rem;
      }
    }
  }
}
</style>
