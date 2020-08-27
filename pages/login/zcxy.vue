<template>
	<view class="zcxy_content ">
		<view class="zcxy_box">
			<!-- <view class="zcxy_header flexs">
				注册协议的主要内容，包括以下几个方面:
			</view> -->
			<view class="zcxy_body ">
				<rich-text :nodes="listData"></rich-text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				listData:[]
			}
		},
		onLoad() {
			this.getdata()
		},
		methods: {
			getdata(){
				var obj = {
				
				};
				console.log(obj)
				this.$common.requests('/api/Sysinfo/registerAgree', obj).then(res => {
					if (res.data.code == 1) {
						this.listData=res.data.data
					}
				});
			}
		}
	}
</script>

<style>
	page{
		width:100%;
		height:100%;
		overflow: hidden;
	}
	.zcxy_content{
		width: 100vw;
		height: 100vh;
		background-color: #FFFFFF;
		/* padding-top: 30rpx; */
		display: flex;
		justify-content: center;
		
	}
	.zcxy_box{
		width: 690rpx;
		height: 1230rpx;
		 /* border:1px solid blue; */
		 margin-top: 40rpx;
		
	}
	.zcxy_header{
		width: 690rpx;
		height: 90rpx;
		/* border:1px solid black; */
		font-size: 36rpx;
		color:#000000;
		
	}
	.zcxy_body{
		width: 690rpx;
		height: 1100rpx;
		/* border:1px solid black; */
		font-size: 28rpx;
		color:#565656;
	}
</style>
