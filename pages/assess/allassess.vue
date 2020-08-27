<template>
	<view class="allassess_bigbox">
		<view class="allassess_content">
			<view class="mydetail_body5" v-for="(item,index) in list" :key="index">
				<view class="mydetail_body5_box1 flexs1">
					<view class="mydetail_body5_box1_left flexs">
						<image class="people_logo" :src="urls+item.user.avatar"></image>
					</view>
					<view class="mydetail_body5_box1_right flexs">
						<view class="allassess_center">
							<view class="people_nick ">
								{{item.user.nickname}}
							</view>
							<view class="mydetail_speed">
								<image class="xingxing" src="../../static/image/details_icon_evaluation@2x.png" v-for="(item,index) in item.product_star"
								 :key="index"></image>

							</view>
						</view>
					</view>
					<view class="allassess_time">
						{{item.createtime}}
					</view>
				</view>
				<view class="mydetail_body5_box2">
					<view class="mydetail_evaluate">
						{{item.content}}
					</view>
					<view class="mydetail_body5_box2_bottom">
						<block v-if="item.images[0]==''">
						</block>
						<block v-else>
							<image class="evaluate_pic" v-for="(item,index) in item.images" :key="index" :src="urls+item"></image>
						</block>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				page: 1,
				limit: 10,
				list: [],
				pid: '',
				urls: this.$common.baseUrl
			}
		},
		onLoad(option) {
			this.pid = option.pid;
			this.initdata(1, this.limit);
		},
		onPullDownRefresh() {
			console.log('refresh');
			this.page = 1;
			this.initdata(1, this.limit);
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onReachBottom() {
			this.page = this.page + 1;
			this.initdata(this.page, this.limit);
		},
		methods: {
			initdata(page, limit) {
				var obj = {
					page: page,
					limit: limit,
					prid: this.pid
				};
				this.$common.requests('/api/Comment/details', obj).then(res => {
					// this.$api.msg(res.data.msg);
					console.log(res);
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
			}
		}
	}
</script>

<style>
	.allassess_bigbox {
		height: 100vh;
		width: 100vw;
		background-color: #FFFFFF;
		padding-top: 15rpx;
		display: flex;
		justify-content: center;
	}

	.allassess_content {
		width: 696rpx;
	}

	.mydetail_body5 {
		width: 694rpx;
		border-bottom: 3rpx solid #F2F2F2;
		display: flex;
		align-items: center;
		flex-direction: column;
	}

	.mydetail_body5_box1 {
		width: 650rpx;
		height: 120rpx;
		margin-top: 10rpx;
		/* border:2rpx solid green; */
	}

	.mydetail_body5_box1_left {
		width: 100rpx;
		height: 100rpx;
		/* border:2rpx solid blue; */
	}

	.people_logo {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50rpx;
	}

	.mydetail_body5_box1_right {
		width: 310rpx;
		height: 120rpx;
		display: flex;
		align-items: center;
		/* border:2rpx solid blue; */
	}

	.allassess_center {
		width: 184rpx;
		height: 80rpx;
	}

	.people_nick {
		width: 266rpx;
		height: 40rpx;
		letter-spacing: 2rpx;
	}

	.mydetail_speed {
		width: 250rpx;
		height: 30rpx;
	}

	.xingxing {
		width: 25rpx;
		height: 25rpx;
		margin-right: 10rpx;
	}

	.mydetail_body5_box2 {
		width: 650rpx
	}

	.mydetail_body5_box2_bottom {
		width: 650rpx;
		padding-bottom: 10rpx
	}

	.mydetail_evaluate {
		width: 650rpx;
		padding-bottom: 10rpx;
		letter-spacing: 3rpx;
	}

	.evaluate_pic {
		width: 140rpx;
		height: 140rpx;
		margin-right: 25rpx;
		/* margin-left: 20rpx; */
	}

	.allassess_time {
		width: 236rpx;
		height: 72rpx;
		letter-spacing: 2rpx;
		/* border:2rpx solid red; */
		margin-left: 140rpx;
	}
</style>
