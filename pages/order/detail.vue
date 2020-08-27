<template>
	<view class="box">
		<view class="color_top"></view>
		<view :class="type==2||type==3?'barder_new flexs2':'barder flexs2'">
			<image class="ditu" src="../../static/image/icon_dingwei@2x.png" mode=""></image>
			<view class="new_box">
				<view class="new_box_l flexs1">
					<view class="barder_left">{{address.name}}</view>
					<view class="barder_right">{{address.mobile}}</view>
				</view>
				<view class="barder_last">{{address.address}}{{address.detail_address}}</view>
			</view>
			<image class="next" src="" mode=""></image>
		</view>
		<view :class="type==2||type==3?'barner_new':'barner'">
			<view class="barner_border flexs1" v-for="(item,index) in list.order_product" :key="index">
				<image class="libao" :src="urls+item.image" mode=""></image>
				<view class="border_left">
					<view class="barner_first">{{item.product_title | filterFun}}</view>
					<view class="border_left_m flexs2">
						<view>规格：{{item.attr_sku_name}}</view>
						<view border_right>x{{item.buy_num}}</view>
					</view>
				</view>
			</view>
			<view :class="type==2||type==3?'barner_m_new':'barner_m'">
				<view class=" flexs2">
					<view class="color_s">商品金额</view>
					<view>￥{{list.all_price}}</view>
				</view>
				<view class=" flexs2">
					<view class="color_s">运费</view>
					<view>￥{{list.total_delivery_price}}</view>
				</view>
			</view>
			<view class="barner_b text-right">
				总价:<text class="textmaf">￥</text><text class="text_red"> {{list.actual_price}}</text>
			</view>
		</view>
		<!-- 订单编号 -->
		<view class="big_box">
			<view class="big_box_l flexs2">
				<view class="color_s">订单编号：</view>
				<view> {{list.order_num}}</view>
			</view>
			<view class="big_box_l flexs2">
				<view class="color_s">下单时间：</view>
				<view>{{list.createtime}}</view>
			</view>
			<view class="big_box_l flexs2" v-show="type==4">
				<view class="color_s">取消时间：</view>
				<view>2020.05.21 13：21</view>
			</view>
			<view class="big_box_l flexs2" v-show="type==2||type==3">
				<view class="color_s">支付时间：</view>
				<view>{{list.pay_time}}</view>
			</view>
			<view class="big_box_l flexs2" v-show="type==2||type==3">
				<view class="color_s">支付方式：</view>
				<view v-if="list.pay_type==1">微信支付</view>
				<view v-if="list.pay_type==2">支付宝支付</view>
				<view v-if="list.pay_type==4">余额支付</view>
			</view>
			<view class="big_box_l flexs2">
				<view class="color_s">配送方式：</view>
				<view>快递配送</view>
			</view>
			<view class="big_box_l flexs2" v-show="type==2||type==3">
				<view class="color_s">物流单号：</view>
				<view>{{list.express_name}}</view>
			</view>
			<view class="big_box_l flexs2" v-show="type==2||type==3">
				<view class="color_s">快递公司：</view>
				<view>{{list.express_sn}}</view>
			</view>
			<block v-if="list.saler_remark==''">

			</block>
			<block v-else>
				<view class="big_box_l flexs2">
					<view class="color_s">订单备注：</view>
					<view>{{list.saler_remark}}</view>
				</view>
			</block>
		</view>
		<block v-if="type==0">
			<view class="big_l flexs4">
				<view class="gopay text-center" @click="gopay(list.id)">去付款</view>
				<view class="cancel text-center" @tap="showModal" data-target="bottomModal1">取消订单</view>
			</view>
			<!-- 	<image  src="../../static/image/btn_qx_xiao@2x.png"  ></image>
							<image class='pay_img'  src="../../static/image/pay.png"  @click="gopay(list.id)"></image> -->
		</block>
		<block v-if="type==2">
			<view class="big_l flexs4">
				<view class="gopay text-center" @tap="showModal3" data-target="hehe" @click="shouhuo()">确认收货</view>
				<view class="cancel text-center">查看物流</view>
			</view>
			<!-- 				<image  src="../../static/image/wuliu.png"></image>
							<image  src="../../static/image/shouhuo.png" @tap="showModal3" data-target="hehe" @click="shouhuo()"></image> -->
		</block>
		<!-- 取消订单弹框 -->
		<view class="cu-modal bottom-modal" :class="modalName=='bottomModal1'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white flexs">
					<view class="titles">取消订单</view>
				</view>
				<view class="padding-xl">
					<radio-group class="block" @change="RadioChange1">
						<view class="cu-list menu text-left">
							<view class="cu-item" v-for="(item,index) in listly" :key="index">
								<label class="flex justify-between align-center flex-sub">
									<radio class="round" :class="radio==item.id?'checked':''" :checked="radio==item.id?true:false" :value="item.id+''"></radio>
									<view class="flex-sub new_left">{{item.name}}</view>
								</label>
							</view>
						</view>
					</radio-group>
					<view class="btn">
						<view class="btn flexs1">
							<view class="quxiao" @tap="hideModal">取消</view>
							<view class="queding" @click="goquxiao()">确定</view>
						</view>
						<!-- 		<image  src="../../static/image/btn_qx_xiao@2x.png"  @tap="hideModal"></image>
							<image  src="../../static/image/btn_sure@2x.png" @click="goquxiao()"></image> -->
					</view>
				</view>
			</view>
		</view>
		<!-- 申请退款 -->
		<view class="cu-modal bottom-modal" :class="modalName2=='haha'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white flexs">
					<view class="titles">申请退款</view>
				</view>
				<view class="padding-xl">
					<radio-group class="block" @change="RadioChange">
						<view class="cu-list menu text-left">
							<view class="cu-item" v-for="(item,index) in listly" :key="index">
								<label class="flex justify-between align-center flex-sub">
									<radio class="round" :class="radio==item.id?'checked':''" :checked="radio==item.id?true:false" :value="item.id+''"></radio>
									<view class="flex-sub new_left">{{item.name}}</view>
								</label>
							</view>
						</view>
					</radio-group>
					<view class="btn">
						<image src="../../static/image/btn_qx_xiao@2x.png" @tap="hideModal2"></image>
						<image src="../../static/image/btn_sure@2x.png" @click="gotui(id)"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="modalName3=='hehe'?'show':''">
			<view class="cu-dialog_new">
				<view class="cu-bar bg-white justify-end content1">
					<view class="content1">确定收货</view>
				</view>
				<view class="padding-xl">
					<view class="row">您确定收到该商品吗？</view>
				</view>
				<view class=" flexs1 ">
					<button class="action_left" @tap="hideModal3">取消</button>
					<button class="action_right text_red" @click="shouhuo">确定</button>
				</view>
			</view>
		</view>

	</view>


