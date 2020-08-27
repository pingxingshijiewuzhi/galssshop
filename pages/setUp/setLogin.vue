<template>
	<view class='content'>
		<view class="top">
			<view class='list  flexs3'>
				<image src="../../static/image/possword_icon_possword@2x.png"></image>
				<view class="list_input flexs1">
					<input class="uni-input" type="text" password placeholder="请输入原登录密码" v-model="oldpassword" />
				</view>
			</view>
			<view class='list  flexs3'>
				<image src="../../static/image/possword_icon_possword@2x.png"></image>
				<view class="list_input flexs1">
					<input class="uni-input" type="text" password placeholder="请输入新登录密码" v-model="password" />
				</view>
			</view>
			<view class='list  flexs3'>
				<image src="../../static/image/possword_icon_possword@2x.png"></image>
				<view class="list_input flexs1">
					<input class="uni-input" type="text" password placeholder="请再次输入新登录密码" v-model="repassword" />
				</view>
			</view>
		</view>
		<!-- 底部按钮 -->
		<view class="btns flexs">
			<image src='../../static/image/btn_wancheng@2x.png' @click="changePass"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				oldpassword: '',
				password: '',
				repassword: ''
			}
		},
		onLoad() {

		},
		methods: {
			goNext() {
				uni.navigateTo({
					url: 'setPasswordone'
				})
			},
			changePass() {
				var obj = {
					oldpassword: this.oldpassword,
					password: this.password,
					repassword: this.repassword,

				};
				this.$common.requests('/api/login/changePass', obj).then(res => {
					this.$api.msg(res.data.msg);
					if (res.data.code == 1) {
						setTimeout(res => {
							uni.navigateBack({
								delta: 1
							})
						}, 1000);
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
		width: 100%;
		height: 30%;
	}

	.list {
		width: 100%;
		height: 35%;
		position: relative;
		top: 30rpx;
	}

	.new {
		margin-top: 30rpx
	}

	.list image {
		width: 40rpx;
		height: 48rpx
	}

	.list_input {
		width: 85%;
		height: 120rpx;
		border-bottom: 1px solid #E5E5E5
	}

	.uni-input-placeholder {
		color: #555555 !important;
		letter-spacing: 3rpx;
	}

	.list_code {
		width: 160rpx;
		height: 50rpx;
		line-height: 50rpx;
		text-align: center;
		background-color: #D4D4D4;
		color: #FFFFFF
	}

	.btns {
		width: 100%;
		height: 120rpx;
		position: fixed;
		bottom: 32rpx
	}

	.btns image {
		width: 94%;
		height: 90rpx
	}
</style>
