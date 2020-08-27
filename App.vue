<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "colorui/main.css";
	@import "colorui/icon.css";
	/* 引入官方uni.css */
	/* @import "colorui/uni.css"; */

	page{
		width:100%;
		height:100%;
		/* overflow: hidden; */
	}
	.content{
		width:100vw;
		height:100vh
	}
	.flexs{
		  display: flex;
		  justify-content: center;
		  align-items: center;
	}
	.flexs1{
		  display: flex;
		  justify-content: flex-start;
		  align-items: center;
		 }
	.flexs2{
		  display: flex;
		  justify-content: space-between;
		  align-items: center;
		 }
	.flexs3{
		  display: flex;
		  justify-content: space-around;
		  align-items: center;
		 }
	.flexs4{
		  display: flex;
		  flex-direction:row-reverse;
		  align-items: center;
		 }
	.flexs5{
		  display: flex;
		  flex-direction:row;
		  
		 }
	.flexs6{
		  display: flex;
		  flex-direction:row;
		  align-items: center;
		 }
	.flexs7{
		  display: flex;
		  justify-content: center;
		 }
	.flexs8{
		  display: flex;
		   align-items: flex-end;
		  justify-content: space-around;
		 }
	.flexs9{
		  display: flex;
		  align-items: center ;
		   flex-direction:column;
		 }
	.flexs10{
		  display: flex;
		  justify-content: flex-end;
		  align-items: center;
		 }
	.flexs11{
		  display: flex;
		  justify-content: flex-start;
	}
	.flexs12{
		  display: flex;
		  justify-content: space-between;
	}
	.flexs13{
		display: flex;
		justify-content: space-around;
	}
	.text-colors{
		color:#EF3E48
	}
	.uni-page-head__title{
		letter-spacing: 4rpx;
	}
</style>
