<template>
	<view class="content">
		<page-head title="我的消息" leftIcon="fanhui" backurl="../user"></page-head>
		<view class="uni-card">
			<view class="uni-list">
			    <view class="uni-list-cell uni-collapse" v-for="(list,index) in lists" :key="index" :class="index === lists.length - 1 ? 'uni-list-cell-last' : ''">
			        <view class="uni-list-cell-navigate uni-navigate-bottom" hover-class="uni-list-cell-hover" :class="list.show ? 'uni-active' : ''"
			            @click="trigerCollapse(list.id,list.is_read)">
			            {{list.title}} <text class="time">{{list.post_time}}</text>
			        </view>
			        <view class="uni-list uni-collapse " :class="list.show ? 'uni-active' : ''" >
			            <view class="uni-list-cell uni-list-cell-navigate des" >
						   <rich-text :nodes="list.content"></rich-text>
						</view>
			        </view>
			    </view>
			</view>
			
			<uni-load-more :showMore="showmore" :loadingType="loadingType" :contentText="contentText"></uni-load-more>
		</view>
	</view>
</template>

<script>
    export default {

        data() {
            return {
                title: '我的消息',
                lists: [],
				loadingType: 0,
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				showmore:false,
				isfirst:true,
				page:1,
				pagesize:10,
				pagecount:1
            }
        },
		onLoad() {
			this.loaddata(1)
			this.isfirst=false
		},
		onPullDownRefresh() {
			//下拉刷新
			this.isfirst=true;
			this.loadingType = 1;
			this.loaddata(1)
			this.isfirst=false
		},
		onReachBottom() {
			//上拉加载
			if(this.pagecount<this.page){
				this.loadingType = 2;
				return;
			}
			if (this.loadingType !== 0) {
				return;
			}
			this.page++;
			this.loadingType = 1;
			this.loaddata(this.page)
		},
        methods: {
			loaddata(page){
				if(this.pagecount<1) return
				var that=this;
				var param={method:"user_message_list",page:that.page,pagesize:that.pagesize}
				that.$httphelper.get(param,function(res){
					var pcount=res.totalcount
					if(that.isfirst) {
						that.pagecount=pcount/that.pagesize +(pcount%that.pagesize==0?0:1)
						if(that.pagecount>1){
							that.showmore=true;
						}
					}
					if(that.page==1){
						that.lists=that.formatArray(res.list);
					}
					else{
						that.lists=that.lists.concat(that.formatArray(res.list));
					}
					that.loadingType=0;
				})
				uni.stopPullDownRefresh();
			},
			formatArray(lists){
				let array=[];
				for (let i = 0, len = lists.length; i < len; ++i) {
					let obj=lists[i]
					obj.show=false;
					array.push(obj)
				}
				return array;
			},
            trigerCollapse(id,is_read) {
				if(is_read==0){
					//更新阅读状态
					this.setStatus(id)
				}
                for (let i = 0, len = this.lists.length; i < len; ++i) {
                    if (this.lists[i].id === id) {
                        this.lists[i].show = true;
                    } else {
                        this.lists[i].show = false;
                    }
                }
            },
			setStatus(id) {
				var that=this;
				var param={method:"user_message_update",id:id}
				that.$httphelper.post(param,function(res){
					
				})
			}
			
        }
    }
</script>

<style>
	.time{margin-right: 20upx;}
	.des{background: #E9E9E9;}
</style>
