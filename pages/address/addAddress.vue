<template>
	<view class="box">
		<view class="border">
			<view class="border_list flexs1">
				<view class="new_left">姓 名</view>
				<input class="" type="text" placeholder="请输入您的姓名" v-model="name" />
			</view>
			<view class="border_list flexs1">
				<view class="new_left">手机号</view>
				<input type="number" placeholder="手机号码" v-model="mobile" />
			</view>
			<view class="border_list flexs1">
				<view class="new_left">地 区</view>
				<pick-regions :defaultRegion="defaultRegionCode" @getRegion="handleGetRegion">
					<view class="address_box flexs2">
						<view>
							<view v-if="region.length == 0"> 请选择地区</view>
							<view v-else>{{regionName}}</view>
						</view>
						<image class="border_image" src="../../static/image/details_icon_left@2x.png" mode=""></image>
					</view>
				</pick-regions>
			</view>
			<view class="border_list flexs1">
				<view class="new_left">地 址</view>
				<input class="" type="text" placeholder="请输入您的详细地址" v-model="detail_address" />
			</view>
			<view class="flexs2">
				<view class="border_list lnh ">是否设为默认地址</view>
				<checkbox-group @change="CheckboxChange">
					<view class="">
						<checkbox class='round blue' :class="is_default?'checked':''" :checked="is_default?true:false" value="2"></checkbox>
					</view>
				</checkbox-group>
			</view>
		</view>
		<view class="btns flexs" @click="addressadd">
			保存地址
			<!-- <image src='../../static/image/btn_baocun@2x.png'></image> -->
		</view>
	</view>
</template>

<script>
	import pickRegions from '@/components/pick-regions/pick-regions.vue'
	export default {
		components: {
			pickRegions
		},
		data() {
			return {
				// checkbox: [{
				// 	value: 'A',
				// 	checked: true
				// }, {
				// 	value: 'B',
				// 	checked: true
				// }, {
				// 	value: 'C',
				// 	checked: false
				// }],
				region: [],
				defaultRegion: '广东省,广州市,番禺区',
				defaultRegionCode: '440113',
				name: '',
				mobile: '',
				detail_address: '',
				is_default: false,
				id: 0,
			}
		},
		//      computed:{
		// regionName: {
		//     // 转为字符串
		// 	// console.log(this.region)
		// 	// this.region = [{'name':'江苏省'},{'name':'江苏省'},{'name':'江苏省'}];
		// 	get() {
		// 		if(typeof(this.region) == 'object') {

		// 			return this.region.map(item=>item.name).join(',')
		// 		} else {
		// 			return '请认真选择';
		// 		}
		// 	},
		// 	set(v) {

		// 	}

		// }
		//      },
		onLoad(option) {
			this.id = option.id;
			if (this.id != 0) {
				this.initdata();
			}
		},
		methods: {
			initdata() {
				var obj = {
					id: this.id
				};
				this.$common.requests('/api/Address/edit', obj).then(res => {
					if (res.data.code == 1) {
						this.detail_address = res.data.data.detail_address;
						this.name = res.data.data.name;
						this.mobile = res.data.data.mobile;

						if (res.data.data.code) {
							this.defaultRegionCode = res.data.data.code;
						}

						this.region = res.data.data.arr;
						this.regionName = res.data.data.address;
						if (res.data.data.is_default == 1) {
							this.is_default = false;
						} else {
							this.is_default = true;
						}
					}
				});
			},
			CheckboxChange(e) {

				this.is_default = this.is_default ? false : true;

				// var items = this.checkbox;
				// console.log(items);
				// values = e.detail.value;
				// this.is_default = values;
				// for (var i = 0, lenI = items.length; i < lenI; ++i) {
				// 	items[i].checked = false;
				// 	for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
				// 		if (items[i].value == values[j]) {
				// 			items[i].checked = true;
				// 			break
				// 		}
				// 	}
				// }
			},
			// 获取选择的地区
			handleGetRegion(region) {
				this.region = region;
				this.regionName = this.region.map(item => item.name).join(',');
				console.log(this.regionName);
				this.defaultRegionCode = region[2].code || '440113';
			},
			addressadd() {
				if (this.id == 0) {
					var is_d = 1;
					// if(this.is_default.length!=0){
					// 	is_d = 2;
					// }
					if (this.is_default) {
						is_d = 2;
					}
					var obj = {
						address: this.regionName,
						name: this.name,
						mobile: this.mobile,
						detail_address: this.detail_address,
						is_default: is_d,
						code: this.defaultRegionCode
					};
					this.$common.requests('/api/Address/create', obj).then(res => {
						this.$api.msg(res.data.msg);
						if (res.data.code == 1) {
							setTimeout(res => {
								uni.navigateBack({
									delta: 1
								})
							}, 1000);
						}
					});
				} else {
					var is_d = 1;
					if (this.is_default) {
						is_d = 2;
					}
					var obj = {
						address: this.regionName,
						id: this.id,
						name: this.name,
						mobile: this.mobile,
						detail_address: this.detail_address,
						is_default: is_d,
						code: this.defaultRegionCode
					};
					this.$common.requests('/api/Address/update', obj).then(res => {
						this.$api.msg(res.data.msg);
						if (res.data.code == 1) {
							setTimeout(res => {
								uni.navigateBack({
									delta: 1
								})
							}, 1000);
						}
					});
				}

			}

		},
	}
</script>


<style>
	page {
		width: 100%;
		height: 100%;
		overflow: hidden;
		background-color: #F4F4F4;
	}

	.box {
		width: 100vw;
		height: 100vh;
	}

	.border {
		width: 100%;
		height: 500rpx;
		background-color: #FFFFFF;
		padding: 0 20rpx;
		color: #A4A4A4;
		font-size: 30rpx;
	}

	.border_list {
		width: 90%;
		height: 100rpx;
		margin: 0 5%;
		border-bottom: solid 1rpx #E5E5E5;
	}

	.new_left {
		width: 116rpx;
		height: 60rpx;
		line-height: 86rpx;
		color: #000000
	}

	.address_box {
		width: 520rpx;
		height: 100rpx;
		padding-top: 20rpx
	}

	.lnh {
		line-height: 100rpx;
		border: none;
		color: #000000
	}

	.border_list input {
		margin-top: 30rpx;
	}

	.border_image {
		width: 20rpx;
		height: 30rpx;
	}

	checkbox-group {
		margin-right: 30rpx !important;
	}

	.button {
		width: 100%;
		line-height: 90rpx;
		background-color: #D4D4D4;
		color: #FFFFFF;
		text-align: center;
		position: absolute;
		bottom: 0;
	}

	.btns {
		width: 76%;
		height: 100rpx;
		line-height: 100rpx;
		color: #FFFFFF;
		background-color: #FF3237;
		position: fixed;
		bottom: 32rpx;
		left: 13%;
		border-radius: 20rpx;
	}

	.btns image {
		width: 94%;
		height: 100rpx
	}

	.uni-picker-container .uni-picker-action .uni-picker-action-confirm {
		color: #F13741 !important;
	}

	.uni-picker-container .uni-picker-action .uni-picker-action-cancel {
		color: #F13741 !important;
	}

	.uni-input-placeholder {
		color: #A4A4A4
	}
</style>
