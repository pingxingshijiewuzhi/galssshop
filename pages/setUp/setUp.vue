<template>
	<view class="contents">
		<view class="list flexs2" @click="goAccount">
			<view class='list_r'>账号安全</view>
			<view class=' list_new flexs2'>
				<view></view>
				<image class="top_next" src="../../static/image/details_icon_left@2x.png"></image>
			</view>
		</view>
		<view class="list flexs2" @tap="showModal" data-target="DialogModal1">
			<view class='list_r'>清除缓存</view>
			<view class=' list_new flexs2'>
				<view></view>
				<image class="top_next" src="../../static/image/details_icon_left@2x.png"></image>
			</view>
		</view>
		<view class="list flexs2">
			<view class='list_r'>检测更新</view>
			<view class=' list_new flexs2'>
				<view></view>
				<view>V1.0.1</view>
			</view>
		</view>
		<!-- 底部按钮 -->
		<view class="btn flexs">
			<image src='../../static/image/out.png' @click="loginout"></image>
		</view>
		<!-- 清除缓存弹框 -->
		<view class="cu-modal" :class="modalName=='DialogModal1'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">清空缓存</view>
					<!-- <view class="action" >
						<text class="cuIcon-close text-orange"></text>
					</view> -->
				</view>
				<view class="padding-xl">
					确定APP清除缓存吗？
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="btns flexs2">
						<view class="btnsa btnsa1 flexs text-black" @click="hideModal">取消</view>
						<view class="btnsa flexs text-orange" @click="makesure">确定</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 	<view class="cu-modal"  :class="modalName=='DialogModal1'?'show':''">
			<view class="cu-dialog  bg-white">
				<view class="padding-xl padding-xl1">
					<view class="text-bold phones">您还未登录，请先登录？</view>
					<view class="btns flexs2">
						<view class="btnsa btnsa1 flexs text-black" @click="hideModal">取消</view>
						<view class="btnsa flexs text-orange" @click="goLogin">确认</view>
					</view>
				</view>
			</view>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				modalName: null,
			}
		},
		onLoad() {

		},
		methods: {
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			goAccount() {
				uni.navigateTo({
					url: "account"
				})
			},
			makesure() {
				this.modalName = null;
				this.$api.msg('清除成功');
			},
			loginout() {
				uni.removeStorageSync('token')
				uni.removeStorageSync('uid');
				uni.removeStorageSync('userinfo');
				uni.reLaunch({
					url: '../login/login'
				})
			},
			// goCode(){
			// 	uni.navigateTo({
			// 		url:"code"
			// 	})
			// }
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
		height: 100vh
	}

	.top {
		width: 100%;
		height: 11%;
		border-bottom: 1px solid #E5E5E5;
	}

	.top_right {
		width: 20%;
		margin-right: 30rpx
	}

	.top_left {
		letter-spacing: 4rpx;
		margin-left: 30rpx;
	}

	.top_avatar {
		width: 90rpx;
		height: 90rpx;
		border-radius: 45rpx;
	}

	.top_next {
		width: 16rpx;
		height: 26rpx
	}

	.list {
		width: 100%;
		height: 10%;
		border-bottom: 1px solid #E5E5E5;
	}

	.list_r {
		width: 24%;
		margin-left: 30rpx;
	}

	.list_new {
		width: 21%;
		margin-right: 30rpx
	}

	.list_img {
		width: 50rpx;
		height: 50rpx
	}

	.btn {
		width: 100%;
		height: 120rpx;
		position: fixed;
		bottom: 32rpx
	}

	.btn image {
		width: 94%;
		height: 100rpx
	}

	.padding-xl1 {
		padding: 0;
	}

	.padding-xl {
		background-color: #FFFFFF;
		color: #999999;
		letter-spacing: 3rpx;
	}

	.phones {
		padding: 50upx 0;
	}

	.btns {
		width: 100%;
		height: 90upx;
		border-top: 1px solid #E8E8E8;
	}

	.btnsa {
		height: 100%;
		width: 50%;
	}

	.btnsa1 {
		border-right: 1px solid #E8E8E8;
	}
</style>
