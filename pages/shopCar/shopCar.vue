<template>
	<view class="content">
		<view class="kong_new"></view>
		<view class="top flexs2">
			<view></view>
			<view class="titles">购物车（共{{count}}件）</view>
			<view :class="status=='完成'?'text-white gaibian':''" @click="edit(status)" class="gaibian">{{status}}</view>
		</view>
		<!-- 没有收藏商品样式-->
		<block v-if="list.length==0">
			<view class='box text-center'>
				<image src="../../static/pic/icon_nocar@2x.png"></image>
				<view>购物车空空如也，快去挑选心中好物吧！</view>
			</view>
		</block>
		<block v-else>
			<view class="list">
				<block v-if="status=='管理'">
					<!-- <view class="list_header flexs1">
							购物车（共{{count}}件）
						</view> -->
					<view class="list_header flexs1"></view>
					<checkbox-group class="block" @change="changeCheckbox">
						<view class="list_one flexs1" v-for="(item,index) in list" :key="index">
							<checkbox :value="item.id+''" :checked="checkedArr.includes(String(item.id))" :class="{'checked':checkedArr.includes(String(item.id))}"></checkbox>
							<image class="good_img" :src="urls+item.product.head_image" @click.stop="goDetail(item.product.id)"></image>
							<view class="right" @click.stop="goDetail(item.product.id)">
								<view class="title text-bold">{{item.product.title | filterFunc}}</view>
								<view class="myorder_body_right2 ">
									规格：{{item.attr_sku.value}}
									<!-- 	<image class="shopcar_xiayige" src="../../static/image/icon_sanjiao_left@2x.png" ></image> -->
								</view>
								<view class="right_b flexs1">
									<view class="money">￥<text class="money_r text-bold">{{item.attr_sku.price}}</text></view>
									<view class="money_number" @click.stop="clears">
										<wm-numberBox destination="body-btn" model="1" @change="getnum" :ID="item.id+''" :value="item.buy_num"
										 disabled></wm-numberBox>
									</view>
								</view>
							</view>
						</view>
						<view class='list_one_kong'></view>
					</checkbox-group>
					<view class="btns flexs2">
						<view class="btn_l flexs1">
							<checkbox-group @change="allChoose">
								<label>
									<checkbox value="all" :class="{'checked':allChecked}" :checked="allChecked?true:false"></checkbox> 全选
								</label>
							</checkbox-group>
						</view>
						<view class="btn_new flexs">
							合计：<text class="btn_2_number flexs1">￥{{money}}</text>
						</view>
						<block v-if="money==0">
							<view class="shop_car_pic">
								去结算
								<!-- <image  src="../../static/image/btn_qujiesua@2x.png"  ></image> -->
							</view>
						</block>
						<block v-else>
							<view class="shop_car_pic" @click="gobuycar()">
								去结算
								<!-- <image  src="../../static/image/btn_qujiesua@2x.png" @click="gobuycar()" ></image> -->
							</view>
						</block>

					</view>
				</block>
				<block v-if="status=='完成'">
					<view class="list_header flexs1">
						<!-- 购物车（共{{count}}件） -->
					</view>
					<checkbox-group class="block" @change="changeCheckbox" @click.stop="goDetail(item.product.id)">
						<view class="list_one flexs1" v-for="(item,index) in list" :key="index" @change="changeCheckbox" @click.stop="goDetail(item.product.id)">
							<checkbox :value="item.id+''" :checked="checkedArr.includes(String(item.id))" :class="{'checked':checkedArr.includes(String(item.id))}"></checkbox>
							<image class="good_img" :src="urls+item.product.head_image" @click.stop="goDetail(item.product.id)"></image>
							<view class="right">
								<view class="title text-bold">{{item.product.title | filterFunc}}</view>
								<view class="myorder_body_right2 " @tap="showModal" data-target="goorder">
									规格：{{item.attr_sku.value}}
									<!-- <image class="shopcar_xiayige" src="../../static/image/icon_sanjiao_left@2x.png" ></image> -->
								</view>
								<view class="right_b flexs1">
									<view class="money">￥<text class="money_r text-bold">{{item.attr_sku.price}}</text></view>
									<view class="money_number">
										<wm-numberBox destination="body-btn" model="1" @change="getnum" :ID="item.id+''" :value="item.buy_num"
										 disabled></wm-numberBox>
									</view>
								</view>
							</view>
						</view>
						<!-- <view class='list_one'></view> -->
					</checkbox-group>
					<view class="btns flexs3">
						<view class="btn_l flexs1">
							<checkbox-group @change="allChoose">
								<label>
									<checkbox value="all" :class="{'checked':allChecked}" :checked="allChecked?true:false"></checkbox> 全选
								</label>
							</checkbox-group>
						</view>
						<view class="btn_new"></view>
						<block v-if="checkedArr.length==0">
							<view class="new_btns">删除</view>
							<!-- <image  src="../../static/image/btn_sc@2x.png"></image> -->
						</block>
						<block v-else>
							<view class="new_btns" @click="godel()">删除</view>
							<!-- <image  src="../../static/image/btn_sc@2x.png" ></image> -->
						</block>
					</view>
				</block>
				<view class="uni-loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
			</view>
		</block>
		<view style='height:50px'></view>
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
				radio: '',
				status: '管理',
				list: [],
				count: 0,
				urls: this.$common.baseUrl,
				isChecked: false,
				checkedArr: [], //复选框选中的值
				allChecked: false, //是否全选
				money: 0,
				limit: 1000,
				page: 1,
				loadMoreText: "加载中...",
				showLoadMore: false,
				lisize: 0, //本次加载数量
			}
		},
		filters: {
			filterFunc: function(value) {
				if (value && value.length > 20) {
					return value.substring(0, 20) + '...';
				}
				return value;
			}
		},
		onLoad() {

		},
		onShow() {
			this.initdata(1, this.limit);
			this.money = 0;
			this.allChecked = false;
		},
		// onPullDownRefresh() {
		// 	console.log('refresh');
		// 	this.page = 1;
		// 	this.initdata(1,this.limit);
		// 	setTimeout(function () {
		// 		uni.stopPullDownRefresh();
		// 	}, 1000);
		// },
		// onReachBottom(){
		// 	this.page = this.page+1;
		// 	this.initdata(this.page,this.limit);
		// },
		methods: {
			goDetail(id) {
				uni.navigateTo({
					url: '../mydetail/mydetail?id=' + id
				})
			},
			clears() {
				// 清除冒泡事件
			},
			getnum(e) {
				console.log(e)
				if (e.value <= 0) {
					uni.showToast({
						title: '商品数量不能小于1'
					})
				} else {
					this.changenum(e.id, e.type)
				}

			},
			//创建订单去购买
			gobuycar() {
				uni.navigateTo({
					url: '../myorder/myorder?ids=' + this.checkedArr.join(',') + '&type=2'
				})
			},
			//删除
			godel() {
				var ids = this.checkedArr.join(',');
				var obj = {
					id: ids
				};
				this.$common.requests('/api/cart/delete', obj).then(res => {
					this.$api.msg(res.data.msg);
					if (res.data.code == 1) {
						this.initdata(1, this.limit);
					}
				});
			},
			changenum(id, type) {
				var obj = {
					id: id,
					type: type
				};
				this.$common.requests('/api/cart/buyNum', obj).then(res => {
					// this.$api.msg(res.data.msg);
					if (res.data.code == 1) {
						this.initdata();
					}
				});


			},
			// initdata(page,limit){
			// 	var obj = {
			// 		page:page,
			// 		limit:limit
			// 	};
			// 	this.$common.requests('/api/Cart/index', obj).then(res => {
			// 		// this.$api.msg(res.data.msg);
			// 		if (res.data.code == 1) {
			// 			this.count = res.data.data.count
			// 			if(page!=1){
			// 				if(res.data.data.data){
			// 					this.list = this.list.concat(res.data.data.data)

			// 				}
			// 			}else{
			// 				this.list = res.data.data.data
			// 			}
			// 		}
			// 	});
			// },
			initdata() {
				var obj = {
					limit: this.limit,
					page: this.page
				};
				this.$common.requests('/api/Cart/index', obj).then(res => {
					// this.$api.msg(res.data.msg);
					if (res.data.code == 1) {
						this.list = res.data.data.data
						this.count = res.data.data.count
						var num = 0;
						for (let item of this.checkedArr) {
							for (let item1 of this.list) {
								if (parseInt(item) == item1.id) {
									num += parseInt(item1.attr_sku.price) * parseInt(item1.buy_num)
								} else {}
							}
						}

						this.money = num;
					} else {
						this.list = [];
						this.count = 0;
						this.money = 0;
					}
				});
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			RadioChange(e) {
				this.radio = e.detail.value
			},
			edit(mystatus) {
				if (mystatus == '管理') {
					this.status = '完成'
				} else {
					this.status = '管理'
				}
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			gobuy() {
				uni.navigateTo({
					url: "../myorder/myorder"
				})
			},
			// 多选复选框改变事件
			changeCheckbox(e) {
				this.checkedArr = e.detail.value;
				console.log(this.checkedArr)
				var num = 0;
				for (let item of this.checkedArr) {
					for (let item1 of this.list) {
						if (item == item1.id) {
							num += parseInt(item1.attr_sku.price) * parseInt(item1.buy_num)
						}
					}
				}
				this.money = num;
				// 如果选择的数组中有值，并且长度等于列表的长度，就是全选
				if (this.checkedArr.length > 0 && this.checkedArr.length == this.count) {
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
					for (let item of this.list) {
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
				console.log(this.checkedArr)
				var num = 0;
				for (let item of this.checkedArr) {
					for (let item1 of this.list) {
						if (parseInt(item) == item1.id) {
							num += parseInt(item1.attr_sku.price) * parseInt(item1.buy_num)
						} else {}
					}
				}

				this.money = num;
			}
		}
	}
</script>

<style>
	.kong_new{
		width: 100%;
		height: var(--status-bar-height);
		background-color: #FF3237;
	}
	.content {
		height: 100vh;
		background-color: #F2F2F2;
		/* #ifdef H5 */
		padding-bottom: 50px;
		/* #endif */
	}

	.top {
		width: 100%;
		height: 88rpx;
		border-bottom: 1px solid #F2F2F2;
		background-color: #FF3237;
		color: #FFFFFF
	}

	.up_img {
		width: 20rpx;
		height: 30rpx
	}

	.titles {
		font-size: 32rpx;
		color: #FFFFFF;
		font-weight: 700;
		margin: 0 auto;
	}
	.kong {
		width: 70rpx;
		height: 10rpx;
	}
	.list {
		width: 100%;
		height: 82%;
		overflow-y: scroll;
		background-color: #F2F2F2;
	}

	.new_list {
		width: 100%;
		height: 98%;
		border-radius: 10px;
		border: 1px solid #E5E5E5;
	}

	.list_one {
		width: 100%;
		height: 224rpx;
		margin: 0rpx auto;
		background-color: #FFFFFF;
		border: 1px solid #E5E5E5;
		padding: 20rpx;
		margin-bottom: 12rpx
	}

	.list_one_kong {
		width: 100%;
		height: 160rpx;
	}

	.list_one_new {
		width: 92%;
		height: 230rpx;
		margin: 30rpx auto;
		border-radius: 10px;
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
		width: 300rpx;
		height: 170rpx;
		margin-left: 20rpx
	}

	.left {
		width: 250rpx;
		height: 100%;
		padding-left: 20rpx;
	}

	.right {
		width: 93%;
		height: 200rpx;
		margin-left: 30rpx;
	}

	.title {
		width: 100%;
		height: 100rpx;
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
		width: 62%;
		height: 62rpx;
		display: flex;
		justify-content: space-between;

	}

	.money {
		width: 200rpx;
		height: 38rpx;
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

	/*#ifdef APP-PLUS*/
	.btns {
		width: 100%;
		height: 100rpx;
		background-color: #FFFFFF;
		position: absolute;
		bottom: 0rpx;
		box-shadow: 10px 10px 42px rgba(0, 0, 0, .1);
		letter-spacing: 2rpx;
	}

	/*  #endif  */
	/*#ifdef H5 */
	.btns {
		width: 100%;
		height: 100rpx;
		background-color: #FFFFFF;
		position: fixed;
		bottom: var(--window-bottom);
		box-shadow: 10px 10px 42px rgba(0, 0, 0, .1);
		letter-spacing: 2rpx;
	}

	/*  #endif  */
	.btn_2 {
		width: 200rpx;
		height: 40rpx;
		letter-spacing: 2rpx;
	}

	.btn_2_number {
		width: 100rpx;
		color: #F20607;
		letter-spacing: 2rpx;
		font-size: 32rpx;
	}

	.btn_l {
		width: 20%;
		height: 100%;
		margin-left: 22rpx;
	}

	.btn_l uni-checkbox {
		margin-right: 15rpx
	}

	.btn_new {
		width: 300rpx;
		position: absolute;
		right: 180rpx;
	}

	.uni-label-pointer {
		width: 20%;
		height: 100%;
	}

	.btn_5 {
		width: 56%;
		height: 100%;
	}

	.btns image {
		width: 150rpx;
		height: 60rpx;

	}

	.jianju {
		margin-right: 20rpx;
		letter-spacing: 2rpx;
	}

	.box {
		width: 100%;
		height: 50%;
		margin-top: 300rpx;
		color: #5B5B63;
		letter-spacing: 3rpx;
		font-size: 32rpx;
	}

	.box image {
		width: 300rpx;
		height: 200rpx;
		margin-bottom: 110rpx;
	}

	.shop_car_pic {
		width: 190rpx;
		height: 72rpx;
		line-height: 72rpx;
		text-align: center;
		margin-right: 22rpx;
		color: #FFFFFF;
		background-color: #FF3237;
		border-radius: 15rpx;
	}

	.new_btns {
		width: 190rpx;
		height: 72rpx;
		line-height: 72rpx;
		text-align: center;
		margin-left: 50rpx;
		color: #FFFFFF;
		background-color: #FF3237;
		border-radius: 15rpx;
	}

	.myorder_body_right2 {
		width: 400rpx;
		height: 44rpx;
		/* border:2rpx solid #E6E6E6; */
		font-size: 28rpx;
		color: #767676;
		letter-spacing: 2rpx;
	}

	.se1 {
		font-size: 28rpx;
		color: #767676;
		letter-spacing: 2rpx;
		margin: 0 auto;
		margin-left: 10rpx;
		margin-right: 10rpx;
	}

	.shopcar_xiayige {
		width: 15rpx;
		height: 20rpx;
		margin-left: 15rpx;

	}

	.money_number {
		width: 60rpx;
		height: 64rpx;
	}

	.list_header {
		width: 92%;
		height: 12rpx;
		font-size: 32rpx;
		font-weight: 600;
		letter-spacing: 2rpx;
		display: flex;
		align-items: center;
		margin: 0 auto;
	}

	.cu-dialog {
		height: 630rpx;
		/* display: flex;
		justify-content: center; */
	}

	.mydetail_cart_header {
		width: 670rpx;
		height: 165rpx;
		/* border:2rpx solid red; */
		margin: 0 auto;
		margin-top: 20rpx;
	}

	.mydetail_cart_header_left {
		width: 160rpx;
		height: 165rpx;
		/* border:2rpx solid blue; */
	}

	.mydetail_map {
		width: 160rpx;
		height: 165rpx;
	}

	.mydetail_cart_header_right {
		width: 480rpx;
		height: 165rpx;
		/* border:2rpx solid yellow; */
		margin-left: 20rpx;

	}

	.mydetail_cart_header_right1 {
		width: 480rpx;
		height: 65rpx;
		/* border:2rpx solid green; */
		display: flex;
		align-items: center;

	}

	.mydetail_cart_header_right2 {
		width: 480rpx;
		height: 50rpx;
		/* border:2rpx solid black; */
		color: #373737;
		letter-spacing: 2rpx;

	}

	.mydetail_cart_header_right3 {
		width: 480rpx;
		height: 50rpx;
		/* border:2rpx solid black; */
		color: #373737;
		letter-spacing: 2rpx;
		display: flex;
		align-items: center;
	}

	.mydetail_moneysign {
		font-size: 24rpx;
		color: #F00100;
		letter-spacing: 2rpx;
	}

	.mydetail_money {
		font-size: 36rpx;
		color: #F00100;
		font-weight: 600;
		letter-spacing: 2rpx;
	}

	.se {
		color: #373737;
		letter-spacing: 30rpx;
	}

	.mydetail_cart_header_mostright {
		width: 35rpx;
		height: 35rpx;
	}

	.quxiao {
		width: 35rpx;
		height: 35rpx;
	}

	.mydetail_cart_body1 {
		width: 670rpx;
		height: 100rpx;
		/* border:2rpx solid green; */
		margin: 0 auto;
		margin-top: 30rpx;
	}

	.mydetail_cart_body1_top {
		width: 670rpx;
		height: 50rpx;
		/* border:2rpx solid red; */
		color: #373737;
		letter-spacing: 2rpx;
	}

	.mydetail_cart_body1_bottom {
		width: 670rpx;
		height: 50rpx;
		/* border:2rpx solid blue; */
	}

	.mydetail_cart_body1_small {
		width: 130rpx;
		height: 45rpx;
		color: #F08720;
		background-color: #FFFAF6;
		font-size: 24rpx;
		border: 2rpx solid #F08720;
		margin-right: 30rpx;
		letter-spacing: 2rpx;
	}

	.mydetail_cart_body1_small2 {
		width: 150rpx;
		height: 45rpx;
		color: #F08720;
		background-color: #FFFAF6;
		font-size: 24rpx;
		border: 2rpx solid #F08720;
		margin-right: 30rpx;
		letter-spacing: 2rpx;
	}

	.g {
		color: #F08720;
		font-size: 24rpx;
		letter-spacing: 20rpx;
	}

	.mydetail_cart_lastbody {
		width: 640rpx;
		height: 76rpx;
		margin: 0 auto;
		margin-top: 100rpx;
		/* border:2rpx solid blue; */
	}

	.mydetail_cart_lastbody_left {
		width: 320rpx;
		height: 76rpx;
	}

	.mydetail_cart_lastbody_right {
		width: 320rpx;
		height: 50rpx;
	}

	.mydetail_cart_lastbody_left_pic {
		width: 316rpx;
		height: 50rpx;
	}

	.cu-bar1 {
		display: flex;
		position: relative;
		-webkit-box-align: center;
		align-items: center;
		min-height: 800rpx;
		-webkit-box-pack: justify;
		justify-content: space-between;
		display: flex;
		flex-direction: column;
		padding: 18rpx;
	}

	.cu-bar1_header {
		width: 650rpx;
		height: 80rpx;
		/* border:2rpx solid blue; */
		font-size: 34rpx;
		color: #000000;
		font-weight: 600;
		letter-spacing: 3rpx;
	}

	.cu-bar1_body {
		width: 650rpx;
		height: 70rpx;
		border-bottom: 2rpx solid #E9E9E9;

	}

	.cu-bar1_body_left {
		width: 250rpx;
		height: 70rpx;
		color: #000000;
		letter-spacing: 2rpx;
		display: flex;
		align-items: center;
	}

	.cu-bar1_body_right {
		width: 300rpx;
		height: 70rpx;
		color: #000000;
		letter-spacing: 2rpx;
		display: flex;
		align-items: center;
	}

	.cu-bar1_bottom {
		width: 656rpx;
		height: 100rpx;
		margin-top: 10rpx;
	}

	.mydetail_cart_lastbody_pic {
		width: 640rpx;
		height: 80rpx;
	}

	.mydetail_cart-number {
		width: 650rpx;
		height: 60rpx;
		/* border: 1px solid red; */
		border-bottom: 1px solid #E5E5E5;
		border-top: 1px solid #E5E5E5;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 0 auto;
		margin-top: 30rpx;
	}

	.mydetail_cart-number_left {
		width: 140rpx;
		height: 60rpx;
		/* border:2rpx solid blue; */
		letter-spacing: 2rpx;
	}

	.mydetail_cart-number_right {
		width: 140rpx;
		height: 60rpx;

	}

	.uni-loadmore {
		text-align: center;
	}

	.gaibian {
		margin-right: 30rpx;
	}
</style>
