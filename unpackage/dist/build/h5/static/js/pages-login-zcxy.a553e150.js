(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-login-zcxy"],{"0a8c":function(t,e,n){"use strict";var a,i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"zcxy_content "},[n("v-uni-view",{staticClass:"zcxy_box"},[n("v-uni-view",{staticClass:"zcxy_body "},[n("v-uni-rich-text",{attrs:{nodes:t.listData}})],1)],1)],1)},c=[];n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return c})),n.d(e,"a",(function(){return a}))},"49d2":function(t,e,n){"use strict";n.r(e);var a=n("e0f9"),i=n.n(a);for(var c in a)"default"!==c&&function(t){n.d(e,t,(function(){return a[t]}))}(c);e["default"]=i.a},"855a":function(t,e,n){var a=n("c436");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var i=n("4f06").default;i("3f585e1c",a,!0,{sourceMap:!1,shadowMode:!1})},b126:function(t,e,n){"use strict";n.r(e);var a=n("0a8c"),i=n("49d2");for(var c in i)"default"!==c&&function(t){n.d(e,t,(function(){return i[t]}))}(c);n("c8b4");var o,d=n("f0c5"),r=Object(d["a"])(i["default"],a["b"],a["c"],!1,null,"49b5c9d8",null,!1,a["a"],o);e["default"]=r.exports},c436:function(t,e,n){var a=n("24fb");e=a(!1),e.push([t.i,"uni-page-body[data-v-49b5c9d8]{width:100%;height:100%;overflow:hidden}.zcxy_content[data-v-49b5c9d8]{width:100vw;height:100vh;background-color:#fff;\n\t/* padding-top: 30rpx; */display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.zcxy_box[data-v-49b5c9d8]{width:%?690?%;height:%?1230?%;\n\t /* border:1px solid blue; */margin-top:%?40?%}.zcxy_header[data-v-49b5c9d8]{width:%?690?%;height:%?90?%;\n\t/* border:1px solid black; */font-size:%?36?%;color:#000}.zcxy_body[data-v-49b5c9d8]{width:%?690?%;height:%?1100?%;\n\t/* border:1px solid black; */font-size:%?28?%;color:#565656}",""]),t.exports=e},c8b4:function(t,e,n){"use strict";var a=n("855a"),i=n.n(a);i.a},e0f9:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{listData:[]}},onLoad:function(){this.getdata()},methods:{getdata:function(){var e=this,n={};t.log(n),this.$common.requests("/api/Sysinfo/registerAgree",n).then((function(t){1==t.data.code&&(e.listData=t.data.data)}))}}};e.default=n}).call(this,n("5a52")["default"])}}]);