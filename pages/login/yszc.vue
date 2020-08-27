<template>
	<view class="yszc_content ">
		<view class="yszc_box">
			<!-- <view class="yszc_header flexs">
				自营商城隐私政策
			</view> -->
			<view class="yszc_body ">
				<rich-text :nodes="listData"></rich-text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				listData: []
			}
		},
		onLoad() {
			this.getdata()
		},
		methods: {
			getdata() {
				var obj = {

				};
				console.log(obj)
				this.$common.requests('/api/Sysinfo/secretAgree', obj).then(res => {
					if (res.data.code == 1) {
						this.listData = res.data.data
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

	.yszc_content {
		width: 100vw;
		height: 100vh;
		background-color: #FFFFFF;
		/* padding-top: 30rpx; */
		display: flex;
		justify-content: center;

	}

	.yszc_box {
		width: 690rpx;
		height: 1230rpx;
		/* border:1px solid blue; */
		margin-top: 40rpx;

	}

	.yszc_header {
		width: 690rpx;
		height: 90rpx;
		/* border:1px solid black; */
		font-size: 36rpx;
		color: #000000;

	}

	.yszc_body {
		width: 690rpx;
		height: 1100rpx;
		/* border:1px solid black; */
		font-size: 28rpx;
		color: #565656;
	}
</style>
