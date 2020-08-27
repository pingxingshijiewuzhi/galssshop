<template>
	<view class="searchgood_bigbox">
		<view class="kong_new"></view>
		<view class="searchgood_body1">
			<view class="searchgood_indexes">
				<view class="cu-bar search bg-white flexs1">
					<view class="searchgood_qianyige" @click="goindex">
						<image class="searchgood_qianyige_pic" src="../../static/pic/nav_back_2@2x(1).png"></image>
					</view>
					<view class="searchgood_indexes_left flexs1">
						<image class="searchgood_indexes_pic" src="../../static/pic/icon_search@2x.png"></image>
						<input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" placeholder="输入商品名称"
						 confirm-type="search" v-model="str"></input>
					</view>
					<view class="sousuo" @click="gosearch()">搜索</view>
				</view>
			</view>
		</view>
		<view class="searchgood_body1_box2">

			<view class="searchgood_body1_box2_small2 flexs" @click="changesale()">
				<view class="searchgood_body1_box2_mostsmall flexs1">
					<view class="searchgood_body1_box2_small2_text flexs">
						<!-- <view :class="sales==2?'new_se flexs':'searchgood_body1_box2_small1 flexs'" @click="changesale"> -->
						销量
					</view>
					<view class="searchgood_body1_box2_small2_pic ">
						<view class="searchgood_body1_box2_small2_pic1 flexs">
							<image class="searchgood_sign" src="../../static/pic/icon_sanjiao_shang2@2x.png" v-if="sales==1"></image>
							<image class="searchgood_sign" src="../../static/pic/icon_uo_pre@2x.png" v-if="sales==2"></image>
						</view>
						<view class="searchgood_body1_box2_small2_pic1 flexs">
							<image class="searchgood_sign" src="../../static/pic/icon_down_pre@2x.png" v-if="sales==1"></image>
							<image class="searchgood_sign" src="../../static/pic/icon_sanjiao_xia1@2x.png" v-if="sales==2"></image>
						</view>
					</view>
				</view>
			</view>
			<!-- </view> -->
			<view class="searchgood_body1_box2_small2 flexs" @click="changeprice()">
				<view class="searchgood_body1_box2_mostsmall flexs1">
					<view class="searchgood_body1_box2_small2_text flexs">
						价格
					</view>
					<view class="searchgood_body1_box2_small2_pic ">
						<view class="searchgood_body1_box2_small2_pic1 flexs">
							<image class="searchgood_sign" src="../../static/pic/icon_sanjiao_shang2@2x.png" v-if="price==1"></image>
							<image class="searchgood_sign" src="../../static/pic/icon_uo_pre@2x.png" v-if="price==2"></image>
						</view>
						<view class="searchgood_body1_box2_small2_pic1 flexs">
							<image class="searchgood_sign" src="../../static/pic/icon_down_pre@2x.png" v-if="price==1"></image>
							<image class="searchgood_sign" src="../../static/pic/icon_sanjiao_xia1@2x.png" v-if="price==2"></image>
						</view>
					</view>

				</view>
			</view>
		</view>

		<view class="line"></view>
		<view class="searchgood_body2">
			<!-- 		<view class="deleteindex_body">
				<view class="deleteindex_body_box2 ">
					<view class="nosearchgood_body_box2_top flexs">
						<image class="nosearchgood_null" src="../../static/pic/icon_nogood@2x.png"></image>
					</view>
					<view class="nosearchgood_body_box2_bottom flexs">
						暂时没有搜索到你搜索的商品
					</view>
				</view>
			</view> -->
			<view class="searchgood_body4_box" v-for="(item,index) in list" :key="index" @click="goDetail(item.id)">
				<view class="searchgood_body4_box_left flexs">
					<image class="searchgood_body4_box_left_pic" :src="urls+item.head_image"></image>
				</view>
				<view class="searchgood_body4_box_right">
					<view class="searchgood_body4_box_right_1 flexs1">
						<view>{{item.title|subStrLength}}</view>
					</view>
					<!-- <view class="searchgood_body4_box_right_2">
						{{item.description}}
					</view> -->
					<view class="searchgood_body4_box_right_3 flexs1">
						<view class="moneytype flexs1">
							<view class="money_sign">￥</view>
							<view class="money">{{item.low_price}}</view>
						</view>
						<view class="number">{{item.sell_num}}人收货</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 没有搜索到商品样式 -->

	</view>

</template>

