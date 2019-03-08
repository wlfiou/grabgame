<template>
	<view class="t-common-font">
		<view class="list-avator">
			<image src="../../../../static/img/640-2.jpeg" mode="aspectFill"></image>
			<text>{{nickName}}一共获得了{{totalcount}}个红包，共计{{totalamount}}元</text>
		</view>
		<view class="uni-list">
			<view class="uni-list-cell" v-for="(item,index) in list" :key="index">
				<view class="uni-list-cell-navigate">
                    <view style="color:#555555;flex: 0.9;">{{item.add_time}}</view>
					<view v-if="item.isburying == 1" class="list-boom">
						<image src="../../../../static/img/bomb_list_image.png" mode="aspectFill"></image>
					</view>
					<view style="color: #D81E06;font-weight: bold;font-size: 35upx;">{{item.value}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	var page = 1,
		pagesize = 10,
		callindex 
	export default {
		data() {
			return {
				totalcount: 0,
				totalamount:0,
				list: [],
				gameInfo: null
			};
		},
		onReachBottom() {
            var _self = this;
			if (timer != null) {
				clearTimeout(timer);
			}
			timer = setTimeout(function() {
				_self.load(true);
			}, 1000);
		},
		onLoad(options) {
			this.gameInfo = this.$store.getters.getGameInfoList[0];
			callindex = this.gameInfo.callindex;
			var roomid = options.roomid;
			this.load(false)
		},
		computed: {
			phoneByPass() {
				return this.$utils.defaultPlusXing(this.userInfo.username)
			},
			userInfo() {
				return this.$store.getters.getUserInfo
			},
			nickName() {
				return this.userInfo.nick_name.length > 0 ? this.userInfo.nick_name : this.phoneByPass;
			},
		},
		methods: {
			load(ismore){
				var that = this;
				if (ismore) {
					page++;
				} else {
					that.list = [];
				}
				var data = {
					page: page,
					pagesize: pagesize
				};
				
				this.$utils.defalsePluginRequest('pl_hb_my_list', callindex, data,
					res => {
						// suc
						if (res.code == 0) {
							this.totalcount = res.data.totalcount;
							this.totalamount = res.data.totalamount;
							if (res.data.list.length > 0) {
								that.list = that.list.concat(res.data.list);
							} else {
								if (ismore) {
									page--
								}
							}
							
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
		},
	}
</script>

<style>
	.list-boom {
		height: 60upx;
	}
	
	.list-boom image {
		width: 60upx;
		height: 60upx;
		border-radius: 30upx;
	}
	.list-avator {
		display: flex;
		flex-direction: row;
		height: 80upx;
		background-color: #FC4B2D;
		line-height: 80upx;
		align-items: center;
	}

	.list-avator image {
		width: 60upx;
		height: 60upx;
		border-radius: 30upx;
		margin-left: 20upx;
	}

	.list-avator text {
		color: #FFFFFF;
		height: 80upx;
		line-height: 80upx;
		font-weight: bold;
		font-size: 30upx;
		margin-left: 20upx;

	}
</style>
