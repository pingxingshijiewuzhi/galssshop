<template>
	<view class='content'>
		<view class="top">
			<view class='list  flexs3'>
				<image src="../../static/image/possword_icon_possword@2x.png"></image>
				<view class="list_input flexs1">
					<input class="uni-input" type="text" password placeholder="请输入原支付密码" v-model="oldpaypass" />
				</view>
			</view>
			<view class='list  flexs3'>
				<image src="../../static/image/possword_icon_possword@2x.png"></image>
				<view class="list_input flexs1">
					<input class="uni-input" type="text" password placeholder="请输入新支付密码" v-model="paypass" />
				</view>
			</view>
			<view class='list  flexs3'>
				<image src="../../static/image/possword_icon_possword@2x.png"></image>
				<view class="list_input flexs1">
					<input class="uni-input" type="text" password placeholder="请再次输入新支付密码" v-model="newpaypass" />
				</view>
			</view>
		</view>
		<!-- 底部按钮 -->
		<view class="btns flexs" @click="editPayPass">
			<image src='../../static/image/btn_wancheng@2x.png'></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				oldpaypass: '',
				paypass: '',
				newpaypass: ''
			}
		},
		onLoad() {

		},
		methods: {
			editPayPass() {
				var obj = {
					oldpaypass: this.oldpaypass,
					paypass: this.paypass,
					newpaypass: this.newpaypass
				};
				this.$common.requests('/api/login/editPayPass', obj).then(res => {
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
