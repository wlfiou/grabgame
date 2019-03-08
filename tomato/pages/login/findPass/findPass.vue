<template>
	<view class="page t-common-font">
		<view class="container">
			<view class="top">
				<image src="../../../static/img/ic_notifaction_icon.png" mode="aspectFill"></image>
			</view>
			<view class="username" :class="{clickfocus:focus===0}">
				<text>手机号</text>
				<input :focus="userFoucs" type="text" @input="getPhoneNumber" placeholder="请输入手机号" placeholder-class="uni-placeholder" />
			</view>
			<view class="username" :class="{clickfocus:focus===1}">
				<text>验证码</text>
				<input :focus="vertyFoucs" type="text" @input="getInputCode" placeholder="请输入验证码" placeholder-class="uni-placeholder" />
				<view class="verty" @tap="getVertryCode" :class="{'vertytime':disabled}">
					{{vertyText}}
				</view>
			</view>
			<view class="username" :class="{clickfocus:focus===2}">
				<text>新密码</text>
				<input :focus="passFoucs" :type="inputType" @input="getPassWord" placeholder="请设置6-18位数字加字母的密码" placeholder-class="uni-placeholder" />
				<view class="icon" @tap="seePass">
					<image :src="imageurl"></image>
				</view>
			</view>
			<view class="login" @tap="confirm">
				<button type="primary">确定</button>
			</view>
		</view>
	</view>
</template>

<script>
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
				showcansee: false,
				focus:0
			};
		},
		computed: {
			correctPhone() {
				return this.$utils.checkMobile(this.phoneNumber);
			},
			imageurl() {
				return this.showcansee ? '../../../static/img/viewicon.png' : '../../../static/img/viewnoicon.png'
			},
			inputType() {
				return this.showcansee ? 'text' : 'password'
			}

		},
		methods: {
			userFoucs:function(){
				this.focus = 0
			},
			vertyFoucs:function(){
				this.focus = 1
			},
			passFoucs:function(){
				this.focus = 2
			},
			confirm: function() {
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
				if (this.password == '') {
					uni.showToast({
						title: '请输入密码',
						mask: false,
						duration: 1500,
						icon:'none'
					});
					return;
				}
				this.$utils.tRequest({
					url: this.$webUrl + 'user_getpassword',
					method: 'GET',
					data: {
						code: this.vertyCode,
						mobile: this.phoneNumber,
						password: this.password
					},
					success: res => {
						console.log(res);
						uni.showToast({
							title: res.msg,
							mask: false,
							duration: 1500,
							icon:'none'
						});
					},
					fail: () => {},
					complete: () => {}
				});
			},
			seePass: function() {
				this.showcansee = !this.showcansee
			},
			getPhoneNumber: function(e) {
				this.phoneNumber = e.target.value;
				if (this.correctPhone) {
					this.piccode = this.$imageUrl + 'verify';
				}
			},
			getInputCode: function(e) {
				this.vertyCode = e.target.value;
			},
			getPassWord: function(e) {
				this.password = e.target.value;
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
		flex-grow: 0.8;
	}

	.password {
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
</style>
