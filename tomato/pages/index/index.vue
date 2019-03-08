<template>
  <view>
	<view class="content uni-page-body">
		
		<view class="uni-swiper-msg">
			<view class="uni-swiper-msg-icon">
				<image src="../../static/img/tongzhi.png" mode="widthFix"></image>
			</view>
			<swiper vertical="true" autoplay="true" circular="true" interval="5000">
				<swiper-item v-for="(item, index) in notice" :key="index">
					<navigator url="../ray/notify/notify">{{item.title}}</navigator>
				</swiper-item>
			</swiper>
		</view>
		
        <swiper class="top_swiper" autoplay="false" indicator-dots="true" indicator-active-color="#d81e06" indicator-color="#ffffff"  interval="2000" circular="true">
			<swiper-item  class="scale_swiperitem" v-for="(item,index) in banners" :key="index" @tap="click">
				<image  :src="item.imgurl" mode="scaleToFill"></image>
			</swiper-item>
		</swiper>
		</view>
		<view class="list">
			<block v-for="(item,index) in applist" :key="index">
				<view class="list-item" :style="{backgroundImage:'url('+item.imgurl+')'}" :data-callindex="item.callindex" @tap="nodata">
					<view v-if="item.callindex != ''">{{item.title}}</view>
					<view :data-index="index" v-if="item.callindex != ''" @tap="gameinfo">查看游戏规则>></view>
					<view :data-index="index" v-if="item.callindex != ''" @tap="toplay">开始游戏</view>
				</view>
			</block>
		</view>
	
  </view>
</template>

<script>
	
	
	export default {
		data() {
			return {
				title: 'Hello',
				notice:[],
				banners:[]
			}
		},
		computed:{
			applist(){
				return this.$store.getters.getGameInfoList;
			}
		},
		onLoad() {
			this.$utils.tRequest({
				url: this.$webUrl+'home_all',
				method: 'GET',
				data: {
					 pagesize:10,
					 page:1
				},
				success: res => {
					if(res.code == 0){
					    this.$store.dispatch("setGameInfoList",res.data.applist);
						this.banners = res.data.banner;
						this.notice = res.data.notice;
					}else{ 
						uni.showToast({
							title: res.msg,
							mask: false,
							duration: 1500,
							icon:'none'
						});
					}
				},
				fail: () => {},
				complete: () => {}
			});
		},
		onNavigationBarButtonTap:function(e){
			uni.navigateTo({
				url: '../ray/notify/notify',
				success: res => {},
				fail: () => {},
				complete: () => {}
			});
		},
		methods: {
			nodata:function(e){
				var value = e.currentTarget.dataset.callindex;
				console.log(value)
				if(value == ""){
					uni.showModal({
						title: '提示',
						content: '开发中。。敬请期待',
						showCancel: false,
						cancelText: '',
						confirmText: '知道了',
						success: res => {},
						fail: () => {},
						complete: () => {}
					});
				}
				
			},
           toplay:function(e){
			   var index = e.currentTarget.dataset.index;
			   uni.navigateTo({
			   	url: '../ray/rayGameList/rayGameList?gameIndex='+index,
			   	success: res => {},
			   	fail: () => {},
			   	complete: () => {}
			   });
			   
		   },
		   gameinfo:function(e){
			   var index = e.currentTarget.dataset.index;
			   console.log("index = "+index);
			   uni.navigateTo({
			   	url: '../ray/gameInfo/gameInfo?gameIndex='+index,
			   	success: res => {},
			   	fail: () => {},
			   	complete: () => {}
			   });
		   },
		   click:function(){
			  
		   }
		}
	}
</script>

<style>
	.content {
		text-align: center;
		height: 400upx;
		
	}
    .top_swiper{
		flex-wrap:nowrap; display:flex;
		background-color: #f5f5f5;
		/* margin-top: 20upx; */
	}
	.scale_swiperitem
	{
		width:690upx;
		height: 284upx;
	}
	.scale_swiperitem image{
		margin: 30upx;
		width:690upx;
		height: 284upx;
		/* padding: 30upx; */
		border-radius: 20upx;
		box-shadow: 5px 5px 20px #aaaaaa;
		overflow: hidden;
	}
	.uni-swiper-msg{width:100%;padding:0 12upx; flex-wrap:nowrap; display:flex;}
	.uni-swiper-msg-icon{width:40upx; margin-right:20upx;margin-top:10upx;}
	.uni-swiper-msg-icon image{width:100%; flex-shrink:0;}
	.uni-swiper-msg swiper{width:100%; height:50upx;margin-top:5upx;}
	.uni-swiper-msg swiper-item{line-height:50upx;text-align: left;color:#d81e06;font-size: 30upx;}
	.list{
		margin-top: 50upx;
		width: 750upx;
		background-color: #ffffff;
	}
	.list .list-item{
		margin:20upx 0upx;
		/* border-radius: 20upx;
		box -shadow: 5px 5px 20px #aaaaaa;*/
		width: 100%;
		height: 293upx;
		overflow: hidden;
		/* background-image:url("../../static/img/ic_game_bg.png"); */
		background-repeat:no-repeat;
		background-size:100% 100%;
		-moz-background-size:100% 100%;
		
		
	}
	.list .list-item view{
		color: #FFFFFF;
		font-family:Cursive;
		margin-left: 40upx;
		margin-top: 20upx;
	}
	.list .list-item view:nth-child(1){
		font-weight: bold;
	    font-size: 40upx; 
	}
	.list .list-item view:nth-child(2){
		
	    font-size: 30upx; 
	}
	.list .list-item view:nth-child(3){
		font-weight: bold;
		background: #fce854;
		color: #D81E06;
		width: 220upx;
		height: 60upx;
		line-height: 60upx;
		text-align: center;
		font-size: 30upx; 
		border-radius: 10upx;
		
	     
	}
</style>
