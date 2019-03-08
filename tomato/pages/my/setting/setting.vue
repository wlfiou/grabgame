<template>
	<view class="page uni-page-body t-common-font wallet">
		<view class="uni-card">
			<view class="uni-list">
				<view class="uni-list-cell" hover-class="uni-list-cell-hover" @click="security">
					<view class="uni-list-cell-navigate uni-navigate-right">
						<p>账号安全</p>
					</view>
				</view>
				<!-- <view class="uni-list-cell" hover-class="uni-list-cell-hover" @click="notify">
					<view class="uni-list-cell-navigate uni-navigate-right">
						<p>新消息通知</p>
					</view>
				</view> -->
				<view class="uni-list-cell" hover-class="uni-list-cell-hover">
					<view class="uni-list-cell-navigate">
						<p>当前版本</p>
						<p>V1.0</p>
					</view>
				</view>
				<!-- <view class="uni-list-cell" hover-class="uni-list-cell-hover">
					<view class="uni-list-cell-navigate">
						<p class="orgColor">清理缓存</p>
						<p>1.32M</p>
					</view>
				</view>
				<view class="uni-list-cell uni-list-cell-last" hover-class="uni-list-cell-hover">
					<view class="uni-list-cell-navigate">
						<p class="orgColor">清理所有聊天记录</p>
					</view>
				</view> -->
			</view>
		</view>
		<view class="uni-card" @click="loginOut">
			<view class="uni-list-cell" hover-class="uni-list-cell-hover">
				<view class="uni-list-cell-navigate">
					<p class="uni-center" style="width: 100%;">退出登录</p>
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
		methods: {
			notify() {
				uni.navigateTo({
					url: './notify',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			security() {
				uni.navigateTo({
					url: './security/security',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			loginOut() {
				
				uni.reLaunch({
					url: '../../login/login/login',
					success: res => {
						this.$store.commit("logout");
					},
					fail: () => {},
					complete: () => {}
				});
			}
			
		}
	}
</script>

<style>
	.orgColor {
		color: #fc3a39;
	}

	.t-common-font {
		font-weight: bold;
	}
</style>
