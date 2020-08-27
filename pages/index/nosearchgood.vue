<!-- <template>
	<view class="searchgood_bigbox">
		<view class="searchgood_content">
			<view class="searchgood_body1">
				<view class="searchgood_indexes">
					<view class="cu-bar search bg-white flexs1">
						<view class="searchgood_indexes_left flexs1">
							<image class="searchgood_indexes_pic" src="../../static/image/icon_search@2x.png"></image>
							<view class="search-form round">
								<input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" placeholder="请输入您要搜索的商品" confirm-type="search"></input>
							</view>
							</view>
						</view>
				</view>	
				<view class="searchgood_body1_box2">
					<view class="searchgood_body1_box2_small1 flexs">
						销量
					</view>
					<view class="searchgood_body1_box2_small2 flexs">
						<view class="searchgood_body1_box2_mostsmall flexs1">
							<view class="searchgood_body1_box2_small2_text flexs">
								价格
							</view>
							<view class="searchgood_body1_box2_small2_pic ">
								<view class="searchgood_body1_box2_small2_pic1 flexs">
									<image class="searchgood_sign" src="../../static/image/icon_sanjiao_up@2x.png" ></image>
								</view>
								<view class="searchgood_body1_box2_small2_pic1 flexs">
									<image class="searchgood_sign" src="../../static/image/icon_sanjiao_below@2x.png" ></image>
								</view>
							</view>
						</view>
						
					</view>
					<view class="searchgood_body1_box2_small1 flexs">
						评价
					</view>
				</view>
				
			</view>
			<view class="deleteindex_body">
				<view class="deleteindex_body_box2 ">
					<view class="nosearchgood_body_box2_top flexs">
						<image class="nosearchgood_null" src="../../static/image/img_search@2x.png"></image>
					</view>
					<view class="nosearchgood_body_box2_bottom flexs">
						没有搜索到内容
					</view>
				</view>
				
			</view>
			</view>
			</view>
</template>

<script>
	export default {
	data() {
	  return {
	    
	  }
	 },
	 onLoad() {
	  
	 },
	 methods: {
			  InputFocus(e) {
			  	this.InputBottom = e.detail.height
			  },
			  InputBlur(e) {
			  	this.InputBottom = 0
			  }
	  
	 }
	}
</script>

<style>
	.searchgood_bigbox{
		height: 100vh;
		width: 100vw;
		background-color: #FFFFFF;
		padding-top: 15rpx;
		display: flex;
		justify-content: center;
	}
	.searchgood_content{
		width: 696rpx;
		height: 1310rpx;
		/* border:2rpx solid #007AFF; */
	}
	.searchgood_body1{
		width: 696rpx;
		height: 150rpx;
		/* border:2rpx solid red; */
		border-bottom: 15rpx solid #F2F2F2;
	}
	.searchgood_indexes{
		/* width: 650rpx; */
		height: 60rpx;
	     /* border:2rpx solid red; */
		 padding-left: 10rpx;
		 padding-right: 10rpx;
		 display: flex;
		flex-direction: row-reverse;
		
	}
	.searchgood_indexes_pic{
		width: 30rpx;
		height: 30rpx;
		margin-left: 10rpx;
		/* border:2rpx solid green; */
	}
	.search-form{
		width: 400rpx;
		height: 50rpx;
		font-size: 12rpx;
		margin-left: 25rpx;
		
	}
	.searchgood_indexes_left{
		width: 550rpx;
		height: 50rpx;
		/* border:2rpx solid #1CBBB4; */
		border-radius: 30rpx;
		padding-left: 12rpx;
		background-color: #F1F1F1;
		
		
	}
	.searchgood_body1_box2{
		height: 60rpx;
		width: 690rpx;
		/* border:2rpx solid #1CBBB4; */
		display: flex;
		flex-wrap: nowrap;
		justify-content: center;
		margin-top: 20rpx;
	}
	.searchgood_body1_box2_small1{
		width: 200rpx;
		height: 60rpx;
		font-size: 32rpx;
		color: #3F3F3F;
	    letter-spacing: 2rpx;
		/* border:2rpx solid black; */
	}
	.searchgood_body1_box2_small2{
		width: 220rpx;
		height: 60rpx;
		/* border:2rpx solid black; */
		margin-left: 20rpx;
		margin-right: 20rpx;
	}
	.searchgood_body1_box2_mostsmall{
		width: 100rpx;
		height: 60rpx;
		/* border:2rpx solid blue; */
	}
	.searchgood_body1_box2_small2_text{
		width: 200rpx;
		height: 60rpx;
		font-size: 32rpx;
		color: #3F3F3F;
		letter-spacing: 2rpx;
		margin-right: 10rpx;
		/* border:2rpx solid black;; */
	}
	.searchgood_body1_box2_small2_pic{
		width: 20rpx;
		height: 30rpx;
		/* margin-left: 10rpx; */
	}
	.searchgood_body1_box2_small2_pic1{
		width: 20rpx;
		height: 16rpx;
	}
	.searchgood_sign{
		width: 20rpx;
		height: 16rpx;
	}
	.deleteindex_body{
		width: 696rpx;
		height: 1180rpx;
		
		margin-top:120rpx;
		/* border:2rpx solid #1CBBB4; */
	}
	.deleteindex_body_box2{
		width: 696rpx;
		height: 700rpx;
		/* border:2rpx solid red; */
	}
	.nosearchgood_body_box2_top{
		width: 600rpx;
		height: 450rpx;
		margin: 0 auto;
		
	}
	.nosearchgood_null{
		width: 550rpx;
		height: 400rpx;
	}
	.nosearchgood_body_box2_bottom{
		width: 600rpx;
		height: 180rpx;
		color: #9A9A9A;
		font-size: 34rpx;
		margin: 20rpx auto;
		letter-spacing: 2rpx;
	}
	
</style> -->
