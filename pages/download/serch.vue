<template>
	<view class="box">
		<view class="kong"></view>
		<view class="title flexs1">
			<image class="title_image" @click="back" src="../../static/pic/nav_back_2@2x(1).png" mode=""></image>
			<view class="title_input flexs1">
				<image class="title_serch" src="../../static/pic/icon_search@2x.png" mode=""></image>
				<input type="text" v-model="inputp" placeholder="输入商品名称" />
				<image class="deleat" src="../../static/pic/icon_x@2x.png" mode="" @click="deleter"></image>
			</view>
			<view class="text-white" @click="gosearch()">搜索</view>
		</view>
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
					<!-- <view>{{item.is_buy}}</view> -->
					<view class="list_colors">到期时间：{{item.is_buy |dataFormat}}</view>
					<view class="list_color flexs1">
						<image src="../../static/pic/icon_download@2x.png" mode=""></image>
					</view>
				</view>
			</view>
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
	</view>
</template>

<script>
	export default {
		data() {
			return {
				urls: this.$common.baseUrl,
				inputp: '',
				list: [],
				pageSize: 10,
				page: 1,
			}
		},
		onLoad() {
			this.getdata()
		},
		onShow() {

		},
		filters: {
			dataFormat(msg) {
				console.log(msg)
				return msg.substring(0, 10);
			}
		},
		methods: {
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
				this.id = f
				this.price = e
				uni.navigateTo({
					url: '../myorder/payments?id=' + this.id + '&code=' + this.price + '&type=' + 2
				})
			},
			gosearch() {
				this.page = 1;
				this.initdata(this.page, this.pageSize);
			},
			initdata(page, pageSize) {
				var obj = {
					pageSize: this.pageSize,
					page: this.page,
					search: this.inputp
				};
				console.log(obj)
				this.$common.requests('/api/picinfo/index', obj).then(res => {
					if (res.data.code == 1) {
						if (page != 1) {
							if (res.data.data.data) {
								this.list = this.list.concat(res.data.data.data)
								// console.log(this.list)
							}
						} else {
							this.list = res.data.data.data
						}
					}
				});
			},
			getdata() {
				var obj = {
					pageSize: this.pageSize,
					page: this.page,
				};
				this.$common.requests('/api/picinfo/index', obj).then(res => {
					// this.$api.msg(res.data.msg);
					if (res.data.code == 1) {
						this.list = res.data.data.data;
					}
					console.log(this.list)
				});
			},
			deleter() {
				this.inputp = ''
				this.getdata()
			},
			tosousuo() {
				uni.navigateTo({
					url: 'serch'
				})
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
		}
	}
</script>

<style>
	.box {
		width: 100vw;
		height: 100vh;
	}
	.kong{
		width: 100%;
		height: var(--status-bar-height);
		background-color: #FF3237;
	}
	.title {
		width: 100%;
		height: 116rpx;
		background-color: #FF3237;
	}

	.title input {
		color: #FFF;
	}

	.title_input {
		width: 75%;
		height: 60rpx;
		background-color: #FF7E71;
		border-radius: 10rpx 10rpx;
		position: relative;
		margin-right: 20rpx
	}

	.title_image {
		width: 22rpx;
		height: 34rpx;
		margin: 0rpx 30rpx 0 20rpx;
	}

	.title_serch {
		width: 28rpx;
		height: 30rpx;
		margin: 0 20rpx;
	}

	.deleat {
		width: 32rpx;
		height: 32rpx;
		position: absolute;
		right: 10rpx;
	}

	.uni-input-placeholder {
		font-size: 28rpx;
		color: #FFFFFF;
	}

	/* list */
	.big_list {
		margin-bottom: 30rpx;
	}

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
</style>
