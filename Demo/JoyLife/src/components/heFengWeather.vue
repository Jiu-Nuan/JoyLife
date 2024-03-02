<!-- 暂时废弃
<template>
    <div id="he-plugin-simple"></div>
  </template>
  
  <script setup>
  import { onMounted } from 'vue';
  
  onMounted(() => {
    // 和风天气插件调用
    window.WIDGET = {
      "CONFIG": {
        "layout":"1",
        "width":"450",
        "height":"150",
        "background":"1",
        "dataColor":"FFFFFF",
        "key":"1f55436fa2d3445a90190dafa2efd576"
      }
    };
  
    const insertWidget = () => {
      const d = document;
      const c = d.createElement('link');
      c.rel = 'stylesheet';
      c.href = '../assets/css/he-simple.css';
    //   c.href = 'https://widget.qweather.net/standard/static/css/he-standard.css?v=1.5.0';
      const s = d.createElement('script');
      s.src = '../assets/js/he-simple.js';
    //   s.src = 'https://widget.qweather.net/standard/static/js/he-standard.js?v=1.5.0';
      const sn = d.getElementsByTagName('script')[0];
      sn.parentNode.insertBefore(c, sn);
      sn.parentNode.insertBefore(s, sn);
    };
  
    insertWidget();
  });
  </script> -->


  <template>
    <div class="box">
      <div id="he-plugin-standard"></div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {};
    },
    created() {
      window.WIDGET = {
        CONFIG: {
          layout: "1",
          width: 450,
          height: 150,
          background: "1",
          dataColor: "FFFFFF",
          borderRadius: "5",
          key: "1f55436fa2d3445a90190dafa2efd576",
        },
      };
      let script = document.createElement("script");
      script.src =
      "https://widget.qweather.net/standard/static/js/he-standard-common.js?v=2.0";
      document.getElementsByTagName("head")[0].appendChild(script);
    },
    methods: {},
  };
  </script>
  
  <style  scoped>
  </style>
  