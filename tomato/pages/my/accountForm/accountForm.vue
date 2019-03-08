<template>
	<view>
		<!-- <page-head :title="title"></page-head> -->
		<view class="uni-padding-wrap">
			<form @submit="formSubmit" @reset="formReset">
				<view>
					<view class="uni-title">姓名</view>
					<view class="uni-list">
						<view class="uni-list-cell">
							<input class="uni-input" name="accountname" placeholder="请填写您的昵称" @input="getName" />
						</view>
					</view>
				</view>
				<view class="uni-title">提现类型</view>
				<view class="uni-list">
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							当前选择：
						</view>
						<view class="uni-list-cell-db">
							<picker @change="bindPickerChange" :value="index" :range="array">
								<view class="uni-input">{{array[index]}}</view>
							</picker>
						</view>
					</view>
				</view>
				<view>
					<view class="uni-title">提现账户</view>
					<view class="uni-list">
						<view class="uni-list-cell">
							<input class="uni-input" type="number" name="banknumber" placeholder="请填写您的提现账户" @input="getBankNumber" />
						</view>
					</view>
				</view>
				<!-- 如果提现方式为银行卡就显示 -->
				<block v-if="index == 1">
					<view>
						<view class="uni-list uni-common-mt">
							<view class="uni-list-cell">
								<input class="uni-input" name="nakname" placeholder="请填写您的开户银行" @input="getNakName" />
							</view>
						</view>
					</view>
					<view>
						<view class="uni-list uni-common-mt">
							<view class="uni-list-cell">
								<input class="uni-input" name="merchantCode" placeholder="请填写您的开户银行所在地" @input="getMerchantCode" />
							</view>
						</view>
					</view>
					<view>
						<view class="uni-list uni-common-mt">
							<view class="uni-list-cell">
								<input class="uni-input" type="number" maxlength="11" name="phone" placeholder="请填写您的银行卡预留手机号" @input="getPhone" />
							</view>
						</view>
					</view>
				</block>
				<!-- 提交&&重置按钮 -->
				<view class="uni-btn-v uni-common-mt">
					<button class="btn-submit" formType="submit" type="primary">提交</button>
					<button type="default" formType="reset">重置</button>
				</view>
			</form>
		</view>
	</view>
</template>
<script>
	//来自 graceUI 的表单验证， 使用说明见手册 http://grace.hcoder.net/doc/info/73-3.html
	var graceChecker = require("@/commen/graceChecker.js");

	export default {
		data() {
			return {
				title: '表单验证',
				array: ['支付宝', '银行卡'],
				index: 0,
				changeCardid: 0,
				backpages: false,
				accountname: '', //提现真实姓名 
				cardtypes: '', //提现账号类型（1 银行卡 2 微信 3 支付宝） 
				banknumber: '', //提现账号（银行卡/微信 openid/支付宝号） 
				bankName: '', //开户银行（cardtypes=1 时需要填写） 
				MerchantCode: '', //开户银行所在地（cardtypes=1 时需要填写） 
				phone: '', // 预留手机号（cardtypes=1 时需要填写） 
			}
		},
		onLoad(e) {
			if(e.changeCardid) {
				this.backpages = true;
				this.index = e.changeCardid - 1;
				this.changeCardid = e.changeCardid;
			}
			e.pid ? this.index = e.pid : null;
		},
		methods: {
			formSubmit: function(e) {
				//将下列代码加入到对应的检查位置
				//定义表单规则
				var rules = [{
						name: "accountname",
						checkType: "reg",
						checkRule: "^[\u4e00-\u9fa5]+(·[\u4e00-\u9fa5]+)*$",
						errorMsg: "请检查姓名输入是否有误"
					},
					{
						name: "banknumber",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请填写提现账户"
					},
					{
						name: "nakname",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请填写开户银行"
					},
					{
						name: "merchantCode",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请填写开户银行所在地"
					},
					{
						name: "phone",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请填写开户银行预留电话"
					},
				];
				//进行表单检查
				var formData = e.detail.value;
				if (this.index == 0) {
					var rules = [{
							name: "accountname",
							checkType: "reg",
							checkRule: "^[\u4e00-\u9fa5]+(·[\u4e00-\u9fa5]+)*$",
							errorMsg: "请检查姓名输入是否有误"
						},
						{
							name: "banknumber",
							checkType: "notnull",
							checkRule: "",
							errorMsg: "请填写提现账户"
						}
					]
				}
				var checkRes = graceChecker.check(formData, rules);
				if (checkRes) {
					// 					uni.showToast({
					// 						title: "验证通过!",
					// 						icon: "none"
					// 					});
					this.$utils.tRequest({
						url: this.$webUrl + 'user_bank_edit',
						method: 'GET',
						data: {
							id: 0,
							cardtypes: this.cardtypesFun(),
							accountname: this.accountname,
							banknumber: this.banknumber,
							bankName: this.bankName,
							MerchantCode: this.MerchantCode,
							phone: this.phone
						},
						success: res => {
							if (res.code == 0) {
								this.setCashInfo(this.cardtypes);
								uni.showModal({
									title: '提示',
									content: '添加成功！',
									showCancel: false,
									cancelText: '',
									confirmText: '确定',
									success: res => {
										switch (this.cardtypes) {
											case 3:
												uni.redirectTo({
													url: '../myAlipay/myAlipay?addid=3&changeCardid=' + this.changeCardid + '&backpages=' + this.backpages
												});
												break;
											case 1:
												uni.redirectTo({
													url: '../myBankCard/myBankCard?addid=1&changeCardid=' + this.changeCardid + '&backpages=' + this.backpages
												});
												break;
											default:
												break;
										}

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

				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
				}
			},
			formReset: function(e) {
				// console.log("清空数据");
				console.log(this);
				// this.chosen = ''
			},
			bindPickerChange: function(e) {
				// console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
			},
			cardtypesFun() {
				switch (this.array[this.index]) {
					case '支付宝':
						return this.cardtypes = 3;
						break;
					case '银行卡':
						return this.cardtypes = 1;
						break;
					default:
						break;
				}
			},
			getName(e) {
				this.accountname = e.target.value;
			},
			getBankNumber(e) {
				this.banknumber = e.target.value;
			},
			getNakName(e) {
				this.bankName = e.target.value;
			},
			getMerchantCode(e) {
				this.MerchantCode = e.target.value;
			},
			getPhone(e) {
				this.phone = e.target.value;
			},
			setCashInfo: function(cardtypes) {
				if (cardtypes == 1) {
					this.$utils.tRequest({
						url: this.$webUrl + 'user_bank_list',
						method: 'GET',
						data: {
							page: 1,
							pagesize: 20,
							cardtypes: 1
						},
						success: res => {
							if (res.code === 0) {
								this.$store.commit('setBankList', res.data.list);
							}
						},
						fail: () => {},
						complete: () => {}
					})
				} else {
					if (cardtypes == 3) {
						this.$utils.tRequest({
							url: this.$webUrl + 'user_bank_list',
							method: 'GET',
							data: {
								page: 1,
								pagesize: 20,
								cardtypes: 3
							},
							success: res => {
								if (res.code === 0) {
									this.$store.commit('setAliList', res.data.list);
								}
							},
							fail: () => {},
							complete: () => {}
						})
					}
				}
				
			}
		},
		computed: {}
	}
</script>

<style>
	.btn-submit {
		background: #F76260;
	}
</style>
