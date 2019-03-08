<template>
	<view class="t-common-font">
		

		<view class="uni-padding-wrap uni-common-mt">
			<uni-segmented-control :current="current" :values="items" v-on:clickItem="onClickItem" :styleType="styleType"
			 :activeColor="activeColor"></uni-segmented-control>
		</view>
		<view class="content">
			<view class="uni-common-mt balance" v-show="current === 0">

				<view class="uni-form-item uni-column" style="position: relative;">
					<span class="tixian-tit">提现金额</span>
					<input class="uni-input bradius" type="digit" :placeholder="amount" :value="nums" style="text-align: right;"
					 @input="amountFun" />
				</view>
				<p>我的余额：￥{{user.amount}}</p>

				<!-- 支付宝 -->
				<view class="uni-flex uni-row paytype bradius" :class="{active:shows===1}" @click="alipay">
					<view class="text pays">
						<image src="../../../static/img/withdraw_ali_icon.png" mode="widthFix"></image>
						<span>提现到支付宝</span>
					</view>
					<view class="text" @click="changeCard('alipay')">
						支付宝({{aliAccount}})
						<uni-icon type="arrowright" size="24" color="#666"></uni-icon>
					</view>
				</view>
				<!-- 银行卡 -->
				<view class="uni-flex uni-row paytype uni-common-mt bradius" :class="{active:shows===2}" @click="bankCard">
					<view class="text pays">
						<image src="../../../static/img/ic_card.png" mode="widthFix"></image>
						<span>提现到银行卡</span>
					</view>
					<view class="text" @click="changeCard('bankCard')">
						{{bankAccount}}
						<uni-icon type="arrowright" size="24" color="#666"></uni-icon>
					</view>
				</view>

				<p class="uni-common-mt">提示说明：20元起提现手续费为1%</p>

				<button class="commitBtn uni-common-mt" @click="submitFun">立即提交</button>

			</view>
			<view class="uni-center uni-common-mt" v-show="current === 1">
				<view class="uni-list-cell" v-for="(item, index) in list" :key="index">
					<view class="uni-list-cell-navigate t-cell">
						<!-- <view class="list-avator">
							<image :src="item.avator" mode="aspectFill"></image>
						</view> -->
						<view class="cell-textinfo" style="flex: 0.5;">
							<view>
								{{item.user_name}}
							</view>
							<view>
								{{item.add_time}}
							</view>
						</view>
						<view class="cell-right" style="flex: 1;">
							<view>
								{{item.value}}
							</view>
							<view>
								{{item.remark}}
							</view>
						</view>
					</view>

				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from '@/components/uni-nav-bar.vue';
	import uniIcon from "@/components/uni-icon.vue";
	import uniSegmentedControl from '@/components/uni-segmented-control.vue';
	var amountPage = 1,
		pageCount = 10,
		timer = null;
	export default {
		data() {
			return {
				items: [
					'我的余额',
					'我的收益'
				],
				current: 0,
				activeColor: '#fc3a39',
				styleType: 'button',
				shows: 1,
				list: [],
				amount: '0',
				curAccount: '',
				nums: ''
			};
		},
		onLoad() {
			this.loadList(false); //获取我的收益列表
		},
		onReachBottom() {
			var _self = this;
			if (timer != null) {
				clearTimeout(timer);
			}
			timer = setTimeout(function() {
				_self.loadList(true);
			}, 1000);
		},
		methods: {
			back() {
				// 				uni.navigateBack({
				// 					delta: 1
				// 				})
				uni.reLaunch({
					url: '../my'
				})
			},
			onClickItem(index) {
				if (this.current !== index) {
					this.current = index;
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
			},
			alipay() {
				this.shows = 1;
			},
			bankCard() {
				this.shows = 2;
			},
			loadList(ismore) {
				var that = this;
				if (ismore) {
					amountPage++;
				} else {
					that.list = [];
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
								that.list = that.list.concat(res.data.list);
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
			changeCard(param) {
				var that = this;
				switch (param) {
					case 'alipay':
						uni.navigateTo({
							url: '../myAlipay/myAlipay?changeCardid=1',
							success: res => {
								setTimeout(function() {
									that.shows = 1;
								}, 500)
							}
						});
						break;
					case 'bankCard':
						uni.navigateTo({
							url: '../myBankCard/myBankCard?changeCardid=2',
							success: res => {
								setTimeout(function() {
									that.shows = 2;
								}, 500)
							}
						});
						break;
					default:
						break;
				}
			},
			amountFun(e) {
				this.amount = e.target.value;
			},
			submitFun() {
				var reg = /^[0]\d*$/;
				if (reg.test(this.amount) || this.amount == 0) {
					uni.showToast({
						title: '请检查输入金额是否有误',
						mask: false,
						duration: 1500,
						icon: 'none'
					});
					return false;
				} else if (this.amount > this.user.amount) {
					uni.showToast({
						title: '提现金额不得超过我的余额',
						mask: false,
						duration: 1500,
						icon: 'none'
					});
					return false;
				} else {
					let aList = this.$store.getters.getAliList;
					let bList = this.$store.getters.getBankList;
					switch (this.shows) {
						case 1:
							this.curAccount = '';
							this.checkDataLength(aList);
							break;
						case 2:
							this.curAccount = '';
							this.checkDataLength(bList);
							break;
						default:
							break;
					}
				}
			},
			checkDataLength(arr) {
				if (arr.length === 0) {
					uni.showToast({
						title: '请检查提现账户是否有误',
						mask: false,
						duration: 1500,
						icon: 'none'
					});
					return false;
				}
				this.curAccount = arr[0].id;
				var that = this;
				this.$utils.tRequest({
					url: this.$webUrl + 'user_drawrequest_add',
					method: 'GET',
					data: {
						bankid: that.curAccount,
						amount: that.amount,
						remark: ''
					},
					success: res => {
						if (res.code == 0) {
							uni.showModal({
								title: '提示',
								content: res.msg,
								showCancel: false,
								cancelText: '',
								confirmText: '确定',
								success: res => {
									that.shows = 1;
									that.nums = '';
								}
							});
						} else {
							if (res.code == 2000) {
								uni.showModal({
									title: '提示',
									content: res.msg,
									showCancel: false,
									cancelText: '',
									confirmText: '确定'
								});
							}
						}
					},
					fail: () => {},
					complete: () => {}
				})
			}

		},
		computed: {
			passUserName() {
				return this.$utils.defaultPlusXing(this.user.user_name);
			},
			user() {
				return this.$store.getters.getUserInfo;
			},
			aliAccount() {
				var that = this;
				var list = this.$store.getters.getAliList;
				if (list.length === 0) {
					return '请添加支付宝账号';
				} else {
					that.curAccount = list[0].id;
					return list[0].banknumber;
				}
			},
			bankAccount() {
				var list = this.$store.getters.getBankList;
				if (list.length === 0) {
					return '请添加银行卡账号';
				} else {
					return list[0].banknumber;
				}
			}
		},
		components: {
			uniNavBar,
			uniIcon,
			uniSegmentedControl
		}
	}
</script>

<style>
	.tixian-tit {
		position: absolute;
		top: 14px;
		left: 12px;
		z-index: 2;
	}

	.t-common-font {
		font-weight: bold;
	}

	.content {
		padding: 0 10upx;
	}

	.balance p {
		font-size: 14px;
		color: #A0A0A0;
	}

	.commitBtn {
		background: #fc3a39;
		color: #fff;
	}

	.paytype .pays span {
		color: #000;
		font-size: 14px;
	}

	.pays image {
		width: 30upx;
		position: relative;
		top: 6upx;
		margin-right: 10upx;
	}

	.paytype {
		height: 25px;
		padding: 7px 12px;
		background: #FFF;
		justify-content: space-between;
	}

	.paytype .text:last-child {
		font-size: 12px;
		line-height: 1;
		color: #6F6F6F;
	}

	.bradius {
		border-radius: 10upx;
		border: 1px solid #eee;
	}

	.active {
		border-color: #fc3a39;
	}

	.t-cell {
		/* height: 140upx; */
		font-family: Cursive;
		font-weight: bold;
		justify-content: space-between;
		background: #fff;
		padding: 0;
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
		padding-right: 10upx;
		/* justify-content: flex-end;
		flex-grow: 3; */
	}

	.cell-right view:first-child {
		color: #FC4B2D;
		font-weight: bold;
		font-size: 40upx;
	}

	.cell-right view:last-child {
		color: #999;
	}
</style>
