import Vue from 'vue'
import Vuex from 'vuex'
import middle from './modules/middle'

Vue.use(Vuex)
let userState = {
	userInfo: null,
	hasLogin: false, // 是否登录
	hasSkip: false   // 是否跳过启动页
};
const local_userState = uni.getStorageSync('userState');
console.log("local_userState=",JSON.stringify(local_userState))
	if(local_userState.hasLogin){	
		userState.userInfo = local_userState.userInfo;
		userState.hasLogin = local_userState.hasLogin;
	}
	if(local_userState.hasSkip){	// 用户已经跳过启动页，但是没有登录
		userState.hasSkip = true;
	}
const store = new Vuex.Store({
	modules:{
		m:middle
	},
	state: {...userState},
	getters:{
		getLoginState:state =>{
			return state.hasLogin;
		},
		getSkipState:state =>{
			return state.hasSkip;
		},
		getUserInfo:state =>{
			return state.userInfo;
		},
		getUserId:state =>{
			return state.userInfo.user_id;
		}
	},
	mutations: {
	    login(state, user) {  // 用户登录
	        state.userInfo = user;
	        state.hasLogin = true;
			
			uni.setStorageSync('userState', {...state});	
			
	    }, 
	    logout(state) {			// 用户退出
	        state.userInfo = null;
	        state.hasLogin = false;
			// todo: 当用户退出时，启动页可以不再显示
			uni.clearStorageSync();
	    },
		skipIndex(state){	// 用户跳过首页
			state.hasSkip = true; 
			uni.setStorageSync('userState', {...state});	
		},
		setAvator(state,avator){
			state.userInfo.avatar = avator;
			uni.setStorageSync('userState', {...state});	
		},
		setNoPayPass(state,nopaypass){
			state.userInfo.nopaypwd = nopaypass;
			uni.setStorageSync('userState', {...state});
		},
		setPayPass(state,PayPass){
			state.userInfo.payPwd = PayPass;
			uni.setStorageSync('userState', {...state});
		}
	},
	actions: {
		setAvator:({commit},avator) =>{
			  commit("setAvator",avator);
		},
		setNoPayPass:({commit},nopaypass)=>{
			commit("setNoPayPass",nopaypass);
		},
		setPayPass:({commit},PayPass)=>{
			commit("setPayPass",PayPass);
		}
	}
})

export default store