<script>
	export default {
		data() {
			return {
				typeid: '',
				sales: 1,
				page: 1,
				limit: 10,
				str: '',
				favo: 1,
				price: 1,
				list: [],
				urls: this.$common.baseUrl,
			}
		},
		filters: {
			subStrLength: function(str) {
				return str.substring(0, 12)
			}
		},
		onLoad(option) {
			if (option.typeid) {
				this.typeid = option.typeid;
			}
			this.initdata(this.page, this.limit);
		},
		onPullDownRefresh() {
			console.log('refresh');
			this.page = 1;
			this.initdata(1, this.limit);
			// setTimeout(function () {
			// 	uni.stopPullDownRefresh();
			// }, 1000);
		},
		onReachBottom() {
			this.page = this.page + 1;
			this.initdata(this.page, this.limit);
		},
		methods: {
			changesale() {
				if (this.sales == 1) {
					this.sales = 2;
					//console.log(this.sales);
				} else {
					this.sales = 1;
				}
				this.page = 1;
				this.initdata(this.page, this.limit);
			},
			changefavo() {
				if (this.favo == 1) {
					this.favo = 2;
				} else {
					this.favo = 1;
				}
				// this.sales = 0; // 去除按销量排序 
				this.page = 1;
				this.initdata(this.page, this.limit);
			},
			changeprice() {
				if (this.price == 1) {
					this.price = 2;
				} else {
					this.price = 1;
				}
				this.page = 1;
				this.initdata(this.page, this.limit);
			},
			gosearch() {
				this.page = 1;
				this.initdata(this.page, this.limit);
			},
			initdata(page, limit) {
				var obj = {
					cid: this.typeid,
					sales: this.sales,
					page: page,
					limit: limit,
					str: this.str,
					favo: this.favo,
					price: this.price
				};
				console.log(obj)
				this.$common.requests('/api/Product/productList', obj).then(res => {
					if (res.data.code == 1) {
						if (page != 1) {
							if (res.data.data) {
								this.list = this.list.concat(res.data.data)
							}
						} else {
							this.list = res.data.data
						}
					}
				});
			},
			InputFocus(e) {
				this.InputBottom = e.detail.height
			},
			InputBlur(e) {
				this.InputBottom = 0
			},
			goDetail(id) {
				uni.navigateTo({
					url: '../mydetail/mydetail?id=' + id
				})
			},
			goindex() {
				uni.switchTab({
					url: 'index'
				})
			},
		}
	}
</script>

