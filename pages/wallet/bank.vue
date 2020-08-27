<template>
	<view class="content">
		<view class="list ">
			<!-- 没有银行卡显示样式 -->
			<!-- <view class="box_new text-center">
					<image src="../../static/image/img_hmytjyhk@2x.png"></image>
					<view >您还没有添加银行卡哦~</view>
			</view> -->
			<!-- 有银行卡显示样式 -->
			<view class="list_b" v-for="(item,index) in list" :key="index" :style="'background-image:url('+urls+item.bank.card_image+')'">
				<view class="left_box flexs12">
					<view class="left flexs3">
						<block v-if="item.bank.name=='中国银行'">
							<image src="../../static/image/zhonggou@2x.png"></image>
						</block>
						<block v-if="item.bank.name=='建设银行'">
							<image src="../../static/image/jianshe@2x.png"></image>
						</block>
						<block v-if="item.bank.name=='农业银行'">
							<image src="../../static/image/zgny@2x.png"></image>
						</block>
						<block v-if="item.bank.name=='江苏银行'">
							<image src="../../static/image/jiangsu@2x.png"></image>
						</block>
						<block v-if="item.bank.name=='工商银行'">
							<image src="../../static/image/zg@2x.png"></image>
						</block>
						<view class="left_t text-white ">
							<view class="title">{{item.bank.name}}</view>
							<view>储蓄卡</view>
						</view>
					</view>
					<image class="del_img" src="../../static/image/icoN_sc_yhk@2x.png" @click="goDel(item.id)"></image>
				</view>
				<view class="list_m text-white flexs">**** **** **** {{item.bank_account}}</view>
			</view>
		</view>
		<!-- 底部按钮 -->
		<view class="btns flexs">
			<image src='../../static/image/bank_btn.png' @click="goAdd"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				urls: this.$common.baseUrl
			}
		},
		onShow() {
			this.initdata();
		},
		methods: {
			initdata() {
				var obj = {};
				this.$common.requests('/api/bank/index', obj).then(res => {
					// this.$api.msg(res.data.msg);
					if (res.data.code == 1) {
						this.list = res.data.data
					}
				});
			},
			goAdd() {
				uni.navigateTo({
					url: 'addBank'
				})
			},
			goDel(id) {
				uni.navigateTo({
					url: 'delBank?id=' + id
				})
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

	.list {
		width: 100%;
		height: 94%;
		overflow-y: scroll;
	}

	.box_new {
		width: 100%;
		height: 80%;
		color: #9A9A9A;
		letter-spacing: 3rpx;
		font-size: 32rpx;
	}

	.box_new image {
		width: 560rpx;
		height: 400rpx;
		margin-top: 120rpx;
		margin-bottom: 110rpx;
	}

	.list_b {
		width: 92%;
		height: 290rpx;
		margin: 40rpx auto;
		border-radius: 20rpx;
		background-image: url(../../static/image/bg_img_yhk1@2x.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		box-shadow: 2px 5px 12px rgba(0, 0, 0, .2);
		/*设置块阴影  水平位移   垂直位移 	模糊半径 */
	}

	.left_box {
		width: 100%;
		height: 160rpx;
	}

	.left {
		width: 57%;
		height: 160rpx;
	}

	.left image {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50rpx;
	}

	.left_t {
		width: 200rpx;
		height: 88rpx;
		line-height: 54rpx;
	}

	.title {
		font-size: 32rpx;
	}

	.del_img {
		width: 32rpx;
		height: 36rpx;
		margin: 40rpx 50rpx 0 0
	}

	.list_m {
		width: 100%;
		height: 100rpx;
		font-size: 32rpx;
		letter-spacing: 6rpx;
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
