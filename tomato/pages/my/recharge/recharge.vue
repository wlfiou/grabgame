<template>
	<view class="t-common-font">

		<view class="content">
			<view class="title uni-common-mt">自定义充值</view>
			<view class="uni-form-item uni-column bradius yinlian">
				<!-- <image src="../../../static/img/chongzhi_icon_yinlian_normal.png" mode="widthFix"></image>
				<input class="uni-input" type="digit" placeholder-style="color:#949494;font-size:14px" placeholder="银联转账(最低20元起充值)" /> -->
				<input class="uni-input" type="number" maxlength="9" placeholder-style="color:#949494;font-size:14px" @input="onKeyInput"
				 placeholder="自定义充值金额" />
			</view>
			<p>ps：填写金额需是2的倍数哦</p>
			<!-- <view class="title uni-common-mt">支付宝充值</view>
			<radio-group @change="radioChange">
				<label class="uni-list-cell-pd tongdao" v-for="(item, index) in radioItems" :key="item.value">
					<radio :value="item.value" :checked="index === current" /><span>{{item.name}}</span>
				</label>
			</radio-group> -->
			<view class="title uni-common-mt">或者选择充值金额</view>
			<view class="choose-price">
				<view class="uni-common-mb" :class="{active:shows===ind}" v-for="(item, ind) in priceItem" :key="ind" @click="changePrice(ind)">
					{{item}}元
				</view>
			</view>
			<view class="title">实付金额</view>
			<p class="actualPrice">{{actualPrice}}元</p>
			<button class="commitBtn uni-common-mt" @click="payBtn">立即支付</button>
		</view>
	</view>
</template>

<script>
	import uniNavBar from '../../../components/uni-nav-bar.vue';
	export default {
		data() {
			return {
				radioItems: [{
						value: '1',
						name: '通道1'
					},
					{
						value: '2',
						name: '通道2'
					}
				],
				priceItem: ['20', '50', '100', '500', '1000', '2000'],
				current: 0,
				shows: 0,
				actualPrice: '20',
				payTitleList: [],
				payIdList: []
			};
		},
		onLoad() {
			this.$utils.tRequest({
				url: this.$webUrl + 'sys_payment_list',
				method: 'GET',
				data: {},
				success: res => {
					// console.log(res);
					if (res.code === 0) {
						var list = res.data.list;
						list.forEach(item => {
							this.payTitleList.push(item.title);
							this.payIdList.push(item.payment_id);
						});

					}
				},
				fail: () => {},
				complete: () => {}
			})
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			radioChange: function(evt) {
				for (let i = 0; i < this.radioItems.length; i++) {
					if (this.radioItems[i].value === evt.target.value) {
						this.current = i;
						break;
					}
				}
			},
			changePrice: function(ind) {
				this.shows = ind;
				this.actualPrice = this.priceItem[ind];
			},
			onKeyInput: function(event) {
				this.shows = -1;
				// console.log(event.target.value);
				event.target.value === '' ? this.actualPrice = 0 : this.actualPrice = event.target.value.replace(/^[0]\d*$/, '');
			},
			payBtn: function() {
				if (this.actualPrice % 2 !== 0) {
					uni.showToast({
						title: '金额必须为2的倍数哦！',
						duration: 1500,
						icon: 'none'
					});
					return false;
				}
				if (this.actualPrice <= 0) {
					uni.showToast({
						title: '请检查输入金额是否有误！',
						duration: 1500,
						icon: 'none'
					});
					return false;
				}

				uni.showActionSheet({
					itemList: this.payTitleList,
					success: (e) => {
						// console.log(e.tapIndex);
						uni.showToast({
							title: "点击了第" + e.tapIndex + "个选项",
							icon: "none"
						})
						var pid = this.payIdList[e.tapIndex];
						this.payFun(pid);
					}
				});

			},
			payFun: function(pid) {
// 				console.log(pid);
// 				console.log(this.actualPrice);
				this.$utils.tRequest({
					url: this.$webUrl + 'user_amount_recharge',
					method: 'post',
					data: {
						order_amount: this.actualPrice,
						payment_id: pid
					},
					success: res => {
						console.log(res);
						if (res.code === 0) {
							this.$store.commit('setPayInfo', res.data);
							uni.navigateTo({
								url: './webPay',
								success: res => {}
							});
							
						}
					},
					fail: () => {},
					complete: () => {}
				})
			}

		},
		computed: {},
		components: {
			uniNavBar
		}
	}
</script>

<style>
	.t-common-font {
		font-weight: bold;
	}

	.content {
		padding: 10upx 25upx;
	}

	.uni-list-cell-pd {
		padding: 11px 15px 11px 0px;
	}

	.yinlian image {
		width: 60upx;
		position: absolute;
		left: 25upx;
		top: 30upx;
		z-index: 2;
	}

	.content>p {
		color: #FF3333;
	}

	.tongdao span {
		position: relative;
		top: 6upx;
	}

	.choose-price {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}

	.choose-price view {
		width: 200upx;
		height: 120upx;
		text-align: center;
		line-height: 120upx;
		color: #fc3a39;
		border: 1px solid #fc3a39;
		border-radius: 15upx;
		font-size: 18px;
		transition: .3s;
	}

	.commitBtn {
		background: #FC3A39;
		color: #fff;
	}

	.actualPrice {
		font-size: 28px;
		color: #fc3a39;
	}

	.uni-form-item {
		position: relative;
		background: #fff;
	}

	.bradius {
		border-radius: 10upx;
		border: 1px solid #eee;
	}

	.choose-price .active {
		background: #fc3a39;
		color: #fff;
	}

	.title {
		padding: 10upx 0upx;
	}
</style>
