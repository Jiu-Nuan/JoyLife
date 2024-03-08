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
