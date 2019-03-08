<template>
	<view class="page uni-page-body t-common-font wallet">
		<view class="uni-card">
			<view class="uni-list">
				<view class="uni-list-cell" hover-class="uni-list-cell-hover">
					<view class="uni-list-cell-navigate">
						<p>接受新消息通知</p>
						<switch checked color="#54D36A"/>
					</view>
				</view>
				<view class="uni-list-cell" hover-class="uni-list-cell-hover">
					<view class="uni-list-cell-navigate">
						<p>通知显示消息详情</p>
						<switch checked color="#54D36A"/>
					</view>
				</view>
				<view class="uni-list-cell" hover-class="uni-list-cell-hover">
					<view class="uni-list-cell-navigate">
						<p>声音</p>
						<switch checked  color="#54D36A"/>
					</view>
				</view>
				<view class="uni-list-cell uni-list-cell-last" hover-class="uni-list-cell-hover">
					<view class="uni-list-cell-navigate">
						<p>震动</p>
						<switch checked color="#54D36A"/>
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
		methods: {

		}
	}
</script>

<style>
	.t-common-font {
		font-weight: bold;
	}
</style>
