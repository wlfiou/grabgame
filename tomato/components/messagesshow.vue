<template>
	<view class="m-item m-all" :id="'message'+id">
		<view class="m-left">
			<image class="head_icon" :src="message.avatar" v-if="message.role=='home'"></image>
		</view>
		<view class="m-content m-content-one">
			<view class="m-content-name" :class="{'m-content-name-right':message.role=='customer'}" >
				{{username}} 
			</view>
			<view class="m-content-head" :class="{'m-content-head-right':message.role=='customer'}" @tap="open">
				<view :class="'m-content-head-'+message.role">
					<view class="content-top">
						<view class="content-top-left">
							<image src="../../../static/img/ic_chats_redpsmall_icon.png" ></image>
						</view>
						<view class="content-top-right">
						    <view>恭喜发财 大吉大利</view>
							<view>{{message.redamount}}-{{message.buryingpoint}}</view>
						</view>
					</view>
					<view class="content-bottom">
						金辉红包
					</view>
				</view>
			</view>
		</view>
		<view class="m-right">
			<image class="head_icon" :src="message.avatar" v-if="message.role=='customer'"></image>
		</view>
		
	</view>
</template>

<script>
	export default {
		name:"message-show",
		data() {
			return {}
		},
		props: ['message', 'id'],
		computed:{
			username(){
				return this.$utils.defaultPlusXing(this.message.user_name)
			}
		},
		methods:{
			open:function(){
				 var that = this;
				this.$emit('open-redEnvelopes', that.message);
			}
		}
	}
</script>
<style>
	.content-top{
		display: flex;
		flex-direction: row;
	}
	.content-top-left{
		margin: 20upx;
		width: 50upx;
		height: 70upx;
	}
	.content-top-left image{
		width: 100%;
		height: 100%;
	}
	.content-top-right{
		
		font-size: 25upx;
		padding: 10upx;
	}
	.content-bottom{
		background-color: white;
		color: #999999;
		font-size: 20upx;
		border-bottom-left-radius: 12upx;
		border-bottom-right-radius: 12upx;
		padding-left: 10upx;
		height: 50upx;
		line-height: 50upx;
	}
</style>
<style>
	/*****
	下面空样式为了解决计算
	显示消息页面的整体高度
	*****/
	.m-all{
		
	}
	.m-content-one{
		
	}
    .m-item {
		display: flex;
		flex-direction: row;
		margin-top: 20upx;
		/* margin-bottom: 20upx; */
	}
	.m-left {
		display: flex;
		width: 120upx;
		justify-content: center;
		align-items: flex-start;
		border-radius: 60upx;
	}
	.m-content {
		display: flex;
		flex: 1;
		flex-direction: column;
		justify-content: center;
		word-break: break-all;
	}
	.m-right {
		display: flex;
		width: 120upx;
		justify-content: center;
		align-items: flex-start;
	}
	.head_icon {
		width: 80upx;
		height: 80upx;
		border-radius: 40upx;
	}
	.m-content-head {
		position: relative;
	}
	.m-content-head-right {
		display: flex;
		justify-content: flex-end;
	}
	.m-content-head-home {
		text-align: left;
		background: #F89439;
		width: 400upx;
		height: 150upx;
 		/* border: 1px #F89439 solid; */
		border-radius: 15upx;
		/* padding: 20upx; */
		color: white;
		height: 150upx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.m-content-head-home:before {
		border: 15upx solid transparent;
		border-right: 15upx solid #F89439;
		top: 20upx;
		left: -26upx;
		width: 0;
		height: 0;
		position: absolute;
		content: ' '
	}
	.m-content-head-customer {
		/* border: 1upx white solid; */
		background: #F89439;
		border-radius: 15upx;
		color: white;
		width: 400upx;
		height: 150upx;
		/* padding: 20upx; */
	}
	.m-content-head-customer:after {
		border: 15upx solid transparent;
		border-left: 15upx solid #F89439;
		top: 20upx;
		right: -26upx;
		width: 0;
		height: 0;
		position: absolute;
		content: ' '
	}
	.m-content-name{
		color: #999999;
		font-size: 30upx;
		
	}
	.m-content-name-right{
		text-align: right;
	}
</style>
