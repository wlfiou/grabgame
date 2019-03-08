const state = {
	GameInfoList: [],
	currentRoomInfo: null,
	payInfo: '',
	bankList: [],
	aliList: []
}

// getters
const getters = {
	getGameInfoList: (state) => {
		return state.GameInfoList;
	},
	getCurrentRoomInfo: (state) => {
		return state.currentRoomInfo;
	},
	getPayInfo: (state) => {
		return state.payInfo;
	},
	getBankList: (state) => {
		return state.bankList;
	},
	getAliList: (state) => {
		return state.aliList;
	}
}

// actions
const actions = {
	setGameInfoList: ({
		commit
	}, gameList) => {
		commit("setGameInfoList", gameList);
	},
	setCurrentRoomInfo: ({
		commit
	}, roomInfo) => {
		commit("setCurrentRoomInfo", roomInfo);
	}
}

// mutations
const mutations = {
	setGameInfoList: (state, gameList) => {
		state.GameInfoList = gameList;
	},
	setCurrentRoomInfo: (state, roomInfo) => {
		state.currentRoomInfo = roomInfo;
	},
	setPayInfo: (state, payInfo) => {
		state.payInfo = payInfo;
	},
	setBankList: (state, bankList) => {
		state.bankList = bankList;
	},
	setAliList: (state, aliList) => {
		state.aliList = aliList;
	},
	changeAli: (state, ind) => {
		let obj = state.aliList[ind];
		state.aliList.splice(ind, 1);
		state.aliList.unshift(obj);
	},
	changeBank: (state, ind) => {
		let obj = state.bankList[ind];
		state.bankList.splice(ind, 1);
		state.bankList.unshift(obj);
	}
	
}

export default {
	state,
	getters,
	actions,
	mutations
}
