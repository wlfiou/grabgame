<template>
	<view class="page uni-page-body t-common-font wallet">
		<view class="uni-card">
			<view class="uni-list">
				<view class="uni-list-cell" hover-class="uni-list-cell-hover" @click="phoneNum">
					<view class="uni-list-cell-navigate uni-navigate-right">
						<p>手机号</p>
					</view>
				</view>
				<view class="uni-list-cell" hover-class="uni-list-cell-hover" @click="loginPwd">
					<view class="uni-list-cell-navigate uni-navigate-right">
						<p>登录密码</p>
					</view>
				</view>
				<view class="uni-list-cell" hover-class="uni-list-cell-hover" @click="payPwd">
					<view class="uni-list-cell-navigate uni-navigate-right">
						<p>支付密码</p>
					</view>
				</view>
				<view class="uni-list-cell uni-list-cell-last" hover-class="uni-list-cell-hover" @click="freepay">
					<view class="uni-list-cell-navigate">
						<p>免密码下注</p>
						<switch :checked="nopassPay" color="#00B26A"/>
					</view>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		computed:{
		    nopassPay(){
				return this.$store.getters.getUserInfo.nopaypwd==0?false:true
			}	
		},
		methods: {
			notify() {
				uni.navigateTo({
					url: './notify',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			phoneNum() {
				uni.navigateTo({
					url: './phoneNum',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			loginPwd() {
				uni.navigateTo({
					url: './loginPwd',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			payPwd() {
				uni.navigateTo({
					url: './payPwd',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			freepay(){
				uni.navigateTo({
					url: './freepay',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
			
		}
	}
</script>

<style>
	.t-common-font {
		font-weight: bold;
	}
</style>
