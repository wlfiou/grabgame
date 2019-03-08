<template>
	<view class="page t-common-font uni-page-body">
		<!-- #ifndef MP-WEIXIN -->
		<!-- 固定在顶部的导航栏 -->
		<uni-nav-bar class="navBox" fixed="true" backgroundColor="#fc3a39" @click-left="messages" @click-right="settings"
		 color="#fff" title="个人中心" shadow="false">
			<view slot="left" style="margin-left: 6px;line-height: 44px;">
				<uni-icon type="chatbubble" size="28"></uni-icon>
			</view>
			<view slot="right" style="line-height: 44px;">
				<uni-icon type="gear-filled" size="28"></uni-icon>
			</view>
		</uni-nav-bar>
		<!-- 使用非原生导航栏后需要在页面顶部占位 -->
		<!-- #ifdef APP-PLUS -->
		<view style="height:80px;"></view>
		<!-- #endif -->
		<!-- #ifdef H5 -->
		<view style="height:44px;"></view>
		<!-- #endif -->
		<!-- #endif -->

		<!-- 点击用户头像居中弹框 -->
		<uni-popup :show="showPopupMiddle" :type="popType" v-on:hidePopup="hidePopup">
			<view class="uni-flex uni-row pop-user-info" style="justify-content: space-between;">
				<image class="pop-avator" mode="widthFix" :src="avator"></image>
				<view class="account-msg">
					<p style="color: #000;font-size: 14px;">{{nickName}}</p>
					<p>电话:{{user.mobile}}</p>
					<p>ID:{{user.user_id}}</p>
				</view>
			</view>
			<view class="uni-center">
				<image class="uni-common-mt pop-user-pic" mode="widthFix" :src="qrcodeUrl" />
			</view>
			<view class="uni-flex uni-row uni-center pop-btn-box">
				<view class="text" @tap="savePic">保存到手机</view>
				<!-- <view class="text orgColor" @tap="openCode">打开二维码</view> -->
			</view>
		</uni-popup>

		<view>
			<view class="my-top">
				<view class="my-info" @click="showMiddlePopup">
					<view class="avator">
						<image mode="aspectFill" :src="avator"></image>
					</view>
					<view class="user-info">
						<view>{{nickName}}</view>
						<view>ID:{{user.user_id}}</view>
					</view>
					<view class="qrcode">
						<image src="../../static/img/erweima.png" mode="aspectFill"></image>
					</view>
				</view>
				<view class="person-info" @tap="personal">个人资料 ></view>
			</view>
			<view class="func-detail">
				<view class="earnings-info">
					<view class="wallet">
						<view>我的钱包(元)</view>
						<view class="wallet-content" @tap="capitalRecord">
							<view>{{user.amount}}</view>
							<view>资金记录 ></view>
						</view>
					</view>
					<view class="wallet">
						<view>我的推荐收益(元)</view>
						<view class="wallet-content" @tap="gainRecord">
							<view>{{user.referralamount}}</view>
							<view>推广收益记录 ></view>
						</view>
					</view>
					<view class="func">
						<!-- <view>收益转入钱包</view> -->
						<view @tap="cash">提现</view>
						<view @tap="recharge">充值</view>
					</view>
				</view>
				<view class="my-function">
					<view>
						<view class="uni-list" style="background-color: #007AFF;">
							<view class="uni-list-cell" v-for="(item,index) in list" :key="index" style="background-color: #fff;" @click="navigate(index)">
								<view class="uni-list-cell-navigate uni-navigate-right t-list-cell" :class="index==0 ? 'first-active' : ''">
									<image class="left-image" :src="item.image" mode="aspectFill"></image>
									<text style="margin-left: 10upx;font-weight: bold;">{{item.title}}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>

		</view>
		<!-- <web-view :src="qrcodeUrl" v-if="isopenqrcode"></web-view> -->
	</view>
</template>

