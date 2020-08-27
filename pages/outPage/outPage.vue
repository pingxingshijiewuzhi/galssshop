<template>
	<view>
		<web-view :src="urls">
		</web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				urls:''
			}
		},
		onLoad(option) {
			this.urls = option.urls;
			console.log(this.urls)
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
