(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-personal-feedback"],{"167f":function(t,a,e){"use strict";var i=e("ef59"),n=e.n(i);n.a},"4b32":function(t,a,e){var i=e("24fb");a=i(!1),a.push([t.i,"uni-page-body[data-v-6496c9a7]{width:100%;height:100%;overflow:hidden;background-color:#f4f4f4}.box[data-v-6496c9a7]{width:100%;height:34%;background-color:#fff;padding-top:%?30?%}uni-textarea[data-v-6496c9a7]{width:94%;height:%?240?%;color:#333;margin:0 auto;letter-spacing:%?3?%}.box_b[data-v-6496c9a7]{width:94%;height:%?140?%;margin:0 auto}.box_b uni-image[data-v-6496c9a7]{width:%?90?%;height:%?90?%}.bottom[data-v-6496c9a7]{width:100%;height:%?80?%;background-color:#fff;margin-top:%?30?%;padding-left:%?20?%}.uni-input[data-v-6496c9a7]{width:%?520?%}.uni-input-placeholder[data-v-6496c9a7]{font-size:%?28?%}.btns[data-v-6496c9a7]{width:76%;height:%?100?%;line-height:%?100?%;color:#fff;background-color:#ff3237;position:fixed;bottom:%?32?%;left:13%;border-radius:%?20?%}.btns uni-image[data-v-6496c9a7]{width:94%;height:%?90?%;border-radius:%?50?%}body.?%PAGE?%[data-v-6496c9a7]{background-color:#f4f4f4}",""]),t.exports=a},5209:function(t,a,e){"use strict";e.r(a);var i=e("7361"),n=e("714e");for(var o in n)"default"!==o&&function(t){e.d(a,t,(function(){return n[t]}))}(o);e("167f");var c,d=e("f0c5"),u=Object(d["a"])(n["default"],i["b"],i["c"],!1,null,"6496c9a7",null,!1,i["a"],c);a["default"]=u.exports},"714e":function(t,a,e){"use strict";e.r(a);var i=e("a2ba"),n=e.n(i);for(var o in i)"default"!==o&&function(t){e.d(a,t,(function(){return i[t]}))}(o);a["default"]=n.a},7361:function(t,a,e){"use strict";var i,n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("v-uni-view",{staticClass:"content"},[e("v-uni-view",{staticClass:"box"},[e("v-uni-view",{staticClass:"list"},[e("v-uni-textarea",{attrs:{"placeholder-style":"font-size:28rpx",placeholder:"请留下您的宝贵意见或者建议,我们将努力改进"},model:{value:t.title,callback:function(a){t.title=a},expression:"title"}})],1)],1),e("v-uni-view",{staticClass:"bottom flexs1"},[e("v-uni-input",{staticClass:"uni-input",attrs:{type:"number",placeholder:"请留下您的手机号,以便我们回复您"},model:{value:t.mobile,callback:function(a){t.mobile=a},expression:"mobile"}})],1),e("v-uni-view",{staticClass:"btns flexs",on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.addFeedback.apply(void 0,arguments)}}},[t._v("提交")])],1)},o=[];e.d(a,"b",(function(){return n})),e.d(a,"c",(function(){return o})),e.d(a,"a",(function(){return i}))},a2ba:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var i={data:function(){return{title:"",mobile:""}},onLoad:function(){},methods:{addFeedback:function(){var t=this,a={title:this.title,mobile:this.mobile};this.$common.requests("/api/sysinfo/addFeedback",a).then((function(a){t.$api.msg(a.data.msg),1==a.data.code&&setTimeout((function(t){uni.navigateBack({delta:1})}),1e3)}))}}};a.default=i},ef59:function(t,a,e){var i=e("4b32");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var n=e("4f06").default;n("aca7cc24",i,!0,{sourceMap:!1,shadowMode:!1})}}]);