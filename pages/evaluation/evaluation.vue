<template>
	<view class="content">
		<view class="top flexs1" v-for="(items,indexs) in list.order_product" :key="indexs">
			<image class="good_img" :src="urls+items.image"></image>
			<view class="top_l">
				<view class="title">{{items.product_title}}</view>
				<!-- <view class="star flexs1">
					<image src="../../static/image/details_icon_evaluation@2x.png"></image>
					<image src="../../static/image/details_icon_evaluation@2x.png"></image>
					<image src="../../static/image/details_icon_evaluation@2x.png"></image>
					<image src="../../static/image/details_icon_evaluation@2x.png"></image>
					<image src="../../static/image/details_icon_evaluation@2x.png"></image>
				</view> -->
			</view>
		</view>
		<view class="box">
			<view class="list">
					<textarea placeholder-style="font-size:28rpx"  placeholder="宝贝满足你的期待吗？说说你的使用心得，分享给想买的他们吧" v-model="content"/>
			</view>
			<view class="box_b flexs1">
				<image :src="urls+item" v-for="(item,index) in images" :key="index" @click="amplifier(item)"></image>
				<image src="../../static/image/icon_sctp@2x.png" @click="onTopPic"></image>
			</view>
		</view>
		<view class="dian flexs1">
			<view>商品评价</view>
				<view class="example-body">
					<uni-rate :size="18" :value="0" @change="onChange1"/>
				</view>
		</view>
		<view class="dian flexs1">
			<view>物流评价</view>
			<view class="example-body">
				<uni-rate :size="18" :value="0" @change="onChange2"/>
			</view>
		</view>
		<view class="dian1 flexs1">
			<view>店铺评价</view>
		<view class="example-body">
			<uni-rate :size="18" :value="0" @change="onChange3"/>
		</view>
		</view>
		<view class="btns flexs">
			<image src="../../static/image/tijiao.jpg" @click="goNext"></image>
		</view>
	</view>
</template>

<script>
	import uniRate from '@/components/uni-rate/uni-rate.vue'
	import uniSection from '@/components/uni-section/uni-section.vue'
	export default {
		components: {
			uniRate,
			uniSection
		},
		data() {
			return {
				id:'',
				list:[],
				urls:this.$common.baseUrl,
				images:[],
				imasP:'',
				product_star:5,
				content:'',
				business_star:5,
				express_star:5,
				arr:[]
			}
		},
		onLoad(option) {
			this.id = option.id
			this.initdata();
		},
		methods: {
			// 星星
			onChange1(e) {
				this.product_star=JSON.parse(JSON.stringify(e)).value
				console.log(this.product_star)
			},
			onChange2(e) {
				this.express_star=JSON.parse(JSON.stringify(e)).value
				console.log(this.express_star)
			},
			onChange3(e) {
				this.business_star=JSON.parse(JSON.stringify(e)).value
				console.log(this.business_star)
			},
			onTopPic() {
				this.$common.upimg().then(res => {
					this.imasP = res[0];
					this.images.push(this.imasP)
				});
			},
			amplifier(urls){
				let arrayimg = []
				// console.log(urls)
				// console.log(this.$common.baseUrl)
				arrayimg.push(this.$common.baseUrl+urls)
				// console.log(arrayimg)
				// 预览图片
				uni.previewImage({
					current:1,
					urls: arrayimg,
				    longPressActions: {
						success: function(data) {
							console.log('成功查看图片')
					   },
						fail: function(err) {
							console.log(err.errMsg);
						}
				    }
				});
			},
			initdata(){
				var obj = {
					id:this.id
				};
				this.$common.requests('/api/orders/detail', obj).then(res => {
					if (res.data.code == 1) {
						this.list = res.data.data
					}
				});
			},
			goNext(){
				var obj = {
					order_id:this.id,
					content:this.content,
					images:this.images.join(','),
					product_star:this.product_star,
					express_star:this.express_star,
					business_star:this.business_star,
				};
				this.$common.requests('/api/orders/evaluate', obj).then(res => {
					this.$api.msg(res.data.msg);
					if (res.data.code == 1) {
						setTimeout(() => {
							uni.navigateTo({
								url:'success'
							})
						}, 1000)
						
					}
				});
				
			}
		}
	}
</script>

<style>
	/* 头条小程序组件内不能引入字体 */
	/* #ifdef MP-TOUTIAO */
	@font-face {
		font-family: uniicons;
		font-weight: normal;
		font-style: normal;
		src: url('~@/static/uni.ttf') format('truetype');
	}
	/* #endif */
	
	.page{
		width:100%;
		height:100%;
		overflow: hidden;
	}
	.content{
		background-color: #F2F2F2;
	}
	.top{
		width:100%;
		height:14%;
		background-color: #FFFFFF;
	}
	.good_img{
		width:140rpx;
		height:140rpx;
		margin-left: 25rpx;
	}
	.top_l{
		width:40%;
		height:63%;
		margin-left:20rpx;
	}
	.title{
		height:60rpx;
		font-size: 30rpx;
	}
	.star image{
		width:24rpx;
		height:24rpx;
		margin-right:10rpx
	}
	.box{
		width:100%;
		height:26%;
		background-color: #FFFFFF;
		padding-top:30rpx;
		margin-top:30rpx
	}
	uni-textarea{
		width:94%;
		height:170rpx;
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
		height:90rpx;
		margin-right:10rpx
	}
	.dian{
		width:100%;
		height:8%;
		background-color: #FFFFFF;
		margin-top:30rpx;
		padding-left:30rpx;
	}
	.list{
		width: 100%;
	}
	.dian1{
		width:100%;
		height:8%;
		background-color: #FFFFFF;
		margin-top:30rpx;
		padding-left:30rpx;
		margin-bottom: 150rpx;
	}
	.issue-head{
		height:40rpx !important;
		border:none !important
	}
	.btns{
		width:100%;
		height:120rpx;
		position:fixed;
		bottom:32rpx
	}
	.btns image{
		width:94%;
		height:84rpx;
		border-radius: 50rpx;
	}

	
</style>
