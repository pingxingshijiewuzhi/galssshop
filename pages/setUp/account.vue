<template>
	<view class="content">
		<view class="list flexs2" @click="goAccount">
			<view class='list_r'>修改手机号</view>
			<view class=' list_new flexs2'>
				<view></view>
				<image class="top_next" src="../../static/image/details_icon_left@2x.png"></image>
			</view>
		</view>
		<view class="list flexs2" @click="goLogin">
			<view class='list_r'>修改登录密码</view>
			<view class=' list_new flexs2'>
				<view></view>
				<image class="top_next" src="../../static/image/details_icon_left@2x.png"></image>
			</view>
		</view>

		<view class="list flexs2" @click="goPay" v-show="list.pay_password==null">
			<view class='list_r'>设置支付密码</view>
			<view class=' list_new flexs2'>
				<view></view>
				<image class="top_next" src="../../static/image/details_icon_left@2x.png"></image>
			</view>
		</view>
		<!-- 判断是否设置支付密码，有的话显示修改、忘记支付密码 -->
		<view class="list flexs2" @click="goPaynew" v-show="list.pay_password">
			<view class='list_r'>修改支付密码</view>
			<view class=' list_new flexs2'>
				<view></view>
				<image class="top_next" src="../../static/image/details_icon_left@2x.png"></image>
			</view>
		</view>
		<view class="list flexs2" @click="goset" v-show="list.pay_password">
			<view class='list_r'>忘记支付密码</view>
			<view class=' list_new flexs2'>
				<view></view>
				<image class="top_next" src="../../static/image/details_icon_left@2x.png"></image>
			</view>
		</view>
		<!-- 底部按钮 -->
		<!-- <view class="btns flexs" >
			<image src='../../static/image/out.png'></image>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: []
			}
		},
		onLoad() {

		},
		onShow() {
			this.initdata();
		},
		methods: {
			goAccount() {
				uni.navigateTo({
					url: "setMobile"
				})
			},
			goLogin() {
				uni.navigateTo({
					url: "setLogin"
				})
			},
			goPay() {
				uni.navigateTo({
					url: "setPay"
				})
			},
			goPaynew() {
				uni.navigateTo({
					url: "setPaynew"
				})
			},
			goset() {
				uni.navigateTo({
					url: "setForget"
				})
			},
			initdata() {
				var obj = {};
				this.$common.requests('/api/user/membersInfo', obj).then(res => {
					// this.$api.msg(res.data.msg);
					if (res.data.code == 1) {
						this.list = res.data.data
					}
				});
			},
		}
	}
</script>

<style>
	.top {
		width: 100%;
		height: 11%;
		border-bottom: 1px solid #E5E5E5;
	}

	.top_right {
		width: 20%;
		margin-right: 30rpx
	}

	.top_left {
		letter-spacing: 4rpx;
		margin-left: 30rpx;
	}

	.top_avatar {
		width: 90rpx;
		height: 90rpx;
		border-radius: 45rpx;
	}

	.top_next {
		width: 16rpx;
		height: 26rpx
	}

	.list {
		width: 100%;
		height: 10%;
		border-bottom: 1px solid #E5E5E5;
	}

	.list_r {
		width: 24%;
		margin-left: 30rpx;
	}

	.list_new {
		width: 21%;
		margin-right: 30rpx
	}

	.list_img {
		width: 50rpx;
		height: 50rpx
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
</style>
