<template>
	<view>
		<view class="uni-column">
			<view class="content" id="content" @touchmove="touchmoveView">
				<!-- <scroll-view id="scrollview" scroll-y="true" :style="{height:style.contentViewHeight+'px'}" :scroll-with-animation="true" :scroll-top="scrollTop" @scroll=""> -->
				<block v-for="(message,index) in messages" :key="index">
					<message-show v-if="message.act=='hb'" @open-redEnvelopes="click" :message="message" :id="index"></message-show>
					<result-message v-if="message.act=='hbresult'" :message="message" :id="index"></result-message>
				</block>
				<!-- </scroll-view> -->
			</view>
			<view class="foot">
				<view class="foot-left" @tap="SendRedEnvelope"> 一键发包 </view>
				<view class="foot-right" @tap="balance"> 余额 </view>
			</view>
		</view>
		<view v-if="bannerShow">
			<view class="uni-banner" v-if="bannerShow" @tap="clickPic">
				<view>
					<image src="../../../static/img/ic_openredp_redp_img.png" style="width:100%;" mode="widthFix"></image>
				</view>
				<view style="position:relative;color: #FFFFFF;text-align: center;margin: -200upx;">
					<view>已抢过该红包</view>
					<view>查看全部</view>
				</view>
			</view>
			<view class="uni-mask" v-if="bannerShow" @tap="closeBanner" @touchmove.stop.prevent="moveHandle"></view>
		</view>
		<view v-if="grabhb">
			<view class="uni-banner" v-if="grabhb">
				<view>
					<image src="../../../static/img/ic_openredp_redp_img.png" style="width:100%;" mode="widthFix"></image>
				</view>
				<view style="position:relative; color: #FFFFFF;text-align: center;margin-top: -200upx;">
					<view>红包金额</view>
					<view>{{grabacount}}元</view>
				</view>
			</view>
			<view class="uni-mask" v-if="grabhb" @tap="closegrabhb" @touchmove.stop.prevent="moveHandle"></view>
		</view>
	</view>
</template>

