<template>
	<view>
		<view class="uni-banner" style="background:#FFFFFF;" v-if="bannerShow" @tap="click">
		    <view>
		        <image src=imageUrl style="width:100%;" mode="widthFix"></image>
		    </view>
		    <view style="padding:50upx 0; padding-bottom:68upx;">
		        <text>{{text}}</text>
		    </view>
		</view>
		<view class="uni-mask" v-if="bannerShow" @tap="closeBanner"></view>
	</view>
</template>

<script>
	export default {
		name:"alert-pic",
		data() {
			return {
				
			};
		},
		onLoad() {
			
		},
		props:{
			
			imageUrl:{
				type: String,
				default: ""
			},
			text:{
				type: String,
				default: ""
			},
			bannerShow:{
				type: Boolean,
				default: true
			}
		},
		methods:{
			
			click:function(){
				this.$emit("clickPic");
			},
			closeBanner:function(){
				var that = this;
				that.bannerShow = false;
			}
		}
	}
</script>

<style>
    .uni-mask {
        background: rgba(0, 0, 0, 0.6);
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0;
        top: 100;
        z-index: 1;
    }

    .uni-banner {
        width: 70%;
        position: fixed;
        left: 50%;
        top: 50%;
        background: #FFF;
        border-radius: 10upx;
        z-index: 99;
        transform: translate(-50%, -50%);
    }
</style>
