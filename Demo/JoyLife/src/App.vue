<template>
  <router-view v-slot="{ Component }">
    <!-- 给路由套上KeepAlive，这样路由切换时不会销毁组件，组件不会重新渲染，可以保留组件状态 -->
    <KeepAlive>
      <component :is="Component"></component>
    </KeepAlive>
  </router-view>
  <TabBar></TabBar>
  <DetailPannel v-if="isOpenDetail"></DetailPannel>
</template>

<script setup>
import {toRefs} from 'vue';
import TabBar from "@/components/TabBar.vue";
import DetailPannel from './components/DetailPannel.vue';
import ChatInterface from './components/ChatInterface.vue';
import useHooks from "@/hooks/useHooks";

const { isOpenDetail } = toRefs(useHooks.state);



</script>


<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>
<style scoped lang = 'scss'>
</style>
