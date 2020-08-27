<template>
	<view class="mydetail_bigbox">
		<view class="mydetail_content">
			<!-- 幻灯片 -->
			<view class="mydetail_header">
				<swiper class="screen-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
				 :autoplay="true" interval="5000" duration="500">
					<swiper-item v-for="(item,index) in list.images" :key="index">
						<image :src="urls+item" mode="aspectFill"></image>
						<!-- <video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video> -->
					</swiper-item>
				</swiper>
			</view>
			<!-- 返回按钮 -->
			<view class="back">
				<image class="back_img" src="../../static/pic/nav_back_2@2x.png" @click="back"></image>
			</view>
			<view class="mydetail_body1">
				<view class="mydetail_body1_top flexs2">
					<view class="moneytype flexs1">
						<view class="money_sign">¥</view>
						<view class="money">{{list.low_price}}</view>
					</view>
					<view class="mydetail_body3_top_right_body_right flexs">
						月销:{{list.sell_num}}
					</view>
				</view>
				<view class="mydetail_body1_bottom flexs1">
					<view>{{list.title | filterFun}}</view>
					<!-- <view style="margin-left:20rpx;">{{list.description}}</view> -->
				</view>
			</view>
			<view class="mydetail_body3">
				<!-- <view class="mydetail_body3_top flexs1">
					<view class="mydetail_body3_top_left flexs1">
						<view class="mydetail_fhd flexs">发货地：{{list.from_address}}</view>
						<view class="mydetail_address flexs" >{{list.from_address}}</view>
					</view>
					<view class="mydetail_body3_top_right ">
						<view class="mydetail_body3_top_right_body flexs1 text-center">
							<view class="mydetail_body3_top_right_body_left flexs1">
								<view class="kuaidi flexs">快递:</view>
								<view class="money_money">¥{{list.default_exp_price}}</view>
							</view>
							<view class="mydetail_body3_top_right_body_right flexs">
								月销:{{list.sell_num}}
							</view>
						</view>
					</view>
				</view> -->
				<view class="mydetail_body3_bottom">
					<view class="mydetail_body3_bottom_text flexs11 ">
						<!-- <text class="mydetail_ku">库</text><text class="mydetail_cun">存</text>：<text class="text-bold">{{list.stock}} {{unit.key}}</text> -->
						库存：<text class="text-bold">{{list.stock}} {{unit.key}}</text>
					</view>
				</view>
				<view class="mydetail_body4_top" @tap="showModal" data-target="bottomModal">
					<view class="mydetail_body4_top_left">
						<!-- <text class="mydetail_gui">规</text><text class="mydetail_ge">格</text>：{{skumsg.value}} -->
						规格：{{skumsg.value}}
					</view>
					<view class="mydetail_body4_top_right flexs">
						<image class="mydetail_next flexs" src="../../static/image/details_icon_left@2x.png"></image>
					</view>
				</view>
			</view>
			<!-- <view class="mydetail_body4">
				<view class="mydetail_body4_top" @tap="showModal" data-target="bottomModal">
					<view class="mydetail_body4_top_left">
						<text class="mydetail_gui">规</text><text class="mydetail_ge">格</text>：{{skumsg.value}}
					</view>
					<view class="mydetail_body4_top_right flexs">
						<image class="mydetail_next flexs" src="../../static/image/details_icon_left@2x.png"></image>
					</view>
				</view>
				<view class="mydetail_body4_bottom " @tap="showModal" data-target="parameter">
					<view class="mydetail_body4_bottom_left ">
						<text class="mydetail_can">参</text><text class="mydetail_shu">数</text>：品牌
						<text class="mydetail_canshu">参数</text>
					</view>
					<view class="mydetail_body4_top_right flexs">
						<image class="mydetail_next flexs" src="../../static/image/details_icon_left@2x.png"></image>
					</view>
				</view>
			</view> -->
			<!-- <view class="mydetail_body5_header">
				<view class="mydetail_body5_header_left">
					评价
				</view>
				<view class="mydetail_body5_header_right flexs1" @click="goassess" v-if="comment.length!=0">
					<view class="mydetail_body5_header_rignt1 flexs" style="width: 150rpx;">
						查看更多
					</view>
					<view class="mydetail_body5_header_rignt2">
						<image class="mydetail_next1 flexs" src="../../static/image/details_icon_left@2x.png"></image>
					</view>
				</view>
				<view class="mydetail_body5_header_right flexs1" v-if="comment.length==0">
					<view class="mydetail_body5_header_rignt1 flexs" style="width: 150rpx;">
						暂无评价
					</view>
					<view class="mydetail_body5_header_rignt2">
						<image class="mydetail_next1 flexs" src="../../static/image/details_icon_left@2x.png"></image>
					</view>
				</view>
			</view> -->
			<!-- 		<view class="mydetail_body5" v-if="comment.length!=0">
				<block>
					<view class="mydetail_body5_box1 flexs1">
						<view class="mydetail_body5_box1_left flexs">
							<image class="people_logo" :src="comment.user.avatar?urls+comment.user.avatar : '../../static/image/img_toxiang@2x.png'"
							 style="border-radius: 50%;"></image>
						</view>
						<view class="mydetail_body5_box1_right flexs">
							<view class="mydetail_center">
								<view class="people_nick ">
									{{comment.user.nickname}}
								</view>
								<view class="mydetail_speed">
									<image class="xingxing" src="../../static/image/details_icon_evaluation@2x.png" v-for="(item,index) in comment.product_star"
									 :key="index"></image>
								</view>
							</view>
						</view>
					</view>
					<view class="mydetail_body5_box2">
						<view class="mydetail_evaluate">
							{{comment.content}}
						</view>
						<view class="mydetail_body5_box2_bottom">
							<block v-if="comment.images[0]==''">
							</block>
							<block v-else>
								<image class="evaluate_pic" v-for="(item,index) in comment.images" :key="index" :src="urls+item"></image>
							</block>
						</view>
					</view>
				</block>
			</view> -->
			<view class="mydetail_body6 flexs">
				<view class="mydetail_body6_inner">
					<view class="mydetail_body6_header flexs">商品详情</view>
					<view class="kong"></view>
					<view class="mydetail_body6_body">
						<rich-text :nodes="list.maincontent"></rich-text>
					</view>
				</view>
			</view>
			<view class="mydetail_body7 flexs11">
				<view class="mydetail_body7_box1" @click='contentserver'>
					<view class="mydetail_body7_box1_top flexs">
						<image class="mydetail_body7_box1_top_pic" src="../../static/image/details_icon_service@2x.png"></image>
					</view>
					<view class="mydetail_body7_box1_bottom">
						联系客服
					</view>
				</view>

				<view class="mydetail_body7_box1_right" v-if="list.favo==0">
					<view class="mydetail_body7_box1_right_top flexs" @click="gocoll()">
						<image class="mydetail_body7_box1_right_top_pic" src="../../static/pic/icon_collect@2x.png"></image>
					</view>
					<view class="mydetail_body7_box1_right_bottom flexs">
						收藏
					</view>
				</view>
				<view class="mydetail_body7_box1_right" v-else>
					<view class="mydetail_body7_box1_right_top flexs" @click="gocoll()">
						<image class="mydetail_body7_box1_right_top_pic" src="../../static/pic/icon_collect_sel@2x.png"></image>
					</view>
					<view class="mydetail_body7_box1_right_bottom flexs">
						已收藏
					</view>
				</view>
				<view class="mydetail_body7_box2 flexs11">
					<view class="mydetail_body7_smallbox2 flexs" @tap="showModal" data-target="bottomModal_two">
						加入购物车
					</view>
					<view class="mydetail_body7_smallbox3 flexs" @tap="showModal" data-target="bottomModal_three">
						立即购买
					</view>
				</view>
			</view>
		</view>
		<!-- 选择规格车弹框 -->
		<view class="cu-modal bottom-modal" :class="modalName=='bottomModal'?'show':''">
			<view class="cu-dialog1">
				<view class="mydetail_cart_header flexs11">
					<view class="mydetail_cart_header_left">
						<image class="mydetail_map" :src="urls+skumsg.image"></image>
					</view>
					<view class="mydetail_cart_header_right">
						<view class="mydetail_cart_header_right1 flexs11">
							<text class="mydetail_moneysign">￥</text><text class="mydetail_money">{{skumsg.price}}</text>
						</view>
						<view class="mydetail_cart_header_right2 flexs11">
							库存：<text class="text-bold new_se">{{skumsg.stock}}</text>
						</view>
						<view class="mydetail_cart_header_right3 flexs11">
							已选：<text class="text-bold new_se">{{skumsg.value}}</text>
						</view>
					</view>
					<view class="mydetail_cart_header_mostright" @tap="hideModal">
						<image class="quxiao" src="../../static/image/icon-guanbi@2x.png"></image>
					</view>
				</view>
				<view class="mydetail_cart_body1" v-for="(item,index) in list.attrGroup" :key="index">
					<view class="mydetail_cart_body1_top flexs11 flexs">
						{{item}}
					</view>
					<view class="mydetail_cart_body1_bottom flexs1">
						<view class="mydetail_cart_body1_small flexs" v-for="(item1,index1) in list.attrItems[index]" :key="index1"
						 :class="attrids[index]==index1?'select':''" @click="changeattr(index,index1)">
							{{item1}}
						</view>
					</view>
				</view>
	<!-- 			<view class="mydetail_cart_body1">
					<view class="mydetail_cart-number flexs1">
						<view class="mydetail_cart-number_left flexs1 text-bold">
							选择数量：
						</view>
						<view class="mydetail_cart-number_right flexs">
							<wm-numberBox destination="body-btn" model="1" @change='getnum' value="1"></wm-numberBox>
							<wm-numberBox destination="body-btn" model="1" @change="getnum" value="'1'"></wm-numberBox>
							如插件destination与购物车元素ID一致时执行动画 
							<view id="body-btn">购物车</view>
						</view>
					</view>
				</view> -->
				<view class="mydetail_cart_lastbody mt_mt flexs3">
					<view class="mydetail_cart_lastbody_left flexs mts" @click="addCart">
						加入购物车
						<!-- <image class="mydetail_cart_lastbody_left_pic" src="../../static/image/btn_jrgwc@2x.png"></image> -->
					</view>
					<view class="mydetail_cart_lastbody_right flexs mts" @click="gobuy">
						确定
						<!-- <image class="mydetail_cart_lastbody_left_pic" src="../../static/image/btn_lljgm@2x.png"></image> -->
					</view>
				</view>
			</view>
		</view>
		<!-- 加入购物车弹框 -->
		<view class="cu-modal bottom-modal" :class="modalName=='bottomModal_two'?'show':''">
			<view class="cu-dialog1">
				<view class="mydetail_cart_header flexs11">
					<view class="mydetail_cart_header_left">
						<image class="mydetail_map" :src="urls+skumsg.image"></image>
					</view>
					<view class="mydetail_cart_header_right">
						<view class="mydetail_cart_header_right1 flexs11">
							<text class="mydetail_moneysign">￥</text><text class="mydetail_money">{{skumsg.price}}</text>
						</view>
						<view class="mydetail_cart_header_right2 flexs11">
							库存：<text class="text-bold new_se">{{skumsg.stock}}件</text>
						</view>
						<view class="mydetail_cart_header_right3 flexs11">
							已选：<text class="text-bold new_se">{{skumsg.value}}</text>
						</view>
					</view>
					<view class="mydetail_cart_header_mostright" @tap="hideModal">
						<image class="quxiao" src="../../static/image/icon-guanbi@2x.png"></image>
					</view>
				</view>
				<view class="mydetail_cart_body1" v-for="(item,index) in list.attrGroup" :key="index">
					<view class="mydetail_cart_body1_top flexs11 flexs">
						{{item}}
					</view>
					<view class="mydetail_cart_body1_bottom flexs1">
						<view class="mydetail_cart_body1_small flexs" v-for="(item1,index1) in list.attrItems[index]" :key="index1"
						 :class="attrids[index]==index1?'select':''" @click="changeattr(index,index1)">
							{{item1}}
						</view>
					</view>
				</view>
				<view class="mydetail_cart_body1">
					<view class="mydetail_cart-number flexs1">
						<view class="mydetail_cart-number_left flexs1 text-bold">
							选择数量：
						</view>
						<view class="mydetail_cart-number_right flexs">
							<wm-numberBox destination="body-btn" model="1" @change='getnum' value="1"></wm-numberBox>
		
						</view>
					</view>
				</view>
				<view class="mydetail_cart_lastbody1  flexs">
					<view class="mydetail_cart_lastbody_left1 flexs" @click="addCart">
						确定
						<!-- <image class="mydetail_cart_lastbody_left1_pic" src="../../static/image/btn_queding@2x.png"></image> -->
					</view>
				</view>
			</view>
		</view>
		<!-- 立即购买弹框 -->
		<view class="cu-modal bottom-modal" :class="modalName=='bottomModal_three'?'show':''">
			<view class="cu-dialog1">
				<view class="mydetail_cart_header flexs11">
					<view class="mydetail_cart_header_left">
						<image class="mydetail_map" :src="urls+skumsg.image"></image>
					</view>
					<view class="mydetail_cart_header_right">
						<view class="mydetail_cart_header_right1 flexs11">
							<text class="mydetail_moneysign">￥</text><text class="mydetail_money">{{skumsg.price}}</text>
						</view>
						<view class="mydetail_cart_header_right2 flexs11">
							库存：<text class="text-bold new_se">{{skumsg.stock}}件</text>
						</view>
						<view class="mydetail_cart_header_right3 flexs11">
							已选：<text class="text-bold new_se">{{skumsg.value}}</text>
						</view>
					</view>
					<view class="mydetail_cart_header_mostright" @tap="hideModal">
						<image class="quxiao" src="../../static/image/icon-guanbi@2x.png"></image>
					</view>
				</view>
				<view class="mydetail_cart_body1" v-for="(item,index) in list.attrGroup" :key="index">
					<view class="mydetail_cart_body1_top flexs11 flexs">
						{{item}}
					</view>
					<view class="mydetail_cart_body1_bottom flexs1">
						<view class="mydetail_cart_body1_small flexs" v-for="(item1,index1) in list.attrItems[index]" :key="index1"
						 :class="attrids[index]==index1?'select':''" @click="changeattr(index,index1)">
							{{item1}}
						</view>
					</view>
				</view>
				<view class="mydetail_cart_body1">
					<view class="mydetail_cart-number flexs1">
						<view class="mydetail_cart-number_left flexs1">
							选择数量：
						</view>
						<view class="mydetail_cart-number_right flexs">
							<wm-numberBox destination="body-btn" model="1" @change='getnum' value="1"></wm-numberBox>
					
						</view>
					</view>
				</view>
				<view class="mydetail_cart_lastbody1  flexs">
					<view class="mydetail_cart_lastbody_left1 flexs" @click="gobuy">
						确定
						<!-- <image class="mydetail_cart_lastbody_left1_pic" src="../../static/image/btn_queding@2x.png"></image> -->
					</view>
				</view>
			</view>
		</view>
		<view class="cu-modal bottom-modal" :class="modalName=='parameter'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar1 bg-white">
					<view class="cu-bar1_header">
						产品参数
					</view>
					<view class="cu-bar1_body flexs1" v-for="(item,index) in list.deploy" :key="index">
						<view class="cu-bar1_body_left flexs1">
							{{item.title}}
						</view>
						<view class="cu-bar1_body_right flexs1">
							{{item.intro}}
						</view>
					</view>
					<view class="cu-bar1_bottom" @tap="hideModal">
						<image class="cu-bar1_bottom_pic" src="../../static/image/btn_wancheng@2x.png"></image>
					</view>
				</view>
			</view>
		</view>
		<hint :isShow='isShow'  @closemod='closemod'  @tureclick='callserverphone' :mobile='mobile'></hint>
	</view>