<script>
	import uniNavBar from '../../components/uni-nav-bar.vue';
	import uniIcon from "../../components/uni-icon.vue";
	import uniPopup from '../../components/uni-popup.vue';

	export default {
		data() {
			return {
				isopenqrcode: false,
				popType: 'middle',
				showPopupMiddle: false,
				list: [{
						image: "../../static/img/my_recommend.png",
						title: "我的推荐",
						navigateTo: "myRecommend"
					},
					{
						image: "../../static/img/my_yinhangqia.png",
						title: "我的银行卡",
						navigateTo: "myBankCard"
					},
					{
						image: "../../static/img/my_zhifubao.png",
						title: "我的支付宝",
						navigateTo: "myAlipay"
					},
					{
						image: "../../static/img/my_haibao.png",
						title: "推广海报",
						navigateTo: "promotionPoster"
					},
					{
						image: "../../static/img/my_kefuzhongxin.png",
						title: "客服中心",
						navigateTo: "serviceCenter"
					},
				]
			};
		},
		onLoad() {
			this.setCashInfo();
		},
		onShow() {
			this.setCashInfo();
			this.$utils.refreshMyInfo(function() {})
		},
		computed: {
			avator() {
				return this.user.avatar != null && this.user.avatar.length > 0 ? this.user.avatar :
					'http://103.224.249.197:8012/upload/avatar/000_avatar_big.jpg?user=00'
			},
			user() {
				return this.$store.getters.getUserInfo
			},
			passUserName() {
				return this.$utils.defaultPlusXing(this.user.user_name);
			},
			qrcodeUrl() {
				return this.$imageUrl + 'tg&url=' + this.user.invitekey
			},
			nickName() {
				return this.user.nick_name.length > 0 ? this.user.nick_name : this.passUserName;
			},
		},
		methods: {
			settings: function() {
				uni.navigateTo({
					url: './setting/setting',
					success: res => {}
				});
			},
			messages: function() {
				uni.navigateTo({
					url: '../ray/notify/notify',
					success: res => {}
				});
			},
			hidePopup: function() {
				this.showPopupMiddle = false;
			},
			//展示居中 popup
			showMiddlePopup: function() {
				// this.hidePopup();
				this.popType = 'middle';
				this.showPopupMiddle = true;
			},
			savePic: function() {
				uni.showLoading({
					title: 'loading....',
					mask: false
				});
				this.$utils.tRequest({
					url: this.$webUrl + 'user_referrel_get',
					method: 'GET',
					data: {},
					success: res => {
						console.log(res)
						uni.downloadFile({
							url: res.data,
							success: function(picres) {
								uni.hideLoading();
								if (picres.statusCode === 200) {
									uni.saveImageToPhotosAlbum({
										filePath: picres.tempFilePath,
										success: function(res) {
											uni.showToast({
												title: '保存成功',
												mask: false,
												icon: 'none',
												duration: 1000
											});
										}
									})
								}
							}
						})

					},
					fail: () => {},
					complete: () => {}
				})

			},
			openCode: function() {
				// 				uni.scanCode({
				// 					success: (res) => {
				// 						uni.showToast({
				// 							title: res.result,
				// 							mask: false,
				// 							duration: 1500
				// 						});
				// 					}
				// 				})
				// plus.runtime.openWeb(this.qrcodeUrl);
				this.isopenqrcode = !this.isopenqrcode;
			},
			personal: function() {
				uni.navigateTo({
					url: './personal/personal',
					success: res => {}
				});
			},
			capitalRecord: function() {
				uni.navigateTo({
					url: './capitalRecord/capitalRecord',
					success: res => {}
				});
			},
			gainRecord: function() {
				uni.navigateTo({
					url: './gainRecord/gainRecord',
					success: res => {}
				});
			},
			cash: function() {
				uni.navigateTo({
					url: './cash/cash',
					success: res => {}
				});
			},
			recharge: function() {
				uni.navigateTo({
					url: './recharge/recharge',
					success: res => {}
				});
			},
			goqq: function(qqUrl) {
				var mContext = plus.android.runtimeMainActivity();
				var Uri = plus.android.importClass('android.net.Uri');
				var Intent = plus.android.importClass('android.content.Intent')
				var intent = new Intent(Intent.ACTION_VIEW, Uri.parse(qqUrl));
				mContext.startActivity(intent);
			},
			navigate: function(index) {
				var pages = this.list[index].navigateTo;
				// this.$options.methods.funs();
				switch (pages) {
					case 'myRecommend':
						uni.navigateTo({
							url: './gainRecord/gainRecord',
							success: res => {}
						});
						break;
					case 'myBankCard':
						uni.navigateTo({
							url: './myBankCard/myBankCard',
							success: res => {}
						});
						break;
					case 'myAlipay':
						uni.navigateTo({
							url: './myAlipay/myAlipay',
							success: res => {}
						});
						break;
					case 'promotionPoster':
						uni.navigateTo({
							url: './promotionPoster/promotionPoster',
							success: res => {}
						});
						break;
					case 'serviceCenter':
						// #ifdef APP-PLUS
						this.openQQ()
						// #endif
						break;
					default:
						break;
				}

			},
			openQQ() {
				if (plus.os.name == "Android") {

					this.goqq('mqqwpa://im/chat?chat_type=wpa&uin=545104918&version=1');
				}
				if (plus.os.name == "iOS") {
					plus.runtime.launchApplication({
						action: "mqq://im/chat?chat_type=wpa&uin=545104918&version=1&src_type=web"
					}, function(e) {
						plus.nativeUI.confirm("检查到您未安装qq，请先到appstore搜索下载？", function(i) {
							if (i.index == 0) {
								iosAppstore("itunes.apple.com/cn/app/mqq/");
							}
						});
					});
				}
			},
			setCashInfo: function() {
				this.$utils.tRequest({
					url: this.$webUrl + 'user_bank_list',
					method: 'GET',
					data: {
						page: 1,
						pagesize: 20,
						cardtypes: 1
					},
					success: res => {
						if (res.code === 0) {
							this.$store.commit('setBankList', res.data.list);
						}
					},
					fail: () => {},
					complete: () => {}
				})

				this.$utils.tRequest({
					url: this.$webUrl + 'user_bank_list',
					method: 'GET',
					data: {
						page: 1,
						pagesize: 20,
						cardtypes: 3
					},
					success: res => {
						if (res.code === 0) {
							this.$store.commit('setAliList', res.data.list);
						}
					},
					fail: () => {},
					complete: () => {}
				})

			}
		},
		components: {
			uniNavBar,
			uniIcon,
			uniPopup
		}
	}
