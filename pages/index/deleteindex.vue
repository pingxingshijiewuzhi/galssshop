<!-- <template>
	<view class="deleteindex_bigbox">
		<view class="deleteindex_content">
			<view class="indexkey_indexes">
				<view class="cu-bar search bg-white flexs1">
					<view class="index_indexes_left flexs1">
						<image class="index_indexes_pic" src="../../static/image/icon_search@2x.png"></image>
						<view class="search-form round">
							<input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" placeholder="请输入您要搜索的商品" confirm-type="search"></input>
						</view>
						</view>
					</view>
				<view class="action flexs">
					取消
				</view>
			</view>
			<view class="deleteindex_body">
				<view class="deleteindex_body_box1 flexs1">
					搜索历史
				</view>
				<view class="deleteindex_body_box2 ">
					<view class="deleteindex_body_box2_top flexs">
						<image class="deleteindex_null" src="../../static/image/img_ssls@2x.png"></image>
					</view>
					<view class="deleteindex_body_box2_bottom flexs">
						暂无搜索历史
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
		  },
	   
	  }
	 }
</script>

<style>
	.deleteindex_bigbox{
		height: 100vh;
		width: 100vw;
		background-color: #FFFFFF;
		padding-top: 15rpx;
		display: flex;
		justify-content: center;
	}
	.deleteindex_content{
		width: 696rpx;
		height: 1310rpx;
		/* border:2rpx solid #007AFF; */
	}
	.indexkey_indexes{
		/* width: 650rpx; */
		height: 60rpx;
	     /* border:2rpx solid red; */
		 padding-left: 10rpx;
		 padding-right: 10rpx;
		 display: flex;
		 justify-content: center;
		
	}
	.index_indexes_pic{
		width: 30rpx;
		height: 30rpx;
		/* border:2rpx solid green; */
	}
	.search-form{
		width: 400rpx;
		height: 50rpx;
		font-size: 12rpx;
		margin-left: 25rpx;
		
	}
	.action{
		width: 110rpx;
		height: 60rpx;
		font-size: 30rpx;
		/* border:2rpx solid black; */
		/* margin-left: 20rpx; */
		letter-spacing: 2rpx;
	}
	.index_indexes_left{
		width: 500rpx;
		height: 50rpx;
		/* border:2rpx solid #1CBBB4; */
		border-radius: 30rpx;
		padding-left: 12rpx;
		background-color: #F1F1F1;
	}
	.deleteindex_body{
		width: 696rpx;
		height: 1180rpx;
		border-top: 1rpx solid #F2F2F2; 
		margin-top: 20rpx;
		/* border:2rpx solid #1CBBB4; */
	}
	.deleteindex_body_box1{
		width: 200rpx;
		height: 50rpx;
		/* border:2rpx solid red; */
		font-size: 34rpx;
		letter-spacing: 4rpx;
		color:#000000;
		/* border:2rpx solid red; */
		margin-left: 35rpx;
		margin-top: 55rpx;
	}
	.deleteindex_body_box2{
		width: 696rpx;
		height: 700rpx;
		/* border:2rpx solid red; */
	}
	.deleteindex_body_box2_top{
		width: 600rpx;
		height: 450rpx;
		margin: 0 auto;
		
	}
	.deleteindex_null{
		width: 600rpx;
		height: 450rpx;
	}
	.deleteindex_body_box2_bottom{
		width: 600rpx;
		height: 180rpx;
		color: #000000;
		font-size: 34rpx;
		margin: 20rpx auto;
	}
	
</style> -->
