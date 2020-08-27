<template>
	<view v-if='isShow'>
				<!-- 模态框	 -->
		<view  class='masking' @click='modclick'></view>
		<view class='deletehint flexs' >
			<view class='deletehint-item'>
				<image class='deletehintimg' src='/static/guanbi.png'
				@click='modclick'></image>
				<view class='flexs text-black title'>
					{{title}}
					
				</view>
				<view class='hintenture'>
					<view>遇到问题，请联系我们</view>
					<view>联系电话{{mobile}}</view>
				</view>
				<view class='felx flexs3 lastview'>
					<!-- <button class='cancle' @click='cancleclick'>取消</button> -->
					<button class='entrue' @click='tureclick'>拨打</button>
				</view>
			</view>
		</view>	
	</view>
</template>

<script>
	export default {
		props:{
			isShow:{
				type:Boolean,
				default:false
			},
			title:{
				type:String,
				default:'联系客服'
			},
			mobile:{
				type:String,
				default:'110'
			}
		},
		data() {
			return {
				
			}
		},
		methods: {
			// 模态框
			modclick(){
				// this.isShow = !this.isShow
				this.$emit('closemod')
			},
			// cancleclick(){
			// 	this.$emit('cancleclick')
			// },
			tureclick(){
				this.$emit('tureclick')
			}
		}
	}
</script>

<style scoped>
	/* 模态框样式*/
	.masking{
				position: fixed;
				top:0;
				left:0;
				right:0;
				bottom:0;
				background-color:rgba(0,0,0,.3);
			}
	.deletehintimg{
		position:absolute;
		right: -25upx;
		top: -25upx;
		height:50rpx;
		width:50rpx;
	}
	.deletehint{
		position: fixed;
		background: #FFFFFF;
		border-radius: 20rpx;
		height:450rpx;
		width:600rpx;
		top:40%;
		left:50%;
		transform: translate(-50%,-50%);
	}
	.deletehint-item>view{
		width:400rpx;
		height:150rpx;
		margin:auto;
	}
	.felx{
		display:flex;	
	}
	.title{
		font-size: 30rpx;
	}
	.hint{
		width: 200rpx;
		height: 32rpx;
		line-height: 37rpx;
		letter-spacing: 0rpx;
		color: #151515;
		font-size: 34rpx;
		text-align: center;
	}
	.hintenture{
		letter-spacing: 1rpx;
		color: #848484;
		/* border:1rpx solid red; */
	}
	.hintenture>view{
		width:100%;
		height:75rpx;
		line-height: 75rpx;
		text-align: center;
	}
	.deletehint-item .lastview{
		margin-top: 30rpx;
		width:500rpx;
	}
	.lastview .cancle,.lastview .entrue{
		border-radius: 50rpx;
		width:200rpx;
		height:66rpx;
		line-height: 66rpx;
	}
	.cancle{
		color:#2D2D2E;
		background-color: #E7E9EE;
	}
	.entrue{
		color:#FFFFFF;
		background-color:#FF3237;
	}
	uni-button{
		font-size: 30rpx;
	}
</style>
