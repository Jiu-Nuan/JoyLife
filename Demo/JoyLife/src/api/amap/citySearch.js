import AMapLoader from "@amap/amap-jsapi-loader";

const citySearch = async () => {
  return new Promise((resolve, reject) => {
    AMapLoader.load({
      key: "ba6df115764d6a2e0f388177cd72ef3c",
      version: "2.0",
      plugins: ["AMap.CitySearch"],
    }).then((AMap) => {
      AMap.plugin("AMap.CitySearch", () => {
        const citySearch = new AMap.CitySearch();
        citySearch.getLocalCity((status, result) => {
          if (status === "complete" && result.info === "OK") {
            let cityName = result.city.replace(/市/g, '');
            

            if (cityName) {
              resolve(cityName);
               console.log(`找到城市ID: ${cityName}`);
            } else {
              reject(`未能找到城市ID: ${cityName}`);
            }
          } else {
            reject('获取本地城市信息失败');
          }
        });
      });
    });
  });
}

export default citySearch;