<template>
	<!-- 收益记录页面 -->
	<view class="page t-common-font uni-page-body">
		<view class="uni-flex uni-row my-money">
			<view class="uni-common-pl" style="flex: 1;">
				<p>我的推广总收益（元）</p>
				<h1>{{user.referralamount}}</h1>
			</view>
			<!-- <view class="uni-common-pl" style="flex: 1;">
				<p>今日推广收益（元）</p>
				<h1>{{todayRevenue}}</h1>
			</view> -->
		</view>
		<view class="content uni-common-mt">
			<view v-if="showNull" class="uni-center showNull">
				<image src="../../../static/img/ic_empty_message.png" mode="widthFix" class="nullPic"></image>
				<p>暂无数据</p>
			</view>
			<view class="uni-flex uni-row revenueList uni-list-cell" v-for="(item, index) in RevenueList" :key="index">
				<view class="text" style="flex: 1;">
					<view class="uni-flex uni-row">
						<view class="text">
							<image class="avatar" :src="item.avatar"></image>
						</view>
						<view class="text">
							<p>{{item.nick_name}}</p>
							<p>{{item.user_name}}</p>
						</view>
					</view>
				</view>
				<view class="text">
					<p style="text-align: center;">注册成功</p>
					<p>{{item.reg_time}}</p>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from '../../../components/uni-nav-bar.vue';
	var page = 1;
	var pagesize = 10;
	export default {
		data() {
			return {
				RevenueList: [
// 					{
// 						user_name: '15918047140',
// 						nick_name: 'ppppp',
// 						avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1548997951295&di=0f0d1f98941ac81b5a1210ae2481ca03&imgtype=0&src=http%3A%2F%2Fpic.90sjimg.com%2Fdesign%2F00%2F67%2F59%2F63%2F58e89bee922a2.png',
// 						reg_time: '2019-02-15 18:08:31'
// 					},
// 					{
// 						user_name: '15017684874',
// 						nick_name: 'ttttt',
// 						avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1548997951295&di=0f0d1f98941ac81b5a1210ae2481ca03&imgtype=0&src=http%3A%2F%2Fpic.90sjimg.com%2Fdesign%2F00%2F67%2F59%2F63%2F58e89bee922a2.png',
// 						reg_time: '2019-02-15 18:08:31'
// 					}
				],
				showNull: true
			};
		},
		onLoad() {
			this.$utils.tRequest({
				url: this.$webUrl + 'user_referrel_list',
				method: 'GET',
				data: {
					page: page,
					pagesize: pagesize
				},
				success: res => {
					console.log(res);
					if (res.code == 0 && res.data.list.length > 0) {
						this.showNull = false;
						this.RevenueList = res.data.list;
					}

				},
				fail: () => {},
				complete: () => {}
			})
		},
		methods: {},
		computed: {
			user() {
				return this.$store.getters.getUserInfo
			}
		},
		components: {
			uniNavBar
		}

	}
</script>

<style>
	.t-common-font {
		font-weight: bold;
	}

	.my-money {
		background: #fc3a39;
		color: #fff;
	}

	.nullPic {
		width: 250upx;
	}

	.showNull {
		margin-top: 300upx;
	}

	.showNull p {
		color: #666;
	}

	.revenueList {
		height: 100upx;
		padding: 1%;
		margin-bottom: 10upx;
	}

	.avatar {
		width: 80upx;
		height: 80upx;
		margin: 10upx 10upx 0upx 0upx;
		border-radius: 50%;
	}
</style>
