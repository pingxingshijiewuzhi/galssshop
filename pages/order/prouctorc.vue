<template>
	<view class="box">
		<view class="box_bgc"></view>
		<view class="border flexs1">
			<image src="../../static/pic/icon_place@2x.png" mode=""></image>
			<view class="">
				<view class="border_next flexs1">
					<view class="border_name">李莉莉</view>
					<view class="border_phone">1234567890</view>
				</view>
				<view class="border_ran">北京市草阳区bzuo1880</view>
			</view>
		</view>
		<view class="prouct">
			<view class="prouct_top flexs1">
				<image src="../../static/pic/img_dd@2x.png" mode=""></image>
				<view class="prouct_center">
					<view class="prouct_centerl">定制一个东西东西很精致定制一个东西东西很精致定制一个东西东西很精致</view>
					<view class="prouct_centerr">规格：2.1版本 <text class="position">X1</text></view>
				</view>
			</view>
			<view class="prouct_next prouct_top flexs2">
				<view class="product_color">商品金额</view>
				<view class=""><text>￥</text>215</view>
			</view>
			<view class="prouct_next flexs2">
				<view class="product_color">运费</view>
				<view class=""><text>￥</text>215</view>
			</view>
			<view class="prouct_last prouct_top"><text>总价</text><text class="prouct_lasts">￥215</text></view>
		</view>
		<view class="last">
			<view class="last_next prouct_top flexs2">
				<view class="product_color">订单编号</view>
				<view class="">210210</view>
			</view>
			<view class="last_next prouct_top flexs2">
				<view class="product_color">下单时间</view>
				<view class="">210210:21:21:21</view>
			</view>
			<view class="last_next prouct_top flexs2">
				<view class="product_color">支付时间</view>
				<view class="">210210:21:21:21</view>
			</view>
			<view class="last_next prouct_top flexs2">
				<view class="product_color">支付方式</view>
				<view class="">微信支付</view>
			</view>
			<view class="last_next prouct_top flexs2">
				<view class="product_color">物流单号</view>
				<view class="">210210</view>
			</view>
			<view class="last_next prouct_top flexs2">
				<view class="product_color">物流公司</view>
				<view class="">210210</view>
			</view>
			<view class="last_next prouct_top flexs2">
				<view class="product_color">配送方式</view>
				<view class="">210210</view>
			</view>
			<view class="last_next prouct_top flexs2">
				<view class="product_color">订单备注</view>
				<view class="">210210</view>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				listly: [],
				choosex: '',
				shouwzhe: false,
				model: false,

			}
		},
		methods: {
			choosephoto(id) {
				// listlythis[id].choosex = true;
				console.log(id)
			},
			hidemotify() {
				this.shouwzhe = false;
			},
			quxiaoding() {
				this.shouwzhe = true;
				this.model = true;
			},
			quxiao() {
				this.model = false;
				this.shouwzhe = false;
			},
			success() {
				this.model = false;
				this.shouwzhe = false;
			}
		}
	}
</script>

<style>
	page {
		width: 100%;
		height: 100%;
		overflow:hidden;
	}
	.box {
		width: 100vw;
		height: 100vh;
		overflow: hidden;
	}

	.box_bgc {
		width: 100%;
		height: 180rpx;
		background-color: #FF3237;
	}

	/* model */
	.mask {
		width: 100%;
		height: 100vh;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: rgba(0, 0, 0, 0.4);
	}

	.model {
		width: 80%;
		margin-left: 10%;
		background-color: #FFFFFF;
		position: absolute;
		top: calc(50vh - 200rpx);
		z-index: 999;
		border-radius: 20rpx;
	}

	.model_qu {
		width: 50%;
		line-height: 80rpx;
		border-top: solid 1rpx #E5E5E5;
		text-align: center;
	}

	.model_button {
		width: 100%;
		margin-top: 20rpx;
	}

	.model_succes {
		width: 50%;
		line-height: 80rpx;
		border-top: solid 1rpx #E5E5E5;
		border-left: solid 1rpx #E5E5E5;
		text-align: center;
		color: #FF3237;
	}

	.model_title {
		width: 100%;
		line-height: 180rpx;
		padding-top: 20rpx;
		font-size: 32rpx;
		font-weight: 600;
	}
	/* border */
	.border {
		width: 92%;
		height: 180rpx;
		background-color: #FFFFFF;
		margin: 0 auto;
		margin-top: -100rpx;
		border-radius: 20rpx 20rpx;
	}

	.border_next {
		margin-left: 30rpx;
	}

	.border image {
		width: 65rpx;
		height: 50rpx;
		margin-left: 30rpx;
	}

	.border_name {
		font-size: 34rpx;
	}

	.border_phone {
		color: #7D7D7D;
		font-size: 28rpx;
		margin-left: 20rpx;
	}

	.border_ran {
		width: 600rpx;
		margin-left: 30rpx;
		margin-top: 20rpx;
	}

	/* prouct */
	.prouct {
		width: 92%;
		height: 400rpx;
		background-color: #FFF;
		margin: 0 auto;
		padding: 0 20rpx;
		border-radius: 20rpx 20rpx;
		margin-top: 20rpx;
		overflow: hidden;
		position: relative;
	}

	.prouct_top {
		margin-top: 20rpx;
	}

	.prouct_centerl {
		overflow: hidden;
		word-break: break-all;
		/* break-all(允许在单词内换行。) */
		text-overflow: ellipsis;
		/* 超出部分省略号 */
		display: -webkit-box;
		/** 对象作为伸缩盒子模型显示 **/
		-webkit-box-orient: vertical;
		/** 设置或检索伸缩盒对象的子元素的排列方式 **/
		-webkit-line-clamp: 3;

	}

	.prouct_next {
		width: 100%;
		height: 60rpx;
		line-height: 60rpx;
	}

	.prouct_top image {
		width: 160rpx;
		height: 160rpx;
	}

	.product_color {
		color: #7D7D7D;
	}

	.prouct_last {
		width: 100%;
		text-align: right;
	}

	.prouct_lasts {
		color: #FF3237;
	}

	.prouct_center {
		width: 480rpx;
		margin-left: 20rpx;
		line-height: 38rpx;
	}

	.prouct_centerr {
		color: #9D9D9D;
		margin-top: 10rpx;
	}

	.position {
		margin-top: 10rpx;
		position: absolute;
		right: 30rpx;
	}

	/* last */
	.last {
		width: 92%;
		height: 530rpx;
		background-color: #FFF;
		margin: 0 auto;
		padding: 0 20rpx;
		border-radius: 20rpx 20rpx;
		margin-top: 20rpx;
		overflow: hidden;
	}

	.last_next {
		width: 100%;
		height: 46rpx;
		line-height: 40rpx;
	}

	/* button */
	.button {
		width: 100%;
		text-align: right;
		margin-top: 30rpx;
		padding-right: 50rpx;
	}

	.button_left {
		width: 200rpx;
		line-height: 60rpx;
		text-align: center;
		color: #FF3237;
		border: solid 1rpx #FF3237;
		display: inline-block;
		border-radius: 10rpx 10rpx;
		margin-right: 30rpx;
	}

	.button_right {
		width: 200rpx;
		line-height: 60rpx;
		text-align: center;
		background-color: #FF3237;
		color: #FFFFFF;
		display: inline-block;
		border-radius: 10rpx 10rpx;
	}
</style>
