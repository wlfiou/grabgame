(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/ray/notify/notify"],{"23f1":function(t,n,i){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={data:function(){return{list:[],notifList:[]}},onLoad:function(){var t=this;this.$utils.tRequest({url:this.$webUrl+"user_message_list",method:"GET",data:{},success:function(n){if(0==n.code){n=n.data.list;for(var i=0;i<n.length;i++)n[i].type="font",n[i].show=!1;t.notifList=n,console.log(t.notifList)}},fail:function(){},complete:function(){}})},methods:{trigerCollapse:function(t){for(var n=0,i=this.notifList.length;n<i;++n)this.notifList[n].show=t===n&&!this.notifList[n].show}}};n.default=e},"2f79":function(t,n,i){},8752:function(t,n,i){"use strict";i("316d");var e=o(i("b0ce")),s=o(i("f96e"));function o(t){return t&&t.__esModule?t:{default:t}}Page((0,e.default)(s.default))},"8cf2":function(t,n,i){"use strict";i.r(n);var e=i("23f1"),s=i.n(e);for(var o in e)"default"!==o&&function(t){i.d(n,t,function(){return e[t]})}(o);n["default"]=s.a},9498:function(t,n,i){"use strict";var e=i("2f79"),s=i.n(e);s.a},d9f5:function(t,n,i){"use strict";var e=function(){var t=this,n=t.$createElement,i=t._self._c||n;return i("view",{staticClass:"page t-common-font"},[i("view",{staticClass:"uni-card"},[i("view",{staticClass:"uni-list"},t._l(t.notifList,function(n,e){return i("block",{key:e},[i("view",{staticClass:"uni-list-cell uni-collapse"},[i("view",{staticClass:"uni-list-cell-navigate uni-navigate-bottom",class:n.show?"uni-active":"",attrs:{eventid:"44c4d9d5-0-"+e},on:{click:function(n){t.trigerCollapse(e)}}},[t._v(t._s(n.title))]),i("view",{staticClass:"uni-collapse-content",class:n.show?"uni-active":""},["font"===n.type?i("view",{staticClass:"page-pd"},[i("view",{staticClass:"uni-h4"},[t._v(t._s(n.content))])]):t._e()])])])}))])])},s=[];i.d(n,"a",function(){return e}),i.d(n,"b",function(){return s})},f96e:function(t,n,i){"use strict";i.r(n);var e=i("d9f5"),s=i("8cf2");for(var o in s)"default"!==o&&function(t){i.d(n,t,function(){return s[t]})}(o);i("9498");var a=i("2877"),u=Object(a["a"])(s["default"],e["a"],e["b"],!1,null,null,null);n["default"]=u.exports}},[["8752","common/runtime","common/vendor"]]]);