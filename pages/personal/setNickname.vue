<template>
	<view class="content">
		<view class="top flexs1">
			<input class="uni-input" type="text" placeholder="请输入用户昵称" v-model="nickname" />
			<image src="../../static/pic/icon_xx@2x.png" mode=""></image>
		</view>
		<view class="title">4-20个字符,可由英文、数字组成</view>
		<!-- 底部按钮 -->
		<view class="btns flexs" @click="editmsg">
			<!-- <image src='../../static/image/btn_queding@2x.png' ></image> -->
			确定
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nickname: '',
				userinfo: {}
			}
		},
		onLoad() {},
		methods: {
			editmsg() {
				var obj = {
					nickname: this.nickname,
					avatar: uni.getStorageSync('userinfo').avatar
				};
				this.$common.requests('/api/user/profile', obj).then(res => {
					this.$api.msg(res.data.msg);
					if (res.data.code == 1) {
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						}, 1000)
						// this.list = res.data.data
					}
				});
			}
		}
	}
</script>

<style>
	page {
		background-color: #F4F4F4;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.center {
		width: 100vw;
		height: 100vh;
	}

	.top {
		width: 100%;
		height: 110rpx;
		background-color: #FFFFFF;
		margin-top: 20rpx;
		position: relative;
	}

	.top image {
		width: 30rpx;
		height: 30rpx;
		position: absolute;
		right: 30rpx;
	}

	.uni-input {
		width: 80%;
		height: 100%;
		margin-left: 30rpx
	}

	.title {
		width: 94%;
		height: 50rpx;
		line-height: 50rpx;
		margin-left: 30rpx;
		color: #999999;
		margin-top: 20rpx;
	}

	.btns {
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		position: fixed;
		bottom: 0;
		background-color: #FF3237;
		color: #FFFFFF;
	}

	.btns image {
		width: 94%;
		height: 100rpx
	}
</style>
