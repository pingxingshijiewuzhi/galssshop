<template>
	<view class="setpassword_content flexs">
		<view class="setpassword_box">
			<view class="setpassword_header">
				忘记密码
			</view>
			<view class="setpassword_body1">
				<view class="setpassword_body1_top">
					<view class="setpassword_pic flexs">
						<image class="setpassword_mima" src="../../static/image/registered_icon_account@2x.png"></image>
					</view>
					<view class="setpassword_body1_top_text flexs">
						<input type="text" placeholder="请输入手机号" v-model="phone" />
					</view>
				</view>
				<view class="setpassword_body1_top">
					<view class="setpassword_pic flexs">
						<image class="setpassword_mima" src="../../static/image/registered_icon_Verificationcode@2x.png"></image>
					</view>
					<view class="setpassword_body1_top_text flexs">
						<input type="text" placeholder="请输入验证码" v-model="code" />
					</view>
					<view class="forgetpass_yzm flexs" v-show="stus == true" @click="getCode">{{text}}</view>
					<view class="forgetpass_yzm flexs" v-show="stus == false">{{ text }}S</view>
				</view>
				<view class="setpassword_body3box flexs" @click="gotoset">
					<image class="setpassword_immediately" src="../../static/image/registered_icon_xyb@2x.png"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				stus: true, //倒计时标识
				sunmax: 60,
				text: '发送验证码',
				phone: '',
				code: '',
			}
		},
		onLoad() {

		},
		methods: {
			gotoset() {
				uni.navigateTo({
					url: "resetpassword?phone=" + this.phone + '&code=' + this.code
				})
			},
			//获取验证码
			getCode() {
				if (/^1[345789]\d{9}$/.test(this.phone)) {
					this.stus = false;
					this.text = this.sunmax;
					var that = this
					let timeInt = setInterval(() => {
						that.text--;
						if (that.text <= 0) {
							that.stus = true;
							that.text = '获取验证码';
							clearInterval(timeInt);
						}
					}, 1000);
					var obj = {
						mobile: this.phone
					};
					this.$common.requests('/api/user/sendSMS', obj).then(res => {
						this.$api.msg(res.data.msg);
						if (res.data.code == 1) {}
					});
				} else {
					this.$api.msg('请输入正确的手机号');
				}
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
		overflow: hidden;
	}

	.setpassword_box {
		width: 690rpx;
		height: 1320rpx;
		/* border:1px solid blue; */

	}

	.setpassword_header {
		width: 690rpx;
		height: 140rpx;
		display: flex;
		align-items: center;
		font-size: 38rpx;
		letter-spacing: 2rpx;
		margin-top: 100rpx;
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
		width: 690rpx;
		height: 85rpx;
		margin-top: 125rpx;
	}

	.setpassword_immediately {
		width: 560rpx;
		height: 85rpx;
	}

	.forgetpass_yzm {
		width: 150rpx;
		height: 40rpx;
		background-color: #F3F2ED;
		font-size: 28rpx;
		color: #E50809;
		margin-left: 125rpx;
	}
</style>
