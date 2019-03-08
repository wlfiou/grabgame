<template>
	<view>
		<view class="content">
			<view class="img-skip" @tap="bindSkip" v-if="imgs.length != 0"> 
				<text>跳过</text>
			</view>
			<swiper indicator-dots="false" autoplay="true">
				<swiper-item v-for="(img,key) in imgs" :key="key">
					<image :src="img" class="img-view" />
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import {mapState, mapMutations} from 'vuex';
	export default {
		data() {
			return {
				imgs: []
			};
		},
		computed:mapState(['hasSkip','hasLogin']),
		methods:{
			...mapMutations(['skipIndex']),
			bindSkip(){
				this.skipIndex();
				if(this.hasLogin){
					uni.reLaunch({		
						url: '../index/index'
					});
				}else{
					uni.reLaunch({
						url:'../login/login/login'
					});
				}
				
			}
		},
		onLoad() {
			
			
			if(this.hasSkip){
				this.$utils.tRequest({
					url: this.$webUrl + 'user_bank_list',
					method: 'GET',
					data: {page: 1,
						pagesize: 1,
						cardtypes: 1},
					success: res => {
						console.log("用户尚未登录或已超时 请求接口",JSON.stringify(res) );
						if (res.code === 2000) {
							uni.showToast({
								title: '用户尚未登录或已超时',
								mask: false,
								duration: 1500,
								icon:'none',
								success: () => {
									uni.reLaunch({
										url: '../login/login/login',
										success: res => {
											this.$store.commit("logout");
										},
										fail: () => {},
										complete: () => {}
									});
								}
							});
						}else{
							if(this.hasLogin){
								uni.reLaunch({		
									url: '../index/index'
								});
							}else{
								uni.reLaunch({
									url:'../login/login/login'
								});
							}
						}
					},
					fail: () => {},
					complete: () => {}
				});
				
				
			}else{
				this.imgs = ["../../static/img/ic_splash.jpg"];
				setTimeout(() => {
					this.skipIndex();
					if(this.hasLogin){
						uni.reLaunch({		
							url: '../index/index'
						});
					}else{
						uni.reLaunch({
							url:'../login/login/login'
						});
					}
				}, 3000);	
			}
		}
	}
</script>

<style>
swiper{
		height: 100vh;
	}
	.img-skip{
		width: 2.5em;
		height: 1.6em;
		position: absolute;
		z-index: 100; 
		right: 15upx;
		top: 30px; /*隐藏导航条的高度为44px*/
		background-color: #000000;
		text-align: center;
		border-radius: 15%;
		opacity: 0.4;
	}
	.img-skip text{
		font-size: 0.8em;
		line-height: 1.6em;
		color: #FFFFFF;
	}
	.img-view{
		width: 100%;
		height: 100%;
	}
</style>
