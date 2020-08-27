<template>
	<view class='content'>
		<view class="top">
			<view class='list  flexs3'>
				<image src="../../static/image/people.png"></image>
				<view class="list_input flexs1">
					<input class="uni-input" type="number" placeholder="请输入新手机号" v-model="mobile" />
				</view>
			</view>
			<view class='list new flexs3'>
				<image src="../../static/image/registered_icon_Verificationcode@2x.png"></image>
				<view class="list_input flexs1">
					<input class="uni-input" type="number" placeholder="请输入验证码" v-model="captcha" />
					<view class="list_code" v-show="stus == true" @click="getCode">{{text}}</view>
					<view class="list_code" v-show="stus == false">{{ text }}S</view>
				</view>
			</view>
		</view>
		<!-- 底部按钮 -->
		<view class="btns flexs">
			<image src='../../static/image/btn_wancheng@2x.png' @click="changeMobile"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				captcha: '',
				phone: '',
				mobile: '',
				code: '',
				stus: true, //倒计时标识
				sunmax: 60,
				text: '发送验证码',
			}
		},
		onLoad(option) {
			this.phone = option.phone;
			// this.code = option.code;
		},
		methods: {
			getCode() {
				if (/^1[345789]\d{9}$/.test(this.mobile)) {
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
						mobile: this.mobile
					};
					this.$common.requests('/api/user/sendSMS', obj).then(res => {
						this.$api.msg(res.data.msg);
						if (res.data.code == 1) {}
					});
				} else {
					this.$api.msg('请输入正确的手机号');
				}
			},
			changeMobile() {
				let obj = {
					newmobile: this.mobile,
					mobile: this.phone,
					captcha: this.captcha
				}
				this.$common.requests('/api/login/changeMobile', obj).then(res => {
					if (res.data.code == 1) {
						setTimeout(res => {
							uni.navigateBack({
								delta: 2
							})
						}, 1000);
					}
					this.$api.msg(res.data.msg)
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
		height: 30%;
		position: relative;
		top: 30rpx;
	}

	.new {
		margin-top: 30rpx
	}

	.list image {
		width: 44rpx;
		height: 48rpx
	}

	.list_input {
		width: 85%;
		height: 120rpx;
		border-bottom: 1px solid #E5E5E5
	}

	.uni-input-placeholder {
		color: #555555 !important
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
