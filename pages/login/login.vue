<template>
	<view class="login_bigbox ">
		<view class="new_kong"></view>
		<!-- <view class="login_header ">
			<view :class="['inv-h',Inv==0?'inv-h-se':'']" @click="Inv=0">
				登录
				<view  :class="[Inv==0?'line':'']"></view>
			</view>
			<view :class="['inv-h',Inv==1?'inv-h-se':'']" @click="Inv=1">
				注册
				<view :class="[Inv==1?'line':'']"></view>
			</view>
		</view> -->
		<view class='new_top flexs'>
			<image src="../../static/pic/logo.png"></image>
		</view>
		<view class="text-bold titles flexs">欢迎登录美华玻璃商城</view>
		<view class='new_btns'>
			<image src='../../static/pic/icon_wechat@2x.png' @click="goweicaht()"></image>
			<view>微信登录</view>
		</view>
		<view class="list" v-show="Inv==0">
			<!-- <view class="redline"> -->
				<!-- <image src=""></image> -->
			<!-- </view> -->
			<!-- <view class="login_body">
					<view class="login_bodytop1">
						<view class="login_bodytop1_left"><image class="login_moblie" src="../../static/image/registered_icon_account@2x.png" ></image></view>
						<view class="login_bodytop1_right"><input type="text" @click="hideTabbar" @focus="hideTabbar" @blur="showTabbar"  placeholder="请输入您手机号" v-model="mobile" /></view>
					</view>
					<view class="login_bodytop1">
						<view class="login_bodytop1_left"><image class="login_moblie" src="../../static/image/possword_icon_possword@2x.png" ></image></view>
						<view class="login_bodytop1_right">
							<input type="password" @click="hideTabbar" @focus="hideTabbar" @blur="showTabbar"  placeholder="请输入您的密码" v-model="password" v-show="status==true"/>
							<input type="text" @click="hideTabbar" @focus="hideTabbar" @blur="showTabbar"  placeholder="请输入您的密码" v-model="password" v-show="status==false"/>
						</view>
						<view class="login_bodytop1_bestright">
							<image class="login_see2" src="../../static/image/register_icon_yj_bi@2x.png" @click="gai()"  v-show="status==true"></image>
							<image class="login_see2" src="../../static/image/register_icon_yj_kai@2x.png" @click="gai()" v-show="status==false"></image>
						</view>
					</view>
					<view class="login_see">
				
					</view>
			
				<view class="login_body2box">
					<view class="login_body2box_right flexs">
						<view class=""></view>
						<view class="login_body2box_right2"></view> 
					</view>
				</view>
				<view class="login_body3box flexs" @click="gologin()">
					登录
				</view>
				<view class="login_body3box flexs" @click="goweicaht()">
					微信登录
				</view>
				<view class="login_body4box1" v-if='tishistatus'>
					<view class="font1 flexs">登录即代表同意</view>
					<view class="font2 flexs"	@click="goxieyi">《注册协议》</view>
					<view class="font3 flexs">与</view>
					<view class="font2 flexs"	@click="goyisi">《隐私政策》</view>
				</view>
			</view> -->
		</view>
		<!-- <view class="list" v-show="Inv==1">
			<view class="login_body">
					<view class="login_bodytop1">
						<view class="login_bodytop1_left"><image class="login_moblie" src="../../static/image/registered_icon_account@2x.png" ></image></view>
						<view class="login_bodytop1_right"><input @click="hideTabbar" @focus="hideTabbar" @blur="showTabbar" type="text"  placeholder="请输入您手机号" v-model="phone"/></view>
					</view>
					<view class="login_bodytop1">
						<view class="login_bodytop1_left"><image class="login_moblie" src="../../static/image/possword_icon_possword@2x.png" ></image></view>
						<view class="login_bodytop1_right"><input type="text" @click="hideTabbar" @focus="hideTabbar" @blur="showTabbar"  placeholder="请输入您验证码" v-model="code" /></view>
						<view class="login_yzm flexs"  v-show="stus == true" @click="getCode">{{text}}</view>
						<view class="login_yzm flexs" v-show="stus == false">{{ text }}S</view>
				</view>
				<view class="login_body3box flexs" @click="zhuce">
					下一步
				</view>
				<view class="login_body4box1" v-if='tishistatus'>
					<view class="font1 flexs" >登录即代表同意</view>
					<view class="font2 flexs" @click="goxieyi">《注册协议》</view>
					<view class="font3 flexs">与</view>
					<view class="font2 flexs" @click="goyisi">《隐私政策》</view>
				</view>
			</view>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Inv:0,
				stus: true, //倒计时标识
				sunmax: 60,
				text: '发送验证码',
				phone:'',
				code:'',
				mobile:'',
				password:'',
				status:true,
				// 默认显示
				tishistatus:true,
				windowHeight: ''
			}
		},
		onLoad() {
			uni.getSystemInfo({
			        success: (res)=> {
			            this.windowHeight = res.windowHeight;
			        }
			})
			uni.onWindowResize((res) => {
				if(res.size.windowHeight < this.windowHeight){
					this.tishistatus = false
				}else{
					this.tishistatus = true
				}
			})
			// this._getlogininfo()
		},
		methods: {
			goweicaht(){
				// console.log(555)
				window.location.href = 'http://bolichang.shangxin6688.com/third/connect/wechat'
				// uni.navigateTo({
				// 	url: '../outPage/outPage?urls=' + urls
				// })
			},
			// 微信授权登录
			// _getlogininfo(){
			// 	// this.$common.request()
			// 	uni.request({
			// 		url: 'bolichang.shangxin6688.com/third/connect/wechat',
			// 		header: {
			// 			'Content-Type': 'application/json;charset=UTF-8',
			// 			'Content-Type': 'application/x-www-form-urlencoded'
			// 		},
			// 		data: {}, 
			// 		method: 'POST',
			// 		success: (res) => {
			// 			console.log(res,666)
			// 		},
			// 		fail: (err) => {
			// 			reject(err)
			// 		}
			// 	})
			// },
			// 监听input
			showTabbar(){
					this.tishistatus = true;
			},
			hideTabbar(){
					this.tishistatus = false;
			},
			gai(){
				this.status=!this.status
			},
		  //获取验证码
			getCode() {
				if (/^1[345789]\d{9}$/.test(this.phone)) {
					this.stus = false;
					this.text = this.sunmax;
					var that = this
					let timeInt = setInterval(() => {
						that.text--;
						if (that.text <= 0) {
							that.stus = true;
							that.text = '获取验证码';
							clearInterval(timeInt);
						}
					}, 1000);
					var obj = {
						mobile: this.phone
					};
					this.$common.requests('/api/user/sendSMS', obj).then(res => {
						this.$api.msg(res.data.msg);
						if (res.data.code == 1) {
						}
					});
				} else {
					this.$api.msg('请输入正确的手机号');
				}
			},
			//注册
			zhuce() {
				if (this.phone == '') {
					this.$api.msg('请输入手机号');
					return;
				}
				if (this.code == 0) {
					this.$api.msg('请输入验证码');
					return;
				}
				uni.navigateTo({
					url:"../login/setpassword?phone="+this.phone+'&code='+this.code
				})
			},
			gologin(){
				var obj = {
					mobile: this.mobile,
					password:this.password
				};
				this.$common.requests('/api/Login/login', obj).then(res => {
					this.$api.msg(res.data.msg);
					if (res.data.code == 1) {
						console.log(res.data.data,999)
						var data = res.data.data.userinfo;
						uni.setStorageSync('uid', data.id);
						uni.setStorageSync('token', data.token);
						uni.setStorageSync('userinfo', data);
						setTimeout(() => {
							uni.reLaunch({
								url:'/pages/index/index'
							})
						}, 1000)
					}
				});
			},
			goreset(){
				uni.navigateTo({
					url:"forgetpass"
				})
			},
			gosetpassword(){
				uni.navigateTo({
					url:"setpassword"
				})
			},
			goxieyi(){
				uni.navigateTo({
					url:"zcxy"
				})
			},
			goyisi(){
				uni.navigateTo({
				url:"yszc"
				})
			},
		}
	}
