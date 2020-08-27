<template>
	<view class="content">
		<view class="top">
			<view class="list flexs1">
				<view class="title">手机号：</view>
				<input class="uni-input" type="number" placeholder="请输入手机号" v-model="phone" />
			</view>
			<view class="list flexs1">
				<view class="list_l flexs1">
					<view class="title">验证码：</view>
					<input class="uni-input" type="number" placeholder="请输入验证码" v-model="code" />
				</view>
				<view class="code flexs" v-show="stus == true" @click="getCode">{{text}}</view>
				<view class="code flexs" v-show="stus == false">{{ text }}S</view>
			</view>
		</view>
		<!-- 底部按钮 -->
		<view class="btns flexs">
			<image src='../../static/image/btn_queding@2x.png' @click="getdata"></image>
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
				id: ''
			}
		},
		onLoad(option) {
			this.id = option.id
		},
		methods: {
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
			},
			// 解绑银行卡
			getdata() {
				var obj = {
					mobile: this.phone,
					code: this.code,
					id: this.id
				};
				//console.log(obj)
				this.$common.requests('/api/bank/delete', obj).then(res => {
					this.$api.msg(res.data.msg);
					if (res.data.code == 1) {
						setTimeout(() => {
							// uni.reLaunch({
							// 	url:'bank'
							// })
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

	.top {
		width: 94%;
		height: 20%;
		margin: 30rpx auto;
	}

	.list {
		width: 100%;
		height: 45%;
		border-bottom: 1px solid #F3F3F3;
	}

	.title {
		letter-spacing: 3rpx;
		font-size: 30rpx;
	}

	.uni-input-placeholder {
		font-size: 28upx;
		letter-spacing: 3rpx;
	}

	.uni-input {
		margin-left: 20rpx;
		width: 300rpx;
	}

	.list_l {
		width: 75%;
		height: 100%;
	}

	.code {
		color: #F94F5F
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
