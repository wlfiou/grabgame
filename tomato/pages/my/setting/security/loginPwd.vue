<template>
	<view class="page">
		<view class="topPic uni-center uni-common-mb uni-common-mt">
			<image src="../../../../static/img/ic_notifaction_icon.png" mode="widthFix"></image>
		</view>
		<view class="uni-form-item uni-column borderRadi" :class="{active:shows===1}">
			<span :class="{changeColor:shows===1}">手机号</span>
			<input :value="phone"  class="uni-input" disabled placeholder="请输入手机号码" @focus="phoneNum" @blur="resetBorder"/>
		</view>
		<view class="uni-form-item uni-column uni-common-mt borderRadi" :class="{active:shows===2}">
			<span :class="{changeColor:shows===2}">验证码</span>
			<input v-model="vertrycode" class="uni-input" type="number" placeholder="请输入验证码" @focus="code" @blur="resetBorder"/>
			<p class="getcode" disabled="disabled" @click="getCode" :class="{'vertytime':disabled}">{{vertyText}}</p>
		</view>
		<view class="uni-form-item uni-column uni-common-mt borderRadi" :class="{active:shows===3}">
			<span :class="{changeColor:shows===3}">新密码</span>
			<view class="with-fun">
				<input type="password" v-model="pass" class="uni-input" placeholder="请设置6-18位数字加字母密码" :password="showPassword" @focus="newPwd" @blur="resetBorder"/>
				<view class="uni-icon uni-icon-eye" :class="[!showPassword ? 'uni-active' : '']" @click="changePassword"></view>
			</view>
		</view>
		<button @tap="update" class="commitBtn uni-common-mt">修改</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showPassword: true,
				shows: 0,
				vertyText: "获取验证码",
				currentTime: 60,
				disabled: false,
				mobile:'',
				vertrycode:'',
				pass:''
			}
		},
		methods: {
			update:function(){
				if(!this.$utils.checkPass(this.pass)){
					uni.showToast({
						title: '请填写6位以上密码',
						mask: false,
						duration: 1500,
						icon:'none'
					});
				}
				this.$utils.tRequest({
					url: this.$webUrl+'user_getpassword',
					method: 'POST',
					data: {
						code:this.vertrycode ,
						mobile:this.user.mobile,
						password:this.pass
					},
					success: res => {
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
					},
					fail: () => {},
					complete: () => {}
				})
			},
			getCode: function() {
				var that = this;
				console.log("this.$webUrl==" + this.$webUrl);
				if (!this.$utils.checkMobile(this.user.mobile)) {
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
						mobile: this.user.mobile
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
				var that = this;
				if (res.code == 0) {
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
			},
			changePassword: function() {
				this.showPassword = !this.showPassword;
			},
			phoneNum: function() {
				this.shows = 1;
			},
			code: function () {
				this.shows = 2;
			},
			newPwd: function() {
				this.shows = 3;
			},
			resetBorder: function() {
				this.shows = 0;
			}
		},
		computed: {
          user(){
			  return this.$store.getters.getUserInfo;
		  },
		  phone(){
			  return this.$utils.defaultPlusXing(this.user.mobile)
		  }
		}

	}
</script>

<style>
	.commitBtn {
		background: #fc3a39;
		color: #fff;
	}

	.page {
		padding: 0 20upx;
	}
	
	.page .uni-input{
		padding-left: 120upx;
	}

	.topPic>image {
		width: 250upx;
		height: 250upx;
	}

	.borderRadi {
		border-radius: 15upx;
	}

	.uni-form-item {
		position: relative;
		background: #fff;
		border: 1px solid #eee;
	}
	
	.uni-form-item span{
		position: absolute;
		top: 26upx;
		left: 18upx;
		z-index: 2;
	}

	.getcode {
		position: absolute;
		right: 18upx;
		top: 26upx;
		z-index: 2;
		color: #fc3a39;
		font-size: 14px;
		line-height: 1.5;
		border-bottom: 1px solid #fc3a39;
	}
	
	.active{
		border: 1px solid #fc3a39;
	}
	
	.changeColor{color: #fc3a39;}
	.vertytime {
		color: #999999;
		border-bottom: 0;
	}
</style>
