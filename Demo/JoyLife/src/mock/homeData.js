const exploreCardMock = () =>{
    return{
        //id、是否为视频文件、图片、标题、头像、用户名、点赞数量等
        id:0,       
        isVideo:1,  //是否为视频文件
        imageUrl:'src/mock/images/img00.jpg',
        content:'66666666666',
        avatar:'src/mock/images/h00.jpg',
        author:'酒暖',
        likeCount:100
    }
}

export { exploreCardMock };