</script>
<style>
	.uni-page-body{
		background-color: #fc3a39;
	}
	
	.account-msg p {
		line-height: 14px;
	}

	.account-msg {
		color: #666;
		font-size: 12px;
		margin-left: 30upx;
	}

	.pop-user-info {
		position: absolute;
		top: 15upx;
		left: 15upx;
	}

	.pop-avator {
		width: 100upx;
		height: 100upx;
		border-radius: 50%;
	}

	.pop-btn-box {
		width: 100%;
		height: 70upx;
		line-height: 70upx;
		position: absolute;
		bottom: 0px;
		left: 0;
		border-top: 1px solid #eee;
	}

	.pop-btn-box .text:first-child {
		border-right: 1px solid #eee;
	}

	.pop-btn-box view {
		flex: 1;
	}

	.pop-user-pic {
		width: 190upx;
		height: 190upx;
	}

	.text {
		padding: 15upx 20upx;
		color: #777;
		font-size: 26upx;
	}

	.t-common-font {
		font-weight: bold;
	}

	.orgColor {
		color: #FC4B2D;
	}

	.t-list-cell {
		justify-content: flex-start;
	}

	.first-active {
		border-bottom: 30upx solid #f3f4f5;
	}

	.func-detail {
		margin-top: -200upx;
		display: flex;
		flex-direction: column;
		justify-content: center;

	}

	.earnings-info {
		background-color: #ffffff;
		margin: 0 25upx;
		height: 350upx;
		border-radius: 10upx;
		padding: 30upx;

	}

	.wallet {
		font-weight: bold;
	}

	.wallet-content {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.wallet-content view:first-child {
		font-size: 50upx;
		color: #FC4B2D;
	}

	.func {
		border-top: 2upx solid #EEEEEE;
		display: flex;
		flex-direction: row;
		padding-top: 20upx;
		justify-content: space-between;
	}

	.func view {
		width: 150upx;
		height: 60upx;
		line-height: 60upx;
		padding: 5upx 30upx;
		border-radius: 60upx;
		text-align: center;
		font-size: 30upx;
		font-weight: bold;
	}

	.func view:nth-child(1) {
		border: 2upx solid #CCCCCC;
		color: #FC4B2D;
	}

	.func view:nth-child(2) {
		background-color: black;
		color: white;
	}

	.func view:nth-child(3) {
		background-color: #FC4B2D;
		color: white;
	}

	.my-function {
		margin-top: 60upx;
		/* margin-bottom: 200upx; */
	}

	.left-image {
		width: 50upx;
		height: 50upx;
	}
</style>
<style>
	.my-top {
		width: 100%;
		height: 290upx;
		overflow: hidden;
		background-image: url("../../static/img/header_02.jpg");
		background-repeat: no-repeat;
		background-size: 100% 100%;
		-moz-background-size: 100% 100%;
		background-color: #000000;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 20upx;
		color: white;
	}

	.my-info {
		display: flex;
		flex-direction: row;
		height: 100upx;
		align-items: center;
	}

	.avator {
		width: 80upx;
		height: 80upx;

	}

	.avator image {
		width: 80upx;
		height: 80upx;
		border-radius: 40upx;
	}

	.qrcode {
		height: 80upx;
		width: 40upx;
		margin: 10upx;
	}

	.qrcode image {
		height: 30upx;
		width: 30upx;
	}

	.user-info {
		margin-left: 20upx;
	}

	/* .user-info view:first-child {
	font-size: 30upx;
	height: 40upx;
}
.user-info view:last-child {
	height: 30upx;
	vertical-align: middle;
} */

	.person-info {
		margin-right: 40upx;
		height: 80upx;
		line-height: 80upx;
	}
</style>
