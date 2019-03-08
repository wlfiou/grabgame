<template>
	<view class="page t-common-font">
		<!-- <uni-nav-bar class="navBox" fixed="true" backgroundColor="#fc3a39" @click-left="messages" @click-right="settings"
		 color="#fff" shadow="false" title="个人中心">
			<view slot="left" style="margin-left: 6px;line-height: 44px;">
				<uni-icon type="chatbubble" size="28"></uni-icon>
			</view>
			<view slot="right" style="line-height: 44px;">
				<uni-icon type="gear-filled" size="28"></uni-icon>
			</view>
		</uni-nav-bar> -->
		 <!-- 使用非原生导航栏后需要在页面顶部占位 -->
		<!--<view style="height:44px;"></view>-->
		<view class="container">
			<view class="top">
				<image src="../../../static/img/180x180.png" mode="aspectFill"></image>
			</view>
			<view class="username" :class="{clickfocus:focus===0}">
				<text>手机号</text>
				<input @focus="userFocus" @input="getPhoneNumber" type="text" value="" placeholder="请输入手机号" placeholder-class="uni-placeholder"/>
			</view>
			<view class="username" :class="{clickfocus:focus===1}">
				<text>密  码 </text>
				<input @focus="passFocus" @input="getPassWord" :type="inputType" value="" placeholder="请输入密码" placeholder-class="uni-placeholder"/>
				<view class="icon" @tap="seePass">
					<image :src="imageurl"></image>
				</view>
			</view>
			<view class="login">
				<button @tap="login" type="primary">登录</button>
				<button @tap="register">注册</button>
			</view>
			
			<view class="bottom-func">
				<view @tap="messagelogin">短信登录</view>
				<view @tap="findpass">忘记密码</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState, mapMutations} from 'vuex';
	export default {
		
		data() {
			return {
				phoneNumber: '',
				password: '',
				showcansee: false,
				focus:0
			};
		},
		computed: {
			correctPhone() {
				return this.$utils.checkMobile(this.phoneNumber);
			},
			imageurl() {
				return this.showcansee ? '../../../static/img/viewicon.png' : '../../../static/img/viewnoicon.png'
			},
			inputType(){
				return this.showcansee ?'text':'password'
			}
			
		},
		methods:{
			...mapMutations(['login']),
			userFocus:function(){
				this.focus = 0;
			},
			passFocus:function(){
				this.focus = 1;
			},
			seePass: function() {
				this.showcansee = !this.showcansee
			},
			
			getPhoneNumber: function(e) {
				this.phoneNumber = e.target.value;
				if(this.correctPhone){
					this.piccode = this.$imageUrl+'verify';
				}
			},
			getPassWord: function(e) {
				this.password = e.target.value;
			},
			messagelogin:function(){
				uni.navigateTo({
					url: '../quckLogin/quckLogin',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			findpass:function(){
				uni.navigateTo({
					url: '../findPass/findPass',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			register:function(){
				uni.navigateTo({
					url: '../register/register',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			login:function(){
				if (!this.correctPhone) {
					uni.showToast({
						title: '请输入正确手机号',
						mask: false,
						duration: 1500,
						icon:'none'
					}); 
					return;
				}
				if (this.password == '') {
					uni.showToast({
						title: '请输入密码',
						mask: false,
						duration: 1500,
						icon:'none'
					});
					return;
				}
				this.$utils.tRequest({
					url: this.$webUrl+'user_login',
					method: 'GET',
					data: {
						username:this.phoneNumber,
						password:this.password
					},
					success: res => {
						if(res.code == 0){
							this.$store.commit("login",res.data)
							uni.switchTab({
								url:"../../index/index"
							}) 
						}else{
							uni.showToast({
								title: res.msg,
								mask: false,
								duration: 1500,
								icon:'none',
							});
						}
					},
					fail: (res) => {
						console.log(JSON.stringify(res))
					},
					complete: (res) => {}
				})
				
			}
			
		}
	}
</script>

<style>
	.container{
		display: flex;
		flex-direction: column;
	}
.top{
	padding-top: 100upx;
    text-align: center;
}
.top image{
	height: 200upx;
	width: 200upx;
}
.username{
	border-radius: 20upx;
	height: 100upx;
	margin: 20upx 40upx;
	background-color: #ffffff;
	display: flex;
	flex-direction: row;
	line-height: 80upx;
	align-items: center;
}
.username text{
	margin-left: 10upx;
	font-weight: bold;
	color: #FC4B2D;
	height: 80upx;
}
.username input{
	padding-bottom: 15upx;
	padding-top: 19upx;
	padding-left: 10upx;
	font-weight: bold;
	flex-grow: 0.8;
}
.clickfocus{
	border: 2upx solid #ca808c;
}
.icon{
	height: 40upx;
	width: 40upx;
	
}
.icon image{
	height: 40upx;
	width: 40upx; 
}
.login{
	margin: 40upx;
	height: 100upx;
}
.login button:first-child{
	height:100upx ;
	line-height: 100upx;
	background-color: #F76260;
}
.login button:last-child{
	height:100upx ;
	line-height: 100upx;
	background-color: #FFFFFF;
	margin-top: 20upx;
}

.bottom-func{
	font-weight: bold;
	margin: 110upx 40upx;
	font-size: 25upx;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}
.bottom-func view:first-child{
	color: #F76260;
}
</style>
