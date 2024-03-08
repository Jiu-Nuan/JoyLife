<template>
  <div class="message-friends">
    <el-row :style="{ height: '2rem' }">
      <el-input
        v-model="keyword"
        placeholder="搜索好友"
        class="search-input"
      ></el-input>
      <el-button class="search-btn"
        ><i class="iconfont icon-sousuo"></i
      ></el-button>
    </el-row>
    <!-- 好友列表 -->
    <el-table :data="messageData" stripe style="width: 100%" :show-header='false'>
        <el-table-column  label="日期">
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
import { ref, reactive } from "vue";
import messageData from "../mock/messageData";
</script>

  <style lang="scss" scoped>
.message-friends{
    height: 100%;
    overflow: scroll;
    position: relative;
}
.search-input {
  width: 85%;
  height: 2rem;
  color: gray;
  font-family: 'PingFang SC';
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


.userlist{
  vertical-align: middle;
  cursor: pointer;
  overflow: scroll;
}
.userlist span{
  vertical-align: middle;
  margin-left: 10px;
  font-size: 1.4rem;
  font-family: 'PingFang SC';

}
</style>
  