<style>
	page {
		width: 100%;
		height: 100%;
		background-color: #F4F4F4;
		overflow: hidden;
	}

	.searchgood_bigbox {
		height: 100vh;
		width: 100vw;
	}
	.kong_new{
		width: 100%;
		height: var(--status-bar-height);
		background-color: #FF3237;
	}
	.searchgood_body1 {
		width: 100%;
		height: 116rpx;
		background-color: #FF3237;
	}

	.searchgood_indexes {
		/* width: 650rpx; */
		height: 60rpx;
		/* border:2rpx solid red; */
		padding-left: 10rpx;
		padding-right: 10rpx;
		display: flex;
		flex-direction: row-reverse;

	}

	.searchgood_indexes_pic {
		width: 35rpx;
		height: 35rpx;
		margin-left: 10rpx;
		margin-right: 10rpx;
	}

	.search-form {
		width: 400rpx;
		height: 50rpx;
		margin-left: 25rpx;

	}

	.searchgood_indexes_left {
		width: 550rpx;
		height: 64rpx;
		border-radius: 12rpx;
		padding-left: 12rpx;
		background-color: #FF7E71;
		margin-left: 50rpx;

	}

	.searchgood_body1_box2 {
		height: 2rpx;
		width: 752rpx;
		/* 	background-color: #FFFFFF; */
		/* border:2rpx solid #1CBBB4; */
		display: flex;
		flex-wrap: nowrap;
		justify-content: center;
		/* overflow-y: scroll; */
		/* margin-top: 50rpx; */
		margin: 10rpx auto;
	}

	.uni-input-placeholder {
		font-size: 28rpx;
		color: #FFFFFF;
	}

	.searchgood_body1_box2_small1 {
		width: 200rpx;
		height: 60rpx;
		font-size: 32rpx;
		color: #3F3F3F;
		letter-spacing: 2rpx;
		/* border:2rpx solid black; */
	}

	.new_se {
		width: 200rpx;
		height: 60rpx;
		font-size: 32rpx;
		color: #FE7D01;
		letter-spacing: 2rpx;
	}

	.searchgood_body1_box2_small2 {
		width: 220rpx;
		height: 60rpx;
		/* border:2rpx solid black; */
		margin-left: 20rpx;
		margin-right: 20rpx;
	}

	.searchgood_body1_box2_mostsmall {
		width: 100rpx;
		height: 60rpx;
		/* border:2rpx solid blue; */
	}

	.searchgood_body1_box2_small2_text {
		width: 200rpx;
		height: 60rpx;
		font-size: 32rpx;
		color: #3F3F3F;
		letter-spacing: 2rpx;
		/* border:2rpx solid black;; */
	}

	.searchgood_body1_box2_small2_pic {
		width: 20rpx;
		height: 30rpx;
		margin-left: 10rpx;
		/* margin-left: 10rpx; */
	}

	.searchgood_body1_box2_small2_pic1 {
		width: 20rpx;
		height: 16rpx;
	}

	.searchgood_sign {
		width: 18rpx;
		height: 12rpx;
	}

	.line {
		width: 100%;
		height: 2rpx;
		background-color: #F2F2F2;
		margin-top: 80rpx;
	}

	.searchgood_body2 {
		width: 100%;
		height: 82%;
		display: flex;
		flex-wrap: wrap;
		align-content: flex-start;
		overflow-y: scroll;

	}

	.searchgood_body4_box {
		width: 342rpx;
		height: 480rpx;
		background-color: #FFF;
		border-radius: 10rpx;
		margin: 10rpx 10rpx 10rpx 18rpx;
	}

	.searchgood_body4_box_left {
		/* width:320rpx; */
		height: 344rpx;
		margin: 0 auto;
		border-radius: 20rpx;
		/* border:2rpx solid blue; */
	}

	.searchgood_body4_box_right {
		width: 300rpx;
		height: 220rpx;
		margin: 0 auto;
		/* margin-left:20rpx */
		/* border: 2rpx solid green; */
	}

	.searchgood_body4_box_left_pic {
		width: 100%;
		height: 346rpx;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
	}

	.searchgood_body4_box_right_1 {
		width: 300rpx;
		/* height:66rpx; */
		font-size: 30rpx;
		letter-spacing: 2rpx;
		font-weight: 550;
		padding-top: 18rpx;
	}

	.searchgood_body4_box_right_2 {
		width: 300rpx;
		/* height: 94rpx; */
		padding-top: 10rpx;

	}

	.searchgood_body4_box_right_3 {
		width: 300rpx;
		height: 50rpx;
		/* border: 2rpx solid green; */
		margin-top: 16rpx;
	}

	.moneytype {
		width: 150rpx;
		height: 30rpx;
	}

	.money_sign {
		width: 20rpx;
		height: 40rpx;
		font-size: 26rpx;
		color: #FA0100;
		display: flex;
		align-items: center;
		margin-right: 10rpx
	}

	.money {
		width: 200rpx;
		height: 40rpx;
		font-size: 32rpx;
		color: #FA0100;
		font-weight: 600;
		display: flex;
		align-items: center;
	}

	.number {
		width: 200rpx;
		height: 40rpx;
		color: #6F6F6F;
		/* margin-left: 60rpx; */
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}

	.speed {
		font-size: 28rpx;
		margin-left: 15rpx;
		margin-right: 15rpx;
	}

	.nosearchgood_body_box2_top {
		width: 600rpx;
		height: 450rpx;
		margin: 0 auto;

	}

	.nosearchgood_null {
		width: 550rpx;
		height: 400rpx;
	}

	.nosearchgood_body_box2_bottom {
		width: 600rpx;
		height: 180rpx;
		color: #9A9A9A;
		font-size: 34rpx;
		margin: 20rpx auto;
		letter-spacing: 2rpx;
	}

	.cu-bar {
		padding-top:20rpx;
		background-color: #FF3237;
	}

	.uni-input-placeholder {
		font-size: 24rpx;
		/* margin-left: 20rpx; */
	}

	.searchgood_qianyige {
		width: 20rpx;
		height: 30rpx;

	}

	.searchgood_qianyige_pic {
		width: 20rpx;
		height: 30rpx;
	}

	.sousuo {
		width: 60rpx;
		height: 30rpx;
		margin-right: 30rpx;
		margin-left: 10rpx;
		color: #FFFFFF;
	}


	.searchgood_body4_box_right_1,
	.searchgood_body4_box_right_2 {
		height: auto;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.searchgood_body4_box_right_1 view {
		height: auto;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.kong_three {
		width: 100%;
		height: 30rpx;
	}
</style>
