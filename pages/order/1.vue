<template>
	<view class="content">
		<view class="top">
			<view class="list flexs3">
				<view :class="['inv-h',Inv==0?'inv-h-se':'']" @click="Inv=0">
					待付款
					<view :class="Inv==0?'small':''"></view>
				</view>
				<view :class="['inv-h',Inv==1?'inv-h-se':'']" @click="Inv=1">
					制作中
					<view :class="Inv==1?'small':''"></view>
				</view>
				<view :class="['inv-h',Inv==2?'inv-h-se':'']" @click="Inv=2">
					配送中
					<view :class="Inv==2?'small':''"></view>
				</view>
				<view :class="['inv-h',Inv==3?'inv-h-se':'']" @click="Inv=3">
					待评价
					<view :class="Inv==3?'small':''"></view>
				</view>
				<view :class="['inv-h',Inv==4?'inv-h-se':'']" @click="Inv=4">
					退款/取消
					<view :class="Inv==4?'small':''"></view>
				</view>
			</view>
		</view>
		<view class="big">
			<!-- 待付款 -->
			<view class="big_list"  v-for="(item,index) in list1" :key="'1'+index" v-show="Inv==0">
				<view class="big_t_r">待付款</view>
				<view class="big_t flexs2"  v-for="(items,indexs) in item.order_product" :key="indexs" @click="toxianga(0,item.id)">
					<view class="flexs1">
						<image class="dai_image" :src="urls+items.image"></image>
						<!-- <image class="dai_image" src="../../static/pic/img_dd@2x.png" mode=""></image> -->
						<view class="big_center" >
							<view class="big_centertop">{{items.product_title}}</view>
							<view class="big_centerran">
								<text>规格：{{items.attr_sku_name}}</text>
								<text class="big_right">X{{items.buy_num}}</text>
							</view>
						</view>
					</view>
				</view>
				<view class='big_b flexs4'>
					<view>总价:￥ <text class="big_bcolor">{{item.actual_price}}</text></view>
				</view>
				<view class="big_l flexs4">
					<view class="gopay text-center" @click="gopay(item.id)">去付款</view>
					<view class="cancel text-center" @tap="showModal($event,item.id)" data-target="bottomModal1">取消订单</view>
				</view>
			</view>
			<!-- 制作中 -->
			<view class="big_list"  v-for="(item,index) in list2" :key="'a'+index" v-show="Inv==1">
				<view class="big_t_r">制作中</view>
				<view class="big_t flexs2">
					<view class="flexs1">
						<image class="dai_image" :src="urls+imgList.app_icon" mode=""></image>
						<view class="big_center">
							<view class="big_centertop">定制折叠门推拉门各种各样铝合金私人订制高效快捷实惠</view>
							<view class="big_centerran">
								<text>规格：2.1版本</text>
								<text class="big_right">X1</text>
							</view>
						</view>
					</view>
				</view>
				<view class='big_b flexs4'>
					<view>总价:￥ <text class="big_bcolor">{{item.actual_price}}</text></view>
				</view>
				<view class="big_l flexs4">
					<view class="gopay text-center" @click="toxianga">查看详情</view>
				</view>
			</view>
		<!-- 	<view class="wudan" v-show="Inv==1">
				<image class="wudingdan" src="../../static/pic/img_noorder@2x.png" mode=""></image>
				<view class="wudingdan_c">暂无相关订单</view>
			</view> -->
			<!-- 配送中 -->
				<view class="big_list"  v-for="(item,index) in 2" :key="'2'+index" v-show="Inv==2">
					<view class="big_t_r">配送中</view>
					<view class="big_t flexs2" @click="toxiangb">
						<view class="flexs1">
							<image class="dai_image" src="../../static/pic/img_dd@2x.png" mode=""></image>
							<view class="big_center">
								<view class="big_centertop">定制折叠门推拉门各种各样铝合金私人订制高效快捷实惠</view>
								<view class="big_centerran">
									<text>规格：2.1版本</text>
									<text class="big_right">X1</text>
								</view>
							</view>
						</view>
					</view>
					<view class='big_b flexs4'>
						<view>总价:￥ <text class="big_bcolor">{{item.actual_price}}</text></view>
					</view>
					<view class="big_l flexs4">
						<view class="gopay text-center" @click="successshou">确认收货</view>
						<view class="cancel text-center">查看物流</view>
					</view>
				</view>
				<!-- 已完成 -->
				<view class="big_list"  v-for="(item,index) in 2" :key="'3'+index" v-show="Inv==3">
					<view class="big_t_r">已完成</view>
					<view class="big_t flexs2" @click="toxiangc">
						<view class="flexs1">
							<image class="dai_image" src="../../static/pic/img_dd@2x.png" mode=""></image>
							<view class="big_center">
								<view class="big_centertop">定制折叠门推拉门各种各样铝合金私人订制高效快捷实惠</view>
								<view class="big_centerran">
									<text>规格：2.1版本</text>
									<text class="big_right">X1</text>
								</view>
							</view>
						</view>
					</view>
					<view class='big_b bottom_wanc flexs4'>
						<view>总价:￥ <text class="big_bcolor">{{item.actual_price}}</text></view>
					</view>
				</view>
			<!-- 退款/取消 -->
			<view class="big_list"  v-for="(item,index) in 2" :key="'4'+index" v-show="Inv==4">
				<view class="big_t_r">已取消</view>
				<view class="big_t flexs2" @click="toxiange">
					<view class="flexs1">
						<image class="dai_image" src="../../static/pic/img_dd@2x.png" mode=""></image>
						<view class="big_center">
							<view class="big_centertop">定制折叠门推拉门各种各样铝合金私人订制高效快捷实惠</view>
							<view class="big_centerran">
								<text>规格：2.1版本</text>
								<text class="big_right">X1</text>
							</view>
						</view>
					</view>
				</view>
				<view class='big_b flexs4'>
					<view>总价:￥ <text class="big_bcolor">{{item.actual_price}}</text></view>
				</view>
				<view class="big_l flexs4">
					<view class="gopay text-center" @click="totuikuan">退款详情</view>
				</view>
			</view>
		</view>
		<!-- 取消订单弹框 -->
		<view class="cu-modal bottom-modal" :class="modalName=='bottomModal1'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white flexs">
					<view class="titles" @tap="showModal" data-target="bottomModal">请选择取消订单理由</view>
					<!-- <view class="action text-green">确定</view>
					<view class="action text-blue" @tap="hideModal">取消</view> -->
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
					<view class="btn_sec">
						<image src="../../static/image/btn_qx_xiao@2x.png" @tap="hideModal"></image>
						<image src="../../static/image/btn_sure@2x.png" @click="goquxiao()"></image>
					</view>
				</view>
			</view>
		</view>

		<!-- 取消订单弹框 -->
		<view class="cu-modal bottom-modal" :class="modalName=='bottomModal1'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white flexs">
					<view class="titles">请选择取消订单理由</view>
					<!-- <view class="action text-green">确定</view>
					<view class="action text-blue" @tap="hideModal">取消</view> -->
				</view>
				<view class="">
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
				<!-- 	<view class="btn">
						<image src="../../static/image/btn_qx_xiao@2x.png" @tap="hideModal"></image>
						<image src="../../static/image/btn_sure@2x.png" @click="goquxiao()"></image>
					</view> -->
					<view class="flexs1">
						<view class="quxiao_l flexs" @tap="hideModal">取消</view>
						<view class="quxiao_l quxiao_ls flexs" @click="goquxiao()">确定</view>
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
					<button class="action_right text-orange" @click="shouhuo">确定</button>
				</view>
			</view>
		</view>
		<view class="models" v-show="model">
			<view class="model_title flexs">你确定收到该商品吗?</view>
			<view class="model_button flexs1">
				<view class="model_qu" @click="quxiao">取消</view>
				<view class="model_succes" @click="success">确定</view>
			</view>
		</view>
		<view class='mask' v-if='shouwzhe'></view>
	</view>
