<template>
	<view class="content">
		<view class="box flexs">
			<view class='bg flexs'>
				<image :src="imageUrl"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imageUrl: '',
				baseUrl: this.$common.baseUrl
			}
		},
		onLoad() {
			this.get_imageUrl();
		},
		methods: {
			get_imageUrl() {
				this.$common.requests('/api/user/getErweima').then(res => {
					if (res.data.code == 1) {
						this.imageUrl = res.data.data;
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
		background-image: url(../../static/pic/bg_share@2x.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}

	.box {
		width: 100%;
		height: 1200rpx;
	}

	.box image {
		width: 320rpx;
		height: 300rpx
	}

	.bg {
		width: 340rpx;
		height: 320rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		box-shadow: 2px 5px 12px rgba(0, 0, 0, .1);
	}
</style>
