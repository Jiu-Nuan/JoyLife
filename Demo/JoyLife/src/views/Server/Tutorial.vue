<template>
  <div class="tutorial-container">
    <div class="tutorial-banner">
      <heFengWeather></heFengWeather>
    </div>
    <ToolBar></ToolBar>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import heFengWeather from "@/components/heFengWeather.vue";
import ToolBar from "@/components/ToolBar.vue";
</script>

<style lang="scss" scoped>
.tutorial-container {
  margin: 0 0.15rem 0 0.15rem;
}
.tutorial-banner {
  position: relative;
  width: 100vw;
  height: 15vh;
  padding-top: 3rem;
  margin-bottom: 0.2rem;
  background-color: #fefefe;
  border-radius: 0.5rem;
  box-shadow: 0.125rem 0.3125rem rgba(181, 181, 191, 0.1);
  overflow: hidden;
}
</style>
