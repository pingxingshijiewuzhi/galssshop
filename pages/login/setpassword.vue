<template>
	<view class="setpassword_content flexs">
		<view class="setpassword_box">
			<view class="setpassword_header">
				设置密码
			</view>
			<view class="setpassword_body1">
				<view class="setpassword_body1_top">
					<view class="setpassword_pic flexs">
						<image class="setpassword_mima" src="../../static/image/possword_icon_possword@2x.png"></image>
					</view>
					<view class="setpassword_body1_top_text flexs">
						<input type="text" password placeholder="请输入6~16位密码" v-model="password" />
					</view>
				</view>
				<view class="setpassword_body1_top">
					<view class="setpassword_pic flexs">
						<image class="setpassword_mima" src="../../static/image/possword_icon_possword@2x.png"></image>
					</view>
					<view class="setpassword_body1_top_text flexs">
						<input type="text" password placeholder="请再次输入您的密码" v-model="repassword" />
					</view>
				</view>
				<view class="setpassword_body3box flexs" @click="goregist()">
					完成注册
					<!-- <image class="setpassword_immediately" src="../../static/image/poaaword_btn_wczc@2x.png" @click="goregist()"></image> -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mobile: '',
				code: '',
				password: '',
				repassword: ''
			}
		},
		onLoad(option) {
			if (option.phone) {
				this.mobile = option.phone;
			}
			if (option.code) {
				this.code = option.code;
			}
		},
		methods: {
			goregist() {
				var obj = {
					mobile: this.mobile,
					code: this.code,
					password: this.password,
					repassword: this.repassword,
				};
				this.$common.requests('/api/login/register', obj).then(res => {
					this.$api.msg(res.data.msg);
					if (res.data.code == 1) {
						var data = res.data.data.userinfo;
						uni.setStorageSync('uid', data.id);
						uni.setStorageSync('token', data.token);
						uni.setStorageSync('userinfo', data);
						setTimeout(() => {
							uni.reLaunch({
								url: '/pages/index/index'
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

	.setpassword_content {
		width: 100vw;
		height: 100vh;
		background-color: #FFFFFF;
	}

	.setpassword_box {
		width: 690rpx;
		height: 1320rpx;
		/* border:1px solid blue; */

	}

	.setpassword_header {
		width: 690rpx;
		height: 140rpx;
		/* border:1px solid black; */
		display: flex;
		align-items: center;
		/* border-top: 2rpx solid #E6E6E6; */
		font-size: 38rpx;
		letter-spacing: 2rpx;
	}

	.setpassword_body1 {
		width: 690rpx;
		height: 340rpx;
		/* border:1px solid blue; */
	}

	.setpassword_body1_top {
		width: 690rpx;
		height: 150rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		border-bottom: 2rpx solid #E6E6E6;
		margin-top: 20rpx;
	}

	.setpassword_mima {
		height: 40rpx;
		width: 35rpx;

	}

	.setpassword_body1_top_text {
		width: 300rpx;
		height: 50rpx;
		margin-left: 40rpx;
	}

	.setpassword_pic {
		height: 40rpx;
		width: 50rpx;
		margin-left: 18rpx;
	}

	.setpassword_body3box {
		width: 580rpx;
		height: 85rpx;
		margin: 140rpx auto;
		background-color: #FF3237;
		color: #FFFFFF;
		border-radius: 20rpx;

	}

	.setpassword_immediately {
		width: 560rpx;
		height: 85rpx;
	}
</style>
