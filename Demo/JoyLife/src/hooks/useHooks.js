import {reactive} from 'vue';

const useHooks = () => {
    const state = reactive({
        //创建一个isRefresh的参数，boolean类型，判断首页是否需要刷新
        isRefresh: false
    })
    //改变isRefresh值的方法
    const changeRefresh = (val) => {
        state.isRefresh = val;
    }

    return {
        state,  //返回state对象
        changeRefresh,
    }
};

export default useHooks();