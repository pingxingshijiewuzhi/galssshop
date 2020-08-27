<template>
	<view class='companyprofile'>
		<rich-text :nodes="result"></rich-text>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				result:null
			}
		},
		onLoad(option) {
			this._getprofile()
		},
		methods:{
			// 公司简介
			_getprofile(){
				this.$common.requests('/api/index/get_company_profile').then(res=>{
					// console.log(res.data.data,666)
					this.result = res.data.data
				})
			}
		},
	}
</script>

<style>
	page{
		background-color: #FFFFFF !important;
	}
	.companyprofile{
		width: 100vw;
		background-color: #FFFFFF;
		padding:0 20rpx;
		/* overflow: hidden; */
		overflow-y: scroll;
	}
</style>
