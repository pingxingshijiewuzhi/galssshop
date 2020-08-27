<template>
	<view class="content">
		<view class="top">
			<view class="list flexs1" @tap="showModal" data-target="RadioModal">
				<view class="title">银行卡类型：</view>
				<input class="uni-input" type="text" placeholder="请选择银行卡类型" disabled="true" v-model="bank" />
			</view>
			<view class="list flexs1">
				<view class="title">持卡人：</view>
				<input class="uni-input" type="text" placeholder="请输入持卡人姓名" v-model="account_name" />
			</view>
			<view class="list flexs1">
				<view class="title">银行卡号：</view>
				<input class="uni-input" type="number" placeholder="请输入银行卡号" v-model="bank_account" />
			</view>
			<view class="list flexs1">
				<view class="title">开户银行：</view>
				<input class="uni-input" type="text" placeholder="请输入开户银行支行名称" v-model="bank_name" />
			</view>
		</view>
		<!-- 底部按钮 -->
		<view class="btns flexs">
			<image src='../../static/image/btn_queding@2x.png' @click="addbank"></image>
		</view>
		<!-- 隐藏弹框 -->
		<view class="cu-modal " :class="modalName=='RadioModal'?'show':''" @tap="hideModal">
			<view class="cu-dialog" @tap.stop="">
				<radio-group class="block" @change="RadioChange">
					<view class="jia flexs">
						<view class="tian text-black">选择需要绑定的银行卡类型</view>
					</view>
					<view class="cu-list menu text-left">
						<view class="cu-item" v-for="(item,index) in bank_list" :key="index">
							<label class="flex justify-between align-center flex-sub">
								<view class="flex-sub flexs1">
									<image class="bank_img" :src="urls+item.icon_image"></image>
									<text>{{item.name}}</text>
								</view>
								<radio class="radio" :class="radio==index?'checked':''" :checked="radio==index?true:false" :value="index+''"></radio>
							</label>
						</view>
					</view>
					<view class="jia flexs1">
						<image src="../../static/image/btn_queding@2x.png" @tap="hideModal"></image>
					</view>
				</radio-group>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				radio: 0,
				modalName: null,
				bank_name: '',
				bank_account: '',
				account_name: '',
				bank_id: '',
				bank_list: [],
				bank: '',
				urls: this.$common.baseUrl
			}
		},
		onLoad() {
			this.initdata();
		},
		methods: {
			initdata() {
				var obj = {};
				this.$common.requests('/api/bank/create', obj).then(res => {
					// this.$api.msg(res.data.msg);
					if (res.data.code == 1) {
						this.bank_list = res.data.data;
						if (res.data.data.length > 0) {
							this.bank = this.bank_list[0].name
						}
					}
				});
			},
			addbank() {
				var obj = {
					bank_name: this.bank_name,
					bank_account: this.bank_account,
					account_name: this.account_name,
					bank_id: this.bank_list[this.radio].id
				};
				this.$common.requests('/api/bank/save', obj).then(res => {
					this.$api.msg(res.data.msg);
					if (res.data.code == 1) {
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						}, 1000)
						// this.bank_list = res.data.data
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
				this.radio = e.detail.value;
				// console.log(this.bank_list[this.radio].name)
				this.bank = this.bank_list[this.radio].name;
			},
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
		height: 38%;
		margin: 30rpx auto;
	}

	.list {
		width: 100%;
		height: 22%;
		border-bottom: 1px solid #F3F3F3;
	}

	.title {
		width: 200rpx;
		letter-spacing: 3rpx;
		font-size: 30rpx;
	}

	.uni-input-placeholder {
		font-size: 28upx;
		letter-spacing: 3rpx;
	}

	.uni-input {
		margin-left: 20rpx;
		width: 340rpx;
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
		overflow-y: scroll;
	}

	.bank_img {
		width: 40rpx;
		height: 40rpx;
		border-radius: 20rpx;
		margin-right: 30rpx
	}
</style>
