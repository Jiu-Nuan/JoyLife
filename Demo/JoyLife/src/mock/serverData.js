
import articleData from './data'
//模拟请求数据延迟
const delay = (t) => {
    return new Promise(reslove => {
        setTimeout(() => {
            reslove()
        }, t)
    })
}

function generateRandomNumber(start, end) {
    // 确保start和end都是数值，并且start小于等于end
    start = Number(start);
    end = Number(end);
    if (isNaN(start) || isNaN(end) || start > end) {
        throw new Error('Invalid arguments. Please provide valid start and end numbers.');
    }

    let randomNumber = Math.floor(Math.random() * (end - start + 1)) + start;

    if (randomNumber >= 10000) {
        randomNumber = (randomNumber / 10000).toFixed(1) + '万';
    }

    return randomNumber;
}

function generateRandomDateTime() {
    // 获取当前时间作为最大范围限制
    const now = new Date();
    const minYear = 2020; // 设置最小年份
    const maxYear = now.getFullYear(); // 获取当前年份
  
    // 随机生成年、月、日、小时和分钟
    const randomYear = Math.floor(Math.random() * (maxYear - minYear + 1)) + minYear;
    const randomMonth = Math.floor(Math.random() * 12) + 1; // 注意月份是从0开始的，所以要加1
    const randomDay = Math.floor(Math.random() * 31); // 这里假设每个月最多31天，实际情况需要根据月份处理
    const randomHours = Math.floor(Math.random() * 24);
    const randomMinutes = Math.floor(Math.random() * 60);
  
    // 创建一个新的日期对象，确保日期有效（比如2月不可能有30天）
    let randomDate = new Date(randomYear, randomMonth - 1, randomDay, randomHours, randomMinutes);
  
    // 如果生成的日期超出了实际的最大值（比如某个月份只有30天而我们随机到了31号），则调整到该月的最大日期
    if (randomDate.getMonth() !== randomMonth - 1 || randomDate.getDate() !== randomDay) {
      randomDate.setFullYear(randomYear, randomMonth - 1, 0);
      randomDate.setDate(randomDate.getDate() + Math.floor(Math.random() * randomDate.getDate()));
    }
  
    // 格式化日期时间
    function pad(num) {
      return ('0' + num).slice(-2);
    }
    
    const formattedDateTime = `${randomDate.getFullYear()}-${pad(randomDate.getMonth() + 1)}-${pad(randomDate.getDate())} ${pad(randomDate.getHours())}:${pad(randomDate.getMinutes())}`;
  
    return formattedDateTime;
  }
  

//随机生成薪水
function generateHousekeepingSalary() {
    const type = Math.floor(Math.random() * 3);
    // 定义薪资区间
    const ranges = [
      { unit: '元/时', range: [20, 50] }, // 时薪范围
      { unit: '元/天', range: [200, 500] }, // 日薪范围
      { unit: '元/月', range: [3000, 8000] } // 月薪范围
    ];
  
    const selectedRange = ranges[type];
    const salary = Math.floor(Math.random() * (selectedRange.range[1] - selectedRange.range[0] + 1))  + selectedRange.range[0];
  
    return `${salary} ${selectedRange.unit}`;
  }
  
  //阿姨名字随机生成
  function getRandomAuntName() {
    const auntNames = ['张阿姨', '李阿姨', '王阿姨', '赵阿姨', '刘阿姨', '陈阿姨', '杨阿姨', '黄阿姨', '孙阿姨', '郭阿姨'];
    
    // 获取随机索引
    const randomIndex = Math.floor(Math.random() * auntNames.length);
    
    // 返回随机选取的名字
    return auntNames[randomIndex];
  }


const hourseKeepingCardMock = async (nums = 20) => {
    await delay(1000);//模拟请求数据延迟,异步接口
    //生成一个固定长度的数组，并初始化数组的每一项
    return new Array(nums).fill(1).map((a, i) => {

        let r = Math.floor(Math.random() * 10);//生成一个0-9的随机数
        let imageList = undefined;
        let n = Math.floor(Math.random() * 5) + 1;//生成一个1-5的随机数
        imageList = new Array(n).fill(1).map(() => {
            let m = Math.floor(Math.random() * 10);//生成一个0-9的随机数
            return `src/mock/source/avatar/h0${m}.jpg`;
        })
        
        return {
            //id、是否为视频文件、图片、标题、头像、用户名、点赞数量等
            id: i,
            imageUrl    : imageList,
            title       : articleData[r].title,
            tag         : articleData[r].tag,
            content     : articleData[r].content,
            avatar      : 'src/mock/source/avatar/h0' + r + '.jpg',
            author      : getRandomAuntName(),
            salary      : generateHousekeepingSalary(),
            publishTime : generateRandomDateTime(),

            likeCount   : generateRandomNumber(0,100000),
            isLiked     : Math.random() > 0.5 ? 1 : 0,
            collectCount: generateRandomNumber(0,15000),
            isCollected : 1,
            commentCount:generateRandomNumber(0,10000)
        }
    })

}

export { hourseKeepingCardMock };