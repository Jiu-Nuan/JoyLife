<template>
    <h1>vue3 天气组件</h1>
    <h2>免费天气api接口</h2>
    <br />
    <div class="watherMain">
      <ul>
        <li class="li_1">
          <b>{{ weatherObj.obj.city }}</b>
          <i class="btn" @click="showSwitchCityFn">切换</i>
        </li>
        <li class="li_2">{{ weatherObj.obj.update_time }}更新</li>
        <li class="li_3">
          {{ weatherObj.obj.tem_day }}
          <em class="li_7">℃</em>
        </li>
        <li class="li_4">空气质量 {{ weatherObj.obj.air }}</li>
        <li class="li_5">{{ weatherObj.obj.win }} {{ weatherObj.obj.win_speed }}</li>
        <li class="li_6">相对温度 {{ weatherObj.obj.humidity }}</li>
      </ul>
      <div class="popUp" v-show="isPopup">
        <h1 class="switchCity">切换城市</h1>
        <input type="text" v-model="inputCityVal" @change="inputCityNameFn" class="entryCity" placeholder="请输入城市名称" />
        <div>
          <input class="btnInput" @click="confirmBtnFn" type="button" value="确认">
          <input class="btnInput" @click="hideSwitchCityFn" type="button" value="取消">
        </div>
      </div>
    </div>
  </template>
  
  
  <script setup>
  import { onMounted, ref, reactive } from 'vue'
  import axios from 'axios'
  import userObj from '../mock/weatherUser'
  import cityNameJsonData from '../assets/cityname_cn.json'
  
  // 接收天气数据
  let weatherObj = reactive({ obj: '' })
  // 切换城市菜单显示隐藏
  let isPopup = ref(false)
  // 输入input城市名的值
  let inputCityVal = ''
  
  // 请求城市天气
  const getCityWeatherFn = cityId => {
    let weatherUrl = 'https://www.yiketianqi.com/free/day?appid=' + userObj.id + '&appsecret=' + userObj.secret + '&cityid=' + cityId
    axios.get(weatherUrl).then(d => {
      console.log(d.data)
      weatherObj.obj = d.data
    })
  }
  
  // 显示切换城市
  let showSwitchCityFn = () => {
    inputCityVal = ''
    isPopup.value = !isPopup.value
  }
  
  // 隐藏切换城市
  let hideSwitchCityFn = () => {
    isPopup.value = false
  }
  
  // 监听输入城市名
  let cityName = ''
  const inputCityNameFn = e => {
    // console.log(e.target.value)
    cityName = e.target.value
  }
  
  // 输入城市确认按钮
  let confirmBtnFn = () => {
    if (!cityName) {
      console.log('城市名不能为空')
      return
    }
    // console.log(cityName)
    filterCityFn(cityName)
    // 隐藏菜单
    isPopup.value = false
  }
  
  // 筛选城市，cityNameJsonData
  const filterCityFn = n => {
    console.log(n)
    // 精确过滤城市名对应的json对象
    let result = cityNameJsonData.filter(obj => {
      return obj.cityZh == n
    })
    console.log(result, result[0].id)
    // 根据城市名，获得城市id
    getCityWeatherFn(result[0].id)
  }
  
  onMounted(() => {
    // 首次打开页面。城市id，沈阳：101070101
    getCityWeatherFn(101070101)
  
    // 监听键盘enter按钮
    document.addEventListener('keyup', (e) => {
      console.log(e.code)
      if (e.code == "Enter") {
        //回车执行，输入城市确认按钮
        confirmBtnFn()
      }
    });
  
  })
  
  </script>
  
  
  
  <style scoped>
  div.popUp {
    position: absolute;
    left: 48px;
    top: 40px;
    width: 200px;
    height: auto;
    padding: 5px;
    background: #ddd;
    border-radius: 5px;
    border: 1px solid #666;
    box-shadow: 2px 2px 5px rgb(134, 134, 134);
    opacity: .9;
  }
  
  input.btnInput {
    background: #24517f;
    color: #fff;
    margin-right: 10px;
    padding: 2px 3px;
    margin-top: 5px;
    border-radius: 5px;
  }
  
  input.entryCity {
    height: 20px;
    border: 1px solid #7e7e7e;
    margin-bottom: 10px;
    padding: 0 5px;
    font-size: 12px;
    border-radius: 5px;
  }
  
  h1.switchCity {
    font-size: 14px;
    font-weight: normal;
    margin-bottom: 10px;
  }
  
  div.watherMain {
    width: 300px;
    height: 150px;
    background: #eee;
    border: 1px solid #8f8f8f;
    border-radius: 10px;
    position: relative;
    font-size: 12px;
  }
  
  div.watherMain li {
    position: absolute;
  }
  
  div.watherMain li.li_1 {
    top: 10px;
    left: 10px;
  }
  
  div.watherMain li.li_1 i.btn {
    font-size: 10px;
    padding: 2px;
    background: rgb(210, 253, 255);
    margin-left: 10px;
    border-radius: 5px;
    border: 1px solid rgb(22, 178, 218);
    cursor: pointer;
  }
  
  div.watherMain li.li_2 {
    top: 10px;
    left: 180px;
  }
  
  div.watherMain li.li_3 {
    top: 60px;
    left: 30px;
    font-size: 66px;
  }
  
  div.watherMain li.li_4 {
    top: 45px;
    left: 180px;
    background: rgb(248, 208, 97);
    padding: 0 20px;
    border-radius: 15px;
  }
  
  div.watherMain li.li_5 {
    top: 80px;
    left: 190px;
  }
  
  div.watherMain li.li_6 {
    top: 100px;
    left: 190px;
  }
  
  div.watherMain em.li_7 {
    position: relative;
    top: -27px;
    left: -15px;
    font-size: 20px;
    font-weight: bold;
  }
  
  /* ============ */
  * {
    margin: 0;
    padding: 0;
    border: 0;
  }
  
  ul,
  ol,
  li {
    list-style: none;
  }
  
  p {
    margin: 0;
    padding: 0;
    font-size: 22px;
  }
  </style>
  