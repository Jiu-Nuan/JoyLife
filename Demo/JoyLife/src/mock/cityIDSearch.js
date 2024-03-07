import citySearch from "./citySearch";
import cityData from '../assets/cityname_cn.json';

const cityDataMap = cityData.reduce((acc, curr) => ({ ...acc, [curr.cityZh]: curr.id }), {});

async function cityIDSearch() {
  try {
    const searchedCity = await citySearch();
    const cityId = cityDataMap[searchedCity];
    
    if (cityId) {
      return cityId;
      // console.log(`找到城市ID: ${cityId}`);
    } else {
      throw new Error(`未能找到城市ID: ${searchedCity}`);
    }
  } catch (error) {
    throw new Error('获取本地城市信息失败');
  }
}

export default cityIDSearch;