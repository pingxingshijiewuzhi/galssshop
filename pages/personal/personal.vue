<template>
	<view class="contents">
		<view class="top">
			<view class="left">
				<view class="bg flexs">
					<image class="image_touxiang" :src="list.avatar"></image>
				</view>
				<view class="left_r flexs">
					<view class='name'>{{list.nickname}}</view>
					
					<view class="left_r_pic">
						<image class="left_img" src="../../static/image/icon_bianji@2x.png" @click="goInfo"></image>
					</view>
					<!-- <view class="left_r_l" >
							<text>编辑</text>
						</view> -->
				</view>
			</view>
			<!-- 		<view class="right">
					<image src="../../static/image/icon_xx@2x.png" @click="goMessage"></image>
				</view> -->
		</view>
		<view class="box ">
			<view class="box_dingdan">订单管理</view>
			<view class="flexs3">
				<view class="box_list" @click="orders(0)">
					<image src="../../static/pic/icon_dfk@2x.png"></image>
					<view>待付款</view>
				</view>
				<view class="box_list" @click="orders(1)">
					<image src="../../static/pic/icon_zzz@2x.png"></image>
					<view>待发货</view>
				</view>
				<view class="box_list" @click="orders(2)">
					<image src="../../static/pic/icon_psz@2x.png"></image>
					<view>待收货</view>
				</view>
				<view class="box_list" @click="orders(3)">
					<image src="../../static/pic/icon_ywc@2x.png"></image>
					<view>待评价</view>
				</view>
				<view class="box_list" @click="orders(4)">
					<image src="../../static/pic/icon_ytk@2x.png"></image>
					<view>退款/取消</view>
				</view>
			</view>
		</view>
		<!-- ran -->
		<view class="ran">
			<view class="big_list flexs2" @click="godownload">
				<view class="big_list_l flexs1">
					<image src="../../static/pic/icon_wdxz@2x.png"></image>
					<view>我的下载</view>
				</view>
				<image class="next_img" src="../../static/pic/icon_enter_1@2x.png"></image>
			</view>
			<view class="big_list flexs2" @click="goCollection">
				<view class="big_list_l flexs1">
					<image src="../../static/pic/icon_spsc@2x.png"></image>
					<view>商品收藏</view>
				</view>
				<image class="next_img" src="../../static/pic/icon_enter_1@2x.png"></image>
			</view>
			<view class="big_list flexs2" @click="goBrowse">
				<view class="big_list_l flexs1">
					<image src="../../static/pic/icon_llls@2x.png"></image>
					<view>浏览历史</view>
				</view>
				<image class="next_img" src="../../static/pic/icon_enter_1@2x.png"></image>
			</view>
			<view class="big_list flexs2" @click="goAddress" style="border-bottom: none;">
				<view class="big_list_l flexs1">
					<image src="../../static/pic/icon_shdz@2x.png"></image>
					<view>收货地址</view>
				</view>
				<image class="next_img" src="../../static/pic/icon_enter_1@2x.png"></image>
			</view>
		</view>
		<view class="lastran ranbuttom">
			<view class="big_list flexs2" @tap="showModal" data-target="DialogModal1">
				<view class="big_list_l flexs1">
					<image src="../../static/pic/icon_wdkf@2x.png"></image>
					<view>我的客服</view>
				</view>
				<image class="next_img" src="../../static/pic/icon_enter_1@2x.png"></image>
			</view>
			<!-- 客服窗口 -->
			<view class="cu-modal" :class="modalName=='DialogModal1'?'show':''">
				<view class="cu-dialog">
					<view class="cu-bar bg-white justify-end">
						<view class="content text-bold">联系客服</view>
					</view>
					<view class="padding-xl">
						<view>遇到问题，请联系我们</view>
						<view>联系电话{{mobile}}</view>
					</view>
					<view class="cu-bar bg-white flexs">
						<view class="action text-red" @tap="hideModal">
							好的
						</view>
					</view>
				</view>
			</view>
			<view class="big_list flexs2" @click="goShare">
				<view class="big_list_l flexs1">
					<image src="../../static/pic/icon_wyfx@2x.png"></image>
					<view>我要分享</view>
				</view>
				<image class="next_img" src="../../static/pic/icon_enter_1@2x.png"></image>
			</view>
			<view class="big_list flexs2" @click="goFeedback">
				<view class="big_list_l flexs1">
					<image src="../../static/pic/icon_wtfk@2x.png"></image>
					<view>问题反馈</view>
				</view>
				<image class="next_img" src="../../static/pic/icon_enter_1@2x.png"></image>
			</view>
			<view class="big_list flexs2" @click="gocompanyprofile">
				<view class="big_list_l flexs1">
					<image src="../../static/pic/company.png"></image>
					<view>公司简介</view>
				</view>
				<image class="next_img" src="../../static/pic/icon_enter_1@2x.png"></image>
			</view>
			<view class="big_list flexs2" @click="loginout" style="border-bottom: none;">
				<view class="big_list_l flexs1">
					<image src="../../static/pic/icon_tcdl@2x.png"></image>
					<view>退出登录</view>
				</view>
				<image class="next_img" src="../../static/pic/icon_enter_1@2x.png"></image>
			</view>
		</view>
		<view class="shuoming flexs">技术支持：徐州聚梦网络科技有限公司</view>
		<view style='height:50px'></view>

		<!-- 	功能列表
		<view class="big">
			<view class="big_list flexs2" @click="goWallet">
				<view class="big_list_l flexs1">
					<image src="../../static/image/icon_qb@2x.png"></image>
					<view>我的钱包</view>
				</view>
				<image class="next_img" src="../../static/image/details_icon_left@2x.png"></image>
			</view>
			<view class="big_list flexs2" @click="goCollection">
				<view class="big_list_l flexs1">
					<image src="../../static/image/c.png"></image>
					<view>商品收藏</view>
				</view>
				<image class="next_img" src="../../static/image/details_icon_left@2x.png"></image>
			</view>
			
			<view class="big_list flexs2" @click="goEvaluation">
				<view class="big_list_l flexs1">
					<image src="../../static/image/icon_wdpj@2x.png"></image>
					<view>我的评价</view>
				</view>
				<image class="next_img" src="../../static/image/details_icon_left@2x.png"></image>
			</view>
		
			<view class="big_list flexs2" @click="goFeedback">
				<view class="big_list_l flexs1">
					<image src="../../static/image/icon_wtfk@2x.png"></image>
					<view>问题反馈</view>
				</view>
				<image class="next_img" src="../../static/image/details_icon_left@2x.png"></image>
			</view>
			<view class="big_list nones flexs2" @click="goSet" style="margin-bottom: 120rpx;">
				<view class="big_list_l flexs1">
					<image src="../../static/image/icon_sz@2x.png"></image>
					<view>设置</view>
				</view>
				<image class="next_img" src="../../static/image/details_icon_left@2x.png"></image>
			</view>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				urls: this.$common.baseUrl,
				modalName: null,
				mobile: ''
				// tabheight1:''
			}
		},
		onShow() {
			this.initdata();
			this.getMobile()
			// this.getautowidthheight()
		},
		methods: {
			loginout() {
				uni.removeStorageSync('token')
				uni.removeStorageSync('uid');
				uni.removeStorageSync('userinfo');
				uni.reLaunch({
					url: '../login/login'
				})
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			// getautowidthheight(){
			// 	var clientWidth = uni.getSystemInfoSync().windowWidth;
			// 	var clientHeight = uni.getSystemInfoSync().windowHeight
			// 	var clientHeight1 = uni.getSystemInfoSync().screenHeight
			// 	console.log(clientHeight1,'ds')
			// 	console.log(clientHeight,'屏幕gao度')
			// 	console.log(50 / 667 * clientHeight)
			// 	console.log(50 / 667 * clientHeight1)
			// 	this.tabheight1 = 50 / 667 * clientHeight1 
			// 	this.tabheight = 50 / 667 * clientHeight
			// 	console.log(this.tabheight1 )
			// },
			initdata() {
				var obj = {};
				this.$common.requests('/api/user/membersInfo', obj).then(res => {
					// this.$api.msg(res.data.msg);
					if (res.data.code == 1) {
						this.list = res.data.data
					}
				});
			},
			goInfo() {
				uni.navigateTo({
					url: 'infomation'
				})
			},
			godownload() {
				uni.navigateTo({
					url: 'myDownload'
				})   
			},
			goSet() {
				uni.navigateTo({
					url: '../setUp/setUp'
				})
			},
			goEvaluation() {
				uni.navigateTo({
					url: 'evaluation'
				})
			},
			goAddress() {
				uni.navigateTo({
					url: '../address/address'
				})
			},
			goCollection() {
				uni.navigateTo({
					url: '../collection/collection'
				})
			},
			goBrowse() {
				uni.navigateTo({
					url: '../browse/browse'
				})
			},
			goFeedback() {
				uni.navigateTo({
					url: 'feedback'
				})
			},
			orders(Inv) {
				uni.navigateTo({
					url: "../order/orderList?Inv=" + Inv
				})
			},
			goShare() {
				uni.navigateTo({
					url: 'share'
				})
			},
			getMobile() {
				this.$common.requests('/api/index/get_service_mobile').then(res => {
					if (res.data.code == 1) {
						this.mobile = res.data.data;
						//console.log(this.mobile)
					}
				});
			},
			// 公司个人简介
			gocompanyprofile(){
				uni.navigateTo({
					url:'../companyprofile/companyprofile'
				})
			}
		}
	}
