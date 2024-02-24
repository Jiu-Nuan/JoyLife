
import articleData from './data'
//模拟请求数据延迟
const delay = (t) =>{
    return new Promise(reslove =>{
        setTimeout(() =>{
            reslove()
        },t)
    })
}

const exploreCardMock = async (nums = 20) =>{
    await delay(1000);//模拟请求数据延迟,异步接口
    //生成一个固定长度的数组，并初始化数组的每一项
    return new Array(nums).fill(1).map((a, i)=>{
        
        let r = Math.floor(Math.random()*10);//生成一个0-9的随机数
        let isVideo = Math.random() > 0.5 ? 1 : 0;//是否为视频文件(1=是，0=否)
        let imageList = undefined;
        let videoUrl  = undefined;
        if(isVideo){
            let n = Math.floor(Math.random()*10)+11; //生成一个11-20的随机数
            videoUrl = [`src/mock/source/videos/vv${n}.mp4`];
            let m = Math.floor(Math.random()*10);//生成一个0-9的随机数
            imageList = [`src/mock/source/img0${m}.jpg`];
        }else{
            let n = Math.floor(Math.random()*5)+1;//生成一个1-5的随机数
            imageList = new Array(n).fill(1).map(()=>{
                let m = Math.floor(Math.random()*10);//生成一个0-9的随机数
                return `src/mock/source/img0${m}.jpg`;
            })
        }
        return{
            //id、是否为视频文件、图片、标题、头像、用户名、点赞数量等
            id      :i,       
            isVideo :isVideo,
            imageUrl:imageList,
            videoUrl:videoUrl,
            title   :articleData[r].title,
            tag     :articleData[r].tag,
            content :articleData[r].content,
            avatar  :'src/mock/source/avatar/h0'+r+'.jpg',
            author  :'12345',
            likeCount:Math.floor(Math.random()*30000),
            isLiked:Math.random() > 0.5 ? 1 : 0,
        }
    })

}

export { exploreCardMock };