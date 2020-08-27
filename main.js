import Vue from 'vue'
import App from './App'
import common from '@/common/common.js'
import wexinPay from '@/common/pPay.js'
import '@/js_sdk/ican-H5Api/ican-H5Api.js'
const msg = (title, duration = 1500, mask = false, icon = 'none') => {
	if (Boolean(title) === false) {
		return;
	}
	uni.showToast({
		title,
		duration,
		mask,
		icon
	});
}
Vue.config.productionTip = false

Vue.prototype.$common = common;
Vue.prototype.$wexinPay = wexinPay;
Vue.prototype.$api = {
	msg
};
App.mpType = 'app'

if(uni.getStorageSync('uid')){
	
	uni.switchTab({
		url: '/pages/index/index'
	})
 }

const app = new Vue({
    ...App
})
app.$mount()