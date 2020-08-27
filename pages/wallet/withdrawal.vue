<template>
	<view class="contents">
		<view class="top">
			<view class="top_one text-black flexs1">
				<view class="top_one_t ">到账银行卡</view>
				<block v-if="banklist.length==0">
					<view class="top_right yanse flexs1" @click="goBank">
						请点击添加银行卡
					</view>
				</block>
				<block v-else>
					<view class="top_right flexs1" @tap="showModal" data-target="RadioModal">
						<image :src="urls+banklist[radio].bank.icon_image"></image>
						<view class="name">{{banklist[radio].bank.name}}({{banklist[radio].bank_account}})</view>
					</view>
				</block>

			</view>
			<view>
				<view class="top_one text-black flexs1">
					<view class="top_one_t">提现金额</view>
					<view class="top_right flexs1">
						<input class="uni-input" type="number" placeholder="请输入提现金额" v-model="money" />
					</view>
				</view>
			</view>
		</view>
		<!-- 底部按钮 -->
		<block v-if="pay_password==''">
			<view class="btns flexs">
				<image src='../../static/image/btns.png' @click="up"></image>
			</view>
		</block>
		<block v-else>
			<view class="btns flexs">
				<image src='../../static/image/btns.png' @tap="show = true"></image>
			</view>
		</block>
		<passkeyborad :show="show" @close="close" @makesure="makesure"></passkeyborad>
		<!-- 隐藏弹框 -->
		<view class="cu-modal " :class="modalName=='RadioModal'?'show':''" @tap="hideModal">
			<view class="cu-dialog" @tap.stop="">
				<radio-group class="block" @change="RadioChange">
					<view class="jia flexs">
						<view class="tian text-black">选择到账银行卡</view>
					</view>
					<view class="cu-list menu text-left">
						<block v-if="banklist.length==0">
							<view class="cu-item">

							</view>
						</block>
						<block v-else>
							<view class="cu-item" v-for="(item,index) in banklist" :key="index">
								<label class="flex justify-between align-center flex-sub">
									<view class="flex-sub flexs1">
										<image class="bank_img" :src="urls+item.bank.icon_image"></image>
										<text>{{item.bank.name}}({{item.bank_account}})</text>
									</view>
									<radio class="radio" :class="radio==index?'checked':''" :checked="radio==index?true:false" :value="index+''"></radio>
								</label>
							</view>
						</block>

					</view>
					<view class="jia flexs">
						<image src="../../static/image/btn_queding@2x.png" @click="hideModal"></image>
					</view>
				</radio-group>
			</view>
		</view>
	</view>
</template>

<script>
	import passkeyborad from '@/components/yzc-paykeyboard/yzc-paykeyboard.vue';
	export default {
		components: {
			passkeyborad,
		},
		data() {
			return {
				modalName: null,
				radio: '0',
				userInfo: {},
				money: '',
				banklist: [],
				urls: this.$common.baseUrl,
				password: '',
				show: false,
				pay_password: ''
			}
		},
		onLoad() {},
		onShow() {
			this.initData();
			this.initData_new();
		},

		methods: {
			close() {
				this.show = false
			},
			initData() {
				this.$common.requests('/api/bank/index').then(res => {
					if (res.data.code == 1) {
						this.banklist = res.data.data;
					}
				});
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			RadioChange(e) {
				this.radio = e.detail.value
			},
			// goPay(){
			// 	uni.navigateTo({
			// 		url:'bindingPay'
			// 	})
			// },
			makesure(e) {
				this.password = e;
				let obj = {
					money: this.money,
					user_bank_id: this.banklist[this.radio].id,
					password: this.password
				}
				//console.log(obj)
				this.$common.requests('/api/home/cash', obj).then(res => {
					if (res.data.code == 1) {
						setTimeout(res => {
							uni.navigateBack({
								delta: 1
							})
						}, 1000);
					}
					this.$api.msg(res.data.msg)
				});
			},
			goBank() {
				setTimeout(() => {
					uni.navigateTo({
						url: "addBank"
					})
				}, 800)

			},
			//判断是否设置支付密码a
			initData_new() {
				var obj = {};
				this.$common.requests('/api/user/membersInfo', obj).then(res => {
					// this.$api.msg(res.data.msg);
					if (res.data.code == 1) {
						this.pay_password = res.data.data.pay_password
					}
				});
			},
			up() {
				this.$api.msg('请先设置支付密码')
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

	.contents {
		width: 100vw;
		height: 100vh;
	}

	.top {
		position: relative;
		width: 93%;
		height: 36%;
		background-color: #FFFFFF;
		margin: 0 auto;
		top: 30rpx;
		border-radius: 20rpx;
	}

	.top_one {
		width: 100%;
		height: 110rpx;
		padding-top: 40rpx;
		font-size: 32rpx;
	}

	.top_one_t {
		width: 30%;
	}

	.yanse {
		color: #8D8D8D;
		font-size: 28rpx;
	}

	.top_right {
		width: 70%;
		height: 100%;
		border-bottom: 1px solid #E5E5E5
	}

	.top_right image {
		width: 40rpx;
		height: 30rpx;
		margin-right: 20rpx
	}

	.name {
		color: #8D8D8D
	}

	.uni-input-placeholder {
		color: #8D8D8D;
		font-size: 28rpx;
	}

	.top_middle {
		width: 50%;
		/* border:1px solid red; */
		color: #999999;
		margin-top: 20rpx
	}

	.title {
		width: 67%;
	}

	.bottom {
		width: 86%;
		height: 80rpx;
		border-bottom: 1px solid #A0A0A0;
		margin: 20rpx 0 20rpx 26rpx
	}

	.left {
		font-size: 60rpx;
	}

	.btn {
		width: 30%;
		height: 70rpx;
		line-height: 70rpx;
		background-color: #000000;
		border-radius: 20rpx;
		text-align: center;
		margin: 40rpx auto
	}

	.jia {
		height: 100rpx;
		background-color: #FFFFFF;
		color: #999999;
		padding-left: 30rpx;
	}

	.jia image {
		width: 600rpx;
		height: 90rpx;
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

	.tian {
		font-size: 32rpx;
	}

	.cu-dialog {
		height: 540rpx;
		background-color: #FFFFFF;
	}

	.cu-list.menu {
		height: 320rpx;
		background-color: #FFFFFF;
	}

	.bank_img {
		width: 40rpx;
		height: 40rpx;
		border-radius: 20rpx;
		margin-right: 30rpx
	}
</style>
