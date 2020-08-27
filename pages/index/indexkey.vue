<template>
	<!-- 有搜索记录 -->
	<view class="indexkey_bigbox">
		<view class="indexkey_content">
			<view class="indexkey_indexes flexs2">
				<view class="shangyige" @click="goindex">
					<image class="shangyige_pic" src="../../static/image/up.png"></image>
				</view>
				<view class="cu-bar search bg-white flexs1">
					<view class="index_indexes_left flexs1">
						<image class="index_indexes_pic" src="../../static/image/icon_search@2x.png"></image>
						<view class="search-form round">
							<input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" placeholder="请输入您要搜索的商品"
							 confirm-type="search"></input>
						</view>
					</view>
				</view>
				<view class="action flexs" @click="goindex">
					取消
				</view>
			</view>
			<view class="indexkey_body">
				<view class="indexkey_body_box1">
					<view class="indexkey_body_box1_left ">
						搜索历史
					</view>
					<view class="indexkey_body_box1_right flexs">
						<view class="indexkey_delete" @tap="showModal" data-target="ChooseModal">
							<image class="indexkey_basket flexs" src="../../static/image/icon_delete@2x.png"></image>
						</view>
						<view class="indexkey_body_box1_right_text flexs">
							清空搜索历史
						</view>
					</view>
				</view>
				<view class="indexkey_box2 flexs11">
					<view class="indexkey_label flexs" v-for="(item,index) in 8" :key="index">
						小米笔记本
					</view>
				</view>
				<view class="cu-modal " :class="modalName=='ChooseModal'?'show':''" @tap="hideModal">
					<view class="cu-dialog" @tap.stop="">
						<view class="button_color">
							<view class="button_top1 flexs">
								删除搜索历史
							</view>
							<view class="button_middle flexs">你确定要删除搜索历史吗？</view>
							<view class="cu-bar bg-white flexs1">
								<view class="button_bottom_left flexs" @tap="hideModal">取消</view>
								<view class="button_bottom_right flexs" @tap="hideModal">确定</view>
							</view>
						</view>

					</view>
				</view>
			</view>
		</view>
	</view>
	<!-- 无搜索记录 -->
	<!-- <view class="deleteindex_bigbox" >
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
				<view class="action flexs" @click="goindex">
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
	</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				modalName: null,
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
			showModal(e) {
				console.log(111)
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			goAccount() {
				uni.navigateTo({
					url: "account"
				})
			},
			goindex() {
				uni.switchTab({
					url: 'index'
				})
			}
		}
	}
</script>

