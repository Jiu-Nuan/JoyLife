import {reactive} from 'vue';

const useHooks = () => {
    const state = reactive({
        //创建一个isRefresh的参数，boolean类型，判断首页是否需要刷新
        isRefresh: false,
        //控制弹框显隐
        isOpenDetail: false,
        //传递点击的卡片信息
        popPara:{
            x:0,
            y:0,
            width:0,
            height:0,
            imgW:0,
            imgH:0,
            info:{
                imageUrl:[],
            }
        }
    })
    //改变isRefresh值的方法
    const changeRefresh = (val) => {
        state.isRefresh = val;
        
    }

    //控制弹框的显隐事件
    const changeOpenStatus = (val) => {
        state.isOpenDetail = val;
    };

    return {
        state,  //返回state对象
        changeRefresh,
        changeOpenStatus,
    }
};

export default useHooks();