</script>

<style>
	page{
		width:100%;
		height:100%;
		overflow: hidden;
	}
	.login_bigbox{
		width: 100vw;
		height: 100vh;
		padding-top: 120rpx;
		background-color: #FFFFFF;
		padding-left: 30rpx; 
		padding-right: 30rpx;
	}
	.new_kong{
		width:100%;
		height: var(--status-bar-height);
	}
	.new_top image{
		width:180rpx;
		height:180rpx;
		border-radius: 90rpx;
		border:1px solid #F2F2F2;
		box-shadow:2px 5px 12px rgba(0,0,0,.1);
	}
	.titles{
		width:100%;
		height:200rpx;
		font-size: 32rpx;
		color:#000000;
		letter-spacing: 3rpx;
	}
	.new_btns{
		width:80%;
		height:auto;
		text-align: center;
		margin:40rpx auto;
	}
	.new_btns image{
		width:120rpx;
		height:120rpx;
		border-radius: 60rpx;
		margin-bottom:30rpx
	}
	.login_header{
		width: auto;
		display:flex;
		/* flex-direction: row; */
	}
	.inv-h{
		width: 100rpx;
		height: 100%;
		margin-left: 50rpx;
		font-size: 30rpx;
	}
	.inv-h-se{
		color: #000000;
		font-size: 36rpx;
		font-weight: 600;
	}
	.line{
		width:58rpx;
		margin-top:10rpx;
		margin-left:10rpx;
		border-bottom:2px solid #FF5939;
	}
	.login_bodybox{
		height: 100rpx;
		width: 600rpx;
		border:1px solid black;
		margin-top: 70rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.login_bodybox2{
		height: 100rpx;
		width: 680rpx;
		border:1px solid black;
		margin-top: 40rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.login_bodytop1{
		width: 600rpx;
		height: 110rpx;
		background-image: url(../../static/image/juxing1@2x.png);
		background-size: 100% 100%;
		background-repeat: no-repeat;
		display: flex;
		align-items: center;
		flex-direction: row;
		margin-top:60rpx
	}
	.login_body{
		height: 1156rpx;
		width: 686rpx;
		display: flex;
		align-items: center; 
		flex-direction: column;
		margin-top: 20rpx;
	}
	.login_see{
		height: 45rpx;
		width: 45rpx;
		display: flex;
		justify-content: center; 
		align-items: center; 
	}
	.login_eye{
		height: 20rpx;
		width: 35rpx;
	}
	.login_bodytop1_right{
		width: 250rpx;
		height: 50rpx;
		margin-left: 30rpx;
	}
	.login_bodytop1_left{
		height: 40rpx;
		width: 40rpx;
		margin-left: 40rpx;
		display: flex;
		justify-content: center;
		align-items: center; 
	}
	.login_moblie{
		height: 35rpx;
		width: 35rpx;
	}
	.login_see2{
		height: 25rpx;
		width: 35rpx;
		display: flex;
		justify-content: center;
		align-items: center; 
		margin-left: 130rpx;
	}
	.login_body2box{
		width: 696rpx;
		height: 60rpx;
		display:flex;
		justify-content: space-around;
		align-items: center;
	}
	.login_body2box_left{
		width: 264rpx;
		height: 50rpx;
		color: #E50809;
		font-size: 28rpx;
		letter-spacing: 2rpx;
		
	}
	.login_body2box_right{
		width: 300rpx;
		height: 50rpx;
		color: #000000;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: row;
	}
	.login_body2box_right1{
		width: 20rpx;
		height: 20rpx;
		border:1px solid #8B8B8B;
		margin-right: 10rpx;
	}
	.login_body2box_right2{
		width: 128rpx;
		height: 50rpx;
		font-size: 28rpx;
		color: #000000;
		letter-spacing: 2rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.login_immediately{
		width: 600rpx;
		height: 90rpx;
	}
	.login_body3box{
		width: 580rpx;
		height: 85rpx;
		background-color: #FF3237;
		color:#FFFFFF;
		border-radius: 20rpx;
		margin-top: 80rpx;
	}
	.login_body4box{
		width: 100%;
		height: 60rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: row;
		margin-top: 520rpx;
	}
	.login_body4box1{
		width: 100%;
		height: 60rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: row;
		position: absolute;
		bottom:60rpx
	}
	.font1{
		width: 232rpx;
		height: 50rpx;
		color:#555555;
		letter-spacing: 2rpx;
	}
	.font3{
		width: 30rpxrpx;
		height: 50rpx;
		color: #555555;
		letter-spacing: 2rpx;
	}
	.font2{
		width: 30rpxrpx;
		height: 50rpx;
		color: #E50809;
		letter-spacing: 2rpx;
	}
	.login_yzm{
		width: 150rpx;
		height: 40rpx;
		background-color: #F3F2ED;
		font-size: 28rpx;
		color: #E50809;
		margin-left: 20rpx;
	}
	/* .login_body4box{
		width: 560rpx;
		height: 60rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: row;
		margin-top: 530rpx;
	} */
	.uni-input-placeholder{
		font-size: 28rpx;
	}
</style>
