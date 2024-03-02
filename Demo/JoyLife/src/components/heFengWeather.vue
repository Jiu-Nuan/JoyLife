<template>
  <div class="box">
    <div id="he-plugin-standard"></div>
  </div>
</template>
  
<script setup>
import { ref, onMounted } from "vue";
import cityIDSearch from '../mock/cityIDSearch';

// 创建一个ref来暂存城市ID的promise
const cityIDPromise = cityIDSearch();


// 初始化数据对象
const widgetConfig = ref({
  layout: "1",
  width: window.innerWidth, // 初始宽度或自适应宽度
  height: 200,
  background: "1",
  dataColor: "FFFFFF",
  tmpColor: "FFFFFF",
  tmpSize: 48,
  cityColor: "FFFFFF",
  citySize: 36,
  aqiColor: "FFFFFF",
  aqiSize: "32",
  weatherIconSize:(window.innerHeight)/20,
  alertIconSize: "36",
  borderRadius: "5",
  city: "",
  horizontal: "left",
  key: "1f55436fa2d3445a90190dafa2efd576",
});

// 封装的方法
const loadWidgetResources = () => {
      window.WIDGET = {
        CONFIG: widgetConfig.value,
      };

      const insertCssAndJs = (document) => {
        const linkElement = document.createElement("link");
        linkElement.rel = "stylesheet";
        linkElement.href = "https://widget.qweather.net/standard/static/css/he-standard.css?v=1.5.0";
        // linkElement.href = '../assets/css/he-simple.css';

        const scriptElement = document.createElement("script");
        scriptElement.src = "https://widget.qweather.net/standard/static/js/he-standard.js?v=1.5.0";

        const firstScriptNode = document.getElementsByTagName("script")[0];

        if (firstScriptNode) {
          firstScriptNode.parentNode.insertBefore(linkElement, firstScriptNode);
          firstScriptNode.parentNode.insertBefore(scriptElement, firstScriptNode);
        }
      };

      // 在组件挂载后插入CSS和JS
      insertCssAndJs(document);
    };

// 在mounted阶段等待城市ID获取完成，再设置config和加载资源
onMounted(async () => {
  const cityID = await cityIDPromise;
  widgetConfig.value.city = cityID;
  console.log(cityID);
  loadWidgetResources();
});
</script>
  
  <style  scoped></style>

  