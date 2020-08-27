<template>
	<view class="content">
		<view class="top flexs2">
			<view class="top_left">头像</view>
			<view class="top_right flexs2">
				<image class="top_avatar" :src="urls+list.avatar" @click="onTopPic"></image>
				<image class="top_next" src="../../static/pic/icon_enter_1@2x.png"></image>
			</view>
		</view>
		<view class="list flexs2" @click="goNick">
			<view class='list_r'>昵称</view>
			<view class=' list_new flexs2'>
				<view class="name">{{list.nickname}}</view>
				<image class="top_next" src="../../static/pic/icon_enter_1@2x.png"></image>
			</view>
		</view>
		<view class="list flexs2">
			<view class='list_r'>绑定手机号</view>
			<view class=' list_new flexs2'>
				<view class="names">{{list.mobile}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				urls: this.$common.baseUrl,
				imasP: ''
			}
		},
		onShow() {
			this.initdata();
		},
		methods: {
			goNick() {
				uni.navigateTo({
					url: "setNickname"
				})
			},
			//上传
			onTopPic() {
				this.$common.upimg().then(res => {
					this.imasP = res[0];
					this.setImg(this.imasP); //路径获取成功
				});
			},
			//修改头像
			setImg(img) {
				var obj = {
					avatar: img
				};
				this.$common.requests('/api/user/profile', obj).then(res => {
					//this.$api.msg(res.data.msg);
					this.initdata();
				});
			},
			//获取用户信息
			initdata() {
				var obj = {};
				this.$common.requests('/api/user/membersInfo', obj).then(res => {
					// this.$api.msg(res.data.msg);
					if (res.data.code == 1) {
						this.list = res.data.data
						uni.setStorageSync('userinfo', this.list);
						console.log(this.list)
					}
				});
			}
			// goPhone(){
			// 	uni.navigateTo({
			// 		url:"editPhone"
			// 	})
			// },
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
		background-color: #F4F4F4;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.top {
		width: 100%;
		height: 120rpx;
		border-bottom: 1px solid #E5E5E5;
		background-color: #FFFFFF;
		margin-top: 20rpx;
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
		width: 100rpx;
		height: 100rpx;
		border-radius: 50% 50%;
	}

	.name {
		width: 150rpx;
		text-align: center;
	}

	.names {
		width: 400rpx;
		text-align: right;
	}

	.top_next {
		width: 16rpx;
		height: 26rpx
	}

	.list {
		width: 100%;
		height: 120rpx;
		border-bottom: 1px solid #E5E5E5;
		background-color: #FFFFFF;
		margin-top: 20rpx;
	}

	.list_r {
		width: 160rpx;
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
</style>
