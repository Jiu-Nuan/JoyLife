import { createStore } from 'vuex'
import { reactive } from 'vue'

const messageStore = createStore({
  state() {
    return {
      // 聊天类型
      chatType: '',
      // 登录状态
      isLogin: false,
      // 我的信息
      myInfo: reactive({
        img: 'http://img.52z.com/upload/news/image/20180111/20180111085521_86389.jpg',
        name: '',
      }),
      // 别人的信息（特指聊天对象）
      userInfo: reactive({
        img: '',
        name: '',
      }),
      // 用户列表
      userList: [],
      // 聊天记录
      chatMessageList: [],
    }
  },
  mutations: {
    SOCKET_updateChatMessageList(state, data) {
      state.chatMessageList.push(data);
    },
    changeChatType(state, data) {
      state.chatType = data;
    },
    SOCKET_login(state, data) {
      state.userList = data;
    },
    setUserInfo(state, data) {
      Object.assign(state.userInfo, data);
    },
    setMyInfo(state, data) {
      Object.assign(state.myInfo, data);
      state.isLogin = true;
    },
  },
  actions: {},
  modules: {}
})

export default messageStore