(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{"0147":function(t,e,n){"use strict";var a=n("5bd8"),i=n.n(a);i.a},"1ab4":function(t,e,n){"use strict";n("316d");var a=o(n("b0ce")),i=o(n("d6fb"));function o(t){return t&&t.__esModule?t:{default:t}}Page((0,a.default)(i.default))},"40b0":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("view",[n("view",{staticClass:"content uni-page-body"},[n("view",{staticClass:"uni-swiper-msg"},[t._m(0),n("swiper",{attrs:{vertical:"true",autoplay:"true",circular:"true",interval:"5000"}},t._l(t.notice,function(e,a){return n("swiper-item",{key:a,attrs:{mpcomid:"2f174fc0-0-"+a}},[n("navigator",{attrs:{url:"../ray/notify/notify"}},[t._v(t._s(e.title))])],1)}))],1),n("swiper",{staticClass:"top_swiper",attrs:{autoplay:"false","indicator-dots":"true","indicator-active-color":"#d81e06","indicator-color":"#ffffff",interval:"2000",circular:"true"}},t._l(t.banners,function(e,a){return n("swiper-item",{key:a,staticClass:"scale_swiperitem",attrs:{eventid:"2f174fc0-0-"+a,mpcomid:"2f174fc0-1-"+a},on:{tap:t.click}},[n("image",{attrs:{src:e.imgurl,mode:"scaleToFill"}})])}))],1),n("view",{staticClass:"list"},t._l(t.applist,function(e,a){return n("block",{key:a},[n("view",{staticClass:"list-item",style:{backgroundImage:"url("+e.imgurl+")"},attrs:{"data-callindex":e.callindex,eventid:"2f174fc0-3-"+a},on:{tap:t.nodata}},[""!=e.callindex?n("view",[t._v(t._s(e.title))]):t._e(),""!=e.callindex?n("view",{attrs:{"data-index":a,eventid:"2f174fc0-1-"+a},on:{tap:t.gameinfo}},[t._v("查看游戏规则>>")]):t._e(),""!=e.callindex?n("view",{attrs:{"data-index":a,eventid:"2f174fc0-2-"+a},on:{tap:t.toplay}},[t._v("开始游戏")]):t._e()])])}))])},i=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("view",{staticClass:"uni-swiper-msg-icon"},[n("image",{attrs:{src:"../../static/img/tongzhi.png",mode:"widthFix"}})])}];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return i})},"5bd8":function(t,e,n){},"60b1":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{title:"Hello",notice:[],banners:[]}},computed:{applist:function(){return this.$store.getters.getGameInfoList}},onLoad:function(){var e=this;this.$utils.tRequest({url:this.$webUrl+"home_all",method:"GET",data:{pagesize:10,page:1},success:function(n){0==n.code?(e.$store.dispatch("setGameInfoList",n.data.applist),e.banners=n.data.banner,e.notice=n.data.notice):t.showToast({title:n.msg,mask:!1,duration:1500,icon:"none"})},fail:function(){},complete:function(){}})},onNavigationBarButtonTap:function(e){t.navigateTo({url:"../ray/notify/notify",success:function(t){},fail:function(){},complete:function(){}})},methods:{nodata:function(e){var n=e.currentTarget.dataset.callindex;console.log(n),""==n&&t.showModal({title:"提示",content:"开发中。。敬请期待",showCancel:!1,cancelText:"",confirmText:"知道了",success:function(t){},fail:function(){},complete:function(){}})},toplay:function(e){var n=e.currentTarget.dataset.index;t.navigateTo({url:"../ray/rayGameList/rayGameList?gameIndex="+n,success:function(t){},fail:function(){},complete:function(){}})},gameinfo:function(e){var n=e.currentTarget.dataset.index;console.log("index = "+n),t.navigateTo({url:"../ray/gameInfo/gameInfo?gameIndex="+n,success:function(t){},fail:function(){},complete:function(){}})},click:function(){}}};e.default=n}).call(this,n("649d")["default"])},"914a":function(t,e,n){"use strict";n.r(e);var a=n("60b1"),i=n.n(a);for(var o in a)"default"!==o&&function(t){n.d(e,t,function(){return a[t]})}(o);e["default"]=i.a},d6fb:function(t,e,n){"use strict";n.r(e);var a=n("40b0"),i=n("914a");for(var o in i)"default"!==o&&function(t){n.d(e,t,function(){return i[t]})}(o);n("0147");var c=n("2877"),r=Object(c["a"])(i["default"],a["a"],a["b"],!1,null,null,null);e["default"]=r.exports}},[["1ab4","common/runtime","common/vendor"]]]);