</template>
<!-- <view class="cu-bar1_bottom" @click="gobuy">
							<image class="mydetail_cart_lastbody_pic" src="../../static/image/btn_queding@2x.png" ></image>
					</view> -->
<script>
	import wmNumberBox from "@/components/wm-numberBox/wm-number-box.vue"
	import hint from "@/components/deletehint.vue"
	export default {
		components: {
			wmNumberBox,
			hint
		},
		data() {
			return {
				isShow:false,
				
				num: 1,
				modalName: null,
				parameter: null,
				goorder: null,
				bottomModal_two: null,
				bottomModal_three: null,
				cardCur: 0,
				pid: '',
				list: [],
				urls: this.$common.baseUrl,
				swiperList: [{
					id: 5,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
				}, {
					id: 6,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
				}],
				dotStyle: false,
				towerStart: 0,
				direction: '',
				attrids: [],
				skumsg: [],
				comment: [],
				unit: [],
				uid: '',
				// 客服电话
				mobile:''
			};
		},
		filters: {
			filterFun: function(value) {
				if (value && value.length > 35) {
					value = value.substring(0, 35) + '...';
				}
				return value;
			}
		},
		onLoad(option) {
			this.pid = option.id;
			this.initdata();
			this.getComment();
			this.getMobile()
		},

		methods: {
			// 联系客服
			contentserver(){
				this.isShow = true
			},
			closemod(){
				this.isShow = false
			},
			callserverphone(){
				this.isShow = false
				uni.makePhoneCall({
					phoneNumber:this.mobile
				})
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			//收藏
			gocoll() {
				var obj = {
					product_id: this.pid
				};
				this.$common.requests('/api/home/favo', obj).then(res => {
					this.$api.msg(res.data.msg);
					this.initdata();
				});
			},

			//加入购物车
			addCart() {
				var obj = {
					product_id: this.pid,
					attr_sku_id: this.skumsg.id,
					buy_num: this.num,

				};
				this.$common.requests('/api/Cart/create', obj).then(res => {
					this.$api.msg(res.data.msg);
					if (res.data.code == 1) {
						this.modalName = null
					}
				});
			},
			//获取第一题评论
			getComment() {
				var obj = {
					prid: this.pid
				};
				this.$common.requests('/api/Comment/detail', obj).then(res => {
					// this.$api.msg(res.data.msg);
					if (res.data.code == 1) {
						this.comment = res.data.data;
					}
				});
			},
			getnum(num) {
				this.num = num.value;
			},
			initdata() {
				this.uid = uni.getStorageSync('uid');
				var obj = {
					product_id: this.pid,
					uid: this.uid
				};
				//console.log(obj)
				this.$common.requests('/api/Product/detail', obj).then(res => {
					// this.$api.msg(res.data.msg);
					if (res.data.code == 1) {
						this.list = res.data.data;
						this.unit = res.data.data.unit;
						this.specInit();
						//console.log(this.list);
					}
				});
			},
			specInit() {
				for (let index in this.list.attrGroup) {
					this.attrids.push(0);
				}
				var arr = []
				for (let index in this.attrids) {
					arr.push(this.list.attrItems[index][this.attrids[index]]);
				}
				var str = arr.join(',')
				for (let i in this.list.attr_sku) {
					if (this.list.attr_sku[i].value == str) {
						this.skumsg = this.list.attr_sku[i];
					}
				}
			},
			//改变attrids数组的值
			changeattr(index, value) {
				this.$set(this.attrids, index, value);
				var arr = []
				for (let index in this.attrids) {
					arr.push(this.list.attrItems[index][this.attrids[index]]);
				}
				var str = arr.join(',')
				for (let i in this.list.attr_sku) {
					if (this.list.attr_sku[i].value == str) {
						this.skumsg = this.list.attr_sku[i];
					}
				}

				// console.log(this.skumsg)
			},
			DotStyle(e) {
				this.dotStyle = e.detail.value
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			goassess() {
				uni.navigateTo({
					url: "../assess/allassess?pid=" + this.pid
				})
			},
			gobuy() {
				uni.navigateTo({
					url: "../myorder/myorder?type=1&product_id=" + this.pid + '&attr_sku_id=' + this.skumsg.id + '&number=' + this.num
				})
			},
			getMobile() {
				this.$common.requests('/api/index/get_service_mobile').then(res => {
					if (res.data.code == 1) {
						this.mobile = res.data.data;
					}
				});
			},
		}
	}
</script>

<style>
	.select {
		color: #FF3237 !important;
		border: 1px solid #FF3237 !important;
	}

	.mydetail_bigbox {
		height: 750rpx;
		width: 100vw;
		background-color: #FFFFFF;
		display: flex;
		justify-content: center;
	}

	.mydetail_header {
		width: 750rpx;
		height: 500rpx;
	}

	uni-image {
		width: 750rpx;
		height: 500rpx;

	}

	uni-swiper {
		display: block;
		height: 506rpx;
	}

	.back {
		width: 80%;
		height: 60rpx;
		position: absolute;
		top: 60rpx;
		left: 20rpx;
	}

	.back_img {
		width: 60rpx;
		height: 60rpx;
	}

	.mydetail_body1 {
		width: 750rpx;
		height: 200rpx;
		border-bottom: 16rpx solid #F2F2F2;
		display: flex;
		align-items: center;
		flex-direction: column;

	}

	.mydetail_body1_top {
		width: 700rpx;
		height: 80rpx;
		margin-top: 10rpx;
	}

	.mydetail_body1_bottom {
		width: 700rpx;
		height: 50rpx;
		font-size: 32rpx;
		color: #343434;
		font-weight: 600;

	}

	.moneytype {
		width: 300rpx;
		height: 50rpx;

	}

	.money_sign {
		width: 20rpx;
		height: 34rpx;
		/* border:2rpx solid black; */
		font-size: 30rpx;
		color: #FF0200;
		font-weight: 600;
	}

	.money {
		width: 200rpx;
		height: 50rpx;
		font-size: 40rpx;
		color: #FF0200;
		font-weight: 600;
		display: flex;
		align-items: center;
	}

	.mydetail_body1_bottom_text {
		width: 50rpx;
		height: 60rpx;
		font-size: 28rpx;
		color: #343434;
		font-weight: 600;
		margin-left: 10rpx;
		margin-right: 10rpx;
	}

	.mydetail_body3 {
		width: 750rpx;
		height: 140rpx;
		border-bottom: 16rpx solid #F2F2F2;
		display: flex;
		align-items: center;
		flex-direction: column;
		background-color: #FFFFFF;
	}

	.mydetail_body3_top {
		width: 640rpx;
		height: 33rpx;
		margin-top: 20rpx;
	}

	.mydetail_body3_top_right {}

	.mydetail_body3_top_left {
		width: 260rpx;
		height: 33rpx;
		/* border:2rpx solid blue; */
		border-right: 2rpx solid black;
	}

	.mydetail_fhd {
		width: 224rpx;
		height: 33rpx;
		/* border:2rpx solid blue; */
		/* letter-spacing: 2rpx; */
		color: #343434;
		margin-right: 20rpx;
	}

	.mydetail_address {
		width: 176rpx;
		height: 33rpx;
		/* border:3rpx solid black; */
		letter-spacing: 2rpx;
		color: #343434;
	}

	.mydetail_body3_top_right_body {
		width: 400rpx;
		height: 33rpx;
		/* border:3rpx solid black; */
		margin-left: 30rpx;
		display: flex;
		justify-content: space-between;
	}

	.mydetail_body3_top_right_body_left {
		width: 200rpx;
		height: 33rpx;
		letter-spacing: 2rpx;
		color: #343434;
	}

	.mydetail_body3_top_right_body_right {
		width: 180rpx;
		height: 32rpx;
		letter-spacing: 2rpx;
		color: #343434;
	}

	.mydetail_body3_bottom {
		width: 640rpx;
		height: 33rpx;
		margin-top: 15rpx;
	}

	.mydetail_body3_bottom_text {
		width: 500rpx;
		height: 33rpx;
		letter-spacing: 2rpx;
		color: #343434;
		position: absolute;
		left: 32rpx;
	}

	.mydetail_ku {
		color: #343434;
		/* margin-right: 8rpx; */
	}

	.mydetail_cun {
		color: #343434;
		margin-left: 26rpx;
	}

	.mydetail_gui {
		color: #343434;
	}

	.mydetail_ge {
		color: #343434;
		margin-left: 26rpx;
	}

	.mydetail_can {
		color: #343434;
	}

	.mydetail_shu {
		color: #343434;
		margin-left: 26rpx;
	}

	.mydetail_canshu {
		color: #343434;
		margin-left: 26rpx;
		letter-spacing: 2rpx;
	}

	.mydetail_body4 {
		width: 750rpx;
		height: 120rpx;
		border-bottom: 8rpx solid #F2F2F2;
		display: flex;
		align-items: center;
		flex-direction: column;
	}

	.mydetail_body4_top {
		width: 650rpx;
		height: 33rpx;
		margin-top: 20rpx;
		display: flex;
		justify-content: space-between;
	}

	.mydetail_body4_top_left {
		width: 360rpx;
		height: 33rpx;
		/* border:2rpx solid blue; */
		letter-spacing: 2rpx;
		color: #343434;
		position: absolute;
		left: 32rpx;
	}

	.mydetail_body4_top_right {
		width: 15rpx;
		height: 33rpx;
		position: absolute;
		right: 32rpx;
	}

	.mydetail_next {
		width: 15rpx;
		height: 24rpx;
	}

	.mydetail_body4_bottom {
		width: 650rpx;
		height: 33rpx;
		margin-top: 20rpx;
		display: flex;
		justify-content: space-between;
	}

	.mydetail_body4_bottom_left {
		width: 300rpx;
		height: 33rpx;
		/* border:2rpx solid blue; */
		letter-spacing: 2rpx;
		color: #343434;
	}

	.mydetail_body5 {
		width: 750rpx;
		/* height: 470rpx; */
		border-bottom: 15rpx solid #F2F2F2;
		display: flex;
		align-items: center;
		flex-direction: column;
	}

	.mydetail_body5_header {
		width: 672rpx;
		height: 50rpx;
		margin: 20rpx auto;
		display: flex;
		justify-content: space-between;
	}

	.mydetail_body5_header_left {
		height: 50rpx;
		width: 200rpx;
		font-size: 34rpx;
		font-weight: 600;
		color: #000000;
		letter-spacing: 2rpx;
	}

	.mydetail_body5_header_right {
		height: 40rpx;
		width: 170rpx ! important;

	}

	.mydetail_body5_header_rignt1 {
		height: 40rpx;
		width: 150rpx !important;
		color: #343434;
		letter-spacing: 2rpx;
	}

	.mydetail_body5_header_rignt2 {
		height: 24rpx;
		width: 20rpx;
		margin-left: 15rpx;
		margin-right: 10rpx;

	}

	.mydetail_next1 {
		width: 15rpx;
		height: 24rpx;
	}

	.mydetail_body5_box1 {
		width: 650rpx;
		height: 120rpx;
		margin-bottom: 20rpx;
	}

	.mydetail_body5_box1_left {
		width: 100rpx;
		height: 100rpx;
		/* border:2rpx solid blue; */
	}

	.people_logo {
		width: 100rpx;
		height: 100rpx;
	}

	.mydetail_body5_box1_right {
		width: 310rpx;
		height: 120rpx;
		display: flex;
		align-items: center;
		/* border:2rpx solid blue; */
	}

	.mydetail_center {
		width: 250rpx;
		height: 80rpx;
		/* border:2rpx solid blue; */
	}

	.people_nick {
		width: 550rpx;
		height: 40rpx;
		letter-spacing: 2rpx;
		/* border:2rpx solid blue; */
		/* display:flex;
		align-self: flex-end; */
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
		width: 650rpx;
	}

	.mydetail_body5_box2_bottom {
		width: 650rpx;
		margin-top: 40rpx;
		/* border:2rpx solid black; */
	}

	.mydetail_evaluate {
		width: 650rpx;
		height: 116rpx;
		letter-spacing: 3rpx;
	}

	.evaluate_pic {
		width: 140rpx;
		height: 140rpx;
		margin-right: 25rpx;
		/* margin-left: 20rpx; */
	}

	.mydetail_body6 {
		width: 750rpx;
		/* height: 2000rpx; */
		display: flex;
		justify-content: center;
		flex-direction: column;
		margin-bottom: 200rpx;
		background-color: #FFFFFF;
		/* box-shadow:2px 5px 12px rgba(0,0,0,.1); */
	}

	.mydetail_body6_inner {
		width: 680rpx;
	}

	.mydetail_body6_header {
		width: 300rpx;
		height: 60rpx;
		margin: 8rpx auto;
		font-size: 34rpx;
		color: #FF3237;
		letter-spacing: 2rpx;
	}

	.kong {
		width: 120rpx;
		border-bottom: 2px solid #FF3237;
		margin: 0 auto;
	}

	.mydetail_body6_body {
		width: 680rpx;
		display: flex;
		justify-content: center
	}

	.mydetail_body6_body_pic {
		width: 680rpx;
		height: 2400rpx;
	}

	.mydetail_body7 {
		width: 100%;
		height: 110rpx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		background-color: #FFFFFF;
		position: fixed;
		bottom: 0
	}

	.mydetail_body7_box1 {
		/* width: 120rpx; */
		width: 20%;
		height: 100%;
		/* display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center; */
		/* margin: 0 25rpx; */
	}

	.mydetail_body7_box1_top {
		width: 100rpx;
		height: 70rpx;
		/* border:1rpx solid red; */
		margin:0 auto;
	}

	.mydetail_body7_box1_top_pic {
		width: 36rpx;
		height: 36rpx;
	}

	.mydetail_body7_box1_bottom {
		width: 100%;
		height: 14px;
		font-size: 12px;
		color: #000000;
		letter-spacing: 1px;
		text-align: center;
	}

	.mydetail_body7_box2 {
		/* width: 400rpx; */
		width: 60%;
		height: 110rpx;
		display: flex;
		justify-content: space-between;
	}

	.mydetail_body7_smallbox2 {
		/* width: 420rpx; */
		width:50%;
		height: 110rpx;
		background-color: #FABD02;
		font-size: 30rpx;
		color: #FFFFFF;
		
	}

	.mydetail_body7_smallbox3 {
		/* width: 420rpx; */
		width:50%;
		height: 110rpx;
		background-color: #FF3237;
		font-size: 30rpx;
		color: #FFFFFF;
	}

	.mydetail_body7_smallbox2_pic {
		width: 210rpx;
		height: 66rpx;
	}

	.mydetail_body7_box1_right {
		width: 20%;
		height: 100%;
		text-align: center;
	}

	.mydetail_body7_box1_right_top {
		width: 100%;
		height: 70rpx;
	}
	.mts {
		margin-top:70rpx;
		/* position: absolute; */
	/* 	bottom: 20rpx; */
	}
	.mydetail_body7_box1_right_top_pic {
		width: 36rpx;
		height: 32rpx;
	}

	.mydetail_body7_box1_right_bottom {
		width: 100%;
		height: 29rpx;
		font-size: 24rpx;
		color: #000000;
		letter-spacing: 2rpx;
	}

	.cu-bar {
		display: flex;
		position: relative;
		-webkit-box-align: center;
		align-items: center;
		min-height: 600rpx;
		-webkit-box-pack: justify;
		justify-content: space-between;
		display: flex;
		padding: 18rpx;
	}

	.cu-dialog {
		/* height: 800rpx; */
		/* display: flex;
		justify-content: center; */
	}

	.cu-dialog1 {
		position: relative;
		display: inline-block;
		vertical-align: middle;
		margin-left: auto;
		margin-right: auto;
		width: 520px;
		/* height: 680rpx; */
		height:auto;
		max-width: 100%;
		background-color: #FFFFFF;
		overflow: hidden;
	}

	/* 	.cu-dialog1{
		height: 800rpx;
		
	} */
	.mydetail_cart_header {
		width: 670rpx;
		height: 165rpx;
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
		border-radius: 14rpx;
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
		display: flex;
		align-items: center;

	}

	.mydetail_cart_header_right2 {
		width: 480rpx;
		height: 50rpx;
		color: #7A7979;
		letter-spacing: 2rpx;

	}

	.new_se {
		COLOR: #000000
	}

	.mydetail_cart_header_right3 {
		width: 480rpx;
		height: 50rpx;
		color: #7A7979;
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
		/* height: 100rpx; */
		height: auto;
		margin: 0 auto;
		margin-top: 30rpx;
	}

	.mydetail_cart_body1_top {
		width: 670rpx;
		height: 50rpx;
		color: #373737;
		letter-spacing: 2rpx;
	}
	.mt_mt{
		padding-top: 140rpx;
	}
	.mydetail_cart_body1_bottom {
		width: 670rpx;
		/* height: 50rpx; */
		height: auto;
		flex-wrap: wrap;

		/* border:2rpx solid blue; */
	}

	.mydetail_cart_body1_small {
		width: auto;
		height: 54rpx;
		color: #000;
		background-color: #F5F5F5;
		font-size: 24rpx;
		margin-right: 30rpx;
		letter-spacing: 2rpx;
		margin-top: 20rpx;
		border-radius: 10rpx;
		padding: 30rpx
	}

	.mydetail_cart_body1_small2 {
		width: 150rpx;
		height: 45rpx;
		color: #FF3237;
		background-color: #F5F5F5;
		font-size: 24rpx;
		border: 2rpx solid #FF3237;
		margin-right: 30rpx;
		letter-spacing: 2rpx;
	}

	.g {
		color: #F08720;
		font-size: 24rpx;
		letter-spacing: 20rpx;
	}

	.mydetail_cart_lastbody {
		width: 636rpx;
		height: 100rpx;
		margin: 0 auto;
	}

	.mydetail_cart_lastbody_left {
		width: 39%;
		height: 86rpx;
		background-color: #FBBD01;
		color: #FFFFFF;
		border-radius: 20rpx;
	}

	.mydetail_cart_lastbody_right {
		width: 39%;
		height: 86rpx;
		background-color: #FF3137;
		color: #FFFFFF;
		border-radius: 20rpx;
	}

	.mydetail_cart_lastbody_left_pic {
		width: 316rpx;
		height: 70rpx;
	}

	.cu-bar1 {
		display: flex;
		position: relative;
		-webkit-box-align: center;
		align-items: center;
		/* min-height: 800rpx; */
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
		width: 680rpx;
		height: 100rpx;
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
		margin-top: 30rpx;
	}

	.cu-bar1_bottom_pic {
		width: 680rpx;
		height: 80rpx;
	}

	.mydetail_cart_lastbody_pic {
		width: 750rpx;
		height: 90rpx;
		margin: 0 auto;
	}

	.mydetail_cart-number {
		width: 660rpx;
		height: 80rpx;
		margin: 40rpx auto;
	}

	.mydetail_cart-number_left {
		width: 480rpx;
		height: 60rpx;
		/* border:2rpx solid blue; */
		letter-spacing: 2rpx;
	}

	.mydetail_cart-number_right {
		width: 140rpx;
		height: 60rpx;

	}

	.kuaidi {
		width: 100rpx;
		height: 32rpx;
		margin-left: -10rpx;
	}

	.money_money {
		height: 30rpx;
		width: 200rpx;
	}

	.mydetail_cart_lastbody_left1 {
		width: 500rpx;
		height: 90rpx;
		background-color: #FF3137;
		color: #FFFFFF;
		border-radius: 20rpx;
		border: 1px solid red
	}

	.mydetail_cart_lastbody_left1_pic {
		width: 640rpx;
		height: 96rpx;
	}

	.mydetail_body3_top_right {
		height: 32rpx;
		width: 500rpx;
	}
	
</style>
