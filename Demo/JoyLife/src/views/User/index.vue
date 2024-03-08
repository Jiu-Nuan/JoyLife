<template>
  <div class="chat-common-layout">
    <el-container>
      <el-header>Header</el-header>
      <el-main>Main</el-main>
      <el-footer>
        <el-button :icon="icon-biaoqing" circle />
        <el-button :icon="Search" circle />
        <el-input v-model="input" style="width: 50vw" placeholder="请输入内容..." class="chat-input" />
        <el-button class="send-btn" @click="send">发送</el-button>
      </el-footer>
    </el-container>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const input = ref('')

function send() {
  // 发送消息
  console.log(input.value);
  // 清空输入框
  input.value = '';
}
</script>

<style lang="scss" scoped>
.chat-common-layout{
  height: 100vh;
  z-index: 99;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
  .chat-input{
    margin: 0 0.2rem 0 0.2rem;
  }
  .send-btn{
    background-color: #86d2ec;
    color: #e9eef3;
    font-size: 1.2rem;
    font-family: 'Microsoft YaHei';
  }
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  height: 80vh;
}
</style>
