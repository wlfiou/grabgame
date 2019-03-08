<template>
	<view class="page t-common-font">
		<view class="container">
			<view class="top">
				<image src="../../../static/img/ic_notifaction_icon.png" mode="aspectFill"></image>
			</view>
			<view class="username" :class="{clickfocus:focus === 0}">
				<text>手机号</text>
				<input @focus="phoneFocus" type="text" @input="getPhoneNumber" placeholder="请输入手机号" placeholder-class="uni-placeholder" />
			</view>
			<view class="username" :class="{clickfocus:focus === 1}">
				<text>图形验证</text>
				<input @focus="vertyPicFocus" type="text" v-model="xcode" placeholder="请输入推荐码" placeholder-class="uni-placeholder" />
			    <image :src="piccode" mode="aspectFit" class="pic-image" @tap="clickPicVerify"></image>
			</view>
			<view class="username" :class="{clickfocus:focus === 2}">
				<text>验证码</text>
				<input @focus="vertyCodeFocus" type="password" @input="getInputCode" placeholder="请输入验证码" placeholder-class="uni-placeholder" />
				<view class="verty" @tap="getVertryCode" :class="{'vertytime':disabled}">
					{{vertyText}} 
				</view>
			</view>
			<view class="login">
				<button type="primary" @tap="login">登录</button>
				<view @tap="toPassLogin" style="margin-top: 20upx; text-align: center;color: #F76260;">
					密码登录
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// 组件命名严格按照驼峰命名法
	// import vertryPic  from '../../../components/vertrypic.vue';
	export default {
		data() {
			return {
				vertyText: "获取验证码",
				currentTime: 60,
				disabled: false,
				phoneNumber: '',
				password: '',
				vertyCode: '',
				interval: null,
				// seePassImage: '../../../static/img/viewnoicon.png',
				piccode:'',
				xcode:'',
				focus:0
			};
		},
		computed: {
			correctPhone() {
				return this.$utils.checkMobile(this.phoneNumber);
			}
			
		},
		methods:{
			phoneFocus:function(){
				this.focus = 0;
			},
			vertyPicFocus:function(){
				this.focus = 1;
			},
			vertyCodeFocus:function(){
				this.focus = 2;
			},
			login:function(){
				if (!this.correctPhone) {
					uni.showToast({
						title: '请输入正确手机号',
						mask: false,
						duration: 1500,
						icon:'none'
					}); 
					return;
				}
				if (this.vertyCode == '') {
					uni.showToast({
						title: '请输入验证码',
						mask: false,
						duration: 1500,
						icon:'none'
					});
					return;
				}
				this.$utils.tRequest({
					url: this.$webUrl+'user_login_quick',
					method: 'POST',
					data: {
						xcode:this.xcode,
						code:this.vertyCode,
						mobile:this.phoneNumber
					},
					success: res => {
						console.log(res);
						if(res.code == 0){
							uni.switchTab({
								url:"../../index/index"
							}) 
						}
						
					},
					fail: () => {},
					complete: () => {}
				});
			},
			toPassLogin:function(){
				uni.navigateBack({
					delta:1
				})
			},
			getPhoneNumber: function(e) {
				this.phoneNumber = e.target.value;
				if(this.correctPhone){
					this.piccode = this.$imageUrl+'verify';
				}
			},
			getInputCode: function(e) {
				this.vertyCode = e.target.value;
			},
			getPassWord: function(e) {
				this.password = e.target.value;
			},
			clickPicVerify:function(){
				this.piccode = this.$imageUrl+'verify'+'&random='+Date.now()
			},
			getVertryCode: function() {
				var that = this;
				console.log("this.$webUrl==" + this.$webUrl);
				if (!this.correctPhone) {
					uni.showToast({
						title: '请输入正确手机号',
						mask: false,
						duration: 1500,
						icon:'none'
					});
					return;
				}
				this.$utils.tRequest({
					url: this.$webUrl + "user_verify_smscode",
					data: {
						mobile: this.phoneNumber
					},
					success: res => {
						that.AppSendVerifyCode(res);
					},
					fail: () => {
			
					},
					complete: () => {
			
					}
				})
			},
			AppSendVerifyCode(res) {
				console.log(JSON.stringify(res));
				var that = this;
				if (res.code == '0') {
					var currentTime = that.currentTime;
					this.interval = setInterval(function() {
						this.disabled = true
						currentTime--;
			
						that.vertyText = currentTime + '秒'
						if (currentTime <= 0) {
							clearInterval(this.interval)
							that.vertyText = '重新发送',
								that.currentTime = 60,
								that.disabled = false
						}
			
					}, 1000)
				} else {
					uni.showModal({
						title: '提示',
						content: res.msg,
						showCancel: false,
						cancelText: '',
						confirmText: '知道了',
						success: res => {},
						fail: () => {},
						complete: () => {}
					});
				}
			}
		}
	}
</script>

<style>
	.container {
		display: flex;
		flex-direction: column;
	}

	.top {
		padding-top: 100upx;
		text-align: center;
	}

	.top image {
		height: 200upx;
		width: 200upx;
	}

	.username {
		border-radius: 20upx;
		height: 100upx;
		margin: 20upx 40upx;
		background-color: #ffffff;
		display: flex;
		flex-direction: row;
		line-height: 100upx;
		align-items: center;
	}

	.username text {
		margin-left: 10upx;
		font-weight: bold;
		color: #FC4B2D;
		height: 100upx;
	}

	.username input {
		padding-bottom: 15upx;
		padding-top: 19upx;
		padding-left: 10upx;
		font-weight: bold;
		flex-grow: 0.6;
	}

	.clickfocus {
		border: 2upx solid #ca808c;
	}

	.icon {
		height: 40upx;
		width: 40upx;

	}

	.icon image {
		height: 40upx;
		width: 40upx;
	}

	.verty {
		color: #F0AD4E;
		font-weight: bold;
		width: 150upx;
		height: 40upx;
		line-height: 40upx;
		border-bottom: 2upx solid #F0AD4E;
        text-align: center;
	}

	.vertytime {
		color: #999999;
		border-bottom: 0;
	}

	.login {
		margin: 40upx;
		height: 80upx;
	}

	.login button:first-child {
		height: 90upx;
		line-height: 90upx;
		background-color: #F76260;
	}
	.pic-image{
		width: 80px;
		height: 28px;
	}
</style>
