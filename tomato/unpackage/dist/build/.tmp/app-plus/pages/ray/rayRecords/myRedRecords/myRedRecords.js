(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/ray/rayRecords/myRedRecords/myRedRecords"],{2215:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i,a=1,s=10,o={data:function(){return{totalcount:0,totalamount:0,list:[],gameInfo:null}},onReachBottom:function(){var t=this;null!=timer&&clearTimeout(timer),timer=setTimeout(function(){t.load(!0)},1e3)},onLoad:function(t){this.gameInfo=this.$store.getters.getGameInfoList[0],i=this.gameInfo.callindex;t.roomid;this.load(!1)},computed:{phoneByPass:function(){return this.$utils.defaultPlusXing(this.userInfo.username)},userInfo:function(){return this.$store.getters.getUserInfo},nickName:function(){return this.userInfo.nick_name.length>0?this.userInfo.nick_name:this.phoneByPass}},methods:{load:function(t){var e=this,n=this;t?a++:n.list=[];var o={page:a,pagesize:s};this.$utils.defalsePluginRequest("pl_hb_my_list",i,o,function(i){0==i.code&&(e.totalcount=i.data.totalcount,e.totalamount=i.data.totalamount,i.data.list.length>0?n.list=n.list.concat(i.data.list):t&&a--)},function(t){},function(t){})}}};e.default=o},"2d5f":function(t,e,n){"use strict";n.r(e);var i=n("2215"),a=n.n(i);for(var s in i)"default"!==s&&function(t){n.d(e,t,function(){return i[t]})}(s);e["default"]=a.a},"609a":function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("view",{staticClass:"t-common-font"},[n("view",{staticClass:"list-avator"},[n("image",{attrs:{src:"../../../../static/img/640-2.jpeg",mode:"aspectFill"}}),n("text",[t._v(t._s(t.nickName)+"一共获得了"+t._s(t.totalcount)+"个红包，共计"+t._s(t.totalamount)+"元")])]),n("view",{staticClass:"uni-list"},t._l(t.list,function(e,i){return n("view",{key:i,staticClass:"uni-list-cell"},[n("view",{staticClass:"uni-list-cell-navigate"},[n("view",{staticStyle:{color:"#555555",flex:"0.9"}},[t._v(t._s(e.add_time))]),1==e.isburying?n("view",{staticClass:"list-boom"},[n("image",{attrs:{src:"../../../../static/img/bomb_list_image.png",mode:"aspectFill"}})]):t._e(),n("view",{staticStyle:{color:"#D81E06","font-weight":"bold","font-size":"35rpx"}},[t._v(t._s(e.value))])])])}))])},a=[];n.d(e,"a",function(){return i}),n.d(e,"b",function(){return a})},d5d9:function(t,e,n){"use strict";var i=n("ebcb"),a=n.n(i);a.a},e4a0:function(t,e,n){"use strict";n("316d");var i=s(n("b0ce")),a=s(n("f06b"));function s(t){return t&&t.__esModule?t:{default:t}}Page((0,i.default)(a.default))},ebcb:function(t,e,n){},f06b:function(t,e,n){"use strict";n.r(e);var i=n("609a"),a=n("2d5f");for(var s in a)"default"!==s&&function(t){n.d(e,t,function(){return a[t]})}(s);n("d5d9");var o=n("2877"),u=Object(o["a"])(a["default"],i["a"],i["b"],!1,null,null,null);e["default"]=u.exports}},[["e4a0","common/runtime","common/vendor"]]]);