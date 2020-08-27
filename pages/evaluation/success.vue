<template>
	<view class="content">
		<view class="top">
			<view class="top_img flexs">
				<image src="../../static/image/img_plcg@2x.png"></image>
			</view>
			<view class="text-center titles text-bold">评价成功</view>
			<view class="btns flexs">
				<image src="../../static/image/look.png" @click="golook"></image>
			</view>
		</view>
		<view class="middle flexs text-bold">为你推荐</view>
		<view class="list">
			<view class="list_one flexs1" v-for="(item,index) in list" :key="index">
				<view></view>
				<image class="good_img" :src="urls+item.head_image"></image>
				<view class="right">
					<view class="title text-bold">{{item.title}}</view>
					<view class="right_b flexs1">
						<view class="money">￥<text class="money_r text-bold">{{item.low_price}}</text></view>
						<view class="number">{{item.sell_num}}人收货</view>
					</view>
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
				page: 1,
				limit: 10,
				urls: this.$common.baseUrl
			}
		},
		onLoad() {
			this.initdata(1, 15);
		},
		onPullDownRefresh() {
			console.log('refresh');
			this.page = 1;
			this.initdata(1, this.limit);
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onReachBottom() {
			this.page = this.page + 1;
			this.initdata(this.page, this.limit);
		},
		methods: {
			golook() {
				uni.navigateTo({
					url: '../personal/evaluation'
				})
			},
			initdata(page, limit) {
				var obj = {
					page: page,
					limit: limit
				};
				this.$common.requests('/api/index/recommendList', obj).then(res => {
					if (res.data.code == 1) {
						if (page != 1) {
							if (res.data.data) {
								this.list = this.list.concat(res.data.data)
							}
						} else {
							this.list = res.data.data
						}
					}
				});
			}
		}
	}
</script>

<style>
	.page {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.top {
		width: 99%;
		height: 34%;
		margin: 20rpx auto;
		background-image: url(../../static/image/bg_img.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		/* 	border:1px solid red */
	}

	.top_img {
		width: 100%;
		height: 200rpx;
		padding-top: 40rpx;
	}

	.top_img image {
		width: 86rpx;
		height: 86rpx;
	}

	.titles {
		color: #FC7E05;
		font-size: 32rpx;
	}

	.btns image {
		width: 230rpx;
		height: 50rpx;
		margin-top: 60rpx
	}

	.middle {
		font-size: 32rpx;
		letter-spacing: 4rpx;
	}

	.list {
		width: 100%;
		height: 50%;
		overflow-y: scroll;
		/* border:1px solid */
	}

	.new_list {
		width: 100%;
		height: 98%;
		border-radius: 10px;
		border: 1px solid #E5E5E5;
	}

	.list_one {
		width: 92%;
		height: 230rpx;
		margin: 30rpx auto;
		border-radius: 10px;
		border: 1px solid #E5E5E5;
	}

	.list_one_new {
		width: 92%;
		height: 230rpx;
		margin: 30rpx auto;
		border-radius: 10px;
		/* border:1px solid red; */
	}

	.list_t {
		width: 100%;
		height: 200rpx;
	}

	.list_b {
		width: 100%;
		height: 300rpx;
	}

	.good_img {
		width: 300rpx;
		height: 100%;
	}

	.left {
		width: 250rpx;
		height: 100%;
		padding-left: 20rpx;
		border: 1px solid
	}

	.right {
		width: 93%;
		height: 200rpx;
		margin-left: 30rpx;
	}

	.title {
		width: 100%;
		height: 100rpx;
		font-size: 30rpx;
	}

	.right_b {
		width: 64%;
		height: 70rpx;
		border: 1 solid red;
		margin-top: 30rpx;
	}

	.money {
		color: #FC0100;
		font-size: 24rpx;
	}

	.money_r {
		font-size: 32rpx;
	}

	.number {
		font-size: 24rpx;
		color: #888888;
		margin-left: 10rpx
	}
</style>
