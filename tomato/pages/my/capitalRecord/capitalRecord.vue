<template>
	<!-- 资金记录页面 -->
	<view class="page t-common-font uni-page-body">

		<view class="my-money uni-common-pl uni-common-pb">
			<p>我的钱包（元）</p>
			<h1>{{money}}</h1>
		</view>
		<view class="uni-common-mt uni-flex uni-row">
			<uni-segmented-control :current="current" :values="items" v-on:clickItem="onClickItem" :styleType="styleType"
			 :activeColor="activeColor" style="flex: 1;"></uni-segmented-control>
		</view>
		<view class="content  uni-center">
			<view>
				<view class="uni-common-mt" v-if="list == undefined || list.length == 0">暂无{{items[current]}}的内容</view>
				<view v-else>
					<view class="uni-list">
						<view class="uni-list-cell" v-for="(item,index) in list" :key="index">
							<block v-if="current==0">
								<view class="uni-list-cell-navigate t-cell">
									<!-- <view class="list-avator">
										<image :src="item.avator" mode="aspectFill"></image>
									</view> -->
									<view class="cell-textinfo">
										<view>
											{{item.user_name}}
										</view>
										<view>
											{{item.add_time}}
										</view>
									</view>
									<view class="cell-right">
										<view>
											{{item.amount}}
										</view>
										<view>
											{{item.statustext}}
										</view>
									</view>
								</view>
							</block>
							<block v-else-if="current ==1">

								<view class="uni-list-cell-navigate t-cell">
									<!-- <view class="list-avator">
										<image :src="item.avator" mode="aspectFill"></image>
									</view> -->
									<view class="cell-textinfo">
										<view>
											{{item.user_name}}
										</view>
										<view>
											{{item.add_time}}
										</view>
									</view>
									<view class="cell-right">
										<view>
											{{item.value}}
										</view>
										<view>
											{{item.statustext}}
										</view>
									</view>
								</view>
							</block>
							<block v-else>

								<view class="uni-list-cell-navigate t-cell">
									<!-- <view class="list-avator">
										<image :src="item.avator" mode="aspectFill"></image>
									</view> -->
									<view class="cell-textinfo">
										<view>
											{{item.user_name}}
										</view>
										<view>
											{{item.add_time}}
										</view>
									</view>
									<view class="cell-right">
										<view>
											{{item.value}}
										</view>
										<view>
											{{item.remark}}
										</view>
									</view>
								</view>
							</block>

						</view>
					</view>
				</view>
			</view>
		</view>
		<view v-if="showNull" class="uni-center showNull">
			<image src="../../../static/img/ic_empty_message.png" mode="widthFix" class="nullPic"></image>
			<p>暂无数据</p>
		</view>
	</view>
</template>

<script>
	import uniNavBar from '../../../components/uni-nav-bar.vue';
	import uniSegmentedControl from '../../../components/uni-segmented-control.vue';
	var pageCount = 10;
	var rechargePage = 1,
		drawPage = 1,
		amountPage = 1,
		timer = null;
	export default {
		data() {
			return {
				items: [
					'充值记录',
					'提现记录',
					'余额记录'
				],
				user_recharge_list: [],
				user_drawrequest_list: [],
				user_amount_list: [],
				current: 0,
				activeColor: '#fc3a39',
				styleType: 'text',
				showNull: false
			};
		},
		onLoad() {
			this.load(false);
		},
		computed: {
			money() {
				return this.$store.getters.getUserInfo.amount
			},
			list() {
				return this.current == 0 ? this.user_recharge_list : this.current == 1 ? this.user_drawrequest_list : this.user_amount_list
			},
			correctvalue(value) {
				return function(value) {
					return value > 0 ? "+" + value : value
				}
			}
		},
		components: {
			uniNavBar,
			uniSegmentedControl
		},
		onReachBottom: function() {
			var _self = this;
			if (timer != null) {
				clearTimeout(timer);
			}
			timer = setTimeout(function() {
				_self.load(true);
			}, 1000);
		},
		methods: {
			load(ismore) {
				switch (this.current) {
					case 0:
						this.loadRechargeList(ismore)
						break;
					case 1:
						this.loadDrawList(ismore)
						break;
					case 2:
						this.loadAmountList(ismore)
						break;
					default:
						break;
				}
			},
			loadRechargeList(ismore) {
				var that = this;
				if (ismore) {
					rechargePage++;
				} else {
					that.user_recharge_list = [];
				}
				this.$utils.tRequest({
					url: this.$webUrl + 'user_recharge_list',
					method: 'GET',
					data: {
						page: drawPage,
						pagesize: pageCount
					},
					success: res => {
						if (res.code == 0) {
							if (res.data.list.length > 0) {
								that.user_recharge_list = that.user_recharge_list.concat(res.data.list);
							} else {
								if (ismore) {
									rechargePage--
								}
							}

						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			loadDrawList(ismore) {
				var that = this;
				if (ismore) {
					drawPage++;
				} else {
					that.user_drawrequest_list = [];
				}
				this.$utils.tRequest({
					url: this.$webUrl + 'user_drawrequest_list',
					method: 'GET',
					data: {
						page: rechargePage,
						pagesize: pageCount
					},
					success: res => {
						if (res.code == 0) {
							if (res.data.list.length > 0) {
								that.user_drawrequest_list = that.user_drawrequest_list.concat(res.data.list);
							} else {
								if (ismore) {
									drawPage--
								}
							}
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			loadAmountList(ismore) {
				var that = this;
				if (ismore) {
					amountPage++;
				} else {
					that.user_amount_list = [];
				}
				this.$utils.tRequest({
					url: this.$webUrl + 'user_amount_list',
					method: 'GET',
					data: {
						page: amountPage,
						pagesize: pageCount
					},
					success: res => {
						if (res.code == 0) {
							if (res.data.list.length > 0) {
								that.user_amount_list = that.user_amount_list.concat(res.data.list);
							} else {
								if (ismore) {
									amountPage--
								}
							}
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			onClickItem(index) {
				if (this.current !== index) {
					this.current = index;
					this.load()
				}
			},
			styleChange(evt) {
				const value = evt.target.value;
				if (this.styleType !== value) {
					this.styleType = value;
					for (let i = 0; i < this.styles.length; i++) {
						if (this.styles[i].value === value) {
							this.styleIndex = i;
							break;
						}
					}
				}
			}

		},
		onNavigationBarButtonTap(e) {
			if (e.index === 0) {
				uni.navigateTo({
					url: '../../ray/rayRecords/myRedRecords/myRedRecords',
					success: res => {}
				});
			}
		}

	}
</script>

<style>
	.t-common-font {
		font-weight: bold;
	}

	.my-money {
		background: #fc3a39;
		color: #fff;
	}

	.nullPic {
		width: 250upx;
	}

	.showNull {
		width: 100%;
		position: fixed;
		bottom: 25%;
		left: 0;
	}

	.showNull p {
		color: #666;
	}

	.t-cell {
		height: 140upx;
		font-weight: bold;
		justify-content: space-between;
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

	}

	.cell-textinfo view:last-child {
		font-size: 20upx;
		height: 40upx;
		color: #999999;
	}

	.cell-right {

		display: flex;
		flex-direction: column;
		text-align: right;
		/* justify-content: flex-end; */
		/* flex-grow: 3; */
	}

	.cell-right view:first-child {
		color: #FC4B2D;
		font-weight: bold;
		font-size: 40upx;
	}

	.cell-right view:last-child {

		color: #999999;
	}
</style>
