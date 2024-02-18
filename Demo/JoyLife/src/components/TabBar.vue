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
        v-else
        class="tab-name"
        :class="{ active: path === item.path }"
      >
        {{ item.name }}
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from "vue";
import routes from "@/router/routes";
import router from "@/router";

const menus = routes;
const path = ref("/");

const toPath = (p) => {
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
  z-index: 999;

  .tab-name {
    min-width: 10%;
    text-align: center;
    transition: all 0.1s lin;
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
