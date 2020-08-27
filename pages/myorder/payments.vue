<template>
	<view class="payment_bigbox">
		<view class="payment_content">
			<view class="payment_top flexs">
				<view class="payment_top_inner">
					<view>订单金额</view>
					<text class="payment_money flexs">¥<text class="number">{{money}}</text></text>
				</view>
			</view>
			<view class="kong"></view>
			<view class="payment_body">
				<radio-group class="block" @change="RadioChange">
					<!-- <view class="cu-list menu text-left">
						<view class="cu-item" >
							<label class="flex justify-between align-center flex-sub">
								<view class="flex-sub"> 
								<view class="payment_body1_left flexs1">
									<view class="payment_body1_left1">
										<image class="payment_money" 
src="../../static/image/icon_yy@2x.png"></image>
									</view>
									<view class="payment_body1_left2">
										余额支付
									</view>
								</view>
								</view>
								<radio class="radio" :class="radio==4?'checked':''" :checked="radio==4?true:false"
								 value="4"></radio>
							</label>
						</view>
					</view> -->
					<view class="cu-list menu text-left">
						<view class="cu-item">
							<view class="flex-sub flexs2">
								<view class='fangshi'>支付方式:</view>
								<view class="payment_body1_left flexs1">
									<view class="payment_body1_left1">
										<image class="payment_money" src="../../static/pic/icon_wechat_1@2x.png"></image>
									</view>
									<view class="payment_body1_left2">
										微信支付
									</view>
								</view>
							</view>
							<!-- 	<radio class="radio" :class="radio==1?'checked':''" :checked="radio==1?true:false"
								 value="1"></radio> -->
						</view>
					</view>
					<!-- <view class="cu-list menu text-left">
						<view class="cu-item" >
							<label class="flex justify-between align-center flex-sub">
								<view class="flex-sub">
									<view class="payment_body1_left flexs1">
										<view class="payment_body1_left1">
											<image class="payment_money" 
src="../../static/image/icon_zfb@2x.png"></image>
										</view>
										<view class="payment_body1_left2">
											支付宝支付
										</view>
									</view>
								</view>
								<radio class="radio" :class="radio==2?'checked':''" :checked="radio==2?true:false"
								 value="2"></radio>
							</label>
						</view>
					</view> -->
				</radio-group>
			</view>
			<!-- 判断是否设置支付密码 -->
			<view class="payment_body1_bottom" @click="tozhifu">
				立即支付
				<!-- <image class="payment_buttonniu" src="../../static/image/btn_lijizhengbu@2x.png"  @click="up"></image> -->
			</view>
			<passkeyborad :show="show" @close="close" @makesure="makesure"></passkeyborad>
		</view>
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
				radio: 4,
				show: false,
				id: '',
				list: [],
				password: '',
				pay_password: '',
				price: '',
				money: '',
				pic_id: '',
				type:''
			}
		},
		onLoad(option) {
			this.id = option.id
			this.money = option.code
			this.type = option.type
			this.initdata();
			this.initData_new()
		},
		methods: {
			//判断是否设置支付密码a
			initData_new() {
				var obj = {};
				this.$common.requests('/api/user/membersInfo', obj).then(res => {
					// this.$api.msg(res.data.msg);
					if (res.data.code == 1) {
						this.pay_password = res.data.data.pay_password
					}
				});
			},
			up() {
				this.$api.msg('请先设置支付密码')
			},
			initdata() {
				var obj = {
					id: this.id
				};
				this.$common.requests('/api/orders/detail', obj).then(res => {
					// this.$api.msg(res.data.msg);
					if (res.data.code == 1) {
						this.list = res.data.data
						this.price = res.data.data.actual_price
						// setTimeout(() => {
						// 	uni.navigateTo({
						// 		url:'../order/orderList'
						// 	})
						// }, 1000)
					}
				});
			},
			RadioChange(e) {
				this.radio = e.detail.value
			},
			close() {
				this.show = false
			},
			//支付商品
			tozhifu() {
				// var obj = {
				// 	pic_id: this.id,

				// };
				// this.$common.requests('/api/picinfo/pay', obj).then(res => {
				// 	this.$api.msg(res.data.msg);
				// 	if (res.data.code == 1) {
				// 		this.$common.requests('/api/picinfo/downNumAdd', obj).then(res => {

				// 			if (res.data.code == 1) {}
				// 		});
				// 		setTimeout(() => {

				// 			uni.navigateBack({
				// 				url: '../download/download'
				// 			})
				// 		}, 1000)
				// 	}
				// });
				let obj = {
					type:'wechat',
					method:'mp',
					pic_id: this.id
				}
				console.log(obj,6666)
				this.$common.requests('/addons/epay/index/experience1',obj,'GET').then(res=>{
					
					console.log(res.data,'可以获取到参数吗？')
					this.payment(res.data,'','');
				}) 
			},
			isWechat:function(){
				var ua = window.navigator.userAgent.toLowerCase();  
				if(ua.match(/micromessenger/i) == 'micromessenger'){  
					return true;  
				}else{  
					return false;  
				}  
			}, 
			jsApiCall(data ,callback_succ_func ,callback_error_func){
				console.log(data)
			    //使用原生的，避免初始化appid问题  
			    WeixinJSBridge.invoke('getBrandWCPayRequest', {  
			        appId:data['appId'],  
			        timeStamp: data['timeStamp'],  
			        nonceStr: data['nonceStr'], // 支付签名随机串，不长于 32 位  
			        package: data['package'], // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）  
			        signType: data['signType'], // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'  
			        paySign: data['paySign'], // 支付签名  
			    },  
			    function(res) {  
			        var msg = res.err_msg ?res.err_msg :res.errMsg;  
			        //WeixinJSBridge.log(msg);  
			        switch (msg) {  
			            case 'get_brand_wcpay_request:ok': //支付成功时  
			                if(callback_succ_func){  
			                    callback_succ_func(res);  
			                }  
			                break;  
			            default: //支付失败时  
			                WeixinJSBridge.log('支付失败!'+msg+',请返回重试.');  
			                if(callback_error_func){  
			                    callback_error_func({msg:msg});  
			                }  
			                break;  
			        }  
			    })  
			},
			payment:function(data ,callback_succ_func ,callback_error_func){
			    if(!this.isWechat()){  
			        return ;  
			    }  
			    if (typeof WeixinJSBridge == "undefined") {  
			        if (document.addEventListener) {  
			            document.addEventListener('WeixinJSBridgeReady', this.jsApiCall, false);  
			        } else if (document.attachEvent) {  
			            document.attachEvent('WeixinJSBridgeReady', this.jsApiCall);  
			            document.attachEvent('onWeixinJSBridgeReady', this.jsApiCall);  
			        }  
			    } else {  
			        this.jsApiCall(data ,callback_succ_func ,callback_error_func);  
			    }  
			}
		}
	}
