<template>
	<view class="page commen">
		<view class="item">
			<text>请输入红包总金额</text>
			<input type="number" v-model="hbamount" placeholder="0" placeholder-class="placeholder" />
			<text> 元</text>
		</view>
		<view class="item">
			<text>红包个数</text>
			<input disabled="disabled" type="number" v-model="count" value="7" placeholder="0" placeholder-class="placeholder" />
			<text>个</text>
		</view>
		<view class="item">
			<text>雷点</text>
			<input type="number" v-model="rayCount" placeholder="请填写雷点数" placeholder-class="placeholder"/>
		</view>
		<button type="primary" @tap="Plug">塞进红包</button>
		<password-authentication :amount='hbamount' @toNoPayPassSet="toNoPayPassSet"  v-if="bannerShow" @send-cancel="cancelsend" @send-pass="getPassToConfirm"></password-authentication>
	</view> 
</template>

<script>
	import PasswordAuthentication from "../../../components/PasswordAuthentication.vue";
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex';
	var roomid ;
	var call_index;
	export default {
		data() {
			return {
				bannerShow: false,
				hbamount: '',
				rayCount: '',
				count:'7'
			};
		},
		onLoad:function(options){
			roomid = options.roomid;
			call_index = options.callindex;
		},
		computed: {
			...mapGetters([
				'getUserInfo'
				// ...
			])
		},
		methods: {
			Plug: function() {
				var roomInfo = this.$store.getters.getCurrentRoomInfo;
				if(this.hbamount == ''){
					uni.showToast({
						title: '请填写红包金额',
						mask: false,
						duration: 1500,
						icon:'none'
					});
					return ;
				}
				if(this.rayCount == ''){
					uni.showToast({
						title: '请填写雷点',
						mask: false,
						duration: 1500,
						icon:'none'
					});
					return ;
				}
				if( !(this.count>=roomInfo.minrednum && this.count<=roomInfo.maxrednum)){
					uni.showToast({
						title: '红包个数须大于'+roomInfo.minrednum+"小于"+roomInfo.maxrednum,
						mask: false,
						icon:'none',
						duration: 2000
					});
					return ;
				}
				if( !(this.hbamount>=roomInfo.minprice && this.rayCount<=roomInfo.maxprice)){
					uni.showToast({
						title: '红包额度须大于'+roomInfo.minprice+"小于"+roomInfo.maxprice,
						mask: false,
						icon:'none',
						duration: 2000
					});
					return ;
				}
				
				this.bannerShow = true;
			},
			cancelsend:function(message){
				var bannerShowSync = message.show;
				this.bannerShow = bannerShowSync;
			},
			getPassToConfirm: function(message) {
				var that = this;
				console.log(message);
				var inputPass = message.content;
				var bannerShowSync = message.show;
				var isNotNeedPass = message.isNotNeedPass;
				if(this.getUserInfo.nopaypwd==0){
					if(this.$utils.safeStr(this.getUserInfo.paypwd).length==0){
						uni.showModal({
							title: '提示',
							content: '请先设置支付密码',
							showCancel: true,
							cancelText: '知道了',
							confirmText: '去设置',
							confirmColor:'#D81E06',
							success: res => {
								//跳转到支付密码页面
								uni.navigateTo({
									url: '../../my/setting/security/security',
									success: res => {},
									fail: () => {},
									complete: () => {}
								});
							},
							fail: () => {},
							complete: () => {}
						});
					}else{
						if(inputPass.length==0){
							uni.showModal({
								title: '提示',
								content: '请输入支付密码',
								showCancel: false,
								confirmText: '知道了',
								confirmColor:'#D81E06',
								success: res => {},
								fail: () => {},
								complete: () => {}
							});
						}else{
							this.sendRedEnvelope(inputPass,bannerShowSync);
						}
					} 
				}else{
					this.sendRedEnvelope("",bannerShowSync);
				}
				
				
			},
			toNoPayPassSet:function(){
				//跳转到设置免密设置页面
				uni.navigateTo({
					url: '../../my/setting/security/freepay',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			sendRedEnvelope: function(inputPass,bannerShowSync) {
				var roomInfo = this.$store.getters.getCurrentRoomInfo;
				if( !(this.count>=roomInfo.minrednum && this.count<=roomInfo.maxrednum)){
					uni.showToast({
						title: '红包个数须大于'+roomInfo.minrednum+"小于"+roomInfo.maxrednum,
						mask: false,
						icon:'none',
						duration: 2000
					});
					return ;
				}
				if( !(this.hbamount>=roomInfo.minprice && this.rayCount<=roomInfo.maxprice)){
					uni.showToast({
						title: '红包额度须大于'+roomInfo.minprice+"小于"+roomInfo.maxprice,
						mask: false,
						icon:'none',
						duration: 2000
					});
					return ;
				}
				var param = {
					roomid: roomid, 
					rednum:this.count,
					amount: this.hbamount,
					point: this.rayCount,
					paypwd:inputPass

				}
				this.$utils.defalsePluginRequest('pl_hb_add',call_index,param,
				res =>{
					if(res.code == 3001){
						uni.showModal({
							title: '提示',
							content: res.msg,
							showCancel: true,
							cancelText: '知道了',
							confirmText: '去充值',
							confirmColor:'#D81E06',
							success: res => {
								uni.navigateTo({
									url: '../../my/recharge/recharge',
									success: res => {},
									fail: () => {},
									complete: () => {}
								});
								//跳转到充值页面
							},
							fail: () => {},
							complete: () => {}
						});
					}else if(res.code == 0){
						uni.showToast({
							title: '发包成功',
							mask: false,
							duration: 1500,
							icon:'none',
							success: (res) => {
								uni.navigateBack({
									delta: 1
								});
							}
						});
					}else{
						uni.showToast({
							title: res.msg,
							mask: false,
							duration: 1500,
							icon:'none',
							success: (res) => {}
						});
					}
				},
				res =>{
					
				},
				res =>{
					 this.bannerShow = bannerShowSync;
				}
				)
			}

		},
		components: {
			PasswordAuthentication
		}
	}
</script>

<style>
	.placeholder{
		
		font-weight: normal;
	}
	.commen {
		

	}

	.commen button {
		background-color: #fc4b2d;
		margin: 30upx;
		height: 100upx;
		line-height: 100upx;
	}

	.item {
		display: flex;
		flex-direction: row;
		font-size: 35upx;
		background-color: white;
		border: 2upx solid #eeeeee;
		margin: 20upx;
		height: 100upx;
		border-radius: 10upx;
		font-weight: bold;
		line-height: 100upx;
		padding: 0 20upx;
	}

	.item text:nth-child(1) {
		width: 400upx;
	}

	.item text:last-child {
		margin-left: 10upx;
	}

	.item input {
		text-align: right;
		line-height: 100upx;
		height: 100upx;
	}
</style>
