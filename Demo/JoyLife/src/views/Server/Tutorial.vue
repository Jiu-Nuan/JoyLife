<template>
  <div class="tutorial-banner">
    <heFengWeather></heFengWeather>
  </div>
</template>
  
  <script setup>
import { ref, reactive } from "vue";
import heFengWeather from "@/components/heFengWeather.vue";

</script>

<style lang="scss" scoped>
.tutorial-banner {
  position: absolute;
  width: 100vw;
  height: 15vh;
  top: 3rem;
  background-color: #fefefe;
  border-radius: 0.5rem;
  box-shadow: 0.125rem 0.3125rem rgba(181, 181, 191, 0.1);
  overflow: hidden;
}
</style>
  