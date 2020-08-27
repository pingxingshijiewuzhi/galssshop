<template>
	<view class="content">
		<view class="top flexs2">
			<image class="up_img" src="../../static/pic/nav_back_2@2x(1).png" @click="back"></image>
			<view class="titles">我的收藏</view>
			<block v-if="arrList.length==0">
				<view></view>
			</block>
			<block v-else>
				<view :class="status=='完成'?'text-white':''" @click="edit(status)">{{status}}</view>
			</block>
		</view>
		<!-- 没有收藏商品样式-->
		<block v-if="arrList.length==0">
			<view class='box text-center'>
				<image src="../../static/pic/img_nocollect@2x.png"></image>
				<view>还没有收藏商品,快去找你喜欢的吧</view>
			</view>
		</block>
		<view class="list" v-else>
			<block v-if="status=='编辑'">
				<view class="list_one flexs1" v-for="(item,index) in arrList" :key="index" @click="goDetail(item.product.id)">
					<view></view>
					<image class="good_img" :src="item.product.head_image?urls+item.product.head_image:'../../static/image/img3@2x.png'"></image>
					<view class="right">
						<view class="title ">{{item.product.title | filtertitle}}</view>
						<!-- 	<view class=" ">{{item.product.description | filterFunc}}</view> -->
						<view class="right_b flexs2">
							<view class="money">￥<text class="money_r text-bold">{{item.product.low_price}}</text></view>
							<view class="number">{{item.product.read_num}}人收藏</view>
						</view>
					</view>
				</view>
			</block>
			<block v-if="status=='完成'">
				<checkbox-group class="block" @change="changeCheckbox">
					<view class="list_one_new flexs1" v-for="(item,index) in arrList" :key="index">
						<checkbox :value="item.id+''" :checked="checkedArr.includes(String(item.id))" :class="{'checked':checkedArr.includes(String(item.id))}"></checkbox>
						<view class="new_list flexs1">
							<image class="good_img" :src="item.product.head_image?urls+item.product.head_image:'../../static/image/img3@2x.png'"></image>
							<view class="right">
								<view class="title ">{{item.product.title | filtertitle}}</view>
								<!-- <view class=" ">{{item.product.description | filterFunc}}</view> -->
								<view class="right_b flexs2">
									<view class="money">￥<text class="money_r text-bold">{{item.product.low_price}}</text></view>
									<view class="number">{{item.product.read_num}}人收藏</view>
								</view>
							</view>
						</view>
					</view>
				</checkbox-group>
				<view class="btns flexs3">
					<view class="btn_l flexs1">
						<checkbox-group @change="allChoose">
							<label>
								<checkbox value="all" :class="{'checked':allChecked}" :checked="allChecked?true:false"></checkbox> 全选
							</label>
						</checkbox-group>
					</view>
					<view></view>
					<view class="shanchu" @tap="showModal" data-target="DialogModal1">
						删除
						<!-- <image  src="../../static/image/btn_sc@2x.png" @tap="showModal" data-target="DialogModal1"></image> -->
					</view>
				</view>
			</block>
		</view>
		<view class="cu-modal" :class="modalName=='DialogModal1'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end content1">
					<view class="content1">提示</view>
				</view>
				<view class="padding-xl" @change="changeDatetimePicker">
					<view class="row">确定要取消收藏该商品吗？</view>
				</view>
				<view class=" flexs1 ">
					<button class="action_left" @tap="hideModal">取消</button>
					<button class="action_right text-red" @click="godel">确定</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				modalName: null,
				radio: 1,
				status: '编辑',
				arrList: [],
				urls: this.$common.baseUrl,
				checkedArr: [],
				allChecked: false,
				page: 1,
				limit: 999
			}
		},
		filters: {
			filterFunc: function(value) {
				if (value && value.length > 35) {
					return value.substring(0, 35) + '...';
				}

				return value;
			},
			filtertitle: function(value) {
				if (value && value.length > 10) {
					return value.substring(0, 10) + '...';
				}
				return value;
			}
		},
		onLoad() {
			this.initdata()
		},
		onBackPress(e) {
			if (e.from == 'backbutton') {
				uni.switchTab({
					url: '../personal/personal'
				})
				return true
			}
			if (e.from == 'navigateBack') {
				uni.switchTab({
					url: '../personal/personal'
				})
				return true
			}
		},
		onPullDownRefresh() {
			//console.log('refresh');
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
			delte() {
				var obj = {
					id: this.delid
				};
				this.$common.requests('/api/Address/delete', obj).then(res => {
					this.modalName = null
					this.$api.msg(res.data.msg);
					if (res.data.code == 1) {
						this.initdata();
					}
				});
			},
			changeDatetimePicker(date) {
				//console.log(date);
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			//删除
			godel() {

				var obj = {
					ids: this.checkedArr.join(',')
				};
				this.$common.requests('/api/home/deleteFavo', obj).then(res => {
					if (res.data.code == 1) {
						this.modalName = null
						this.initdata(1, this.limit);
					}
				});
			},
			// 商品详情
			goDetail(id) {
				uni.navigateTo({
					url: '../mydetail/mydetail?id=' + id
				})
			},
			// 多选复选框改变事件
			changeCheckbox(e) {
				this.checkedArr = e.detail.value;
				console.log(this.checkedArr)
				// 如果选择的数组中有值，并且长度等于列表的长度，就是全选
				if (this.checkedArr.length > 0 && this.checkedArr.length == this.arrList.length) {
					this.allChecked = true;
				} else {
					this.allChecked = false;
				}
			},
			// 全选事件
			allChoose(e) {
				let chooseItem = e.detail.value;

				// 全选
				if (chooseItem[0] == 'all') {
					this.allChecked = true;
					for (let item of this.arrList) {
						let itemVal = String(item.id);
						if (!this.checkedArr.includes(itemVal)) {
							this.checkedArr.push(itemVal);
						}
					}
				} else {
					// 取消全选
					this.allChecked = false;
					this.checkedArr = [];
				}
			},
			RadioChange(e) {
				this.radio = e.detail.value
			},
			edit(mystatus) {
				if (mystatus == '编辑') {
					this.status = '完成'
				} else {
					this.status = '编辑'
				}
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			initdata(page, limit) {
				var obj = {
					page: page,
					limit: limit
				};
				this.$common.requests('/api/home/favoList', obj).then(res => {
					// this.$api.msg(res.data.msg);
					// if (res.data.code == 1) {
					// 	this.arrList = res.data.data
					// }

					if (res.data.code == 1) {
						if (page != 1) {
							if (res.data.data) {
								this.arrList = this.arrList.concat(res.data.data)
							}
						} else {
							this.arrList = res.data.data
						}
					}
				});
			},
		}
	}
</script>

<style>
	page {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.kong {
		width: 100%;
		height: var(--status-bar-height);
		background-color: #FF3237;
	}

	.top {
		width: 100%;
		height: 88rpx;
		padding: 26rpx;
		color: #FFFFFF;
		background-color: #FF3237;
	}

	.up_img {
		width: 20rpx;
		height: 30rpx
	}

	.titles {
		font-size: 32rpx;
		color: #FFFFFF;
		font-weight: 700;
	}

	.list {
		width: 100%;
		height: 90%;
		overflow-y: scroll;
	}

	.new_list {
		width: 100%;
		height: 98%;
		border-radius: 10px;
		margin-left: 20rpx
	}

	.list_one {
		width: 100%;
		height: 186rpx;
		margin: 20rpx auto;
		background-color: #FFFFFF;
	}

	.list_one_new {
		width: 100%;
		height: 186rpx;
		margin: 20rpx auto;
		padding-left: 30rpx;
		background-color: #FFFFFF;
	}

	.list_t {
		width: 100%;
		height: 200rpx;
	}

	.list_b {
		width: 100%;
		height: 300rpx;
	}

	.good_img {
		width: 200rpx;
		height: 140rpx;
		border-radius: 10rpx;
		margin-left: 20rpx;
	}

	.left {
		width: 250rpx;
		height: 100%;
		padding-left: 20rpx;
		border: 1px solid
	}

	.right {
		width: 93%;
		height: 120rpx;
		margin-left: 30rpx;
	}

	.title {
		width: 100%;
		height: 74rpx;
		font-size: 30rpx;
	}

	.star {
		width: 200rpx;
		height: 40rpx;
	}

	.star image {
		width: 26rpx;
		height: 26rpx;
		margin-right: 10rpx
	}

	.right_b {
		width: 89%;
		height: 70rpx;
	}

	.money {
		color: #FC0100;
		font-size: 24rpx;
	}

	.money_r {
		font-size: 32rpx;
	}

	.number {
		font-size: 24rpx;
		color: #888888;
		margin-left: 10rpx
	}

	.btns {
		width: 100%;
		height: 120rpx;
		background-color: #FFFFFF;
		position: fixed;
		bottom: 0rpx;
		box-shadow: 10px 10px 42px rgba(0, 0, 0, .1);
	}

	.btn_l {
		width: 40%;
		height: 100%;
	}

	.btns image {
		width: 150rpx;
		height: 60rpx
	}

	.jianju {
		margin-right: 20rpx
	}

	.box {
		width: 100%;
		height: 50%;
		margin-top: 280rpx;
		color: #5B5B63;
		letter-spacing: 3rpx;
		font-size: 32rpx;
	}

	.box image {
		width: 218rpx;
		height: 236rpx;
		margin-bottom: 110rpx;
	}

	.content1 {
		width: 100% !important;
		height: 70rpx;
		color: #333333;
		font-size: 32rpx;
		font-weight: 600;
		letter-spacing: 6rpx;
	}

	.padding-xl {
		background-color: #FFFFFF;
		padding: 0;
	}

	.row {
		height: 130rpx;
		letter-spacing: 3rpx;
		padding-top: 20rpx;
	}

	.action_left {
		width: 50%;
		height: 80rpx;
		font-size: 30rpx;
		background-color: #FFFFFF;
	}

	.action_left:hover {
		color: #FF3237;
	}

	.action_right {
		width: 50%;
		height: 80rpx;
		font-size: 30rpx;
		background-color: #FFFFFF;
	}

	.action_right:hover {
		color: #FF3237;
	}

	.shanchu {
		width: 220rpx;
		height: 80rpx;
		line-height: 80rpx;
		color: #FFFFFF;
		text-align: center;
		border-radius: 14rpx;
		background-color: #FF3237;
	}

	.cu-dialog {
		border-radius: 20rpx;
		width: 600rpx
	}
</style>
