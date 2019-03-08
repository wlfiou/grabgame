<template>
	<view class="page t-common-font">
		<view class="addCard uni-common-mt" @click="addCard">
			<uni-icon type="plusempty" size="28" color="#FEDA39" style="font-weight: bold;"></uni-icon>添加银行卡
		</view>
		<view class="content uni-common-mt">
			<view class="alipay uni-common-mt" v-for="(item, index) in loadlist" :key="index" @click="changeAccount(index)">
				<view class="uni-title">银行卡号</view>
				<p>{{item.banknumber}}</p>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcon from "@/components/uni-icon.vue";
	export default {
		data() {
			return {
				list: [],
				active: false,
				delta: 1,
				changeCardid: 0,
				backpages: false
			};
		},
		onLoad(e) {
			if (+e.changeCardid) {
				this.changeCardid = e.changeCardid;
				this.active = true; //控制支付宝账号列表可否点击状态 
			}
			e.addid ? this.delta = 2 : null;
			e.backpages === 'true' ? this.backpages = true : null;
		},
		onBackPress(options) {
			if (options.from === 'navigateBack') {
				return false;
			}
			this.back();
			return true;
		},
		methods: {
			back() {
				if (this.changeCardid) {
					uni.navigateBack({
						delta: this.delta
					});
					return false;
				}
				uni.reLaunch({
					url: '../my'
				})
			},
			addCard: function() {
				uni.navigateTo({
					url: '../accountForm/accountForm?pid=1&changeCardid=' + this.changeCardid,
					success: res => {}
				});
			},
			changeAccount(ind) {
				var that = this;
				if (this.active) {
					this.$store.commit('changeBank', ind);
					uni.showToast({
						title: '更换成功',
						mask: false,
						duration: 1500,
						success: res => {
							that.changeCardid && that.backpages === 'true' ? that.delta = 2 : null;
							setTimeout(function() {
								uni.navigateBack({
									delta: that.delta
								});
							}, 500);
						}
					});
				}

			}
		},
		computed: {
			loadlist() {
				var that = this;
				that.list = this.$store.getters.getBankList;
				return that.list;
			}
		},
		components: {
			uniIcon
		}
	}
</script>

<style>
	.t-common-font {
		font-weight: bold;
		padding: 0upx 25upx;
	}

	.addCard {
		padding: 20upx 0upx;
		background: #fff;
		text-align: center;
		border: 1px solid #BEBEBE;
		border-radius: 15upx;
		font-size: 16px;
	}

	.alipay {
		background: #fc3a39;
		border-top-right-radius: 20upx;
		border-top-left-radius: 20upx;
		color: #fff;
		padding: 15upx 25upx;
		background: linear-gradient(to left, rgba(254, 75, 32, 0.4), rgba(254, 75, 32, 1))
	}

	.uni-title {
		font-size: 14px;
	}
	
	uni-page {
		height: auto;
	}
	
	uni-page-head~uni-page-wrapper{height: auto;}
</style>