<style>
	.indexkey_bigbox {
		height: 100vh;
		width: 100vw;
		background-color: #FFFFFF;
		padding-top: 15rpx;
		display: flex;
		justify-content: center;
	}

	.indexkey_content {
		width: 696rpx;
		height: 1310rpx;
		/* border:2rpx solid #007AFF; */
	}

	.indexkey_indexes {
		/* width: 650rpx; */
		height: 60rpx;
		/* border:2rpx solid red; */
		padding-left: 10rpx;
		padding-right: 10rpx;
		display: flex;
		justify-content: center;
		margin-top: 20rpx;

	}

	.index_indexes_pic {
		width: 30rpx;
		height: 30rpx;
		/* border:2rpx solid green; */
		margin-left: 10rpx;
	}

	.search-form {
		width: 400rpx;
		height: 50rpx;
		font-size: 12rpx;
		margin-left: 25rpx;

	}

	.action {
		width: 110rpx;
		height: 60rpx;
		font-size: 30rpx;
		/* border:2rpx solid black; */
		/* margin-left: 20rpx; */
		letter-spacing: 2rpx;
	}

	.index_indexes_left {
		width: 500rpx;
		height: 50rpx;
		/* border:2rpx solid #1CBBB4; */
		border-radius: 30rpx;
		padding-left: 12rpx;
		background-color: #F1F1F1;
	}

	.indexkey_body {
		width: 696rpx;
		height: 1180rpx;
		background-color: #F2F2F2;
		margin-top: 20rpx;
	}

	.indexkey_body_box1 {
		width: 90%;
		height: 140rpx;
		/* border:2rpx solid #1CBBB4; */
		display: flex;
		justify-content: space-between;
		margin: 0 auto;
	}

	.indexkey_body_box1_left {
		width: 90%;
		height: 140rpx;
		/* border:2rpx solid red; */
		font-size: 34rpx;
		letter-spacing: 4rpx;
		color: #000000;
		display: flex;
		align-items: center;
	}

	.indexkey_body_box1_right {
		width: 200rpx;
		height: 140rpx;
		/* border:2rpx solid red; */
	}

	.indexkey_delete {
		width: 30rpx;
		height: 30rpx;
	}

	.indexkey_basket {
		width: 30rpx;
		height: 30rpx;
	}

	.indexkey_body_box1_right_text {
		width: 164rpx;
		height: 30rpx;
		font-size: 14rpx;
		letter-spacing: 2rpx;
		margin-left: 10rpx;
		letter-spacing: 2rpx;
	}

	.indexkey_box2 {
		width: 696rpx;
		height: 180rpx;
		/* border:2rpx solid red; */
		flex-wrap: wrap;
		justify-content: space-around;
	}

	.indexkey_label {
		width: 150rpx;
		height: 45rpx;
		color: #000000;
		font-size: 24rpx;
		background-color: #FFFCF7;
		border: 2rpx solid #FCECD9;
		border-radius: 15rpx;
		margin-left: 10rpx;
		flex-wrap: wrap;
		justify-content: space-around;
	}

	.button_color {
		width: 650rpx;
		height: 300rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx;
	}

	.button_top1 {
		width: 650rpx;
		height: 60rpx;
		font-size: 36rpx;
		font-weight: 600;
		color: #000000;
	}

	.button_middle {
		width: 650rpx;
		height: 130rpx;
		font-size: 30rpx;
		color: #595959;
	}

	.button_bottom_left {
		width: 338rpx;
		height: 68rpx;
		border-top: 1px solid #FECA99;
		border-right: 1px solid #DFC7B1;
		color: #424242;
		font-size: 30rpx;
	}

	.button_bottom_right {
		width: 338rpx;
		height: 68rpx;
		border-top: 1px solid #FECA99;
		color: #EE801E;
		font-size: 30rpx;
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
		color: #FFFFFF;
		text-align: center;
		position: absolute;
		bottom: 0;
		font-size: 32rpx;
	}

	.button_left {
		width: 50%;
		height: 120rpx;
		background-color: #FFFFFF;
		color: #333333;
	}

	.button_right {
		width: 50%;
		height: 120rpx;
		background-color: #5880FA;

	}

	/* model */
	.button_color {
		width: 680rpx;
		height: 300rpx;
		background-color: #FFFFFF;
		/* border-radius: 40rpx; */

	}

	.cu-bar {
		min-height: 50rpx;
	}

	.deleteindex_bigbox {
		height: 100vh;
		width: 100vw;
		background-color: #FFFFFF;
		padding-top: 15rpx;
		display: flex;
		justify-content: center;
	}

	.deleteindex_content {
		width: 696rpx;
		height: 1310rpx;
		/* border:2rpx solid #007AFF; */
	}

	.indexkey_indexes {
		/* width: 650rpx; */
		height: 60rpx;
		/* border:2rpx solid red; */
		padding-left: 10rpx;
		padding-right: 10rpx;
		display: flex;
		justify-content: center;

	}

	.index_indexes_pic {
		width: 30rpx;
		height: 30rpx;
		/* border:2rpx solid green; */
	}

	.search-form {
		width: 400rpx;
		height: 50rpx;
		font-size: 12rpx;
		margin-left: 25rpx;

	}

	.action {
		width: 110rpx;
		height: 60rpx;
		font-size: 30rpx;
		/* border:2rpx solid black; */
		/* margin-left: 20rpx; */
		letter-spacing: 2rpx;
	}

	.index_indexes_left {
		width: 500rpx;
		height: 50rpx;
		/* border:2rpx solid #1CBBB4; */
		border-radius: 30rpx;
		padding-left: 12rpx;
		background-color: #F1F1F1;
	}

	.deleteindex_body {
		width: 696rpx;
		height: 1180rpx;
		border-top: 1rpx solid #F2F2F2;
		margin-top: 20rpx;
		/* border:2rpx solid #1CBBB4; */
	}

	.deleteindex_body_box1 {
		width: 200rpx;
		height: 50rpx;
		/* border:2rpx solid red; */
		font-size: 34rpx;
		letter-spacing: 4rpx;
		color: #000000;
		/* border:2rpx solid red; */
		margin-left: 35rpx;
		margin-top: 55rpx;
	}

	.deleteindex_body_box2 {
		width: 696rpx;
		height: 700rpx;
		/* border:2rpx solid red; */
	}

	.deleteindex_body_box2_top {
		width: 600rpx;
		height: 450rpx;
		margin: 0 auto;

	}

	.deleteindex_null {
		width: 600rpx;
		height: 450rpx;
	}

	.deleteindex_body_box2_bottom {
		width: 600rpx;
		height: 180rpx;
		color: #000000;
		font-size: 34rpx;
		margin: 20rpx auto;
	}

	.shangyige {
		width: 30rpx;
		height: 30rpx;
		margin-right: 40rpx;
		/* margin-top: 12rpx; */
	}

	.shangyige_pic {
		width: 20rpx;
		height: 30rpx;

	}
</style>
