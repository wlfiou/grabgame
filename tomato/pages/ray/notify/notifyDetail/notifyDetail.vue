<template>
	<view class="page t-common-font">
		<view class="uni-list-cell">
			<view class="uni-list-cell-navigate t-cell" @tap="toDetail">
				<view>通知:通知一个小通知哈哈哈通知一个小通知哈哈哈通知一个小通知哈哈哈</view>
				<view>2018-09-09 10：09</view>
			</view>
		</view>
		<view style="font-size: 40upx;margin: 20upx;font-weight: bold;">
			通知:通知一个小通知哈哈哈通知一个小通知哈哈哈通知一个小通知哈哈哈
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		onLoad:function(){
			
		}
	}
</script>

<style>
.t-cell{
	flex-direction: column;
	font-weight: bold;
	align-items:flex-start;
	margin-right: 30upx;
	background-color: white;
}
.t-cell view:first-child{
	font-size: 40upx;
	overflow: hidden; 
	white-space: nowrap; 
	text-overflow: ellipsis;
	
}
.t-cell view:last-child{
	width: 100%;
	line-height: 30upx;
	font-size: 26upx;
	color: #8f8f94;
}
</style>