</script>

<style>
	.contents {
		background-image: url(../../static/pic/bg_mine@2x.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		/* border:1rpx solid red; */
		height: auto !important;
		/* #ifdef H5 */
		padding-bottom: 50px;
		/* #endif */
	}

	.content {
		color: #000000;
	}

	.cu-dialog {
		width: 560rpx;
		border-radius: 20rpx;
		background-color: #FFFFFF;
	}

	.padding-xl {
		width: 100%;
		height: 140rpx;
		border-bottom: 1px solid #CCCCCC;
		padding: 0 !important;
		background-color: #FFFFFF;
	}

	.padding-xl view {
		height: 50rpx
	}

	.top {
		width: 100%;
		height: 280rpx;
	}

	.top_box {
		width: 100%;
		height: 26%;
		padding-top: 80rpx;
	}

	.left {
		/* width:70%; */
		height: 140rpx;
		color: #FFFFFF;
	}

	.image_touxiang {
		width: 110rpx;
		height: 110rpx;
		border-radius: 55rpx;
		margin-top: 70rpx;
	}

	.name {
		width: auto;
		font-weight: 600;
		font-size: 32rpx;
		text-align: center;
		margin-right: 10rpx;
		padding-left: 10rpx;
	}

	.left_r_pic {
		width: 30rpx;
		height: 30rpx
	}

	.left_img {
		width: 24rpx !important;
		height: 24rpx !important;
		margin-left: 10rpx
	}

	.left_r {
		height: 60rpx;
		margin: 0 auto;
	}

	.right image {
		width: 42rpx;
		height: 40rpx;
		margin-right: 60rpx
	}

	/* ran */
	.ran {
		width: 90%;
		height: 400rpx;
		margin: 20rpx auto;
		border-radius: 20rpx 20rpx;
		background-color: #FFFFFF;
	}
	.lastran {
		width: 90%;
		height: 500rpx;
		margin: 20rpx auto;
		border-radius: 20rpx 20rpx;
		background-color: #FFFFFF;
	}
	
	/*#ifdef APP-PLUS*/
	.ranbuttom {
		/* 	margin-bottom: 100rpx; */
	}

	/*  #endif  */
	/*#ifdef H5 */
	.ranbuttom {
		/* margin-bottom: 150rpx; */
	}

	/*  #endif  */
	/* box */
	.box {
		width: 92%;
		height: 240rpx;
		background-color: #FFFFFF;
		margin: 0rpx auto;
		border-radius: 10rpx;
		/* box-shadow: 2px 5px 12px rgba(0, 0, 0, .1); */
	}

	.box_dingdan {
		width: 200rpx;
		height: 70rpx;
		line-height: 90rpx;
		padding-left: 30rpx;
		font-weight: 600;
	}

	.box_list {
		width: 18%;
		height: 140rpx;
		line-height: 52rpx;
		text-align: center;
	}

	.box_list image {
		width: 48rpx;
		height: 46rpx;
		margin-top: 30rpx;
	}

	.big {
		width: 92%;
		height: 950rpx;
		margin: 0 auto;
		background-color: #FFFFFF;
		border-radius: 10rpx;
		box-shadow: 2px 5px 12px rgba(0, 0, 0, .1);
	}

	.big_list {
		width: 92%;
		height: 100rpx;
		margin: 0 auto;
		border-bottom: 1px solid #E5E5E5;
		/* border: 1px solid #000000; */
	}

	.big_list_l {
		width: 35%;
		height: 100%;
	}

	.big_list_l image {
		width: 40rpx;
		height: 40rpx;
		margin-right: 20rpx
	}

	.next_img {
		width: 14rpx;
		height: 26rpx;
	}

	.nones {
		border-bottom: none !important
	}

	.shuoming {
		width: 100%;
		height: 60rpx;
		color: #C5C5C5
	}
</style>
