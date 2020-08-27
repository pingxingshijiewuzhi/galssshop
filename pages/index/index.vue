<template>
	<view class="index_bigbox">
		<view class="index_content">
			<view class="big_box">
				<view class="kong_new"></view>
				<view class="index_indexes flexs">
					<view class="cu-bar search flexs1">
						<view class="index_indexes_left flexs1">
							<view class="index_indexes_tupian flexs">
								<image class="index_indexes_pic" src="../../static/pic/icon_search@2x.png"></image>
							</view>
							<input disabled :adjust-position="false" type="text" placeholder="输入商品名称" confirm-type="search" @click='goList'></input>
						</view>
					</view>
				</view>
				<!-- 幻灯片 -->
				<view class="index_body1">
					<swiper class="screen-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
					 :autoplay="true" interval="5000" duration="500">
						<swiper-item v-for="(item,index) in swiperList" :key="index" @click="godetail(item.product_id)">
							<image :src="urls+item.image" mode="aspectFill" style="height:300rpx;border-radius: 20rpx;"></image>
						</swiper-item>
					</swiper>
					<!-- <image class="index_banner" src="../../static/image/banner@2x.png" ></image> -->
				</view>
				<view class="index_body2">
					<view class="index_body2_box1" v-for="(item,index) in categoryList" :key="index">
						<view class="new_box" @click="gogoodlist(item.id)">
							<image class="image_pic1" :src="urls+item.icon_image"></image>
							<view class="index_body2_box1_bottom">
								{{item.title}}
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="kong"></view>
			<view class="index_body3 flexs1">
				<image class="zan" src="../../static/pic/icon_hot@2x.png"></image>
				<view class="text-bold">为你推荐</view>
			</view>
			<view class="index_body4 ">
				<view class="index_body4_box" v-for="(item,index) in recommendList" :key="index" @click="godetail(item.id)">
					<view class="<strong><strong>index_body</strong></strong>4_box_left flexs">
						<image class="index_body4_box_left_pic" :src="urls+item.head_image"></image>
					</view>
					<view class="index_body4_box_right">
						<view class="index_body4_box_right_1 ">
							{{item.title|subStrLength}}
						</view>
						<!-- <view class="index_body4_box_right_2">
							{{item.description}}
						</view> -->
						<view class="index_body4_box_right_3 flexs1">
							<view class="moneytype flexs1">
								<view class="money_sign">￥</view>
								<view class="money">{{item.low_price}}</view>
							</view>
							<view class="number flexs">{{item.sell_num}}人收货</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view style='height:50px'></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				modalName: null,
				cardCur: 0,
				swiperList: [],
				dotStyle: false,
				towerStart: 0,
				InputBottom: 0,
				direction: '',
				urls: this.$common.baseUrl,
				categoryList: [],
				recommendList: [],
				page: 1,
				limit: 10
			}
		},
		filters: {
			subStrLength: function(str) {
				return str.substring(0, 12)
			}
		},
		onLoad(option) {
			// 如果存在option,就重新设置
			if(option.token){
				let mytoken = option.token
				let myuid = option.uid 
				let mynickname = option.nickname 
				let myusername = option.username 
				let myavatar = option.avatar
				let mymobile = option.mobile
				let myuserinfo = {
					mobile:mymobile,
					avatar:myavatar,
					username:myusername,
					nickname:mynickname
				}
				//console.log(mytoken,666)
				uni.setStorageSync('uid', myuid);
				uni.setStorageSync('token', mytoken);
				uni.setStorageSync('userinfo', myuserinfo);
			}
			
			this.getRecommendList(this.page, this.limit);
			this.getlunList();
			this.getCategoryList();
			this.TowerSwiper('swiperList');

		},
		onPullDownRefresh() {
			console.log('refresh');
			this.page = 1;
			this.getRecommendList(1, this.limit);
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onReachBottom() {
			this.page = this.page + 1;
			this.getRecommendList(this.page, this.limit);
		},
		methods: {
			gogoodlist(id) {
				uni.navigateTo({
					url: '/pages/index/searchgood?typeid=' + id
				})
			},
			//轮播图
			getlunList() {
				var obj = {};
				this.$common.requests('/api/index/lunList', obj).then(res => {
					// this.$api.msg(res.data.msg);
					if (res.data.code == 1) {
						this.swiperList = res.data.data;
					}
				});
			},
			//商品首页一级分类列表
			getCategoryList() {
				var obj = {};
				this.$common.requests('/api/index/getCategoryList', obj).then(res => {
					// this.$api.msg(res.data.msg);
					if (res.data.code == 1) {
						this.categoryList = res.data.data;
					}
				});
			},
			//为您推荐商品列表
			getRecommendList(page, limit) {
				var obj = {
					page: page,
					limit: limit
				};
				this.$common.requests('/api/index/recommendList', obj).then(res => {
					// this.$api.msg(res.data.msg);
					if (res.data.code == 1) {
						if (page != 1) {
							if (res.data.data) {
								this.recommendList = this.recommendList.concat(res.data.data)
							}
						} else {
							this.recommendList = res.data.data
						}
					}
				});
			},
			//去商品详情
			godetail(id) {
				console.log(1)
				uni.navigateTo({
					url: '/pages/mydetail/mydetail?id=' + id
				})
			},

			DotStyle(e) {
				this.dotStyle = e.detail.value
			},
			InputFocus(e) {
				this.InputBottom = e.detail.height
			},
			InputBlur(e) {
				this.InputBottom = 0
			},
			TowerSwiper(name) {
				let list = this[name];
				for (let i = 0; i < list.length; i++) {
					list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
					list[i].mLeft = i - parseInt(list.length / 2)
				}
				this.swiperList = list
			},
			goList() {
				uni.navigateTo({
					url: '/pages/index/searchgood'
				})
			}
		}
	}
