<template>
  <div class="message-friends">
    <el-row :style="{ height: '2rem' }">
      <el-input
        v-model="input"
        placeholder="搜索好友"
        class="search-input"
      ></el-input>
      <el-button class="search-btn"
        ><i class="iconfont icon-sousuo"></i
      ></el-button>
    </el-row>
    <!-- 好友列表 -->
    <el-table
      @cell-click="setUserInfo"
      :data="
        messageData.filter(
          (data) =>
            !keyword || data.name.toLowerCase().includes(keyword.toLowerCase())
        )
      "
      stripe
      style="width: 100%"
      :show-header="false"
    >
      <el-table-column label="日期">
        <template v-slot="scope">
          <div class="userlist">
            <el-avatar :src="scope.row.img"></el-avatar>
            <span>{{ scope.row.name }}</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
  
<script setup>
import { ref, reactive, computed } from "vue";
import { toRefs } from "vue";
import messageData from "../mock/messageData";
import messageStore from "@/store/messageStore";

// 响应式数据
const keyword = ref("");

// 方法
function setUserInfo(row, column, event) {
    console.log(row);
  if (row.name === "默认群聊") {
    messageStore.commit("changeChatType", "group");
  } else {
    messageStore.commit("changeChatType", "private");
  }
  messageStore.commit("setUserInfo", { name: row.name, img: row.img });
}

// 计算属性
// const messageData = computed(() => messageStore.state.userList);
const myInfo = computed(() => messageStore.state.myInfo);

// 如果需要在模板中直接使用这些变量或方法，它们会自动暴露给模板
</script>

<style lang="scss" scoped>
.messsage-friends {
  height: 100%;
  overflow: scroll;
  position: relative;
}
.search-input {
  width: 85%;
  height: 2rem;
  color: gray;
  font-family: "PingFang SC";
  font-size: 1.8rem;
}
.search-btn {
  width: 15%;
  height: 2rem;
  background-color: #86d2ec;
  color: #e9eef3;
  .icon-sousuo {
    font-size: 1.8rem;
  }
}


.userlist {
  vertical-align: middle;
  cursor: pointer;
  overflow: scroll;
}
.userlist span {
  vertical-align: middle;
  margin-left: 10px;
  font-size: 1.4rem;
  font-family: "PingFang SC";
}
</style>
  