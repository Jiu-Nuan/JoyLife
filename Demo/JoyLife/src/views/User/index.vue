<template>
  <div class="chat-common-layout">
    <el-container>
      <el-header><span v-if="userInfo.name=='默认群聊'">{{userInfo.name}}： {{userList.length-1}}</span>  
          <span v-else>{{userInfo.name}}</span></el-header>
      <el-main>
        <div class="chat-content">
          <div v-for="(list, index) in msgList" :key="index">
            <!-- 有聊天记录：循环聊天记录 -->
            <div
              v-if="
                list.receiver == userInfo.name && userInfo.name == '默认群聊'
              "
            >
              <!-- 再循环显示聊天记录 -->
              <p :class="{ right: list.type == 'my' }">
                <el-avatar
                  v-if="list.type == 'user'"
                  :src="list.senderimg"
                ></el-avatar>
                <el-avatar
                  v-if="list.type == 'my'"
                  :src="list.senderimg"
                  style="float: right"
                ></el-avatar>
                <span class="content">{{ list.msg }}</span>
              </p>
            </div>
            <div v-else>
              <!-- 根据接收者和发送者定位聊天记录 -->
              <div
                v-if="
                  (list.receiver == myInfo.name &&
                    list.sender == userInfo.name) ||
                  (list.receiver == userInfo.name && list.sender == myInfo.name)
                "
              >
                <!-- 再循环显示聊天记录 -->
                <p :class="{ right: list.type == 'my' }">
                  <el-avatar
                    v-if="list.type == 'user'"
                    :src="list.senderimg"
                  ></el-avatar>
                  <el-avatar
                    v-if="list.type == 'my'"
                    :src="list.senderimg"
                    style="float: right"
                  ></el-avatar>
                  <span class="content">{{ list.msg }}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </el-main>
      <el-footer>
        <el-button :icon="icon - biaoqing" circle />
        <el-button :icon="Search" circle />
        <el-input
          v-model="input"
          style="width: 50vw"
          placeholder="请输入内容..."
          class="chat-input"
        />
        <el-button class="send-btn" @click="send">发送</el-button>
      </el-footer>
    </el-container>
  </div>
</template>

<script setup>
// 导入 Vue 的响应式 API
import { ref, reactive} from "vue";
// 导入 Vuex 状态管理
import messageStore from "@/store/messageStore";

// 定义并返回计算属性（基于 Vuex 中的状态）
const msgList = () => messageStore.state.chatMessageList;
const myInfo = () => messageStore.state.myInfo;
const userInfo = () => messageStore.state.userInfo;



const input = ref("");

function send() {
  // 发送消息
  console.log(input.value);
  // 清空输入框
  input.value = "";
}
</script>

<style lang="scss" scoped>
.chat-common-layout {
  height: 100vh;
  z-index: 99;
}

.chat-content {
  width: 100%;
}
.chat-content P{
  width: 100%;
  height: 50px;
}
.content{
background-color: antiquewhite;
padding: 10px;
border-radius: 10px;
font-weight: bold;
}
.right{
  text-align: right;
}

.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
  .chat-input {
    margin: 0 0.2rem 0 0.2rem;
  }
  .send-btn {
    background-color: #86d2ec;
    color: #e9eef3;
    font-size: 1.2rem;
    font-family: "Microsoft YaHei";
  }
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  height: 80vh;
}
</style>
