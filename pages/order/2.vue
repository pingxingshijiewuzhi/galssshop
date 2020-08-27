<template>
	<view class="box">
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
						<view>{{item.attr_sku_name}}</view>
					</view>
					<view class=" flexs2">
						<view class="border_next">￥<text class="money">{{item.product_price}}</text></view>
						<view>x{{item.buy_num}}</view>
					</view>
				</view>
			</view>
			<view :class="type==2||type==3?'barner_m_new':'barner_m'">
				<view class=" flexs2">
					<view>商品金额</view>
					<view>￥{{list.all_price}}</view>
				</view>
				<view class=" flexs2">
					<view>运费</view>
					<view>￥{{list.total_delivery_price}}</view>
				</view>
			</view>
			<view class="barner_b text-right">
				实付款:<text class="text-red">￥{{list.actual_price}}</text>
			</view>
		</view>
		<!-- 订单编号 -->
		<view class="big_box">
			<view class="big_box_l flexs1">
				<view>订单编号：{{list.order_num}}</view>
			</view>
			<view class="big_box_l flexs1">
				<view>下单时间：</view>
				<view>{{list.createtime}}</view>
			</view>
			<view class="big_box_l flexs1" v-show="type==4">
				<view>取消时间：</view>
				<view>2020.05.21 13：21</view>
			</view>
			<view class="big_box_l flexs1" v-show="type==2||type==3">
				<view>支付时间：</view>
				<view>{{list.pay_time}}</view>
			</view>
			<view class="big_box_l flexs1"  v-show="type==2||type==3">
				<view>支付方式：</view>
				<view v-if="list.pay_type==1">微信支付</view>
				<view v-if="list.pay_type==2">支付宝支付</view>
				<view v-if="list.pay_type==4">余额支付</view>
			</view>
			<view class="big_box_l flexs1">
				<view>配送方式：</view>
				<view>快递配送</view>
			</view>
			<view class="big_box_l flexs1"  v-show="type==2||type==3">
				<view>物流单号：</view>
				<view>{{list.express_name}}</view>
			</view>
			<view class="big_box_l flexs1"  v-show="type==2||type==3">
				<view>快递公司：</view>
				<view>{{list.express_sn}}</view>
			</view>
			<block v-if="list.saler_remark==''">
				
			</block>
			<block v-else>
				<view class="big_box_l flexs1">
					<view>订单备注：</view>
					<view>{{list.saler_remark}}</view>
				</view>
			</block>
			
		</view>
		<view class="button flexs3">
			<block v-if="type==0">
				<image  src="../../static/image/btn_qx_xiao@2x.png"  @tap="showModal" data-target="bottomModal1"></image>
				<image class='pay_img'  src="../../static/image/pay.png"  @click="gopay(list.id)"></image>
			</block>
			<block v-if="type==1">
				<!-- <image  src="../../static/image/new_tui.png" @tap="showModal2" data-target="haha"></image> -->
				<view class="sqtk flexs" @tap="showModal2" data-target="haha">
					申请退款
				</view>
			</block>
			<block v-if="type==2">
				<image  src="../../static/image/wuliu.png"></image>
				<image  src="../../static/image/shouhuo.png" @tap="showModal3" data-target="hehe" @click="shouhuo()"></image>
			</block>
			<block v-if="type==3">
				<image class="btn_img"  src="../../static/image/btn_ddxq_qpj@2x.png" @click="goPingjia(list.id)"></image>
			</block>
			<block v-if="type==4">
				
			</block>
		</view>
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
									<radio class="round" :class="radio==item.id?'checked':''" :checked="radio==item.id?true:false"
									 :value="item.id+''"></radio>
									<view class="flex-sub new_left">{{item.name}}</view>
								</label>
							</view>
						</view>
					</radio-group>
					<view class="btn">
						<image  src="../../static/image/btn_qx_xiao@2x.png"  @tap="hideModal"></image>
						<image  src="../../static/image/btn_sure@2x.png" @click="goquxiao()"></image>
					</view>
				</view>
			</view>
		</view>
		<!-- 申请退款 -->
		<view class="cu-modal bottom-modal" :class="modalName2=='haha'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white flexs">
					<view class="titles">申请退款</view>
					<!-- <view class="action text-green">确定</view>
					<view class="action text-blue" @tap="hideModal">取消</view> -->
				</view>
				<view class="padding-xl">
					<radio-group class="block" @change="RadioChange">
						<view class="cu-list menu text-left">
							<view class="cu-item" v-for="(item,index) in listly" :key="index">
								<label class="flex justify-between align-center flex-sub">
									<radio class="round" :class="radio==item.id?'checked':''" :checked="radio==item.id?true:false"
									 :value="item.id+''"></radio>
									<view class="flex-sub new_left">{{item.name}}</view>
								</label>
							</view>
						</view>
					</radio-group>
					<view class="btn">
						<image  src="../../static/image/btn_qx_xiao@2x.png"  @tap="s></image>
						<image  src="../../static/image/btn_sure@2x.png" @click="gotui()"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="modalName3=='hehe'?'show':''">
			<view class="cu-dialog_new">
				<view class="cu-bar bg-white justify-end content1" >
					<view class="content1">确定收货</view>
				</view>
				<view class="padding-xl"  >
					<view class="row" >您确定收到该商品吗？</view>
				</view>
				<view class=" flexs1 ">
					<button class="action_left" @tap="hideModal3">取消</button>
					<button class="action_right text-orange" @click="shouhuo">确定</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				radio: 'radio1',
				modalName: null,
				type:'',
				id:'',
				list:[],
				urls:this.$common.baseUrl,
				listly:[],
				address:{},
				modalName2:null,
				modalName3:null
			}
		},
		filters: {
			filterFun: function(value) {
				if(value && value.length > 20) {
					return value.substring(0, 20) + '...';
				}
				return value;
			},
			filterTitle: function(value) {
				if(value && value.length > 10) {
					return value.substring(0, 10) + '...';
				}
				return value;
			},
		},
		onLoad(option){
			this.type=option.type
			this.id=option.id
			this.initdata();
			this.getliyou();
		},
		methods:{
			//去支付
			gopay(id){
				uni.navigateTo({
					url:"../myorder/payment?id="+id
				})
			},
			//确认收货
			shouhuo(){
				var obj = {
					id:this.id
				};
				this.$common.requests('/api/orders/confirmOrder', obj).then(res => {
					this.modalName3 = null
					this.$api.msg(res.data.msg);
					if (res.data.code == 1) {
						setTimeout(() => {
							uni.navigateBack({
								delta:1
							})
						}, 1000)
					}
				});
			},
			//取消
			goquxiao(){
				var obj = {
					cancel_id:this.radio,
					id:this.id
				};
				this.$common.requests('/api/orders/cancelOrder', obj).then(res => {
					this.modalName = null
					this.$api.msg(res.data.msg);
					if (res.data.code == 1) {
						setTimeout(() => {
							uni.navigateBack({
								delta:1
							})
						}, 1000)
					}
				});
			},
			//退款
			gotui(){
				var obj = {
					cancel_id:this.radio,
					id:this.id
				};
				this.$common.requests('/api/orders/refund', obj).then(res => {
						this.modalName2 = null
					this.$api.msg(res.data.msg);
					if (res.data.code == 1) {
						setTimeout(() => {
							uni.navigateBack({
								delta:1
							})
						}, 1000)
					}
				});
			},
			//取消 退款理由
			getliyou(){
				var obj = {
				};
				this.$common.requests('/api/orders/cancelList', obj).then(res => {
					if (res.data.code == 1) {
						this.listly = res.data.data
					}
				});
			},
			initdata(){
				var obj = {
					id:this.id
				};
				this.$common.requests('/api/orders/detail', obj).then(res => {
					if (res.data.code == 1) {
						this.list = res.data.data;
						if(res.data.data.address_json) {
							this.address = res.data.data.address_json
						}
						
					}
				});
			},
			goAccount(){
				uni.navigateTo({
					url:"account"
				})
			},
			goOrder(){
				uni.navigateTo({
					url:"order"
				})
			},
			todizhi(){
				uni.navigateTo({
					url:"../myIntegral/site"
				})
			},
			goPingjia(id){
				uni.navigateTo({
					url:"../evaluation/evaluation?id="+id
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
	.page{
		width:100%;
		height:100%;
		overflow: hidden;
	}
	.box{
		width: 100%;
		height:100%;
		/* height: 2000rpx; */
		overflow-y: scroll;
		background-color: #F2F2F2;
	}
	.barder{
		width: 100%;
		height: 180rpx;
		background-color: #FFFFFF;
		margin-top: 20rpx;
		padding: 0 30rpx;
	}
	/* 弹框 */
	.deleat{
		width: 40rpx;
		height: 40rpx;
		position: absolute;
		right: 20rpx;
		top:20rpx;
	}
	.pasword{
		font-size: 32rpx;
		margin: 30rpx 0 20rpx 0;
	}
	.list{
		width: 100%;
		height: 180rpx;
	}
	.box_list{
		width: 80rpx;
		height: 80rpx;
	}
	.box_list input{
		margin-top: 16rpx;
		font-size: 34rpx;
	}
	.big_box{
		width:100%;
		margin-top:30rpx;
		padding:20rpx;
		background-color: #FFFFFF;
		margin-bottom: 130rpx;
	}
	.big_box_l{
		width:96%;
		height:48rpx;
		margin:0 auto;
		letter-spacing: 3rpx;
	}
	.barner_new{
		width: 100%;
		/* height: 420rpx ; */
		background-color: #FFFFFF;
		margin-top: 30rpx;
		padding: 0 30rpx;
		position: relative;
	}
	.barner_m_new{
		width:98%;
		height:108rpx;
		margin:0 auto;
		border-bottom:1px solid #F2F2F2
	}
	.barder_new{
		width: 100%;
		height: 160rpx;
		background-color: #FFFFFF;
		margin-top: 20rpx;
		padding: 0 30rpx;
	}
	.price{
		font-size: 32rpx;
		color:#FE1817;
		font-weight: 500;
	}
	.fuzhi{
		width:80rpx;
		color:#5B7DEF;
		background-color: #F2F3F0;
		text-align: center;
	}
	
	.new_box{
		width:500rpx;
		height:144rpx;
	}
	.new_box_l{
		width:100%;
		height:50rpx;
	}
	/* end */
	.ditu{	
		width: 44rpx;
		height: 62rpx;
	}
	.next{
		width: 26rpx;
		height: 46rpx;
	}
	.border_next{
		color:#FE1817;
	}
	.money{
		font-size: 36rpx;
		font-weight: 600;
	}
	.border_num {
		letter-spacing:4rpx;
	}
	.barner{
		width: 100%;
		/* height: 510rpx ; */
		background-color: #FFFFFF;
		margin-top: 30rpx;
		padding: 0 30rpx;
		position: relative;
	} 
	 .barner_border{
		width: 98%;
		margin:0 auto;
		height: 240rpx ;
		border-bottom:1px solid #F2F2F2
	} 
	.barner_m{
		width:98%;
		height:160rpx;
		margin:0 auto;
		border-bottom:1px solid #F2F2F2
	} 
	.barner_m view{
		height:50%;
	}
	.barner_m_new view{
		height:50%;
	}
	.barner_b{
		height: 70rpx;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}
	.libao{
		width: 180rpx;
		height: 200rpx;
	}
	.text{
		width: 100%;
		line-height: 130rpx;
		background-color: #FFFFFF;
		padding: 0 30rpx;
	}
	.text_border{
		width: 90%;
		margin: 0 5%;
		height: 130rpx;
		letter-spacing: 4rpx;
	}
	.barner_first{
		width: 100%;
		height: 100rpx;
		font-weight: 600;
		font-size: 30rpx;
	}
	.border_left_m{
		width:45%;
		height:66rpx
	}
	.barder_left{
		font-size: 32rpx;
		font-weight: 600;
		margin-right: 20rpx;
		color: #363636;
		letter-spacing: 6rpx;
	}
	.barder_right{
		font-size: 32rpx;
		font-weight: 600;
		color: #363636;
		letter-spacing: 6rpx;
		margin-top: 8rpx;
	}
	.barder_last{
		font-size: 30rpx;
		margin-top: 10rpx;
		color: #5E5E5E;
	}
	.border_left{
		width:460rpx;
		margin-left: 30rpx;
	}
	.border_number{
		width: 60rpx;
		line-height: 120rpx;
		position: absolute;
		bottom: 10rpx;
		right: 30rpx;
	}
	.mt{
		margin-top: 30rpx;
		border: none;
	}
	.none{
		border: none;
	}
	.button{
		width: 100%;
		line-height: 120rpx;
		text-align: center;
		/* position: absolute; */
		bottom: 50rpx;
		font-size: 32rpx;
		position: fixed;
		bottom:25rpx;
	}
	.button image{
		width:300rpx;
		height:80rpx
	}
	.padding-xl{
		width:100%;
		background-color: #FFFFFF;
		padding:0rpx
	}
	.cu-list.menu>.cu-item:after{
		border:none !important
	}
	.cu-list.menu>.cu-item{
		width:800rpx;
		padding:0 !important;
		margin-left:30rpx;
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
			height: 630rpx
		}
	/*  #endif  */
	.titles{
		font-size: 30rpx;
		font-weight: 600;
		color:#000000;
		letter-spacing: 4rpx;
	}
	.new_left{
		margin-left:30rpx
	}
	.btn{
		width:100%;
		height:100rpx;
	}
	.btn image{
		width:330rpx;
		height:92rpx
	}
	.btn_img{
		width:636rpx !important;
		height:92rpx
	}
	.pay_img{
		height:62rpx !important;
	}
	.content1{
		width:100% !important;
		height: 70rpx;
		color:#333333;
		font-size: 32rpx;
		font-weight: 600;
		letter-spacing: 6rpx;
	}
	.padding-xl{
		background-color: #FFFFFF;
		padding: 0;
	}
	.row{
		height:104rpx;
		color: #5D5D5D;
		letter-spacing: 3rpx;
		padding-top: 20rpx;
	}
	.action_left{
		width: 50%;
		height: 80rpx;
		font-size: 30rpx;
		background-color: #FFFFFF;
	}
	.action_left:hover{
		color:#5A7EF8;
	}
	.action_right{
		width:50%;
		height: 80rpx;
		font-size: 30rpx;
		background-color: #FFFFFF;
	}
	.action_right:hover{
		color:#5A7EF8;
	}
	
	.cu-dialog_new{
		width:620rpx;
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
	.sqtk{
		width: 90%;
		height: 84rpx;
		font-size: 34rpx;
		color: #FFFFFF;
		background-color: #FF6320;
		border-radius: 30rpx;
		letter-spacing: 5rpx;
		
	}
</style>
