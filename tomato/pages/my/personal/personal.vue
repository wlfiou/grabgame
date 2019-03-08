<template>
	<view class="page t-common-font">
		<!-- #ifndef MP-WEIXIN -->
		<!-- 固定在顶部的导航栏 -->
		<uni-nav-bar left-icon="back" class="navBox" fixed="true" rightText="保存" @click-left="back" @click-right="save" color="#000"
		 shadow="false" title="个人资料"></uni-nav-bar>
		<!-- 使用非原生导航栏后需要在页面顶部占位 -->
		<!-- #ifdef APP-PLUS -->
		<view style="height:64px;"></view>
		<!-- #endif -->
		<!-- #ifdef H5 -->
		<view style="height:44px;"></view>
		<!-- #endif -->
		<!-- #endif -->

		<view class="uni-card">
			<view class="uni-list">
				<view class="uni-list-cell" hover-class="uni-list-cell-hover">
					<view class="uni-list-cell-navigate uni-navigate-right uni-navigate-badge" @tap="updateAvator">
						头像
						<image class="content-span userPic" mode="aspectFill" :src="avator"></image>
					</view>
				</view>
				<view class="uni-list-cell" hover-class="uni-list-cell-hover">
					<view class="uni-list-cell-navigate uni-navigate-right uni-navigate-badge" @tap="editNickName">
						昵称
						<span class="content-span">{{nickName}}</span>
					</view>
				</view>
				<!-- <view class="uni-list-cell" hover-class="uni-list-cell-hover">
					<view class="uni-list-cell-navigate uni-navigate-right uni-navigate-badge">
						真实姓名

					</view>
				</view> -->
				<view class="uni-list-cell" hover-class="uni-list-cell-hover">
					<view class="uni-list-cell-left">
						性别
					</view>
					<view class="uni-list-cell-navigate uni-navigate-right uni-navigate-badge uni-list-cell-db" style="padding: 5upx 30upx;justify-content: flex-end;">
						<picker mode="selector" :range="sexs" @change="bindPickerChange" :value="sexIndex">
							<view class="uni-input" style="width: 500upx;text-align: right;">{{sexs[sexIndex]}}</view>
						</picker>
					</view>
				</view>

				<view class="uni-list-cell uni-list-cell-last" hover-class="uni-list-cell-hover">
					<view class="uni-list-cell-navigate uni-navigate-badge">
						手机号
						<span class="content-span">{{userInfo.mobile}}</span>
					</view>
				</view>
			</view>
		</view>
		<neil-modal :show="showInput" @close="closeModal" @confirm="editDone" title="请输入昵称">
			<view class="input-view">
				<view class="input-name">
					<input v-model="content" type="text" placeholder="请输入昵称" />
				</view>
			</view>
		</neil-modal>

	</view>
</template>

<script>
	import uniNavBar from '../../../components/uni-nav-bar.vue';
	import neilModal from '@/components/neil-modal.vue';
	export default {
		data() {
			return {
				showInput: false,
				showPick: false,
				sexs: ["保密","男","女"],
				content: '',
				index:0
			};
		},
		methods: {
			editNickName: function() {
				this.showInput = !this.showInput
			},
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.sexIndex = e.target.value;
			},
			closeModal: function() {
				this.showInput = !this.showInput
			},
			editDone: function() {

			},
			save: function() {
				
				if(this.content.length==0){
					this.content = this.userInfo.user_name;
				}
				this.$utils.tRequest({
					url: this.$webUrl+'user_info_edit',
					method: 'GET',
					data: {
						nickname:this.content,
						sex:this.sexs[this.index],
						mobile:this.userInfo.mobile
					},
					success: res => {
						if(res.code == 0){
							uni.showToast({
								title: '保存成功',
								mask: false,
								duration: 1500,
								icon:'none'
							});
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
				})
			},
			updateAvator: function() {
				var that = this;
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择
					success: function(res) {
						const tempFilePaths = res.tempFilePaths;
						console.log(res)
						const uploadTask = uni.uploadFile({
							//that.$webUrl+'user_avatar_crop'https://unidemo.dcloud.net.cn/upload
							url: that.$webUrl + 'user_avatar_crop' + '&token=' + that.$store.getters.getUserInfo.token,
							filePath: tempFilePaths[0],
							name: 'upfile',
							formData: {
								'avatar': 'test'
							},
							success: function(uploadFileRes) {
								that.$store.dispatch("setAvator", JSON.parse(uploadFileRes.data).data);

							}
						});
					},
					error: function(e) {
						console.log(e);
					}
				});
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			}
		},
		onLoad:function(){
			this.index = this.$utils.itemIndex(this.sex,this.sexs)
		},
		computed: {
			passUserName() {
				return this.$utils.defaultPlusXing(this.userInfo.user_name);
			},
			userInfo() {
				return this.$store.getters.getUserInfo;
			},
			avator() {
				return this.userInfo.avatar.length > 0 ? this.userInfo.avatar :
					'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1548997951295&di=0f0d1f98941ac81b5a1210ae2481ca03&imgtype=0&src=http%3A%2F%2Fpic.90sjimg.com%2Fdesign%2F00%2F67%2F59%2F63%2F58e89bee922a2.png'
			},
			nickName(){
				return this.userInfo.nick_name.length>0?this.userInfo.nick_name:this.passUserName;
			},
			sex(){
				return this.userInfo.sex
			},
			sexIndex:{
				get:function (){
					 return this.index
				},
				set:function (newValue){
					 this.index = newValue
				}
				
			}
			
		},
		components: {
			uniNavBar,
			neilModal
		}

	}
</script>

<style>
	.userPic {
		width: 90upx;
		height: 90upx;
		border-radius: 50%;
	}

	.t-common-font {
		font-weight: bold;
	}

	.content-span {
		margin-right: 15upx;
	}

	.input-name {
		height: 80upx;
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		position: relative;
		box-sizing: border-box;
	}

	.input-name::after {
		content: " ";
		position: absolute;
		bottom: 0;
		right: 0;
		height: 1px;
		border-top: 1px solid #e5e5e5;
		transform-origin: 0 0;
		transform: scaleY(.5);
	}

	.input-name input {
		text-align: center;
		flex: 1;
		height: 50upx;
		line-height: 50upx;
	}
</style>
