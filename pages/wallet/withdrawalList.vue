<template>
	<view class="content">
		<view class="list">
			<!-- 没有提现记录样式-->
			<!-- <view class='box text-center'>
				<image src="../../static/image/img_zwtxjl@2x.png"></image>
				<view >暂无支付记录</view>
			</view> -->
			<!-- 有提现记录 -->
			<view class='lis_one flexs1' v-for="(item,index) in data" :key="index">
				<view class="left">
					<view class="title">{{item.bankName}}</view>
					<view class="times">{{item.createtime}}</view>
				</view>
				<view class="right text-right">
					<view class="text-colors">￥{{item.money}}</view>
					<view class="text-orange">{{item.status == 1?'处理中':item.status == 2?'成功':'失败'}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data: [],
				bank: {}
			}
		},
		onLoad() {
			this.initData();
		},
		methods: {
			initData() {
				var obj = {};
				this.$common.requests('/api/home/getCashList', obj).then(res => {
					console.log(res.data);
					if (res.data.code == 1) {
						this.data = res.data.data;
					} else {
						this.$api.msg(res.data.msg)
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

	.list {
		width: 100%;
		height: 95%;
		overflow-y: scroll;
		/* 	border: 1px solid; */
	}

	.lis_one {
		width: 94%;
		height: 126rpx;
		margin: 20rpx auto;
		border-bottom: 1px solid #E5E5E5
	}

	.left {
		width: 65%;
		height: 100%;
		line-height: 48rpx;
		letter-spacing: 4rpx;
	}

	.title {
		font-size: 32rpx;
	}

	.right {
		width: 35%;
		height: 100%;
		line-height: 48rpx
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

	.times {
		color: #A8A8A8;
	}
</style>
