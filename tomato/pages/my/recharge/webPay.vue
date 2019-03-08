<template>
	<view>
		<web-view :src="url" @message="getMessage" :webview-styles="webviewStyles"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: '',
				webviewStyles: {
					progress: {
						color: '#FF3333'
					}
				}
			}
		},
		onLoad(options) {
			this.url = uni.encodeURIComponent(this.$store.getters.getPayInfo) ;
		},
		methods: {
			getMessage(event) {
				uni.showModal({
					content: JSON.stringify(event.detail),
					showCancel: false
				});
			}
		}
	}
</script>

<style>

</style>
