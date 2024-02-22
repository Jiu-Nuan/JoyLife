/**
 * @description 自动计算瀑布流的位置：每个card使用的是绝对定位，只需要计算每个卡片的偏移量就行
 */
//将父级名称和列数作为参数传到方法里。
const computeWaterFallFlow = (ref, colums = 2) => {
    let resizeListener = null; //数组，记录每一列的高度
    //通过判断数组里哪个元素最小，确定卡片的位置
    //卡片的x轴偏移量 = 卡片宽度 + 卡片边距总和
    //卡片的y轴偏移量 = 100 + 卡片边距总和
    //最后将插入卡片的一列高度更新即可
    const computeCard = () => {
        //console.log('计算瀑布流1');
        const cards = ref.children;
        const winWidth = window.innerWidth;//获取当前窗口宽度
        const margin = Math.round(winWidth * 0.015);//计算出card之间的间距
        const cardWidth = Math.floor((winWidth -(colums+1) * margin) / colums); //计算出每个card的宽度
        const topList = new Array(colums).fill(0);//用于记录每一列的当前顶部记录

        //给每个card赋予宽度，因为card中的img高度会随宽度自适应，所以每个card高度会自适应
        for(let i = 0;i < cards.length;i++){
            cards[i].style.width = cardWidth + 'px';
        }
        //计算出每个card的偏移量
        for(let i = 0;i < cards.length;i++){
            //判断当前哪一列比较高，card插在高的那一列
            let min = Math.min(...topList);
            const minColum = topList.indexOf(min);
            //计算出card的偏移量
            let left = margin * (minColum + 1) + cardWidth * minColum;
            let top = min + margin;
            //console.log(left, top);
            cards[i].style.transform = `translate(${left}px, ${top}px)`;
            topList[minColum] += cards[i].clientHeight + margin;
        }
        //console.log('计算瀑布流2');
        ref.style.height = Math.max(...topList) + margin + 'px';
    }

    computeCard();
    
    //计算完卡片位置后，监听窗口变化，，重新计算卡片位置，实现卡片自适应
    //监听resize事件
    if(!resizeListener){
        resizeListener = window.addEventListener('resize',()=>{
            computeCard();
        });
    }
}

export default computeWaterFallFlow;