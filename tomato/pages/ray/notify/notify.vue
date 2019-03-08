<template>
	<view class="page t-common-font">
		<view class="uni-card">
			<view class="uni-list">
				<block v-for="(list, index) in notifList" :key="index">
					<view class="uni-list-cell uni-collapse">
						<view class="uni-list-cell-navigate uni-navigate-bottom" :class="list.show ? 'uni-active' : ''" @click="trigerCollapse(index)">
							{{list.title}}
						</view>
						<view class="uni-collapse-content" :class="list.show ? 'uni-active' : ''">

							<view v-if="list.type === 'font'" class="page-pd">
								<view class="uni-h4">{{list.content}}</view>
							</view>

						</view>
					</view>
				</block>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				notifList: [],
			};
		},
		onLoad() {
			this.$utils.tRequest({
				url: this.$webUrl + "user_message_list",
				method: 'GET',
				data: {},
				success: res => {
					if (res.code == 0) {
						// this.list = res.data.list;
						var res = res.data.list;
						for (let i = 0; i < res.length; i++) {
							res[i].type = 'font';
							res[i].show = false;
						}
						this.notifList = res;
						console.log(this.notifList);
					}
				},
				fail: () => {},
				complete: () => {}
			})
		},
		methods: {
			trigerCollapse(e) {
				for (let i = 0, len = this.notifList.length; i < len; ++i) {
					if (e === i) {
						this.notifList[i].show = !this.notifList[i].show;
					} else {
						this.notifList[i].show = false;
					}
				}
			}

		}
	}
</script>

<style>
	.t-cell {
		flex-direction: column;
		font-weight: bold;
		align-items: flex-start;
		margin-right: 30upx;
	}

	.t-cell view:first-child {
		width: 100%;
		font-size: 40upx;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;

	}

	.t-cell view:last-child {
		width: 100%;
		line-height: 30upx;
		font-size: 26upx;
		color: #8f8f94;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
</style>
