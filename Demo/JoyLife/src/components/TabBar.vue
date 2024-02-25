<!-- 把底部导航栏封装为一个组件 -->
<template>
  <div class="tab-bar">
    <template v-for="(item, index) in menus" :key="item.path">
      <div
        @click="toPath(item.path)"
        v-if="item.path === '/Publish'"
        class="tab-pub"
      >
        <i class="iconfont icon-jia"></i>
      </div>

      <div
        @click="toPath(item.path)"
        v-if="item.path === '/'"
        class="tab-name"
        :class="{ active: path === item.path }"
      >
        <i class="iconfont icon-shouye"></i><br />
        {{ item.name }}
      </div>
      <div
        @click="toPath(item.path)"
        v-if="item.path === '/Server'"
        class="tab-name"
        :class="{ active: path === item.path }"
      >
      <i class="iconfont icon-hand-heart-line"></i><br />
        {{ item.name }}
      </div>
      <div
        @click="toPath(item.path)"
        v-if="item.path === '/Message'"
        class="tab-name"
        :class="{ active: path === item.path }"
      >
      <i class="iconfont icon-xiaoxi"></i><br />
        {{ item.name }}
      </div>
      <div
        @click="toPath(item.path)"
        v-if="item.path === '/User'"
        class="tab-name"
        :class="{ active: path === item.path }"
      >
      <i class="iconfont icon-icon_wode"></i><br />
        {{ item.name }}
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from "vue";
import routes from "@/router/routes";
import router from "@/router";
import useHooks from "../hooks/useHooks";

const { changeRefresh } = useHooks;

const menus = routes;
const path = ref("/");

const toPath = (p) => {
  //路由切换，router-view与外部组件无法直接通信
  //借组钩子Hooks实现各种组件之间通信

  if (path.value == p && p === "/") {
    //需要刷新条件：1.当前路径与点击路径相同，2.当前路径为首页
    changeRefresh(true);
    // console.log(changeRefresh)
  }
  router.push({
    path: p,
  });
  path.value = p;
};

watch(router.currentRoute.value.path, () => {
  path.value = router.currentRoute.value.path;
});
</script>

<style lang="scss" scoped>
.tab-bar {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 3rem;
  @include flexac;
  background-color: #fff;
  font-size: 0.9rem;
  color: rgb(149, 149, 149);
  z-index: 10;

  .tab-name {
    min-width: 10%;
    text-align: center;
    transition: all 0.1s lin;

    i{
      font-size: 1.2rem;
    }

    //绑定tab选中时的样式
    &.active {
      font-size: 1rem;
      color: rgb(250, 160, 100);
      font-weight: bold;
    }
  }

  .tab-pub {
    width: 3.125rem;
    height: 100%;
    border-radius: 50%;
    @include flexcc;
    background-color: rgb(250, 160, 100);
    i {
      color: #fff;
      font-size: 1.8rem;
    }
  }
}
</style>
