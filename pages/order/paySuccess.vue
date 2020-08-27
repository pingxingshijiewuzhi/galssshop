<template>
	<view class="content">
		<view class="top">
			<view class="top_img flexs">
				<image src="../../static/pic/icon_complete@2x.png"></image>
			</view>
			<view class="text-center titles text-bold">￥{{price}} <text class="wenzi">支付成功！</text></view>
			<view class="btns flexs" @click="goList">
				查看订单
				<!-- <image src="../../static/image/look.png" @click="goList"></image> -->
			</view>
		</view>
		<view class="middle flexs text-bold">
			<view class='line'></view>
			<image src="../../static/pic/icon_recommend@2x.png"></image>
			<view class="tui">为你推荐</view>
			<view class='line'></view>
		</view>
		<view class="list flexs11">
			<view class="list_one" v-for="(item,index) in listData" :key="index">
				<image class="good_img" :src="urls+item.head_image"></image>
				<view class="title ">{{item.title}}</view>
				<view class="money">￥<text class="money_r text-bold">{{item.low_price}}</text></view>
			</view>
			<!-- <view class="list_one flexs1" v-for="(item,index) in listData" :key="index">
					<view></view>
					<image class="good_img" :src="urls+item.head_image"></image>
					<view class="right">
						<view class="title text-bold">{{item.title}}</view>
						<view class="neirong ">{{item.description}}</view>
						<view class="right_b flexs1">
							<view class="money">￥<text class="money_r text-bold">{{item.low_price}}</text></view>
							<view class="number">{{item.sell_num}}人收货</view>
						</view>
					</view>
			</view> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				price: '',
				listData: [],
				urls: this.$common.baseUrl,
			}
		},
		onLoad(option) {
			this.price = option.price
			this.getdata()
		},
		methods: {
			goList() {
				uni.navigateTo({
					url: 'orderList?Inv=1'
				})
			},
			getdata() {
				var obj = {

				};
				console.log(obj)
				this.$common.requests('/api/index/recommendList', obj).then(res => {
					if (res.data.code == 1) {
						this.listData = res.data.data
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

	.content {
		width: 100vw;
		height: 100vh;
		background-color: #FFFFFF;
	}

	.top {
		width: 99%;
		height: 370rpx;
		margin: 0rpx auto;
	}

	.top_img {
		width: 100%;
		height: 200rpx;
		padding-top: 40rpx;
	}

	.top_img image {
		width: 110rpx;
		height: 110rpx;
	}

	.titles {
		width: auto;
		color: #000000;
		font-size: 32rpx;
	}

	.wenzi {
		margin-left: 20rpx
	}

	.btns {
		width: 160rpx;
		height: 54rpx;
		border: 1px solid #FF3137;
		color: #FF3137;
		border-radius: 14rpx;
		margin: 30rpx auto;
	}

	.middle {
		width: 100%;
		height: 60rpx;
		font-size: 32rpx;
		color: #FF3237;
		letter-spacing: 3rpx;
		margin-bottom: 20rpx
	}

	.middle image {
		width: 34rpx;
		height: 34rpx;
		margin-left: 20rpx;
		margin-right: 20rpx
	}

	.tui {
		margin-right: 20rpx
	}

	.line {
		width: 222rpx;
		border-top: 1px solid #E4E4E4
	}

	.list {
		width: 100%;
		height: 55%;
		flex-wrap: wrap;
		overflow-y: scroll;
	}

	.new_list {
		width: 100%;
		height: 98%;
		border-radius: 10px;
		border: 1px solid #E5E5E5;
	}

	.list_one {
		width: 240rpx;
		height: 360rpx;
		margin: 0 0rpx 10rpx 6rpx;
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
		height: 208rpx;
		border-radius: 10px;
	}

	.left {
		width: 250rpx;
		height: 100%;
		padding-left: 20rpx;
	}

	.right {
		width: 93%;
		height: 224rpx;
		margin-left: 30rpx;
	}

	.title {
		width: 100%;
		height: 74rpx;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		padding-left: 10rpx
	}

	.neirong {
		width: 100%;
		height: 60rpx;
	}

	.right_b {
		width: 64%;
		height: 70rpx;
		border: 1 solid red;
		margin-top: 4rpx;
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
