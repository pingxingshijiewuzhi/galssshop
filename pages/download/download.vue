<template>
	<view class="box">
		<view class="border flexs1" @click="tosousuo">
			<image src="../../static/pic/icon_search_1@2x.png" mode=""></image>
			<input type="text" placeholder="请输入您要搜索的图片名称" />
		</view>
		<!-- <view class='copyborder'></view> -->
		<view class="big_list">
			<view class="list " v-for="(item,index) in list" :key="index">
				<image :src="urls+item.small_image" mode="" @click="datu(item.image)"></image>
				<view class="list_center">{{item.title}}</view>
				<view class="list_bottom flexs1" v-if="item.is_buy==0">
					<view class="list_money">￥<text class="fw">{{item.price}}</text></view>
					<view class="list_xiazai" @click="toxiazai(item.price,item.id)">下载</view>
					<view class="list_color flexs1">
						<image src="../../static/pic/icon_download@2x.png" mode=""></image>
						<view class="">{{item.download_num}}次</view>
					</view>
				</view>
				<view class="list_bottom flexs1" v-else>
					<view class="list_colors">到期时间：{{item.is_buy | dataFormat}}</view>
					<view class="list_color flexs1">
						<image src="../../static/pic/icon_download@2x.png" mode="" @click="xiazaiph(item.image)"></image>
					</view>
				</view>
			</view>
			<view v-if='showLoadMore' class='hint'>{{loadMoreText}}</view>
		</view>
		<!-- 		<view class="list " v-for="(item,index) in 5" :key = "index">
				<image src="../../static/pic/img_car@2x.png" mode=""></image>
				<view class="list_center">定制艺术玻璃客厅隔断墙装饰屏风双面轻奢风雨</view>
				<view class="list_bottom flexs1">
					<view class="list_colors">到期时间：2121—21-21</view>
					<view class="list_color flexs1">
						<image src="../../static/pic/icon_download@2x.png" mode=""></image>
					</view>
				</view>
		</view> -->
		<view style='height:50px'></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				urls: this.$common.baseUrl,
				list: [],
				pageSize: 10,
				page: 1,
				relize: 0,
				show: true,
				id: '',
				price: '',
				loadMoreText: "加载中...",
				showLoadMore: false,
			}
		},
		onLoad() {

		},
		onShow() {
			this.getdata()
		},
		onPullDownRefresh() {
			console.log('refresh');
			this.page = 1;
			this.getdata()
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onReachBottom() {
			if(this.relize != 0){
			this.showLoadMore = true
				this.page++
				this.getdata()
				setTimeout(()=>{
					this.showLoadMore = false
				},1000)
			}else{
				this.loadMoreText ='暂无更多'
				this.showLoadMore = true
				setTimeout(()=>{
					this.showLoadMore = false
				},1000)
			}
		},
		
		filters: {
			dataFormat(msg) {
				// console.log(msg)
				return msg.substring(0, 10);
			}
		},
		methods: {
			xiazaiph(res) {
				// console.log(this.urls+res)
				var oA = document.createElement("a");
				oA.download = ''; // 设置下载的文件名，默认是'下载'
				oA.href = this.urls + res;
				document.body.appendChild(oA);
				oA.click();
				oA.remove(); // 下载之后把创建的元素删除

			},
			datu(image) {
				console.log(this.urls + image)
				if (!Array.isArray(this.urls + image)) {
					var imagearr = [this.urls + image];
				} else {
					var imagearr = this.urls + image;
				}
				console.log(imagearr)
				uni.previewImage({
					current: 0,
					urls: imagearr,
					loop: true
				})
			},
			toxiazai(e, f) {
				this.price = e
				this.id = f
				uni.navigateTo({
					url: '../myorder/payments?id=' + this.id + '&code=' + this.price + '&type=' + 2
				})
			},
			tosousuo() {
				uni.navigateTo({
					url: 'serch'
				})
			},
			getdata() {
				var obj = {
					pageSize: this.pageSize,
					page: this.page,
				};
				this.$common.requests('/api/picinfo/index', obj).then(res => {
					// this.$api.msg(res.data.msg);
					this.relize = res.data.data.data.length
					if (res.data.code == 1) {
						if (this.page == 1) {
							this.list = res.data.data.data;
						} else {
							this.list = this.list.concat(res.data.data.data)
						}
					}
				});
			},
		},
	}
</script>

<style>
	.box {
		width: 100vw;
		height: 100vh;
		position: relative;
		/* #ifdef H5 */
		padding-bottom: 50px;
		/* #endif */
	}

	/* border */
	.border{
		width: 89%;
		height: 60rpx;
		margin: 0 auto;
		background-color: #EEEEEE;
		padding-top: 10rpx;
		margin-top: 30rpx;
		border-radius: 20rpx 20rpx;
	}
	.big_list {
		margin-bottom: 120rpx;
	}

	.border image {
		width: 36rpx;
		height: 30rpx;
		margin-left: 30rpx;
	}

	.border input {
		width: 100%;
		height: 60rpx;
		margin-left: 30rpx;
	}

	/* list */
	/* 	.big_list {
		width: 100%;
		overflow-y: scroll;
		height: calc(100% - 140rpx);
	} */

	.list {
		width: 45%;
		height: auto;
		background-color: #FFFFFF;
		border-radius: 20rpx 20rpx;
		margin-top: 30rpx;
		position: relative;
		display: inline-block;
	}

	.list_colors {
		color: #FC716F;
		font-size: 26rpx;
		padding-left: 13rpx;
	}

	.list:nth-child(odd) {
		margin-left: 3%;
		margin-right: 4%;
	}

	.list image {
		width: 100%;
		height: 360rpx;
		border-radius: 20rpx 20rpx 0 0;
	}

	.list_bottom {
		width: 100%;
		height: 52rpx;
		margin-top: 20rpx;
		padding-bottom: 10rpx;
	}

	.list_color {
		position: absolute;
		right: 8rpx;
		color: #868686;
	}

	.list_color image {
		width: 22rpx;
		height: 20rpx;
		margin-right: 6rpx;
	}

	.list_color view {
		font-size: 26rpx;
	}

	.list_xiazai {
		width: 70rpx;
		height: 42rpx;
		line-height: 42rpx;
		background-color: #FE3337;
		color: #FFFFFF;
		text-align: center;
		border-radius: 10rpx 10rpx;
		margin-left: 10rpx;
		font-size: 26rpx;
	}

	.list_center {
		width: 100%;
		height: 80rpx;
		line-height: 40rpx;
		margin-top: 12rpx;
		overflow: hidden;
		word-break: break-all;
		/* break-all(允许在单词内换行。) */
		text-overflow: ellipsis;
		/* 超出部分省略号 */
		display: -webkit-box;
		/** 对象作为伸缩盒子模型显示 **/
		-webkit-box-orient: vertical;
		/** 设置或检索伸缩盒对象的子元素的排列方式 **/
		-webkit-line-clamp: 2;
		padding: 0 16rpx;
	}

	.list_money {
		width: 160rpx;
		padding-left: 16rpx;
		font-size: 26rpx;
	}

	.list_money text {
		font-size: 32rpx;
		font-size: 600;
	}

	.uni-input-placeholder {
		font-size: 28rpx;
	}

	.fw {
		font-weight: 600;
	}
	.hint{
		text-align: center;
	}
</style>