</script>

<style>
	
	.index_bigbox {
		height: 100vh;
		width: 100vw;
		/* #ifdef H5 */
		padding-bottom: 50px;
		/* #endif */

	}

	.index_content {
		width: 100%;
		margin-bottom: 50rpx
	}

	.big_box {
		background-color: #FFFFFF;
	}
	.kong_new{
		width: 100%;
		height: var(--status-bar-height);
		background-color: #FF3237;
	}
	.index_indexes {
		height: 116rpx;
		padding-left: 10rpx;
		padding-right: 10rpx;
		/* padding-top: 30rpx; */
		display: flex;
		justify-content: center;
		background-color: #FF3237;
	}

	.cu-bar {
		width: 650rpx;
	}

	.action {
		width: 110rpx;
		height: 50rpx;
		font-size: 30rpx;
		letter-spacing: 2rpx;
	}

	.index_indexes_left input {
		width: 86%;
	}

	.index_indexes_tupian {
		height: 64rpx;
		width: 50rpx;
	}

	.index_indexes_pic {
		width: 35rpx;
		height: 35rpx;
		/* border:2rpx solid green; */
	}

	.search-form {
		width: 400rpx;
		height: 50rpx;
		font-size: 12rpx;
		margin-left: 25rpx;
	}

	.index_indexes_left {
		width: 650rpx;
		height: 60rpx;
		border-radius: 12rpx;
		padding-left: 12rpx;
		background-color: #FF7E71;
	}

	.index_body1 {
		width: 94%;
		height: 330rpx;
		border-radius: 20rpx;
		margin: 15rpx auto;
	}

	.uni-input-placeholder {
		font-size: 28rpx;
		color: #FFFFFF;
		/* margin-right: 30rpx; */
	}

	.index_body2 {
		width: 100%;
		height: 340rpx;
		font-size: 28rpx;
		background-color: #FFFFFF;
	}

	.index_body2_box1 {
		width: 25%;
		display: inline-block;
		text-align: center;
		margin-top: 10rpx;
	}
	.index_body2_box1_top {
		width: 100%;
		height: 70%;
		/* border:2rpx solid green; */
	}

	.index_body2_box1_bottom {
		width: 100%;
		height: 60rpx;
		line-height: 60rpx;
		overflow: hidden;
	}
	.image_pic1 {
		width: 90rpx ;
		height: 90rpx;
		border-radius: 40rpx;
		display: block;
		margin: 0 auto;
	}

	/* .kong {
		width: 100%;
		height: 20rpx;
		background-color: #F9F9F9;
	} */

	.index_body3 {
		width: 696rpx;
		height: 120rpx;
		font-size: 32rpx;
		color: #000000;
		margin: 0 auto;
		letter-spacing: 4rpx;
	}

	.zan {
		width: 36rpx;
		height: 36rpx;
		margin-right: 20rpx
	}

	.index_body4 {
		width: 100%;
		margin-bottom: 120rpx;
		display: flex;
		flex-wrap: wrap;
	}

	.index_body4_box {
		width: 342rpx;
		height: 430rpx;
		background-color: #FFF;
		border-radius: 20rpx;
		/* margin: 10rpx auto; */
		margin: 10rpx 10rpx 10rpx 18rpx;
		/* margin-bottom:30rpx; */
		/* margin-right: 20rpx; */
		/* margin-left: 10rpx; */
	}

	.index_body4_box_left {
		width: 316rpx;
		height: 250rpx;
		border-radius: 20rpx;
	}

	.index_body4_box_right {
		width: 300rpx;
		height: 220rpx;
		margin: 0 auto;
	}

	.index_body4_box_left_pic {
		width: 316rpx;
		height: 300rpx;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
	}

	.index_body4_box_right_1 {
		width: 300rpx;
		height: 66rpx;
		font-size: 30rpx;
		letter-spacing: 2rpx;
		font-weight: 550;
		padding-top: 18rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		/* border: 2rpx solid green; */
	}

	.speed {
		font-size: 28rpx;
		margin-left: 15rpx;
		margin-right: 15rpx;
	}

	.index_body4_box_right_2 {
		width: 300rpx;
		height: auto;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.index_body4_box_right_3 {
		width: 300rpx;
		height: 36rpx;
		/* border: 2rpx solid green; */
		margin-top: 16rpx;
	}

	.moneytype {
		width: 150rpx;
		height: 44rpx;
	}

	.money_sign {
		width: 20rpx;
		height: 40rpx;
		color: #FA0100;
		font-size: 26rpx;
		display: flex;
		align-items: center;
		margin-right: 10rpx
	}

	.money {
		width: 240rpx;
		height: 40rpx;
		font-size: 32rpx;
		color: #FA0100;
		font-weight: 600;
		display: flex;
		align-items: center;
	}

	.number {
		width: 170rpx;
		height: 40rpx;
		color: #6F6F6F;
		margin-left: 15rpx;
		display: flex;
		align-items: center;
	}
</style>
