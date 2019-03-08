<template>
	<!-- v-if="bannerShowSync" -->
	<view >
		<view class="uni-banner">
			<view class="p-title">支付</view>
			<view class="p-content">{{amount}}元</view>
			<view class="p-input">
				<input type="password" value="" placeholder="输入支付密码" v-model="inputValue"/>
			</view>
			<view class="p-nopass">
				<text>免密支付</text>
				<switch :checked="isNotNeedPass" @change="changep" color="#FC4B2D"/>
			</view>
			<view class="p-button">
				<button @tap="confirm">确认支付</button>
				<button @tap="cancel">取消</button>
			</view>
		</view>
		<view class="uni-mask" @touchmove.stop.prevent="moveHandle"></view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex';
	export default {
		name:"password-authentication",
		data() {
			return {
				inputValue:'',
				bannerShowSync:this.bannerShow,
			};
		},
		computed:{
				...mapGetters([
					'getUserInfo'
					// ...
				]),
				isNotNeedPass(){
					return this.getUserInfo.nopaypwd==0?false:true;
				}
		},
		props:{
			bannerShow:{
				type:Boolean,
				default:false
			},
			amount:{
				type:String,
				default:'0.0'
			}
			
		},
			

		methods:{
			moveHandle: function(){},
			changep:function(){
				this.$emit('toNoPayPassSet');
			},
			closeBanner:function()
			{
				var that = this;
				that.inputValue = '';
				this.$emit('send-cancel',{
					show: false
				});
				
			},
			confirm:function(){
				var that = this;
					//点击发送按钮时，通知父组件用户输入的内容
					this.$emit('send-pass', {
						content: that.inputValue.trim(),
						show:false,
						isNotNeedPass:that.isNotNeedPass
						
					});
					that.inputValue = '';
			},
			cancel:function(){
				var that = this;
				// that.bannerShow = false;
				that.inputValue = '';
				that.$emit('send-cancel',{
					show: false
				})
			}
		}
	}
</script>

<style>
	.p-title{
		text-align: center;
		font-size: 40upx;
		color: #666666;
		border-bottom: 1upx dashed #f0f0f0;
		margin: 0 30upx;
	}
	.p-content{
		text-align: center;
		font-size: 35upx;
		color: #666666;
	}
	.p-input{
		border: 1upx solid #eeeeee;
		margin: 15upx 20upx;
		height: 80upx;
		line-height: 80upx;
		border-radius: 10upx;
	}
	.p-input input{
		height: 80upx;
		margin: 0upx 10upx;
		
	}
	.p-nopass{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin: 15upx 25upx;
	}
	.p-nopass switch{
		margin-right: 20upx;
		
	}
	.p-button{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin: 15upx;
	}
	.p-button button{
		font-size: 30upx;
		margin: 15upx;
		height: 80upx;
		line-height: 80upx;
		color: #FFFFFF;
		background-color: #999999;
	}
	.p-button button:first-child{
		background-color: #FC4B2D;
		flex-grow: 1;
	}
	.p-button button:last-child{
		flex-grow: 2;
	}
    .uni-mask {
        background: rgba(0, 0, 0, 0.6);
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 998;
    }
	.uni-banner {
		font-weight: 900;
	    width: 70%;
	    position: fixed;
	    left: 50%;
	    top: 50%;
	    background: #FFF;
	    border-radius: 10upx;
	    z-index: 999;
	    transform: translate(-50%, -50%);
	}
</style>
