<template>
	<view class="content">
		<view class="top">
			<view class="list flexs1">
				<view>订单编号：</view>
				<view>{{order.order_num}}</view>
			</view>
			<view class="list flexs1">
				<view>退款金额：</view>
				<view>￥{{list.money}}(账户余额)</view>
			</view>
			<view class="list flexs1">
				<view>退款进度：</view>
				<view class="status">{{list.Progress}}</view>
			</view>
		</view>
		<view class="big flexs1">
			<view class="left">
				<image src="../../static/pic/icon_progress_sel@2x.png"></image>
				<block v-for="(item,index) in len" :key="index" v-if="msg.length">
					<view class="line "></view>
					<image src="../../static/image/icon_kong@2x.png"></image>
				</block>
			</view>
			<view class="right">
				<block v-for="(item,index) in msg" :key="index">
					<view class="right_list">
						<view class="titles">{{item.title}}</view>
						<view>{{item.time}}</view>
					</view>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				id: '',
				order: {},
				msg: [],
				len: 0
			}
		},
		onLoad(option) {
			this.id = option.id
			this.initdata();
		},
		methods: {
			initdata() {
				var obj = {
					order_id: this.id
				};
				this.$common.requests('/api/orders/cancelDetail', obj).then(res => {
					if (res.data.code == 1) {
						this.list = res.data.data
						if (res.data.data.order) {
							this.order = res.data.data.order
						}
						if (res.data.data.msg.length > 0) {
							this.msg = res.data.data.msg
							this.len = this.msg.length - 1
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

	.content {
		background-color: #F2F2F2;
	}

	.top {
		width: 100%;
		height: 17%;
		position: relative;
		top: 30rpx;
		background-color: #FFFFFF;
	}

	.list {
		width: 94%;
		height: 70rpx;
		margin: 0 auto;
	}

	.status {
		color: #FC0201
	}

	.big {
		width: 100%;
		height: 60%;
		position: relative;
		top: 60rpx;
		background-color: #FFFFFF;
	}

	.left {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 52rpx;
		height: 84%;
		margin-left: 30rpx
	}

	.left image {
		width: 34rpx;
		height: 34rpx
	}

	.line {
		height: 104rpx;
		margin: 20rpx auto;
		border-left: 1px dashed #FF7505
	}

	.right {
		width: 75%;
		height: 84%;
		margin-left: 30rpx
	}

	.right_list {
		width: 100%;
		height: 130rpx;
		margin-bottom: 48rpx;
	}

	.right_list view {
		height: 50rpx;
	}

	.titles {
		font-size: 30rpx;
	}
</style>
