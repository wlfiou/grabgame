<template>
	<view class="page">
		<view class="uni-form-item uni-column uni-common-mt borderRadi">
			<input class="uni-input" type="number" placeholder="原手机号码" :value="phone"/>
		</view>
		<view class="uni-form-item uni-column uni-common-mt code borderRadi">
			<input v-model="vertrycode" class="uni-input" type="number" placeholder="验证码" />
			<span @click="getCode">{{vertyText}}</span>
		</view>
		<view class="uni-form-item uni-column uni-common-mt borderRadi">
			<view class="with-fun">
				<input v-model="pass" class="uni-input" placeholder="新支付密码" :password="showPassword" />
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
				vertyText: "获取验证码",
				currentTime: 60,
				disabled: false,
				vertrycode:'',
				pass:''
			}
		},
		methods: {
			getCode: function() {
				var that = this;
				this.$utils.tRequest({
					url: this.$webUrl + "user_verify_smscode",
					data: {
						mobile: this.phone
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
						that.disabled = true
						currentTime--;
			
						that.vertyText = currentTime + '秒'
						if (currentTime <= 0) {
							clearInterval(that.interval)
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
			update:function(){
				
				this.$utils.tRequest({
					url: this.$webUrl+'user_paypassword_edit',
					method: 'POST',
					data: {
						code:this.vertrycode ,
						password:this.pass
					},
					success: res => {
						if(res.code == 0){
							this.$store.dispatch("setPayPass",this.pass)
						}
						uni.showToast({
							title: res.msg,
							mask: false,
							duration: 1500,
							icon:'none'
						});
					},
					fail: () => {},
					complete: () => {}
				})
			}
		},
		computed: {
			phone(){
				return this.$store.getters.getUserInfo.mobile
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
	
	.uni-form-item {
		position: relative;
		background: #fff;
	}

	.borderRadi {
		border-radius: 10upx;
	}
	
	.code{
		position: relative;
	}
	
	.code span{
		position: absolute;
		right: 18upx;
		top: 26upx;
		z-index: 2;
		color: #fc3a39;
		font-size: 14px;
		line-height: 1.5;
		border-bottom: 1px solid #fc3a39;
	}
</style>
