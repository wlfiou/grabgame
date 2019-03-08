<template>
	<view class="page">
		<!-- #ifndef MP-WEIXIN -->
		<!-- 固定在顶部的导航栏 -->
		<uni-nav-bar fixed="true" backgroundColor="#fc4b2d" left-icon="back" @click-left="back"
		 color="#ffffff" shadow="false" title="红包">
		</uni-nav-bar>
		<!-- 使用非原生导航栏后需要在页面顶部占位 -->
		<!-- #ifdef APP-PLUS -->
		<view style="height:64px;"></view>
		<!-- #endif -->
		<!-- #ifdef H5 -->
		<view style="height:44px;"></view>
		<!-- #endif -->
		<!-- #endif -->
		<view class="ray-top-view1"></view>
		<view class="ray-top-view2"></view>
		<view class="top">
			<view class="avator">
				<image :src="avator"
				 mode="aspectFill"></image>
			</view>
			<view class="text">
				来自{{user_name}}的红包
			</view>
			<view class="text">
				{{info.amount}}元
			</view> 
			<view class="list-header">
				{{info.rednum}}个红包共{{info.amount}}元
			</view>
		</view>
		<view class="uni-list">
			<view class="uni-list-cell" v-for="(item,index) in list" :key="index">
				<view class="uni-list-cell-navigate t-cell">
					<view class="list-avator">
						<image :src="item.avatar" mode="aspectFill"></image>
					</view>
					<view class="cell-textinfo">
						<view>
							{{item.user_name}}
						</view>
						<view>
							{{item.add_time}}
						</view>
					</view>
					<view class="cell-right">
						<view v-if="item.isburying" class="list-avator">
							<image src="../../../static/img/bomb_list_image.png" mode="aspectFill"></image>
						</view>
						<view v-if="list.length == info.rednum">
							{{item.value}}
						</view>
					</view>

				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from '../../../components/uni-nav-bar.vue';
	var callindex ,roomid;
	export default {
		data() {
			return {
				info: {
					
				},
				list: [
				]
			};
		},
		computed:{
			user_name(){
				
					return this.$utils.defaultPlusXing(this.info.user_name);
				
				
			},
			avator() {
				return this.user.avatar!=null && this.user.avatar.length > 0 ? this.user.avatar :
					'http://103.224.249.197:8012/upload/avatar/000_avatar_big.jpg?user=00'
			},
			user(){
				return this.$store.getters.getUserInfo
			}
		},
		onLoad: function(options) {
			roomid = options.roomid;
			callindex = options.callindex;
			var hbid = options.hbid;
			var data = {
				roomid: roomid,
				hbid: hbid,
			}
			this.$utils.defalsePluginRequest('pl_hb_list', callindex, data,
				res => {
					// suc
					if (res.code == 0) {
						console.log(res);
						this.info = res.data.info;
						var listtemp = res.data.list;
						for (let i = 0; i < listtemp.length; i++) {
							listtemp[i].user_name = this.$utils.defaultPlusXing(listtemp[i].user_name)
						}
						this.list = listtemp;
					}
				},
				res => {
					// fail
				},
				res => {
					// com
				}
			)
		},
		methods: {
			back: function() {
				uni.navigateBack({
					delta: 1
				});
			},
// 			showMore: function() {
// 				uni.navigateTo({
// 					url: './myRedRecords/myRedRecords?callindex='+callindex+'&roomid='+roomid,
// 					success: res => {},
// 					fail: () => {},
// 					complete: () => {}
// 				});
// 			}
		},
		components: {
			uniNavBar
		}
	}
</script>
<style>
	.ray-top-view1{
		height: 30upx;
		background-color:#fc4b2d;
	}
	.ray-top-view2{
		height: 100upx;
		background-color:#fc4b2d;
		border-radius: 50upx;
		margin-top:-50upx 
	}
	.list-avator {
		height: 80upx;
	}

	.list-avator image {
		width: 80upx;
		height: 80upx;
		border-radius: 40upx;
	}

	.t-cell {
		height: 140upx;
		font-weight: bold;
		justify-content: flex-start;
	}

	.cell-textinfo {
		margin-left: 10upx;
		height: 80upx;
		line-height: 80upx;

	}

	.cell-textinfo view:first-child {
		font-size: 40upx;
		height: 40upx;
		line-height: 40upx;
		margin-bottom: 10upx;
        color: #999999;
	}

	.cell-textinfo view:last-child {
		font-size: 20upx;
		height: 40upx;
		color: #999999;
	}

	.cell-right {
		width: 150upx;
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		flex-grow: 3;
	}

	.cell-right view:first-child {
		margin-right: 20upx;
	}

	.cell-right view:last-child {
		line-height: 80upx;
		color: #FC4B2D;
	}
</style>
<style>
	.top {
		display: flex;
		flex-direction: column;
	}

	.avator {
		margin-top: -40upx;
		height: 80upx;
		text-align: center;
	}

	.avator image {
		width: 80upx;
		height: 80upx;
		border-radius: 40upx;
	}

	.top .text {
		text-align: center;
		font-weight: bold;
	}

	.list-header {
		font-weight: bold;
		color: #999999;
		border-bottom-color: 1upx solid #999999;
		background-color: #FFFFFF;
		padding-left: 20upx;
	}
</style>
