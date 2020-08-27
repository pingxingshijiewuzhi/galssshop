<template>
	<view class="content">
		<view class="top">
			<view class="money text-bold flexs">￥<text class="number">{{list.money}}</text></view>
			<view class="top_list flexs3">
				<view class="top_l" @click="goWith">提现</view>
				<view class="top_r text-white" @click="goUp">充值</view>
			</view>
		</view>
		<view class="middle">
			<view class="middle_l flexs2" @click="goBanks">
				<view class="left flexs1">
					<image src="../../static/image/yhk@2x.png"></image>
					<view>银行卡管理</view>
				</view>
				<image class="next_img" src="../../static/image/details_icon_left@2x.png"></image>
			</view>
			<view class="middle_l flexs2" @click="goTopList">
				<view class="left flexs1">
					<image src="../../static/image/czhi@2x.png"></image>
					<view>充值明细</view>
				</view>
				<image class="next_img" src="../../static/image/details_icon_left@2x.png"></image>
			</view>
			<view class="middle_l flexs2" @click="goWithList">
				<view class="left flexs1">
					<image src="../../static/image/mingxi@2x.png"></image>
					<view>提现明细</view>
				</view>
				<image class="next_img" src="../../static/image/details_icon_left@2x.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: []
			}
		},
		onShow() {
			this.initdata()
		},
		methods: {
			//获取用户信息
			initdata() {
				var obj = {};
				this.$common.requests('/api/user/membersInfo', obj).then(res => {
					// this.$api.msg(res.data.msg);
					if (res.data.code == 1) {
						this.list = res.data.data
					}
				});
			},
			goUp() {
				uni.navigateTo({
					url: 'topUp'
				})
			},
			goWith() {
				uni.navigateTo({
					url: 'withdrawal'
				})
			},
			goBanks() {
				uni.navigateTo({
					url: 'bank'
				})
			},
			goWithList() {
				uni.navigateTo({
					url: 'withdrawalList'
				})
			},
			goTopList() {
				uni.navigateTo({
					url: 'topupList'
				})
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

	.top {
		width: 97%;
		height: 360rpx;
		margin: 30rpx auto;
		background-image: url(../../static/image/bj@2x.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;

	}

	.money {
		width: 100%;
		height: 160rpx;
		color: #FFFFFF;
		font-size: 40rpx;
		letter-spacing: 4rpx;
		display: flex;
		justify-content: center;
		align-items: flex-end;
	}

	.number {
		font-size: 50rpx;
	}

	.top_list {
		width: 53%;
		height: 160rpx;
		margin: 0 auto
	}

	.top_l {
		width: 160rpx;
		height: 56rpx;
		line-height: 56rpx;
		text-align: center;
		background-color: #F2F2F2;
		border: 1px solid #F2F2F2;
		border-radius: 28rpx;
	}

	.top_r {
		width: 160rpx;
		height: 56rpx;
		line-height: 56rpx;
		text-align: center;
		border-radius: 28rpx;
		border: 1px solid #FFFFFF
	}

	.middle {
		width: 100%;
		height: 500rpx;
		margin-top: 60rpx;
	}

	.middle_l {
		width: 94%;
		height: 132rpx;
		margin: 30rpx auto;
		background-image: url(../../static/image/bgone.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}

	.left {
		width: 34%;
		height: 120rpx;
		margin-left: 30rpx
	}

	.left image {
		width: 58rpx;
		height: 52rpx;
		margin-right: 36rpx
	}

	.next_img {
		width: 16rpx;
		height: 26rpx;
		margin-right: 40rpx
	}
</style>
