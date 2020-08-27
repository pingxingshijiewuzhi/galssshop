<template>
	<view class="box">
		<view class="myorder_content">
			<view class="line"></view>
			<view class="barder flexs1" @click="todizhi">
				<image class="ditu" src="../../static/pic/icon_place@2x.png" mode=""></image>
				<view class="">
					<view class=" border_left flexs1">
						<view class="barder_left">{{address.name}}</view>
						<view class="barder_right">{{address.mobile}}</view>
					</view>
					<view class="barder_last">{{address.address}}{{address.detail_address}}</view>
				</view>
				<image class="image_next" src="../../static/pic/icon_enter@2x.png" mode=""></image>
			</view>
			<view class="myorder_body ">
				<view class="barner">
					<view class="barner_border" v-for="(item,index) in list.goods" :key='index'>
						<view class="new_box flexs1">
							<view class="myorder_pic">
								<image class="libao" :src="urls+item.head_image" mode=""></image>
							</view>
							<view class="myorder_body_right">
								<view class="myorder_body_right1">
									{{item.title | filterTitle}}
								</view>
								<view class="myorder_body_right1">
									{{item.description | filterFun}}
								</view>
								<view class="myorder_body_right2">
									<text class="new_left">规格：</text> {{item.attr_sku_one.value}}
								</view>
								<view class="myorder_body_right3 flexs1">
									<view class="border_number"><text class="new_left">数量：</text>{{item.buy_num}}</view>
									<view class="myorder_body_smallright3 flexs1">
										<text class="mydetail_moneysign">￥</text><text class="mydetail_money">{{item.attr_sku_one.price}}</text>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="barner1">
						<view class="barner_border_new">
							<!-- 数量增减 -->
							<!-- <view class="barner_border_box1">
								<view class="barner_border_box1_left">
									购买数量:
								</view>
								<view class="barner_border_box1_right">
									<wm-numberBox destination="body-btn" model="1" @change="数值改变后返回参数"></wm-numberBox>
								</view>
							</view> -->
							<view class="barner_border_box2">
								<view class="barner_border_box2_left">
									配送方式:
								</view>
								<view class="barner_border_box2_right">
									普通快递(快递￥{{list.default_exp_price}})
								</view>
							</view>
						</view>
						<view class="barner2">
							<view class="barner_border_box3">
								<view class="barner_border_box3_left">订单备注:</view>
								<view class="barner_border_box3_right ">
									<input type="text" placeholder="选填,请先和商家协调一致" v-model="saler_remark" />
								</view>
							</view>
						</view>
					</view>

					<!-- <view class="barner_border_body2">
					共1件<view class="barner_border_body2_left">小计：</view><text class="barner_money">￥{{list.total_prcie}}</text>
				</view> -->
				</view>
			</view>
			<view class="myorder_bottom">
				共1件<view class="barner_border_body2_left">合计：</view><text class="mydetail_moneysign">￥</text><text class="barner_money">{{list.total_prcie}}</text>
				<view class="myorder_sure" @click="tijiao()">
					提交订单
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import wmNumberBox from "@/components/wm-numberBox/wm-number-box.vue"
	export default {
		components: {
			wmNumberBox

		},
		data() {
			return {
				modalName: null,
				modalName1: null,
				currentIndex: 0,
				type: 1,
				ids: '',
				product_id: '',
				attr_sku_id: '',
				number: '',
				area_id: '',
				list: [],
				urls: this.$common.baseUrl,
				saler_remark: '',
				address: {}
			}
		},
		filters: {
			filterFun: function(value) {
				if (value && value.length > 20) {
					return value.substring(0, 20) + '...';
				}
				return value;
			},
			filterTitle: function(value) {
				if (value && value.length > 10) {
					return value.substring(0, 10) + '...';
				}
				return value;
			},

		},
		onLoad(option) {
			this.type = option.type;
			if (option.ids) {
				this.ids = option.ids;
			}
			if (option.product_id) {
				this.product_id = option.product_id;
			}
			if (option.attr_sku_id) {
				this.attr_sku_id = option.attr_sku_id;
			}
			if (option.number) {
				this.number = option.number;
			}
		},

		filters: {
			filterFun: function(value) {
				if (value && value.length > 20) {
					return value.substring(0, 20) + '...';
				}
				return value;
			},
			filterTitle: function(value) {
				if (value && value.length > 10) {
					return value.substring(0, 10) + '...';
				}
				return value;
			},
		},
		onShow() {
			if (uni.getStorageSync('area_id')) {
				this.area_id = uni.getStorageSync('area_id')
			}
			this.initdata();
		},
		methods: {
			tijiao() {
				if (this.type == 1) {
					//直接购买
					var obj = {
						product_id: this.product_id,
						attr_sku_id: this.attr_sku_id,
						buy_num: this.number,
						type: this.type,
						area_id: this.area_id,
						saler_remark: this.saler_remark
					};
				} else {
					//购物车购买
					var obj = {
						cart_ids: this.ids,
						type: this.type,
						area_id: this.area_id,
						saler_remark: this.saler_remark,
					};
				}

				this.$common.requests('/api/order/settlement', obj).then(res => {
					// this.$api.msg(res.data.msg);
					if (res.data.code == 1) {
						uni.navigateTo({
							url: "../myorder/payment?id=" + res.data.data
						})
					} else {
						this.$api.msg(res.data.msg);
					}
				});
			},
			initdata() {
				if (this.type == 1) {
					//直接购买
					var obj = {
						product_id: this.product_id,
						attr_sku_id: this.attr_sku_id,
						number: this.number,
						type: this.type,
						area_id: this.area_id
					};
				} else {
					//购物车购买
					var obj = {
						ids: this.ids,
						type: this.type,
						area_id: this.area_id
					};
				}

				this.$common.requests('/api/order/index', obj).then(res => {
					// this.$api.msg(res.data.msg);
					if (res.data.code == 1) {
						this.list = res.data.data;
						if (res.data.data.address.length != 0) {
							this.area_id = res.data.data.address.id;
							this.address = res.data.data.address
						}

					}
				});
			},
			todizhi() {
				uni.navigateTo({
					url: "../address/address?type=2"
				})
			},
			gopayment() {
				uni.navigateTo({
					url: "../myorder/payment"
				})
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			// 模态框2确认
			fukuan(e) {
				this.modalName1 = null
			},
			// change(e){
			// 	this.change = null
			// },
			// 模态框1确认
			hideModal(e) {
				this.modalName = null
				this.modalName1 = e.currentTarget.dataset.target
			},
			hidden(index) {
				console.log(index)
				if (index == this.currentIndex) {
					this.currentIndex = 200
					return
				}
				this.currentIndex = index
			},
		},
	}
</script>

<style>
	.box {
		width: 100vw;
		height: 100vh;
		background-color: #F4F4F4;
	}

	.myorder_content {
		width: 100%;
		height: 1200rpx;
		margin: 0 auto;
	}

	/* .line{
		width:100%;
		height:10rpx;
		background-color: #F2F2F2;
	} */
	.barder {
		width: 100%;
		height: 180rpx;
		background-color: #FFFFFF;
		padding: 0 30rpx;
	}

	.border_left {
		width: 520rpx;
	}

	.ditu {
		width: 48rpx;
		height: 42rpx;
		margin-right: 40rpx;
	}

	/* 弹框 */
	.deleat {
		width: 40rpx;
		height: 40rpx;
		/* position: absolute; */
		right: 20rpx;
		top: 20rpx;
	}

	.pasword {
		font-size: 32rpx;
		margin: 30rpx 0 20rpx 0;
	}

	.pa_l {
		padding-left: 40rpx;
		font-size: 32rpx;
	}

	.list {
		width: 100%;
		height: 100rpx;
		padding: 0 20rpx;
	}

	.list_image {
		width: 40rpx;
		height: 40rpx;
	}

	.list_yuan {
		width: 40rpx;
		height: 40rpx;
	}

	.box_list {
		width: 80rpx;
		height: 80rpx;
		border: solid 1rpx #E5E5E5;
	}

	.text_s {
		font-size: 32rpx;
		color: #656565;
	}

	.box_list input {
		margin-top: 16rpx;
		font-size: 34rpx;
	}

	.buttons {
		width: 94%;
		line-height: 80rpx;
		text-align: center;
		background-color: #5A7EF8;
		color: #FFFFFF;
		margin: 100rpx 3% 0 3%;
		font-size: 34rpx;
		margin: 20rpx 30rpx 50rpx 30rpx;
	}

	/* end */
	.next {
		width: 26rpx;
		height: 32rpx;
	}

	.border_next {
		font-size: 38rpx;
		color: #DE0E0B;
		font-weight: 500;
	}

	.border_num {
		letter-spacing: 4rpx;
	}

	.barner {
		width: 100%;
	}

	.barner1 {
		width: 100%;
		height: 500rpx;
	}

	.barner2 {
		width: 100%;
		height: 140rpx;
		margin: 20rpx auto;
		padding: 20rpx 20rpx;
		background-color: #FFFFFF;
	}

	.barner_border {
		width: 100%;
		height: 220rpx;
		margin: 20rpx auto;
		padding-top: 20rpx;
		background-color: #FFFFFF;
	}

	.barner_border_new {
		width: 100%;
		height: 110rpx;
		margin: 20rpx auto;
		padding: 20rpx 20rpx;
		background-color: #FFFFFF;
	}

	.libao {
		width: 180rpx;
		height: 180rpx;
		border-radius: 14rpx;
	}
	.image_next{
		width: 20rpx;
		height: 22rpx;
		position: absolute;
		right: 40rpx;
		
	}
	.myorder_pic {
		width: 180rpx;
		height: 180rpx;
		margin-left: 10rpx;
	}

	.text {
		width: 100%;
		line-height: 130rpx;
		background-color: #FFFFFF;
		padding: 0 30rpx;
	}

	.text_border {
		width: 92%;
		margin: 0 4%;
		height: 130rpx;
		border-bottom: solid 1rpx #E5E5E5;
		letter-spacing: 4rpx;
	}

	.barner_first {
		width: 380rpx;
		height: 130rpx;
		font-size: 34rpx;

	}

	.barder_left {
		font-size: 32rpx;
		font-weight: 600;
		letter-spacing: 6rpx;
		color: #363636;
		/* position: absolute; */
		left: 130rpx;
		top: 60rpx;
	}

	.barder_right {
		color: #7B7979;
		margin-left: 20rpx;
	}

	.barder_last {
		width: 98%;
		height: 40rpx;
		font-size: 30rpx;
		color: #000000;
		/* position: absolute; */
		left: 130rpx;
		margin-top: 10rpx;
		
	}

	.border_number {
		width: 360rpx;
		font-size: 30rpx;
	}

	.myorder_body {
		width: 100%;
		display: flex;
		justify-content: center;
	}

	.myorder_body_right {
		width: 480rpx;
		height: 180rpx;
		margin-left: 24rpx;
		/* border:2rpx solid blue; */
	}

	.myorder_body_right1 {
		width: 480rpx;
		height: 44rpx;
		/* border:2rpx solid green; */
		font-size: 32rpx;
		color: #000000;
		letter-spacing: 2rpx;
		word-break: keep-all;
		/* 不换行 */
		white-space: nowrap;
		/* 不换行 */
		overflow: hidden;
		/* 内容超出宽度时隐藏超出部分的内容 */
		text-overflow: ellipsis;
		/* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
	}

	.center {
		font-size: 32rpx;
		color: #000000;
		margin-left: 10rpx;
		margin-right: 10rpx;
	}

	.myorder_body_right2 {
		width: 480rpx;
		height: 44rpx;
		/* border:2rpx solid red; */
		font-size: 28rpx;
		color: #000000;
		letter-spacing: 2rpx;
	}

	.new_left {
		color: #7A7979;
	}

	.myorder_body_right3 {
		width: 580rpx;
		height: 44rpx;
		display: flex;
		justify-content: space-between;
	}

	.se {
		font-size: 28rpx;
		color: #000000;
		letter-spacing: 20rpx;
	}

	.mydetail_moneysign {
		font-size: 26rpx;
		color: #F00100;
		letter-spacing: 2rpx;
	}

	.mydetail_money {
		font-size: 32rpx;
		color: #F00100;
		font-weight: 600;
		letter-spacing: 2rpx;
	}

	.myorder_body_smallright3 {
		width: 240rpx;
		height: 44rpx;
	}

	.barner_border_box1 {
		width: 85%;
		height: 100rpx;
		/* border: solid 1rpx red; */
		display: flex;
		justify-content: space-between;
	}

	.barner_border_box1_left {
		width: 180rpx;
		height: 100rpx;
		letter-spacing: 4rpx;
		display: flex;
		align-items: center;
	}

	.barner_border_box1_right {
		width: 130rpx;
		height: 100rpx;
		/* background-color: #007AFF; */
		display: flex;
		align-items: center;
	}

	.barner_border_box2 {
		width: 100%;
		height: 60rpx;
		display: flex;
		/* border: solid 1rpx red; */
		justify-content: space-between;
	}

	.barner_border_box2_left {
		width: 452rpx;
		height: 60rpx;
		letter-spacing: 4rpx;
		display: flex;
		align-items: center;
	}

	.barner_border_box2_right {
		width: 430rpx;
		height: 60rpx;
		letter-spacing: 4rpx;
		display: flex;
		align-items: center;
	}

	.barner_border_box3 {
		width: 100%;
		height: 100rpx;
		display: flex;
		/* align-items: center; */
		flex-direction: row;
	}

	.barner_border_box3_left {
		width: 176rpx;
		height: 100rpx;
	}

	.barner_border_box3_right {
		width: 500rpx;
		height: 100rpx;
		text-align: right;
	}

	.barner_border_body2 {
		width: 100%;
		height: 130rpx;
		background-color: #FFFFFF;
		color: #000000;
		letter-spacing: 4rpx;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}

	.barner_border_body2 {
		color: #000000;
		letter-spacing: 4rpx;
	}

	.barner_border_body2_left {
		color: #000000;
		letter-spacing: 4rpx;
		margin-left: 25rpx;
	}

	.barner_money {
		color: #FF3237;
		letter-spacing: 4rpx;
		font-size: 40rpx;
		font-weight: 600;
	}

	.myorder_bottom {
		width: 100%;
		height: 106rpx;
		background-color: #FFFFFF;
		position: fixed;
		bottom: 0;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}

	.myorder_sure {
		width: 300rpx;
		height: 106rpx;
		line-height: 106rpx;
		color: #FFFFFF;
		background-color: #FF3237;
		display: flex;
		justify-content: center;
		margin-left: 20rpx
	}

	.myorder_sure_pic {
		width: 150rpx;
		height: 50rpx;
	}

	.uni-input-placeholder {
		font-size: 28rpx;
	}
</style>
