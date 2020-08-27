<template>
	<view class="box">
		<!-- <view class="border flexs1" @click="tosousuo">
			<image src="../../static/pic/icon_search_1@2x.png" mode=""></image>
			<input type="text" placeholder="请输入您要搜索的图片名称" />
		</view> -->
		<!-- <view class="big_list">
			<view class="list " v-for="(item,index) in 5" :key="index">
				<image src="../../static/pic/img_car@2x.png" mode=""></image>
				<view class="list_center">定制艺术玻璃客厅隔断墙装饰屏风双面轻奢风雨</view>
				<view class="list_bottom flexs1">
					<view class="list_money">￥<text>5</text></view>
					<view class="list_xiazai">下载</view>
					<view class="list_color flexs1">
						<image src="../../static/pic/icon_download@2x.png" mode=""></image>
						<view class="">1234次</view>
					</view>
				</view>
			</view>
		</view> -->
		<view class="list " v-for="(item,index) in list" :key="index">
			<image :src="urls+item.image" mode=""></image>
			<view class="list_center">{{item.title}}</view>
			<view class="list_bottom flexs1">
				<view class="list_colors">到期时间：{{item.endtime_text |dataFormat}}</view>
				<view class="list_color flexs1">
					<image src="../../static/pic/icon_download@2x.png" mode=""></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				urls: this.$common.baseUrl,
			}
		},
		onLoad() {
			this.getdata()
		},
		filters: {
			dataFormat(msg) {
				return msg.substring(0, 10);
			}

		},
		methods: {
			getdata() {
				var obj = {

				}
				this.$common.requests('/api/picorder/showbuy', obj).then(res => {
					if (res.data.code == 1) {
						this.list = res.data.data.data;
					}
					console.log(this.list)
				})
			},
			tosousuo() {
				uni.navigateTo({
					url: 'serch'
				})
			}
		}
	}
</script>

<style>
	.box {
		width: 100vw;
		height: 100vh;
	}

	/* border */
	.border {
		width: 90%;
		height: 80rpx;
		margin: 0 auto;
		background-color: #EEEEEE;
		padding-top: 10rpx;
		margin-top: 30rpx;
		border-radius: 20rpx 20rpx;
	}

	.border image {
		width: 30rpx;
		height: 30rpx;
		margin-left: 30rpx;
	}

	.border input {
		width: 100%;
		height: 60rpx;
		margin-left: 30rpx;
	}

	/* list */
	.big_list {
		width: 100%;
		overflow-y: scroll;
		height: calc(100% - 140rpx);
	}

	.list {
		width: 45%;
		background-color: #FFFFFF;
		border-radius: 20rpx 20rpx;
		margin-top: 30rpx;
		position: relative;
		display: inline-block;
	}

	.list_colors {
		color: #FF3237;
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
		margin-top: 20rpx;
		padding-bottom: 10rpx;
	}

	.list_color {
		position: absolute;
		right: 20rpx;
		font-size: 28rpx;
		color: #868686;
	}

	.list_color image {
		width: 26rpx;
		height: 22rpx;
	}

	.list_xiazai {
		width: 86rpx;
		height: 40rpx;
		line-height: 40rpx;
		background-color: #FE3337;
		color: #FFFFFF;
		text-align: center;
		border-radius: 10rpx 10rpx;
		margin-left: 20rpx;
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
		padding-left: 16rpx;
	}

	.list_money text {
		font-size: 32rpx;
		font-size: 600;
	}
</style>
