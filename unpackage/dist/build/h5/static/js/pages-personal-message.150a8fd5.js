(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-personal-message"],{"0caa":function(t,i,a){"use strict";(function(t){a("99af"),Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var s={data:function(){return{list:[],page:1,limit:10,urls:this.$common.baseUrl}},onLoad:function(){this.initdata(1,10)},onPullDownRefresh:function(){t.log("refresh"),this.page=1,this.initdata(1,this.limit),setTimeout((function(){uni.stopPullDownRefresh()}),1e3)},onReachBottom:function(){this.page=this.page+1,this.initdata(this.page,this.limit)},methods:{goFahuo:function(){uni.navigateTo({url:"../order/orderList?Inv=2"})},goShouhuo:function(){t.log(11),uni.navigateTo({url:"../order/orderList?Inv=3"})},initdata:function(t,i){var a=this,s={page:t,limit:i};this.$common.requests("/api/sysinfo/myInfo",s).then((function(i){1==i.data.code&&(1!=t?i.data.data&&(a.list=a.list.concat(i.data.data)):a.list=i.data.data)}))}}};i.default=s}).call(this,a("5a52")["default"])},2344:function(t,i,a){var s=a("24fb");i=s(!1),i.push([t.i,"uni-page-body[data-v-55026cd8]{width:100%;height:100%;overflow:hidden}.big[data-v-55026cd8]{width:100%;height:95%;overflow-y:scroll}.list[data-v-55026cd8]{width:92%;height:%?288?%;margin:%?28?% auto}.top[data-v-55026cd8]{height:%?82?%;letter-spacing:%?3?%}.list_l[data-v-55026cd8]{width:100%;height:%?224?%;border-radius:%?20?%;border:1px solid #ffc086}.good_img[data-v-55026cd8]{width:%?166?%;height:%?176?%;margin-left:%?20?%}.right[data-v-55026cd8]{width:70%;height:80%}.name[data-v-55026cd8]{font-size:%?30?%;font-weight:%?600?%;margin-bottom:%?46?%}.status_img[data-v-55026cd8]{width:%?140?%;height:%?108?%;position:relative;top:%?-180?%;left:%?520?%}.box[data-v-55026cd8]{width:100%;height:50%;margin-top:%?180?%;color:#9a9a9a;letter-spacing:%?3?%;font-size:%?32?%}.box uni-image[data-v-55026cd8]{width:%?560?%;height:%?400?%;margin-bottom:%?110?%}",""]),t.exports=i},"2d24":function(t,i,a){t.exports=a.p+"static/img/img_ywc@2x.91b5d64e.png"},3892:function(t,i,a){"use strict";a.r(i);var s=a("cf96"),e=a("cfa8");for(var n in e)"default"!==n&&function(t){a.d(i,t,(function(){return e[t]}))}(n);a("9868");var o,r=a("f0c5"),u=Object(r["a"])(e["default"],s["b"],s["c"],!1,null,"55026cd8",null,!1,s["a"],o);i["default"]=u.exports},"3aa9":function(t,i,a){t.exports=a.p+"static/img/img_ysh@2x.ce0fe326.png"},"54a9":function(t,i,a){var s=a("2344");"string"===typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);var e=a("4f06").default;e("3cf99fd8",s,!0,{sourceMap:!1,shadowMode:!1})},"5b69":function(t,i,a){t.exports=a.p+"static/img/img_xx@2x.fab48bd2.png"},9868:function(t,i,a){"use strict";var s=a("54a9"),e=a.n(s);e.a},cf96:function(t,i,a){"use strict";var s,e=function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("v-uni-view",{staticClass:"content"},[s("v-uni-view",{staticClass:"big"},[t.list==[]?[s("v-uni-view",{staticClass:"box text-center"},[s("v-uni-image",{attrs:{src:a("5b69")}}),s("v-uni-view",[t._v("您还没有消息哦~")])],1)]:t._l(t.list,(function(i,e){return s("v-uni-view",{key:e,staticClass:"list"},[s("v-uni-view",{staticClass:"top flexs"},[t._v(t._s(i.updatetime))]),4==i.status?[s("v-uni-view",{staticClass:"list_l flexs2",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.goFahuo.apply(void 0,arguments)}}},[s("v-uni-image",{staticClass:"good_img",attrs:{src:t.urls+i.order_product[0].image}}),s("v-uni-view",{staticClass:"right"},[s("v-uni-view",{staticClass:"name"},[t._v(t._s(i.order_product[0].product_title))]),s("v-uni-view",[t._v("订单号："+t._s(i.order_num))])],1)],1)]:t._e(),5==i.status?[s("v-uni-view",{staticClass:"list_l flexs2",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.goShouhuo.apply(void 0,arguments)}}},[s("v-uni-image",{staticClass:"good_img",attrs:{src:t.urls+i.order_product[0].image}}),s("v-uni-view",{staticClass:"right"},[s("v-uni-view",{staticClass:"name"},[t._v(t._s(i.order_product[0].product_title))]),s("v-uni-view",[t._v("订单号："+t._s(i.order_num))])],1)],1)]:t._e(),6==i.status?[s("v-uni-view",{staticClass:"list_l flexs2"},[s("v-uni-image",{staticClass:"good_img",attrs:{src:t.urls+i.order_product[0].image}}),s("v-uni-view",{staticClass:"right"},[s("v-uni-view",{staticClass:"name"},[t._v(t._s(i.order_product[0].product_title))]),s("v-uni-view",[t._v("订单号："+t._s(i.order_num))])],1)],1)]:t._e(),4==i.status?[s("v-uni-image",{staticClass:"status_img",attrs:{src:a("f1d9")}})]:t._e(),5==i.status?[s("v-uni-image",{staticClass:"status_img",attrs:{src:a("3aa9")}})]:t._e(),6==i.status?[s("v-uni-image",{staticClass:"status_img",attrs:{src:a("2d24")}})]:t._e()],2)}))],2)],1)},n=[];a.d(i,"b",(function(){return e})),a.d(i,"c",(function(){return n})),a.d(i,"a",(function(){return s}))},cfa8:function(t,i,a){"use strict";a.r(i);var s=a("0caa"),e=a.n(s);for(var n in s)"default"!==n&&function(t){a.d(i,t,(function(){return s[t]}))}(n);i["default"]=e.a},f1d9:function(t,i,a){t.exports=a.p+"static/img/img_yifahuo@2x.871404ce.png"}}]);