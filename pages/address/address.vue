<template>
	<view class="box">
		<!-- 没有地址样式-->
		<block v-if="list.length==0">
			<view class='box_new text-center'>
				<image src="../../static/pic/img_noplace@2x.png"></image>
				<view>您还没有添加收货地址</view>
			</view>
		</block>
		<block v-else>
			<!-- 有地址样式-->
			<view class="big_list">
				<view class="list" v-for="(item,index) in list" :key="index">
					<view class="list_border" @click="goorder(item.id)">
						<view class="flexs1 new_box">
							<view class="barder_left">{{item.name}}</view>
							<view class="barder_right">{{item.mobile}}</view>
						</view>
						<view class="barder_last">{{item.address}}{{item.detail_address}}</view>
					</view>
					<view class="center flexs2">
						<view class="flexs1">
						</view>
						<view class="flexs1">
							<view class="flexs1">
								<image class="center_image" src="../../static/pic/btn_edit@2x.png" mode=""></image>
								<view class="center_text" @click="goAdd(item.id)">编辑</view>
							</view>
							<view class="flexs1 mlf">
								<image class="center_image" src="../../static/pic/btn_delete_1@2x.png" mode=""></image>
								<view class="center_text" @click="godel(item.id)" data-target="DialogModal1">删除</view>
							</view>
						</view>
					</view>
					<block v-if="item.is_default==1">

					</block>
					<block v-if="item.is_default==2">
						<view class="moren">
							<image src="../../static/pic/icon_default@2x.png"></image>
						</view>
					</block>

				</view>
			</view>

		</block>

		<view class="cu-modal" :class="modalName=='DialogModal1'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end content">
					<view class="content">提示</view>
				</view>
				<view class="padding-xl" @change="changeDatetimePicker">
					<view class="row">确定删除该地址吗？</view>
				</view>
				<view class=" flexs1 ">
					<button class="action_left" @tap="hideModal">取消</button>
					<button class="action_right text-red" @click="delte">确定</button>
				</view>
			</view>
		</view>
		<view class="btns flexs" @click="goAdd(0)">
			添加新地址
			<!-- <image src='../../static/image/btn_tjdz@2x.png'></image> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				modalName: null,
				checkbox: [{
					value: 'A',
					checked: true
				}, {
					value: 'B',
					checked: true
				}, {
					value: 'C',
					checked: false
				}],
				list: [],
				delid: '',
				type: 1
			}
		},
		onLoad(option) {
			if (option.type) {
				this.type = option.type;
			}
		},
		onShow() {
			this.initdata();
		},
		methods: {
			goorder(id) {
				if (this.type == 2) {
					uni.setStorageSync('area_id', id);
					uni.navigateBack({
						delta: 1
					})
				}

			},
			godel(id) {
				this.delid = id;
				this.modalName = 'DialogModal1'
			},
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
			initdata() {
				var obj = {};
				this.$common.requests('/api/Address/index', obj).then(res => {
					// this.$api.msg(res.data.msg);
					if (res.data.code == 1) {
						this.list = res.data.data
					}
				});
			},
			CheckboxChange(e) {
				var items = this.checkbox,
					values = e.detail.value;
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					items[i].checked = false;
					for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
						if (items[i].value == values[j]) {
							items[i].checked = true;
							break
						}
					}
				}
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			changeDatetimePicker(date) {
				console.log(date);
			},
			goAdd(id) {
				uni.navigateTo({
					url: "../address/addAddress?id=" + id
				})
			},

		},
	}
</script>

<style>
	page {
		width: 100%;
		height: 100%;
		overflow: hidden;
		background-color: #F4F4F4;
	}

	.box {
		width: 100vw;
		height: 100vh;
		background-color: #F2F2F2;
	}

	.list {
		width: 100%;
		height: 210rpx;
		background-color: #FFFFFF;
		margin-top: 16rpx;
	}

	.list_border {
		width: 88%;
		margin: 0 auto;
		border-bottom: 1px solid #E3E3E3;
	}

	.new_box {
		width: 100%;
		height: 80rpx;
	}

	.barder_left {
		width: auto;
		height: 42rpx;
		font-size: 34rpx;
		letter-spacing: 6rpx;
		margin-right: 20rpx;
	}

	.barder_right {
		width: 300rpx;
		height: 42rpx;
		line-height: 42rpx;
		color: #7B7979;
	}

	.mo {
		width: 82rpx;
		height: 42rpx;
		line-height: 42rpx;
		text-align: center;
		background-color: #F2F2F2;
		color: #FF5E26
	}

	.moren image {
		width: 64rpx;
		height: 64rpx;
		position: relative;
		left: 686rpx;
		bottom: 186rpx
	}

	.barder_last {
		height: 60rpx;
		font-size: 30rpx;
	}

	.center {
		padding: 0 30rpx;
		margin-top: 10rpx;
	}

	.center_di {
		margin-left: 20rpx;
	}

	.mlf {
		margin-left: 30rpx;
	}

	.button {
		width: 100%;
		line-height: 110rpx;
		background-color: #5A7EF8;
		color: #FFFFFF;
		text-align: center;
		position: absolute;
		bottom: 0;
	}

	.center_image {
		width: 24rpx;
		height: 28rpx;
	}

	.center_text {
		margin-left: 10rpx;
		color: #7A7A7A;
	}

	.big_list {
		width: 100%;
		height: 100%;
		overflow-y: scroll;
	}

	/* model */
	.action_left {
		width: 50%;
		height: 80rpx;
		font-size: 30rpx;
	}

	.action_left:hover {
		color: #5A7EF8;
	}

	.row {
		height: 130rpx;
		letter-spacing: 3rpx;
		padding-top: 20rpx;
	}

	.action_right {
		width: 50%;
		height: 80rpx;
		font-size: 30rpx;
	}

	.content {
		width: 100% !important;
		height: 70rpx;
		color: #333333;
		font-size: 32rpx;
		font-weight: 600;
		letter-spacing: 6rpx;
	}

	.action_right:hover {
		color: #5A7EF8;
	}

	.padding-xl {
		background-color: #FFFFFF;
		padding: 0;
	}

	.btns {
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

	.btns image {
		width: 94%;
		height: 100rpx
	}

	uni-button {
		background-color: #FFFFFF !important;
	}

	uni-button:after {
		border: 1px solid #E5E5E5;
	}

	.box_new {
		width: 100%;
		height: 50%;
		padding-top: 180rpx;
		color: #9A9A9A;
		letter-spacing: 3rpx;
		font-size: 32rpx;
	}

	.box_new image {
		width: 320rpx;
		height: 250rpx;
		margin-bottom: 110rpx;
	}
</style>