</template>

<script>
	export default {
		data() {
			return {
				radio: 'radio1',
				modalName: null,
				type: '',
				id: '',
				list: [],
				urls: this.$common.baseUrl,
				listly: [],
				address: {},
				modalName2: null,
				modalName3: null
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
			this.type = option.type
			this.id = option.id
			this.initdata();
			this.getliyou();
		},
		methods: {
			goTuikuan() {
				var id = this.id
				uni.navigateTo({
					url: '../refund/refund?id=' + id
				})
			},
			//去支付
			gopay(id) {
				uni.navigateTo({
					url: "../myorder/payment?id=" + id
				})
			},
			//确认收货
			shouhuo() {
				var obj = {
					id: this.id
				};
				this.$common.requests('/api/orders/confirmOrder', obj).then(res => {
					this.modalName3 = null
					this.$api.msg(res.data.msg);
					if (res.data.code == 1) {
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						}, 1000)
					}
				});
			},
			//取消
			goquxiao() {
				var obj = {
					cancel_id: this.radio,
					id: this.id
				};
				this.$common.requests('/api/orders/cancelOrder', obj).then(res => {
					this.modalName = null
					this.$api.msg(res.data.msg);
					if (res.data.code == 1) {
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						}, 1000)
					}
				});
			},
			//退款
			gotui() {
				var obj = {
					cancel_id: this.radio,
					id: this.id
				};
				this.$common.requests('/api/orders/refund', obj).then(res => {
					this.modalName2 = null
					this.$api.msg(res.data.msg);
					if (res.data.code == 1) {
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						}, 1000)
					}
				});
			},
			//取消 退款理由
			getliyou() {
				var obj = {};
				this.$common.requests('/api/orders/cancelList', obj).then(res => {
					if (res.data.code == 1) {
						this.listly = res.data.data
					}
				});
			},
			initdata() {
				var obj = {
					id: this.id
				};
				this.$common.requests('/api/orders/detail', obj).then(res => {
					if (res.data.code == 1) {
						this.list = res.data.data;
						if (res.data.data.address_json) {
							this.address = res.data.data.address_json
						}

					}
				});
			},
			goAccount() {
				uni.navigateTo({
					url: "account"
				})
			},
			goOrder() {
				uni.navigateTo({
					url: "order"
				})
			},
			todizhi() {
				uni.navigateTo({
					url: "../myIntegral/site"
				})
			},
			goPingjia(id) {
				uni.navigateTo({
					url: "../evaluation/evaluation?id=" + id
				})
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			showModal2(e) {
				this.modalName2 = e.currentTarget.dataset.target
				console.log(this.modalName2)
			},
			hideModal2(e) {
				this.modalName2 = null
			},
			showModal3(e) {
				this.modalName3 = e.currentTarget.dataset.target
			},
			hideModal3(e) {
				this.modalName3 = null
			},
			RadioChange(e) {
				this.radio = e.detail.value
			},
			RadioChange1(e) {
				this.radio = e.detail.value
			},
		},
	}
