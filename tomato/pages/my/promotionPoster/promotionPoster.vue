<template>
	<view class="page t-common-font">
		<image class="r-image-c" :src="image" mode="aspectFill" @longtap="save"></image>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				image:''
			};
		},
		onLoad() {
			this.$utils.tRequest({
				url: this.$webUrl + 'user_referrel_get',
				method: 'GET',
				data: {},
				success: res => {
					this.image = res.data+"?random="+Math.random()
			
				},
				fail: () => {},
				complete: () => {}
			})
		},
		methods: {
			save() {
				uni.showModal({
					title: '提示',
					content: '是否保存图片',
					showCancel: true,
					cancelText: '不保存',
					confirmText: '保存',
					success: res => {
						uni.downloadFile({
							url: this.image,
							success: function(picres) {
								uni.hideLoading();
								if (picres.statusCode === 200) {
									uni.saveImageToPhotosAlbum({
										filePath: picres.tempFilePath,
										success: function(res) {
											uni.showToast({
												title: '保存成功',
												mask: false,
												icon: none,
												duration: 1000
											});
										}
									})
								}
							}
						})
					},
					fail: () => {},
					complete: () => {}
				});
			}
		},
	}
</script>

<style>
	html,
	body {
		width: 100%;
		height: 100%;
	}
	.r-image-c{
		width: 100%;
		height: 100%;
	}
	.t-common-font{font-weight: bold;}

	.page {
		width: 100%;
		height: 100%;
		/* background: #fff url(../../../static/img/promotion_poster_bg.png) no-repeat center; */
		background-size: 100% 100%;
	}

	.pic-bott {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 90%;
	}

	.code-box {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 25%;
		top: 0;
		margin: auto;
		width: 80%;
		height: 580upx;
		background: #fff;
		border: 1px solid #fc3a39;
		border-radius: 20upx;
	}

	.code-box>p {
		position: absolute;
		left: 0;
		bottom: -60upx;
	}
	
	.code-pic{
		width: 280upx;
		height: 280upx;
		margin: 30upx auto 0upx;
		padding: 20upx;
		border: 1px solid #BEBEBE;
		border-radius: 20upx;
	}
	
	.code-pic image{
		width: 280upx;
	}
	
	.code-pic p{margin-top: 20upx;}

	.tomato-pic {
		width: 200upx;
		height: 200upx;
		margin-top: -15%;
	}
	
	.tit-box p{
		font-size: 20px;
		line-height: 1;
		margin-top: -10upx;
	}
	
	p {
		width: 100%;
		text-align: center;
	}
</style>
