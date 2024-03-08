<template>
  <div class="message-common-layout">
    <el-container>
      <el-header>Header</el-header>
      <el-main>
        <MessageInterface></MessageInterface>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import MessageInterface from "@/components/MessageInterface.vue";
import messageStore from '@/store/messageStore';

// 初始化数据
const state = reactive({
  activeName: 'first',
  username: '',
  choosed: '',
  avatarList: [
    'http://img.mp.itc.cn/upload/20170808/5861bc790e654d56bc9289c567b44875_th.jpg',
    'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    // 省略其他图片链接...
  ],
});

// 方法定义
function avatar(src) {
  state.choosed = src;
}

function login() {
  if (state.username && state.choosed) {
    this.$socket.connect();
    this.$socket.emit('login', { name: state.username, img: state.choosed }, (result) => {
      if (result) {
        this.$message.success('登录成功！');
        // 登录成功后通过commit修改Vuex状态
        messageStore.commit('setMyInfo', {
          img: state.choosed,
          name: state.username,
        });
      } else {
        this.$message.error('用户名重复！');
      }
    });
  }
}

// 计算属性
const isLogin = () => messageStore.state.isLogin;
const userInfo = () => messageStore.state.userInfo;
const userList = () => messageStore.state.userList;


</script>

<style lang="scss" scoped>
.message-common-layout {
  height: 100vh;
  overflow: scroll;
  .el-header {
    padding: 0;
  }
  .el-main {
    background-color: #d3dce6;
    color: #333;
    text-align: center;
    height: 100%;
    padding: 0;
  }
}
</style>
