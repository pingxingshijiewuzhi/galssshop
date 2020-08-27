<template>
	<view class="content">
		<view class="top flexs1">充值方式</view>
		<view class="middle">
			<radio-group class="block" @change="RadioChange">
				<view class="middle_l flexs2">
					<view class="left flexs3">
						<image src="../../static/image/icon_wx@2x.png"></image>
						<view class="title">微信支付</view>
					</view>
					<radio :class="radio==1?'checked orange':''" :checked="radio==1?true:false" value='1'></radio>
				</view>
				<view class="middle_l flexs2">
					<view class="left flexs3">
						<image src="../../static/image/icon_zfb@2x.png"></image>
						<view class="title">支付宝支付</view>
					</view>
					<radio :class="radio==2?'checked orange':''" :checked="radio==2?true:false" value='2'></radio>
				</view>
			</radio-group>
		</view>
		<view class="bottom">
			<view class="bottom_t flexs1">充值金额</view>
			<view class="bottom_l">
				<text class="small">￥</text>
				<view class="box">
					<input class="uni-input" type="number" placeholder="" v-model="money" />
				</view>
			</view>
		</view>
		<!-- 底部按钮 -->
		<view class="btns flexs">
			<image src='../../static/image/btn_queding@2x.png' @click="gotopup"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				radio: 1,
				money: ''
			}
		},
		onLoad() {

		},
		methods: {
			RadioChange(e) {
				this.radio = e.detail.value
			},
			gotopup() {
				var obj = {
					type: this.radio,
					money: this.money
				};
				this.$common.requests('/api/home/reCharge', obj).then(res => {
					this.$api.msg(res.data.msg);
					if (res.data.code == 1) {
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						}, 1000)
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
		background-color: #F2F2F2;
	}

	.top {
		width: 100%;
		height: 80rpx;
		padding-left: 30rpx;
		letter-spacing: 3rpx;
		font-size: 32rpx;
	}

	.middle {
		width: 100%;
		height: 20%;
		margin: 30rpx 0 30rpx 0;
		background-color: #FFFFFF;
	}

	.middle_l {
		width: 94%;
		height: 86rpx;
		padding-top: 30rpx;
	}

	.left {
		width: 40%;
		height: 100%;
	}

	.left image {
		width: 50rpx;
		height: 50rpx;
		border-radius: 25rpx;
	}

	.bottom {
		width: 100%;
		height: 20%;
		margin: 30rpx 0 30rpx 0;
		background-color: #FFFFFF;
	}

	.bottom_t {
		width: 100%;
		height: 100rpx;
		font-size: 32rpx;
		padding-left: 30rpx;
	}

	.bottom_l {
		width: 100%;
		height: 84rpx;
		padding-left: 30rpx;
	}

	.box {
		width: 90%;
		border-bottom: 1rpx solid #E5E5E5;
		margin-left: 20rpx
	}

	.small {
		font-size: 32rpx;
	}

	.btns {
		width: 100%;
		height: 120rpx;
		position: fixed;
		bottom: 32rpx
	}

	.btns image {
		width: 94%;
		height: 100rpx
	}

	.title {
		width: 140rpx;
	}
</style>