<script>
	import messageShow from '../../../components/messagesshow.vue';
	import resultMessage from '../../../components/resultmessage.vue'
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex'
	var _self = this;
	var offset = 0;
	export default {

		data() {
			return {
				style: {
					pageHeight: 0,
					contentViewHeight: 0,
					footViewHeight: 90,
					mitemHeight: 0,
					bannerShow: false,
				},
				url: "http://img.tukuppt.com/preview_music/00/00/75/xf-5b87af31dabd34149.mp3",
				bannerShow: false,
				scrollTop: 0,
				grabhb: false,
				messages: [],
				previewList: [],
				roomid: '',
				callindex: '',
				currentHb_id: '',
				grabacount: '',
				istouchMove: false,
				bgAudioMannager: null

			};
		},

		onLoad(e) {
			console.log(e);
			uni.setNavigationBarTitle({
				title: e.title
			});
			var websocketIsOpen = e.websocketIsOpen;
			const res = uni.getSystemInfoSync();
			this.style.pageHeight = res.windowHeight;
			this.style.contentViewHeight = res.windowHeight - uni.getSystemInfoSync().screenWidth / 750 * (100); //像素
			this.roomid = e.roomid;
			this.callindex = e.callindex;

			this.loadRoomInfo(this.roomid, this.callindex, websocketIsOpen);
			var that = this;
			uni.onSocketClose(function() {
				console.log("socket 关闭了");
				setTimeout(() => {
					uni.connectSocket({
						url: that.$webSocketUrl + 'plhb' + '_chat'
					});
					uni.onSocketOpen(function() {
						console.log('WebSocket连接已打开！');
						that.websocketIsOpen = true;
					});
				}, 2000)
			})

		},
		onShow: () => {
			console.log("scrollTop", offset);
			uni.pageScrollTo({
				scrollTop: offset,
			})
		},
		computed: {
			...mapGetters({
				userid: 'getUserId',
				user: 'getUserInfo'
			}),

		},

		onBackPress: function(res) {
			var socketpra = {
				user_id: this.userid,
				room_id: this.roomid,
				act: 'quit',
				msg: ''
			}
			var msg = JSON.stringify(socketpra);
			console.log('msg' + msg);
			uni.sendSocketMessage({
				data: msg
			});
		},
		onReachBottom: function() {

			this.istouchMove = false;
		},
		methods: {
			moveHandle: function(){},
			closeBanner: function() {
				var that = this;
				that.bannerShow = !that.bannerShow;	
			},
			closegrabhb: function() {
				this.grabhb = !this.grabhb;
			},
			loadRoomInfo(roomid, callindex, websocketIsOpen) {
				var that = this;
				var data = {
					roomid: roomid
				}
				var socketpra = {
					user_id: that.userid,
					room_id: roomid,
					act: 'login',
					msg: ''
				}
				var msg = JSON.stringify(socketpra);
				var that = this;
				this.$utils.pluginRequest("pl_room_join", callindex, data, 'POST', '',
					res => {
						//suc
						if (res.code == 0) {
							if (websocketIsOpen) {
								uni.sendSocketMessage({
									data: msg
								});
								uni.onSocketMessage(function(res) {
									console.log(res.data)
									JSON.parse(res.data).data.forEach(function(item, index) {
										item.act = JSON.parse(res.data).act;
										if (item.user_id == that.$store.getters.getUserId) {
											item.role = 'home';
										} else {
											item.role = 'customer';
										}
										item.role = item.user_id == that.$store.getters.getUserId ? 'home' : 'customer'
										that.addMessage(item, that);
										// #ifdef APP-PLUS
										that.bgAudioMannager = uni.getBackgroundAudioManager();
										that.bgAudioMannager.src = that.url;
										// #endif
										
										if (!that.istouchMove) {
											that.scrollToBottom();
										}

									});
								});
							}
						}
					},
					res => {
						//fail
					},
					res => {
						//complete
					}
				)
			},
			addMessage(message, that) {

				// var messages = that.messages;
				that.messages.push(message);
				// that.messages = messages;
			},
			saveScrollOff: function() {
				uni.createSelectorQuery().selectViewport().scrollOffset(function(res) {
					offset = res.scrollTop;
				}).exec()
			},
			scrollToBottom: function() {
				var that = this;
				var query = uni.createSelectorQuery();
				query.selectAll('.m-item').boundingClientRect();

				query.exec(function(res) {
					that.style.mitemHeight = 0;
					res[0].forEach(function(rect) {
						that.style.mitemHeight = that.style.mitemHeight + rect.height + 20;
					});
				});
				query.selectAll('.t-common-font').boundingClientRect();

				query.exec(function(res) {

					res[0].forEach(function(rect) {
						that.style.mitemHeight = that.style.mitemHeight + rect.height + 20;
					});

					if (that.style.mitemHeight > that.style.contentViewHeight) {
						uni.pageScrollTo({
							scrollTop: that.style.mitemHeight,
							duration: 500
						});
					}
				});


			},
			SendRedEnvelope: function(e) {
				 this.saveScrollOff();
				uni.navigateTo({
					url: '../sendRnvelope/sendRnvelope?roomid=' + this.roomid + '&callindex=' + this.callindex,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			balance: function(e) {
				var _self = this;
				this.$utils.refreshMyInfo(function() {
					uni.showModal({
						confirmColor: "#FC4B2D",
						confirmText: "知道了",
						showCancel: false,
						content: '余额' + _self.user.amount + "元"
					})
				})

			},
			click: function(message) {
				this.istouchMove = true;
				var that = this;
				var data = {
					roomid: this.roomid,
					hbid: message.hb_id
				}
				that.currentHb_id = message.hb_id;
				this.$utils.defalsePluginRequest('pl_hb_open', this.callindex, data,
					res => {
						if (res.code == 0) {
							//抢到红包
							this.grabacount = res.data;
							that.grabhb = true;

						} else {
							if (res.code == 3001) {
								//余额不足，不能充值，去充值
								uni.showModal({
									title: '提示',
									content: res.msg,
									showCancel: true,
									cancelText: '知道了',
									confirmText: '去充值',
									confirmColor: '#D81E06',
									success: res => {
										if (res.confirm) {
											//跳转到充值页面
											uni.navigateTo({
												url: '../../my/recharge/recharge',
												success: res => {},
												fail: () => {},
												complete: () => {}
											});
										} else if (res.cancel) {

										}

									},
									fail: () => {},
									complete: () => {}
								});
							} else {
								//红包已经都抢完了

								that.bannerShow = true;
							}


						}
					},
					res => {

					},
					res => {

					}
				)



			},
			clickPic: function() {

				this.saveScrollOff();
				uni.navigateTo({
					url: '../rayRecords/rayRecords?roomid=' + this.roomid + '&callindex=' + this.callindex + '&hbid=' + this.currentHb_id,
					success: res => {},
					fail: () => {},
					complete: () => {
						// var that = this;
						// this.bannerShow = false;
					}
				});
			},
			touchmoveView: function() {
				this.istouchMove = true;

			},


		},

		components: {
			messageShow,
			resultMessage
		}

	}
</script>
<style>
	.uni-mask {
		position: fixed;
		z-index: 998;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: rgba(0, 0, 0, .3);
	}


	.uni-banner {
		width: 60%;
		position: fixed;
		left: 50%;
		top: 40%;
		border-radius: 10upx;
		z-index: 999;
		transform: translate(-50%, -50%);
	}
</style>
<style>
	.uni-column {
		display: flex;
		flex-direction: column;

	}

	.content {
		display: flex;
		flex-direction: column;
		padding-bottom: 200upx;
	}

	.message-space {
		margin-top: 40upx;
	}

	.foot {
		display: flex;
		flex-direction: row;
		position: fixed;
		background: #FFFFFF;
		width: 100%;
		height: 90upx;
		min-height: 90upx;
		left: 0upx;
		bottom: 0upx;
		overflow: hidden;
		font-family: Cursive;
		font-size: 30upx;
		color: black;
		border-top: 1upx solid #D9D9D9;
	}

	.foot .foot-left {
		line-height: 70upx;
		flex: 2;
		justify-content: center;
		text-align: center;
		border: 1upx solid #D9D9D9;
		border-radius: 15upx;
		margin: 10upx 20upx;

	}

	.foot .foot-right {
		line-height: 70upx;
		flex: 1;
		justify-content: center;
		text-align: center;
		border: 1upx solid #D9D9D9;
		border-radius: 15upx;
		margin: 10upx 20upx;
		margin-left: 0;
	}
</style>
