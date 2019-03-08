<template>
	<view>
		<rich-text :nodes="string"></rich-text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
				string:""
			};
		},
		onLoad:function(e){	
			var gameInfo = this.$store.getters.getGameInfoList[e.gameIndex];
			this.string = gameInfo.content;
		}
	}
</script>

<style>

</style>
