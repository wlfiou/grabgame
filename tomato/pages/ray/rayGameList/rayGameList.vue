<template>
	<view>
		<view class="uni-list">
			<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(value,index) in list" :key="index">
				<view class="uni-media-list" @tap="toplayGame" :data-index='index' :data-ispwd='value.ispwd'>
					<view class="uni-media-list-logo">
						<image class="tleftimage" :src="value.imgurl==''?defaultImg:value.imgurl"></image>
					</view>
					<view class="uni-media-list-body">
						<text>{{value.title}}</text>
					</view>
				</view>
			</view>
		</view> 
		<neil-modal :show="showRoomPass" @close="closeModal" @confirm="checkPass" title="请输入用户名密码">
		    <view class="input-view">
		        <view class="input-name">
		            <input v-model="pass" type="text" placeholder="请输入房间密码" />
		        </view> 
		    </view>
		</neil-modal>
	</view>
	
</template>

<script>
	import neilModal from '@/components/neil-modal.vue';
	var item;
	export default {
		data() {
			return {
				showRoomPass:false,
				gameInfo: null,
				pass:'',
				list: [],
				websocketIsOpen: false,
				defaultImg:'../../../static/img/group_select.png'
			};
		},
		computed: {
			
		},
		onLoad(e) {
			var that = this;
			this.gameInfo = this.$store.getters.getGameInfoList[e.gameIndex];
			this.loadGameList(this.gameInfo.callindex)
			uni.connectSocket({
				url: this.$webSocketUrl + 'plhb' + '_chat'
			});
			uni.onSocketOpen(function() {
				console.log('WebSocket连接已打开！');
				that.websocketIsOpen = true;
			});
			uni.onSocketError(function(res) {
				console.log('WebSocket连接打开失败，正在进行重连！');
				that.$utils.pluginRequest('sys_start_process', 'plhb', null, 'GET', null,
					res => {
						//suc
						if (res.code == 0) {
							setTimeout(() => {
								uni.connectSocket({
									url: that.$webSocketUrl + 'plhb' + '_chat'
								});
								uni.onSocketOpen(function() {
									console.log('WebSocket连接已打开！');
									that.websocketIsOpen = true;
								});
							}, 2000)
						}else{
							console.log(res.msg);
						}
					},
					res => {
						//fail
					},
					res => {
						//complete
					});
				
			});
		},
		onUnload() {
			uni.closeSocket({
				url: this.$webSocketUrl + 'plhb' + '_chat'
			})
		},
		onBackPress: function(res) {
			uni.closeSocket({
				url: this.$webSocketUrl + 'plhb' + '_chat'
			});
			this.$store.dispatch("setCurrentRoomInfo",null);
		},
		methods: {
			loadGameList(callindex) {
				var data = {
					page: 1,
					pagesize: 50
				};
				this.$utils.pluginRequest('pl_room_list', 'plhb', data, 'GET', null,
					res => {
						//suc
						if (res.code == 0) {
							this.list = res.data.list;
							console.log(JSON.stringify(this.list));
						}
					},
					res => {
						//fail
					},
					res => {
						//complete
					});
			},
			closeModal:function(){
				this.showRoomPass = !this.showRoomPass;
			},
			checkPass:function(){
				var data = {
					roomid:item.roomid,
					password:this.pass
				}
				this.$utils.defalsePluginRequest('pl_room_check',this.gameInfo.callindex,data,
				res => {
					if(res.code == 0){
						var roomKey = item.roomid.toString();
						uni.setStorageSync(roomKey,true)
						this.jionRoom(item);
					}else
					{
						uni.showToast({
							title: res.msg,
							icon:'none',
							mask: false,
							duration: 2000
						});
					}
				},
				res => {
					
				},
				res => {
					
				}
				)
			},
			jionRoom(item){
				console.log('item='+item)
				var roomid = item.roomid;
				var title = item.title;
				var ispwd = item.ispwd;
				this.$store.dispatch("setCurrentRoomInfo",item);
				uni.navigateTo({
					url: '../../ray/rayGame/rayGame?roomid=' + roomid + '&callindex=' + this.gameInfo.callindex + '&title=' + title +'&websocketIsOpen=' + this.websocketIsOpen
				});
			},
			toplayGame: function(e) {
				var index = e.currentTarget.dataset.index;
				item = this.list[index];
				if(item.ispwd == 0){
					this.jionRoom(item);
				}else{ 
					var isJioned = uni.getStorageSync(item.roomid.toString());
					if(isJioned){
						this.jionRoom(item);
					}else{
						this.showRoomPass = !this.showRoomPass;
					}
					
				}
				
			}
		},
		components: {
		    neilModal
		},
	}
</script>

<style>
	.tleftimage {
		border-radius: 60upx;
	}

	.uni-media-list-body text {
		font-weight: bold;
		height: 84upx;
		line-height: 84upx;
	}
	.input-name{
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
