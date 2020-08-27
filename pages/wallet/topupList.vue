<template>
	<view class="content">
		<view class="list">
			<!-- 没有提现记录样式-->
			<!-- <view class='box text-center'>
				<image src="../../static/image/img_zwtxjl@2x.png"></image>
				<view >暂无提现记录</view>
			</view> -->
			<!-- 有提现记录 -->
			<view class='lis_one flexs1' v-for="(item,index) in list" :key="index">
				<view class="left">
					<view class="title" v-if="item.type==1">微信{{item.remark}}</view>
					<view class="title" v-if="item.type==2">支付宝{{item.remark}}</view>
					<view class="title" v-if="item.type==3">银行卡{{item.remark}}</view>
					<view class="title" v-if="item.type==4">其他{{item.remark}}</view>
					<view class="times">{{item.createtime}}</view>
				</view>
				<view class="right text-right">
					<view class="text-colors">￥{{item.money}}</view>
					<view class="text-orange" v-if="item.status==1">处理中</view>
					<view class="text-orange" v-if="item.status==2">成功</view>
					<view class="text-orange" v-if="item.status==3">失败</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[],
				page:1,
				limit:10
			}
		},
		onLoad() {
			this.initdata(1,10);
		},
		onPullDownRefresh() {
			console.log('refresh');
			this.page = 1;
			this.initdata(1,this.limit);
			setTimeout(function () {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onReachBottom(){
			this.page = this.page+1;
			this.initdata(this.page,this.limit);
		},
		methods: {
		//获取用户信息
			initdata(page,limit){
				var obj = {
					page:page,
					limit:limit
				};
				this.$common.requests('/api/home/getRcList', obj).then(res => {
					// this.$api.msg(res.data.msg);
					if (res.data.code == 1) {
						if(page!=1){
						if(res.data.data){
							this.list = this.list.concat(res.data.data)
						}
						}else{
							this.list = res.data.data
						}
					}
				});
			},	
		}
	}
</script>

<style>
	page{
		width:100%;
		height:100%;
		overflow: hidden;
	}
	.list{
		width:100%;
		height:95%;
		overflow-y: scroll;
	/* 	border: 1px solid; */
	}
	.lis_one{
		width:94%;
		height:126rpx;
		margin:20rpx auto;
		border-bottom:1px solid #E5E5E5
	}
	.left{
		width:65%;
		height:100%;
		line-height: 48rpx;
		letter-spacing: 4rpx;
	}
	.title{
		font-size: 32rpx;
	}
	.right{
		width:35%;
		height:100%;
		line-height: 48rpx
	}
	.box{
		width:100%;
		height:50%;
		margin-top:180rpx;
		color:#9A9A9A;
		letter-spacing: 3rpx;
		font-size: 32rpx;
	}
	.box image{
		width:560rpx;
		height:400rpx;
		margin-bottom:110rpx;
	}
	.times{
		color:#A8A8A8;
	}
</style>