</template>

<script>
	import passkeyborad from '@/components/yzc-paykeyboard/yzc-paykeyboard.vue';
	export default {
		components: {
			passkeyborad,
		},
		data() {
			return {
				listly: [],
				Inv: 0,
				modalName: null,
				type: 0,
				show: false,
				urls: this.$common.baseUrl,
				list1: [],
				list2: [],
				list3: [],
				list4: [],
				list5: [],
				radio: 'radio1',
				id: '',
				modalName2: null,
				tui_id: "",
				modalName3: null,
				imgList: '',
				shouwzhe: false,
				model: false,
			}
		},
		onLoad(option) {
			this.Inv = option.Inv
			//this.typeclick(Number(option.Inv) + 1)
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
		onShow() {
			this.initdata1();
			this.initdata2();
			this.initdata3();
			this.initdata4();
			this.initdata5();
			this.getliyou();
			this.getImg()
		},
		methods: {
			quxiao() {
				this.model = false;
				this.shouwzhe = false;
			},
			success() {
				this.model = false;
				this.shouwzhe = false;
			},
			successshou() {
				this.shouwzhe = true;
				this.model = true;
			},
			totuikuan(){
				uni.navigateTo({
					url:"refund"
				})
			},
			toxiangq(){
				uni.navigateTo({
					url:"refund"
				})
			},
			toxianga(id){
				uni.navigateTo({
					url:"prouctora?id="+id
				})
			},
			toxiangb(){
				uni.navigateTo({
					url:"prouctorb"
				})
			},
			toxiangc(){
				uni.navigateTo({
					url:"prouctorc"
				})
			},
			toxiange(){
				uni.navigateTo({
					url:"prouctord"
				})
			},
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
			hideModal(e) {
				this.modalName = null
			},
			RadioChange1(e) {
				this.radio = e.detail.value
			},
			showModal(e, id) {
				this.modalName = e.currentTarget.dataset.target
				this.id = id;
			},
			showModal2(e, id) {
				this.modalName2 = e.currentTarget.dataset.target
				this.tui_id = id;
			},
			hideModal2(e) {
				this.modalName2 = null
			},
			hideModal3(e) {
				this.modalName3 = null
			},
			showModal3(e) {
				this.modalName3 = e.currentTarget.dataset.target
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
						// setTimeout(() => {
						// 	uni.navigateBack({
						// 		delta:1
						// 	})
						// }, 1000)
						this.initdata1();
					}
				});
			},
			//申请退款
			goShen() {
				var obj = {
					cancel_id: this.radio,
					id: this.tui_id
				};
				this.$common.requests('/api/orders/refund', obj).then(res => {
					this.modalName2 = null
					this.$api.msg(res.data.msg);
					if (res.data.code == 1) {
						// setTimeout(() => {
						// 	uni.navigateBack({
						// 		delta:1
						// 	})
						// }, 1000)
						this.initdata1();
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


			goPingjia(id) {
				uni.navigateTo({
					url: "../evaluation/evaluation?id=" + id
				})
			},
			//申请退款
			shentui(id) {
				// var obj = {
				// 	status:1
				// };
				// this.$common.requests('/api/orders/indexList', obj).then(res => {
				// 	if (res.data.code == 1) {
				// 		this.list1 = res.data.data
				// 	}
				// });
			},
			//去支付
			gopay(id) {
				uni.navigateTo({
					url: "../myorder/payment?id=" + id
				})
			},
			//代付款
			initdata1() {
				var obj = {
					status: 1
				};
				this.$common.requests('/api/orders/indexList', obj).then(res => {
					if (res.data.code == 1) {
						this.list1 = res.data.data
						//console.log(this.list1);
					}
				});
			},
			//制作中
			initdata2() {
				var obj = {
					status: 3
				};
				this.$common.requests('/api/orders/indexList', obj).then(res => {
					if (res.data.code == 1) {
						this.list2 = res.data.data
					}
				});
			},
			//配送中
			initdata3() {
				var obj = {
					status: 4
				};
				this.$common.requests('/api/orders/indexList', obj).then(res => {
					if (res.data.code == 1) {
						this.list3 = res.data.data
					}
				});
			},
			//待评价
			initdata4() {
				var obj = {
					status: 5
				};
				this.$common.requests('/api/orders/indexList', obj).then(res => {
					if (res.data.code == 1) {
						this.list4 = res.data.data
					}
				});
			},
			//待评价
			initdata5() {
				var obj = {
					status: '2,7,8'
				};
				this.$common.requests('/api/orders/indexList', obj).then(res => {
					if (res.data.code == 1) {
						this.list5 = res.data.data
					}
					console.log(this.list5);
				});
			},
			close() {
				this.show = false
			},
			goDetail(type, id) {
				uni.navigateTo({
					url: 'detail?type=' + type + '&id=' + id
				})
			},
			goTuikuan(id) {
				uni.navigateTo({
					url: '../refund/refund?id=' + id
				})
			},
			getImg() {
				var obj = {

				};
				this.$common.requests('/api/tools/getAppInfo', obj).then(res => {
					if (res.data.code == 1) {
						this.imgList = res.data.data
					}

				});
			}
		}
	}
</script>

<style>
	page {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.content {
		background-color: #F2F2F2;
	}

	.top {
		width: 100%;
		height: 100rpx;
	}
	.wudan {
		text-align: center;
		margin-top: calc(50%);
	}
	.list {
		height: 80rpx;
		line-height: 60rpx;
	}

	.inv-h-se {
		color: #1B1A1F !important;
		font-weight: 600;
		font-size: 30rpx;
	}

	.inv-h {
		color: #333333;
	}

	.small {
		width: 90rpx;
		border: 2rpx solid #1B1A1F;
		margin-top: 10rpx;
		border-radius: 10rpx;
	}
	/* model */
	.mask {
		width: 100%;
		height: 100vh;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: rgba(0, 0, 0, 0.4);
	}
	
	.models {
		width: 80vw;
		margin-left: 10vw;
		background-color: #FFFFFF;
		position: absolute;
		top: calc(50vh - 200rpx);
		z-index: 999;
		border-radius: 20rpx;
	}
	
	.model_qu {
		width: 50%;
		line-height: 80rpx;
		border-top: solid 1rpx #E5E5E5;
		text-align: center;
		color: #888888;
	}
	
	.model_button {
		width: 100%;
		margin-top: 20rpx;
	}
	
	.model_succes {
		width: 50%;
		line-height: 80rpx;
		border-top: solid 1rpx #E5E5E5;
		border-left: solid 1rpx #E5E5E5;
		text-align: center;
		color: #FF3237;
	}
	
	.model_title {
		width: 100%;
		line-height: 180rpx;
		padding-top: 20rpx;
		font-size: 32rpx;
		font-weight: 600;
	}
	.big {
		width: 100%;
		height: 90%;
		overflow-y: scroll;
		/* border:1px solid red */
	}
	.btn_sec{
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
	}
	.btn_secs{
		width: 50%;
		
	}
	.wudingdan {
		width: 150rpx;
		height: 150rpx;
	}
	.wudingdan_c {
		color: #585862;
	}
	.big_list {
		width: 94%;
		/* height:41%; */
		background-color: #FFFFFF;
		border-radius: 10rpx;
		margin: 30rpx auto;
		padding-top: 20rpx;
	}
	.titles{
		font-size: 32rpx;
		font-weight: 600;
	}
	.big_center {
		width: 500rpx;
		margin-left: 20rpx;
		/* height: 180rpx; */
	}
	.big_centertop {
		line-height: 40rpx;
		overflow: hidden;
		word-break: break-all;
		/* break-all(允许在单词内换行。) */
		text-overflow: ellipsis;
		/* 超出部分省略号 */
		display: -webkit-box;
		/** 对象作为伸缩盒子模型显示 **/
		-webkit-box-orient: vertical;
		/** 设置或检索伸缩盒对象的子元素的排列方式 **/
		-webkit-line-clamp: 2;

	}
	.big_centerran {
		margin-top: 10rpx;
		color: #777777;
		position: relative;
	}
	.big_right{
		position: absolute;
		right: 30rpx;
	}
	.big_t {
		width: 94%;
		height: 200rpx;
		margin: 0rpx auto;
	}

	.big_t_l {
		width: 40%;
		height: 100%;
		font-size: 30rpx;
	}

	.dai_image {
		width: 160rpx;
		height: 160rpx;
		border-radius: 20rpx;
	}

	.big_t_l image {
		width: 50rpx;
		height: 50rpx;
		border-radius: 25rpx;
		margin-right: 20rpx
	}

	.big_t_r {
		width: 100%;
		height: 50rpx;
		line-height: 50rpx;
		text-align: right;
		padding-right: 30rpx;
		color: #FF7679;
		font-size: 30rpx;
	}

	.big_m {
		width: 100%;
		height: 200rpx;
	}

	.big_m image {
		width: 160rpx;
		height: 160rpx
	}

	.big_m_m {
		width: 50%;
		height: 100%;
		padding-top: 20rpx;
		margin-left: 20rpx
	}
	.quxiao_l{
		width: 50%;
		height: 80rpx;
		line-height: 80rpx;
		border-top: solid 1rpx #E5E5E5;
	}
	.quxiao_ls{
		border-left: solid 1rpx #E5E5E5;
		color:#FF3237;
	}
	.title {
		width: 100%;
		height: 120rpx;
		font-weight: 600;
		font-size: 30rpx;
	}
	.uni-radio-input {
		border: solid 1rpx #FF3438 !important;
	}
	.model {
		width: 60%;
		font-size: 26rpx;
		color: #999999;
		display: flex;
		justify-content: flex-start;
	}

	.big_m_r {
		width: 30%;
		height: 100%;
		padding-top: 20rpx;
	}

	.big_b {
		width: 100%;
		/* height: 80rpx; */
	}
	.bottom_wanc {
		padding-bottom: 20rpx;
	}
	.big_bcolor{
		color:#FF7679;
	}
	.big_b view {
		margin-right: 30rpx
	}

	.big_l {
		width: 100%;
		height: 100rpx;
	}
	.big_l view {
		margin-right: 30rpx
	}

	.cancel {
		width: 200rpx;
		height: 70rpx;
		line-height: 70rpx;
		border-radius: 10rpx;
		color: #FF3237;
		border: 1px solid #FF3237;
	}

	.gopay {
		width: 200rpx;
		height: 70rpx;
		line-height: 70rpx;
		border-radius: 10rpx;
		background-color: #FF3237;
		color: #FFFFFF
	}

	/*#ifdef APP-PLUS*/
	.cu-dialog {
		background-color: #FFFFFF;
		height: 580rpx;
	}

	/*  #endif  */
	/*#ifdef H5 */
	.cu-dialog {
		background-color: #FFFFFF;
		height: 588rpx;
	}

	/*  #endif  */
	.btn {
		width: 100%;
		height: 100rpx;
	}
	.padding-xl {
		width: 100%;
		background-color: #FFFFFF;
		padding: 0px;
	}

	.cu-item .round {
		margin-right: 30rpx
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

	.content1 {
		width: 100% !important;
		height: 70rpx;
		color: #333333;
		font-size: 32rpx;
		font-weight: 600;
		letter-spacing: 6rpx;
	}

	.padding-xl {
		width: 100%;
		background-color: #FFFFFF;
		padding: 0rpx
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
		color: #5A7EF8;
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
	.mask {
		width: 100%;
		height: 100vh;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: rgba(0, 0, 0, 0.4);
	}
</style>