</script>

<style>
	.box {
		width: 100vw;
		height: 100vh;
		/* height: 2000rpx; */
		background-color: #F2F2F2;
	}

	.color_top {
		width: 100%;
		height: 100rpx;
		background-color: #FF3237;
	}

	.color_s {
		color: #8D8D8D;
	}

	.barder {
		width: 92%;
		height: 180rpx;
		margin: 0 auto;
		background-color: #FFFFFF;
		margin-top: -90rpx;
		padding: 0 30rpx;
		border-radius: 10rpx 10rpx;
	}

	.pasword {
		font-size: 32rpx;
		margin: 30rpx 0 20rpx 0;
	}

	.list {
		width: 100%;
		height: 180rpx;
	}

	.box_list {
		width: 80rpx;
		height: 80rpx;
	}

	.box_list input {
		margin-top: 16rpx;
		font-size: 34rpx;
	}

	.big_box {
		width: 92%;
		margin: 0 auto;
		border-radius: 10rpx 10rpx;
		margin-top: 30rpx;
		padding: 20rpx;
		background-color: #FFFFFF;
		margin-bottom: 30rpx;
	}

	.text_red {
		color: #FF3237;
		font-size: 34rpx;
		font-weight: 600;
	}

	.textmaf {
		color: #FF3237;
		font-size: 600;
	}

	.big_box_l {
		width: 96%;
		height: 62rpx;
		margin: 0 auto;
		letter-spacing: 3rpx;
	}

	.barner_new {
		width: 92%;
		margin: 0 auto;
		border-radius: 10rpx 10rpx;
		/* height: 420rpx ; */
		background-color: #FFFFFF;
		margin-top: 30rpx;
		padding: 0 30rpx;

	}

	.big_l {
		width: 100%;
		background-color: #F4F4F4;
	}

	.big_l view {
		margin-right: 30rpx
	}

	.cancel {
		width: 200rpx;
		height: 66rpx;
		line-height: 66rpx;
		border-radius: 10rpx;
		color: #FF3237;
		border: 1px solid #FF3237;
	}

	.quxiao {
		width: 50%;
		height: 100rpx;
		line-height: 100rpx;
		color: #E5E5E5;
		text-align: center;
		font-size: 32rpx;
		border-top: solid 1rpx #E5E5E5;
		border-right: solid 1rpx #E5E5E5;
	}

	.queding {
		width: 50%;
		height: 100rpx;
		line-height: 100rpx;
		color: #FF3237;
		text-align: center;
		font-size: 32rpx;
		border-top: solid 1rpx #E5E5E5;
	}

	.gopay {
		width: 200rpx;
		height: 66rpx;
		line-height: 66rpx;
		border-radius: 10rpx;
		background-color: #FF3237;
		color: #FFFFFF;
		margin-right: 60rpx !important;
	}

	.barner_m_new {
		width: 98%;
		height: 108rpx;
		margin: 0 auto;
	}

	.barder_new {
		width: 92%;
		margin: 0 auto;
		border-radius: 10rpx 10rpx;
		height: 160rpx;
		margin-top: -80rpx;
		background-color: #FFFFFF;
		padding: 0 30rpx;
	}

	.price {
		font-size: 32rpx;
		color: #FE1817;
		font-weight: 500;
	}

	.fuzhi {
		width: 80rpx;
		color: #5B7DEF;
		background-color: #F2F3F0;
		text-align: center;
	}

	.new_box {
		width: 500rpx;
		height: 144rpx;
	}

	.new_box_l {
		width: 100%;
		height: 50rpx;
		margin-top: 20rpx;
	}

	/* end */
	.ditu {
		width: 44rpx;
		height: 62rpx;
	}

	.next {
		width: 26rpx;
		height: 46rpx;
	}

	.border_next {
		color: #FE1817;
	}

	.money {
		font-size: 36rpx;
		font-weight: 600;
	}

	.border_num {
		letter-spacing: 4rpx;
	}

	.barner {
		width: 92%;
		margin: 0 auto;
		border-radius: 10rpx 10rpx;
		/* height: 510rpx ; */
		background-color: #FFFFFF;
		margin-top: 30rpx;
		padding: 0 30rpx;
	}

	.barner_border {
		width: 98%;
		margin: 0 auto;
		height: 240rpx;
	}

	.barner_m {
		width: 98%;
		height: 160rpx;
		margin: 0 auto;
	}

	.barner_m view {
		height: 50%;
	}

	.barner_m_new view {
		height: 50%;
	}

	.barner_b {
		height: 70rpx;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}

	.libao {
		width: 150rpx;
		height: 150rpx;
	}

	.text {
		width: 100%;
		line-height: 130rpx;
		background-color: #FFFFFF;
		padding: 0 30rpx;
	}

	.text_border {
		width: 90%;
		margin: 0 5%;
		height: 130rpx;
		letter-spacing: 4rpx;
	}

	.barner_first {
		width: 100%;
		height: 100rpx;
		font-weight: 600;
		font-size: 30rpx;
	}

	.border_left_m {
		width: 100%;
		height: 66rpx;
		color: #8D8D8D;
	}

	.barder_left {
		font-size: 32rpx;
		font-weight: 600;
		margin-right: 20rpx;
		color: #363636;
		letter-spacing: 6rpx;
	}

	.barder_right {
		font-size: 32rpx;
		font-weight: 600;
		color: #363636;
		letter-spacing: 6rpx;
		margin-top: 8rpx;
	}

	.barder_last {
		font-size: 30rpx;
		margin-top: 10rpx;
		color: #5E5E5E;
	}

	.border_left {
		width: 460rpx;
		margin-left: 30rpx;
	}
	.mt {
		margin-top: 30rpx;
		border: none;
	}

	.none {
		border: none;
	}

	.button {
		width: 100%;
		line-height: 120rpx;
		text-align: center;
		font-size: 32rpx;
	}

	.button image {
		width: 300rpx;
		height: 80rpx
	}

	.padding-xl {
		width: 100%;
		background-color: #FFFFFF;
		padding: 0rpx
	}

	.cu-list.menu>.cu-item:after {
		border: none !important
	}

	.cu-list.menu>.cu-item {
		width: 800rpx;
		padding: 0 !important;
		margin-left: 30rpx;
		min-height: 46px;
	}

	/*#ifdef APP-PLUS*/
	.cu-dialog {
		background-color: #FFFFFF;
		height: 600rpx
	}

	/*  #endif  */
	/*#ifdef H5 */
	.cu-dialog {
		background-color: #FFFFFF;
		height: 580rpx
	}

	/*  #endif  */
	.titles {
		font-size: 30rpx;
		font-weight: 600;
		color: #000000;
		letter-spacing: 4rpx;
	}

	.new_left {
		margin-left: 30rpx
	}

	.btn {
		width: 100%;
		height: 100rpx;
	}

	.btn image {
		width: 330rpx;
		height: 92rpx
	}

	.btn_img {
		width: 636rpx !important;
		height: 92rpx
	}

	.pay_img {
		height: 62rpx !important;
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
		height: 104rpx;
		color: #5D5D5D;
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
		color: #5A7EF8;
	}

	.cu-dialog_new {
		width: 620rpx;
		position: relative;
		display: inline-block;
		vertical-align: middle;
		margin-left: auto;
		margin-right: auto;
		max-width: 100%;
		background-color: #f8f8f8;
		border-radius: 5px;
		overflow: hidden;
		background-color: #FFFFFF;
		height: 280rpx !important;
	}

	.sqtk {
		width: 90%;
		height: 84rpx;
		font-size: 34rpx;
		color: #FFFFFF;
		background-color: #FF6320;
		border-radius: 30rpx;
		letter-spacing: 5rpx;

	}
</style>
