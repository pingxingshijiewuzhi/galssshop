<template>
	<view class="box">
		<view class="border">
			<view class="border_list border_top">订单编号：98979789789</view>
			<view class="border_list">退款金额： ￥ 500.0 (微信)</view>
			<view class="border_list">退款进度：<text class="border_color">退款已到账</text></view>
		</view>
		<view class="bgc"></view>
		<view class="center">
			<view class="center_title">退款进度</view>
			<view class="">
				<view class="flexs1">
					<image class="jindu" src="../../static/pic/icon_progress_sel@2x.png" mode=""></image>
					<view class="center_color center_cneter">您的退款平台处理已完成，请注意查收</view>
				</view>
				<view class="flexs1">
					<view class="center_border"></view>
					<view class="center_time center_color">0-0</view>
				</view>
			</view>
			<view class="">
				<view class="flexs1">
					<image class="jindu" src="../../static/pic/icon_progress@2x.png" mode=""></image>
					<view class="center_colors center_cneter">您的退款平台拦截成功，正在进行退款处理</view>
				</view>
				<view class="flexs1">
					<view class="center_border"></view>
					<view class="center_time center_colorss">0-0</view>
				</view>
			</view>
			<view class="">
				<view class="flexs1">
					<image class="jindu" src="../../static/pic/icon_progress@2x.png" mode=""></image>
					<view class="center_colors center_cneter">您的取消申请已提交</view>
				</view>
				<view class="flexs1">
					<view class="center_borders"></view>
					<view class="center_time center_colorss">0-0</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		methods: {}
	}
</script>

<style>
	.box {
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		background-color: #FFFFFF;
	}

	/* border */
	.border {
		width: 100%;
		height: 240rpx;
		padding-left: 30rpx;
		overflow: hidden;
	}

	.border_list {
		width: 100%;
		height: 70rpx;
		line-height: 70rpx;
	}

	.border_top {
		margin-top: 20rpx;
	}

	.border_color {
		color: #FF3237;
	}

	.bgc {
		width: 100%;
		height: 20rpx;
		background-color: #F4F4F4;
	}

	/* center */
	.jindu {
		width: 30rpx;
		height: 30rpx;
		margin-left: 50rpx;
	}

	.center_cneter {
		margin-left: 30rpx;
	}

	.center_title {
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
		margin-left: 30rpx;
	}

	.center_border {
		width: 1rpx;
		height: 150rpx;
		border: solid 1rpx #c1c1c1;
		margin-left: 65rpx;
		margin-top: 2rpx;
	}

	.center_borders {
		width: 1rpx;
		height: 150rpx;
		border: solid 1rpx #FFFFFF;
		margin-left: 65rpx;
		margin-top: 2rpx;
	}

	.center_time {
		height: 150rpx;
		display: flex;
		align-items: flex-start;
		margin-left: 40rpx;
		margin-top: 10rpx;
	}

	.center_color {
		color: #FF3237;
	}

	.center_colors {
		color: #686866;
	}

	.center_colorss {
		color: #B9B9B9;
	}
</style>
