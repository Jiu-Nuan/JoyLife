const exploreCardMock = (nums = 20) =>{
    //生成一个固定长度的数组，并初始化数组的每一项
    return new Array(nums).fill(1).map((a, i)=>{
        //生成一个0-10的随机数
        let r = Math.floor(Math.random()*10) 

        return{
            //id、是否为视频文件、图片、标题、头像、用户名、点赞数量等
            id:i,       
            isVideo:Math.random() > 0.5 ? 1 : 0,  //是否为视频文件(1=是，0=否)
            imageUrl:'src/mock/images/img0'+ r +'.jpg',
            content:'标题测试-标题测试-标题测试-标题测试-标题测试-标题测试-标题测试',
            avatar:'src/mock/images/avatar/h0'+r+'.jpg',
            author:'12345',
            likeCount:Math.floor(Math.random()*10000),
        }
    })

}

export { exploreCardMock };