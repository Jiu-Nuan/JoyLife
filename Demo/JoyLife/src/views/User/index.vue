<template>
  <div class="">
    <WeatherCard></WeatherCard>
  </div>
  <!-- <el-empty description="这里没有任何东西"></el-empty> -->

</template>

<script setup>
import { ref, reactive } from "vue"
import WeatherCard from "@/components/WeatherCard.vue";
</script>

<style lang="scss" scoped></style>
