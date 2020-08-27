<template>
	<view class="content">
		<view class="box">
			<view class="list">
				<textarea placeholder-style="font-size:28rpx" placeholder="请留下您的宝贵意见或者建议,我们将努力改进" v-model="title" />
				</view>
			<!-- <view class="box_b flexs1">
				<image src="../../static/image/icon_sctp@2x.png"></image>
			</view> -->
		</view>
		<view class="bottom flexs1">
			 <input class="uni-input" type="number" placeholder="请留下您的手机号,以便我们回复您" v-model="mobile"/>
		</view>
		<!-- 底部按钮 -->
		<view class="btns flexs"  @click="addFeedback">
			提交
			<!-- <image src='../../static/image/tijiao.jpg'></image> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title:'',
				mobile:''
			}
		},
		onLoad() {
		   
		},
		methods: {
			addFeedback(){
				var obj = {
					title:this.title,
					mobile: this.mobile
				};
				this.$common.requests('/api/sysinfo/addFeedback', obj).then(res => {
					this.$api.msg(res.data.msg);
					if (res.data.code == 1) {
						setTimeout(res => {
							uni.navigateBack({
								delta: 1
							})
						},1000);
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
		background-color: #F4F4F4;
	}
	.box{
		width:100%;
		height:34%;
		background-color: #FFFFFF;
		padding-top:30rpx;
	}
	uni-textarea{
		width:94%;
		height:240rpx;
		color:#333333;
		margin:0 auto;
		letter-spacing: 3rpx;
	}
	.box_b{
		width:94%;
		height:140rpx;
		margin:0 auto;
	}
	.box_b image{
		width:90rpx;
		height:90rpx
	}
	.bottom{
		width:100%;
		height:80rpx;
		background-color: #FFF;
		margin-top:30rpx;
		padding-left:20rpx
	}
	.uni-input{
		width:520rpx
	}
	.uni-input-placeholder{
		font-size: 28rpx;
	}
	.btns{
		width: 76%;
		height: 100rpx;
		line-height: 100rpx;
		color: #FFFFFF;
		background-color: #FF3237;
		position: fixed;
		bottom: 32rpx;
		left: 13%;
		border-radius: 20rpx;
	}
	.btns image{
		width:94%;
		height:90rpx;
		border-radius: 50rpx;
	}
</style>
