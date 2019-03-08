<template>
	<view class="t-common-font m-all">
		<view class="rm-content m-content-one">
			<image src="../../../static/img/ic_chats_redpsmall_icon.png" mode="aspectFill"></image>
			<text>恭喜{{username}}中奖，奖励{{message.value}}元</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"result-message",
		data() {
			return {
				
			};
		},
		props:['message','id'],
		computed:{
			username(){
				return this.$utils.defaultPlusXing(this.message.user_name)
			}
		}
	}
</script>

<style>
	/*****
	下面空样式为了解决计算
	显示消息页面的整体高度
	*****/
	.m-all{
		
	}
	.m-content-one{
		
	}
.rm-content{
	color: #000000;
	font-size: 30upx;
	display: flex;
	flex-direction: row;
	background: #BEBEBE;
	margin: 20upx 120upx 20upx 120upx;
	height: 60upx;
	border-radius: 30upx;
	justify-content: flex-start;
	align-items: center;
}
.rm-content image{
	margin-left: 20upx;
	height: 50upx;
	width: 30upx;
}

</style>