</script>

<style>
	.page {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.payment_bigbox {
		width: 100vw;
		height: 100vh;
		background-color: #FFFFFF;
		display: flex;
		justify-content: center;
	}

	.payment_content {
		width: 100%;
		display: flex;
		align-items: center;
		flex-direction: column;
	}

	.payment_top {
		width: 628rpx;
		height: 250rpx;
		margin: 0 auto;
		letter-spacing: 4rpx;
		display: flex;
		align-items: center;
		border-bottom: 1px solid #E3E3E3
	}

	/* 	.kong{
		width:100%;
		border-bottom:8rpx solid #F2F2F2;
	} */
	.payment_money {
		font-size: 40rpx;
		color: #000000;
		font-weight: 600;
		letter-spacing: 4rpx;
		margin: 0 auto;
	}

	.number {
		font-size: 60rpx;
	}

	.payment_body {
		width: 650rpx;
		height: 226rpx;
		margin-top: 30rpx;
	}

	.payment_body1 {
		width: 650rpx;
		height: 120rpx;
		/* border: 2rpx solid red; */
		display: flex;
		justify-content: space-between;

	}

	.fangshi {
		color: #766D6D;
	}

	.payment_body1_left {
		width: 300rpx;
		height: 120rpx;
		/* border: 2rpx solid blue; */
	}

	.payment_body1_left1 {
		width: 100rpx;
		height: 120rpx;
		/* border: 2rpx solid blue; */
		display: flex;
		align-items: center;
	}

	.payment_money {
		width: 66rpx;
		height: 66rpx;
	}

	.payment_body1_left2 {
		width: 160rpx;
		height: 120rpx;
		font-size: 30rpx;
		letter-spacing: 2rpx;
		display: flex;
		align-items: center;

	}

	.payment_button {
		width: 40rpx;
		height: 40rpx;
	}

	.payment_body1_right {
		width: 50rpx;
		height: 120rpx;
		display: flex;
		align-items: center;
	}

	.payment_body1_bottom {
		width: 76%;
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
		color: #FFFFFF;
		background-color: #FF3237;
		border-radius: 20rpx;
	}

	.payment_buttonniu {
		width: 670rpx;
		height: 100rpx;
	}

	.payment_top_inner {
		width: 320rpx;
		height: 120rpx;
		line-height: 68rpx;
		text-align: center;
	}

	.cu-list+.cu-list {
		margin-top: 0rpx;
	}
</style>
