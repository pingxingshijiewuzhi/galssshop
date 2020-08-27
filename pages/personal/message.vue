<template>
	<view class="content">
		<view class="big">
			<!-- 没有消息样式-->
			<block v-if="list==[]">
				<view class='box text-center'>
					<image src="../../static/image/img_xx@2x.png"></image>
					<view>您还没有消息哦~</view>
				</view>
			</block>
			<block v-else>
				<view class="list" v-for="(item,index) in list" :key="index">
					<view class="top flexs">{{item.updatetime}}</view>
					<!-- 判断状态点详情 -->
					<block v-if="item.status==4">
						<view class="list_l flexs2" @click="goFahuo">
							<image class="good_img" :src="urls+item.order_product[0].image"></image>
							<view class="right">
								<view class="name">{{item.order_product[0].product_title}}</view>
								<view>订单号：{{item.order_num}}</view>
							</view>
						</view>
					</block>
					<block v-if="item.status==5">
						<view class="list_l flexs2" @click="goShouhuo">
							<image class="good_img" :src="urls+item.order_product[0].image"></image>
							<view class="right">
								<view class="name">{{item.order_product[0].product_title}}</view>
								<view>订单号：{{item.order_num}}</view>
							</view>
						</view>
					</block>
					<block v-if="item.status==6">
						<view class="list_l flexs2">
							<image class="good_img" :src="urls+item.order_product[0].image"></image>
							<view class="right">
								<view class="name">{{item.order_product[0].product_title}}</view>
								<view>订单号：{{item.order_num}}</view>
							</view>
						</view>
					</block>
					<!-- 判断订单状态 -->
					<block v-if="item.status==4">
						<image class="status_img" src="../../static/image/img_yifahuo@2x.png"></image>
					</block>
					<block v-if="item.status==5">
						<image class="status_img" src="../../static/image/img_ysh@2x.png"></image>
					</block>
					<block v-if="item.status==6">
						<image class="status_img" src="../../static/image/img_ywc@2x.png"></image>
					</block>
				</view>
			</block>
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
			this.initdata(1, 10);
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
			goFahuo() {

				uni.navigateTo({
					url: '../order/orderList?Inv=2'
				})
			},
			goShouhuo() {
				console.log(11)
				uni.navigateTo({
					url: '../order/orderList?Inv=3'
				})
			},
			initdata(page, limit) {
				var obj = {
					page: page,
					limit: limit
				};
				this.$common.requests('/api/sysinfo/myInfo', obj).then(res => {
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
	page {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.big {
		width: 100%;
		height: 95%;
		overflow-y: scroll;
	}

	.list {
		width: 92%;
		height: 288rpx;
		margin: 28rpx auto;
	}

	.top {
		height: 82rpx;
		letter-spacing: 3rpx;
	}

	.list_l {
		width: 100%;
		height: 224rpx;
		border-radius: 20rpx;
		border: 1px solid #FFC086
	}

	.good_img {
		width: 166rpx;
		height: 176rpx;
		margin-left: 20rpx;
	}

	.right {
		width: 70%;
		height: 80%;
	}

	.name {
		font-size: 30rpx;
		font-weight: 600rpx;
		margin-bottom: 46rpx
	}

	.status_img {
		width: 140rpx;
		height: 108rpx;
		position: relative;
		top: -180rpx;
		left: 520rpx
	}

	.box {
		width: 100%;
		height: 50%;
		margin-top: 180rpx;
		color: #9A9A9A;
		letter-spacing: 3rpx;
		font-size: 32rpx;
	}

	.box image {
		width: 560rpx;
		height: 400rpx;
		margin-bottom: 110rpx;
	}
</style>
