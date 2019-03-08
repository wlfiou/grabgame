<template>
	<view class="page">
		<view class="uni-form-item uni-column uni-common-mt borderRadi">
			<input class="uni-input" type="number" placeholder="原手机号码" :value="phone"/>
		</view>
		<view class="uni-form-item uni-column uni-common-mt code borderRadi">
			<input v-model="vertrycode" class="uni-input" type="number" placeholder="验证码" />
			<span @click="getCode" :class="{'vertytime':disabled}">{{vertyText}}</span>
		</view>
		<button @tap="update" class="commitBtn uni-common-mt">确 定</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				vertyText: "获取验证码",
				currentTime: 60,
				disabled: false,
				vertrycode:'',
			}
		},
		methods: {
			update:function(){
				var that = this;
				this.$utils.tRequest({
					url: this.$webUrl+'user_pay_nopwd',
					method: 'POST',
					data: {
						code:this.vertrycode ,
						nopaypwd:this.$store.getters.getUserInfo.nopaypwd>0?0:1
					},
					success: res => {
						if(res.code == 0){
							that.$store.dispatch("setNoPayPass", this.$store.getters.getUserInfo.nopaypwd>0?0:1);
						}
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
				if (!this.phone) {
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
				console.log(JSON.stringify(res));
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
	.vertytime {
		color: #999999;
		border-bottom: 0;
	}
</style>
