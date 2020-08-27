<template>
	<!-- 没有评价记录样式-->
	<view class="contents" v-if="list.length==0">
		<view class='new_box text-center'>
			<image src="../../static/image/img_zwpj@2x.png"></image>
			<view>您还没有评价任何商品哦~</view>
		</view>
	</view>
	<view class="content" v-else>
		<view class="box">
			<view class="list" v-for="(item,index) in list" :key="index">
				<view class="list_t flexs1" v-for="(item1,index1) in item.order.order_product" :key="index1">
					<view class="left flexs">
						<image class="good_img" :src="urls+item1.image"></image>
					</view>
					<view class="right">
						<view class="title text-bold">{{item1.product_title}}</view>
						<!-- <view class="star flexs1">
							<image src="../../static/image/details_icon_evaluation@2x.png"></image>
							<image src="../../static/image/details_icon_evaluation@2x.png"></image>
							<image src="../../static/image/details_icon_evaluation@2x.png"></image>
							<image src="../../static/image/details_icon_evaluation@2x.png"></image>
							<image src="../../static/image/details_icon_evaluation@2x.png"></image>
						</view> -->
						<view class="right_b flexs2">
							{{item1.attr_sku_name}}
						</view>
					</view>
				</view>
				<view class="list_b">
					<view class="big">
						{{item.content}}
					</view>
					<block v-if="item.images[0]==''">
					</block>
					<block v-else>
						<view class="big_img flexs1">
							<image :src="urls+item2" v-for="(item2,index2) in item.images" :key="index2"></image>
						</view>
					</block>

				</view>
			</view>
			<view class='kong'></view>
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
		onBackPress(e) {
			if (e.from == 'backbutton') {
				uni.switchTab({
					url: 'personal'
				})
				return true
			}
			if (e.from == 'navigateBack') {
				uni.switchTab({
					url: 'personal'
				})
				return true
			}
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
		mounted() {

		},
		methods: {
			initdata(page, limit) {
				var obj = {
					page: page,
					limit: limit
				};
				this.$common.requests('/api/home/myEvaluate', obj).then(res => {
					if (res.data.code == 1) {
						if (page != 1) {
							if (res.data.data) {
								this.list = this.list.concat(res.data.data)
							}
						} else {
							this.list = res.data.data
							console.log(this.list)
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
		background-color: #F4F4F4;
	}

	.content {
		background-color: #F2F2F2;
	}

	.contents {
		width: 100vw;
		height: 100vh
	}

	.box {
		width: 100%;
		height: 100%;
		overflow-y: scroll;
	}

	.list {
		width: 100%;
		/* height:560rpx; */
		background-color: #FFFFFF;
		margin-bottom: 30rpx;
	}

	.kong {
		width: 100%;
		height: 60rpx;
		margin-bottom: 30rpx;
	}

	.list_t {
		width: 100%;
		height: 200rpx;
		border: 1px solid #E5E5E5
	}

	.list_b {
		width: 100%;
	}

	.good_img {
		width: 140rpx;
		height: 140rpx;
	}

	.left {
		width: 160rpx;
		height: 200rpx;
		padding-left: 20rpx
	}

	.right {
		width: 76%;
		height: 200rpx;
		padding-top: 20rpx;
		margin-left: 30rpx;
	}

	.title {
		width: 100%;
		height: 40rpx;
		font-size: 30rpx;
	}

	.star {
		width: 200rpx;
		height: 40rpx;
	}

	.star image {
		width: 26rpx;
		height: 26rpx;
		margin-right: 10rpx
	}

	.right_b {
		width: 41%;
		height: 40rpx;
		color: #999999;
		margin-top: 30rpx;
	}

	.big {
		width: 96%;
		margin: 0 auto;
		padding-top: 10rpx;
		padding-bottom: 20rpx;
		letter-spacing: 3rpx;
	}

	.big_img {
		width: 96%;
		margin: 0 auto;
		padding-bottom: 30rpx
	}

	.big_img image {
		width: 150rpx;
		height: 150rpx;
		margin-right: 40rpx
	}

	.new_box {
		width: 100%;
		height: 50%;
		margin-top: 180rpx;
		color: #9A9A9A;
		letter-spacing: 3rpx;
		font-size: 32rpx;
	}

	.new_box image {
		width: 560rpx;
		height: 400rpx;
		margin-bottom: 110rpx;
	}
</style>
