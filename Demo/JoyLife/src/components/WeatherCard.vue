<template>
  <div class="container">
    <div class="nav">
      <div class="time">{{ localTime }}</div>
      <div class="city">切换城市</div>
    </div>

    <div class="city-info">
      <div class="city-name">{{ weatherData.city }}</div>
      <p class="weather">{{ weatherData.weather }}</p>
      <h2 class="temp">
        <!-- em标签 斜体-->
        <em>{{weatherData.temperature}}</em>℃
      </h2>
      <div class="detail">
        <span>风力: {{ weatherData.windPower }}级</span> |
        <span>风向: {{ weatherData.windDirection }}</span> |
        <span>空气湿度:{{ weatherData.humidity }}%</span>
      </div>
    </div>
  </div>
</template>
  
  
<script setup>
import AMapLoader from "@amap/amap-jsapi-loader";
import { ref, onMounted } from "vue";

const localTime = ref("00:00");
const weatherData = ref({});

// 初始化高德地图
const initAMap = async () => {
  const AMap = await AMapLoader.load({
    key: "ba6df115764d6a2e0f388177cd72ef3c",
    version: "2.0",
    plugins: ["AMap.CitySearch"],
  });

  AMap.plugin("AMap.CitySearch", () => {
    const citySearch = new AMap.CitySearch();
    citySearch.getLocalCity((status, result) => {
      if (status === "complete" && result.info === "OK") {
        console.log(result.city);

        AMap.plugin("AMap.Weather", () => {
          const weather = new AMap.Weather();
          weather.getLive(result.city, (err, data) => {
            console.log(err, data);
            weatherData.value = data;
          });
        });
      }
    });
  });

  // 更新本地时间
  setInterval(() => {
    localTime.value = new Date().toLocaleTimeString();
  }, 100);
};

// 组件挂载后立即执行初始化
onMounted(initAMap);
</script>
  
  
  
  <style lang="scss" scoped>
.container {
  min-height: 30vh;
  background-color: #000;
  opacity: 0.6;
  color: #fff;
}

.nav {
  overflow: auto;
  padding: 0.5rem;
}

.time {
  float: left;
}

.city {
  float: right;
}

.city-info {
  text-align: center;
}

.temp {
  font-size: 0.9rem;
}

.temp em {
  font-style: normal;
  font-size: 34px;
}
</style>
