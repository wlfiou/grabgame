(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/my/my"],{"0164":function(t,e,i){},"1f6c":function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("view",{staticClass:"page t-common-font uni-page-body"},[i("uni-nav-bar",{staticClass:"navBox",attrs:{fixed:"true",backgroundColor:"#fc3a39",color:"#fff",title:"个人中心",shadow:"false",eventid:"7ee768cc-0",mpcomid:"7ee768cc-2"},on:{"click-left":t.messages,"click-right":t.settings}},[i("view",{staticStyle:{"margin-left":"6px","line-height":"44px"},slot:"left"},[i("uni-icon",{attrs:{type:"chatbubble",size:"28",mpcomid:"7ee768cc-0"}})],1),i("view",{staticStyle:{"line-height":"44px"},slot:"right"},[i("uni-icon",{attrs:{type:"gear-filled",size:"28",mpcomid:"7ee768cc-1"}})],1)]),i("view",{staticStyle:{height:"80px"}}),i("uni-popup",{attrs:{show:t.showPopupMiddle,type:t.popType,eventid:"7ee768cc-2",mpcomid:"7ee768cc-3"},on:{hidePopup:t.hidePopup}},[i("view",{staticClass:"uni-flex uni-row pop-user-info",staticStyle:{"justify-content":"space-between"}},[i("image",{staticClass:"pop-avator",attrs:{mode:"widthFix",src:t.avator}}),i("view",{staticClass:"account-msg"},[i("p",{staticStyle:{color:"#000","font-size":"14px"}},[t._v(t._s(t.nickName))]),i("p",[t._v("电话:"+t._s(t.user.mobile))]),i("p",[t._v("ID:"+t._s(t.user.user_id))])],1)]),i("view",{staticClass:"uni-center"},[i("image",{staticClass:"uni-common-mt pop-user-pic",attrs:{mode:"widthFix",src:t.qrcodeUrl}})]),i("view",{staticClass:"uni-flex uni-row uni-center pop-btn-box"},[i("view",{staticClass:"text",attrs:{eventid:"7ee768cc-1"},on:{tap:t.savePic}},[t._v("保存到手机")])])]),i("view",[i("view",{staticClass:"my-top"},[i("view",{staticClass:"my-info",attrs:{eventid:"7ee768cc-3"},on:{click:t.showMiddlePopup}},[i("view",{staticClass:"avator"},[i("image",{attrs:{mode:"aspectFill",src:t.avator}})]),i("view",{staticClass:"user-info"},[i("view",[t._v(t._s(t.nickName))]),i("view",[t._v("ID:"+t._s(t.user.user_id))])]),t._m(0)]),i("view",{staticClass:"person-info",attrs:{eventid:"7ee768cc-4"},on:{tap:t.personal}},[t._v("个人资料 >")])]),i("view",{staticClass:"func-detail"},[i("view",{staticClass:"earnings-info"},[i("view",{staticClass:"wallet"},[i("view",[t._v("我的钱包(元)")]),i("view",{staticClass:"wallet-content",attrs:{eventid:"7ee768cc-5"},on:{tap:t.capitalRecord}},[i("view",[t._v(t._s(t.user.amount))]),i("view",[t._v("资金记录 >")])])]),i("view",{staticClass:"wallet"},[i("view",[t._v("我的推荐收益(元)")]),i("view",{staticClass:"wallet-content",attrs:{eventid:"7ee768cc-6"},on:{tap:t.gainRecord}},[i("view",[t._v(t._s(t.user.referralamount))]),i("view",[t._v("推广收益记录 >")])])]),i("view",{staticClass:"func"},[i("view",{attrs:{eventid:"7ee768cc-7"},on:{tap:t.cash}},[t._v("提现")]),i("view",{attrs:{eventid:"7ee768cc-8"},on:{tap:t.recharge}},[t._v("充值")])])]),i("view",{staticClass:"my-function"},[i("view",[i("view",{staticClass:"uni-list",staticStyle:{"background-color":"#007AFF"}},t._l(t.list,function(e,a){return i("view",{key:a,staticClass:"uni-list-cell",staticStyle:{"background-color":"#fff"},attrs:{eventid:"7ee768cc-9-"+a},on:{click:function(e){t.navigate(a)}}},[i("view",{staticClass:"uni-list-cell-navigate uni-navigate-right t-list-cell",class:0==a?"first-active":""},[i("image",{staticClass:"left-image",attrs:{src:e.image,mode:"aspectFill"}}),i("text",{staticStyle:{"margin-left":"10rpx","font-weight":"bold"}},[t._v(t._s(e.title))])])])}))])])])])],1)},n=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("view",{staticClass:"qrcode"},[i("image",{attrs:{src:"../../static/img/erweima.png",mode:"aspectFill"}})])}];i.d(e,"a",function(){return a}),i.d(e,"b",function(){return n})},2213:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={props:{show:{type:Boolean,default:!1},type:{type:String,default:"middle"},msg:{type:String,default:""}},data:function(){var t=0;return{offsetTop:t}},methods:{hide:function(){this.$emit("hidePopup")}}};e.default=a},"2c01":function(t,e,i){},3492:function(t,e,i){"use strict";i.r(e);var a=i("1f6c"),n=i("6a9b");for(var s in n)"default"!==s&&function(t){i.d(e,t,function(){return n[t]})}(s);i("3e12"),i("db71");var o=i("2877"),c=Object(o["a"])(n["default"],a["a"],a["b"],!1,null,null,null);e["default"]=c.exports},"3e12":function(t,e,i){"use strict";var a=i("bc59"),n=i.n(a);n.a},"5db1":function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=o(i("be9e")),n=o(i("8574")),s=o(i("78ae"));function o(t){return t&&t.__esModule?t:{default:t}}var c={data:function(){return{isopenqrcode:!1,popType:"middle",showPopupMiddle:!1,list:[{image:"../../static/img/my_recommend.png",title:"我的推荐",navigateTo:"myRecommend"},{image:"../../static/img/my_yinhangqia.png",title:"我的银行卡",navigateTo:"myBankCard"},{image:"../../static/img/my_zhifubao.png",title:"我的支付宝",navigateTo:"myAlipay"},{image:"../../static/img/my_haibao.png",title:"推广海报",navigateTo:"promotionPoster"},{image:"../../static/img/my_kefuzhongxin.png",title:"客服中心",navigateTo:"serviceCenter"}]}},onLoad:function(){this.setCashInfo()},onShow:function(){this.setCashInfo(),this.$utils.refreshMyInfo(function(){})},computed:{avator:function(){return null!=this.user.avatar&&this.user.avatar.length>0?this.user.avatar:"http://103.224.249.197:8012/upload/avatar/000_avatar_big.jpg?user=00"},user:function(){return this.$store.getters.getUserInfo},passUserName:function(){return this.$utils.defaultPlusXing(this.user.user_name)},qrcodeUrl:function(){return this.$imageUrl+"tg&url="+this.user.invitekey},nickName:function(){return this.user.nick_name.length>0?this.user.nick_name:this.passUserName}},methods:{settings:function(){t.navigateTo({url:"./setting/setting",success:function(t){}})},messages:function(){t.navigateTo({url:"../ray/notify/notify",success:function(t){}})},hidePopup:function(){this.showPopupMiddle=!1},showMiddlePopup:function(){this.popType="middle",this.showPopupMiddle=!0},savePic:function(){t.showLoading({title:"loading....",mask:!1}),this.$utils.tRequest({url:this.$webUrl+"user_referrel_get",method:"GET",data:{},success:function(e){console.log(e),t.downloadFile({url:e.data,success:function(e){t.hideLoading(),200===e.statusCode&&t.saveImageToPhotosAlbum({filePath:e.tempFilePath,success:function(e){t.showToast({title:"保存成功",mask:!1,icon:"none",duration:1e3})}})}})},fail:function(){},complete:function(){}})},openCode:function(){this.isopenqrcode=!this.isopenqrcode},personal:function(){t.navigateTo({url:"./personal/personal",success:function(t){}})},capitalRecord:function(){t.navigateTo({url:"./capitalRecord/capitalRecord",success:function(t){}})},gainRecord:function(){t.navigateTo({url:"./gainRecord/gainRecord",success:function(t){}})},cash:function(){t.navigateTo({url:"./cash/cash",success:function(t){}})},recharge:function(){t.navigateTo({url:"./recharge/recharge",success:function(t){}})},goqq:function(t){var e=plus.android.runtimeMainActivity(),i=plus.android.importClass("android.net.Uri"),a=plus.android.importClass("android.content.Intent"),n=new a(a.ACTION_VIEW,i.parse(t));e.startActivity(n)},navigate:function(e){var i=this.list[e].navigateTo;switch(i){case"myRecommend":t.navigateTo({url:"./gainRecord/gainRecord",success:function(t){}});break;case"myBankCard":t.navigateTo({url:"./myBankCard/myBankCard",success:function(t){}});break;case"myAlipay":t.navigateTo({url:"./myAlipay/myAlipay",success:function(t){}});break;case"promotionPoster":t.navigateTo({url:"./promotionPoster/promotionPoster",success:function(t){}});break;case"serviceCenter":this.openQQ();break;default:break}},openQQ:function(){"Android"==plus.os.name&&this.goqq("mqqwpa://im/chat?chat_type=wpa&uin=545104918&version=1"),"iOS"==plus.os.name&&plus.runtime.launchApplication({action:"mqq://im/chat?chat_type=wpa&uin=545104918&version=1&src_type=web"},function(t){plus.nativeUI.confirm("检查到您未安装qq，请先到appstore搜索下载？",function(t){0==t.index&&iosAppstore("itunes.apple.com/cn/app/mqq/")})})},setCashInfo:function(){var t=this;this.$utils.tRequest({url:this.$webUrl+"user_bank_list",method:"GET",data:{page:1,pagesize:20,cardtypes:1},success:function(e){0===e.code&&t.$store.commit("setBankList",e.data.list)},fail:function(){},complete:function(){}}),this.$utils.tRequest({url:this.$webUrl+"user_bank_list",method:"GET",data:{page:1,pagesize:20,cardtypes:3},success:function(e){0===e.code&&t.$store.commit("setAliList",e.data.list)},fail:function(){},complete:function(){}})}},components:{uniNavBar:a.default,uniIcon:n.default,uniPopup:s.default}};e.default=c}).call(this,i("649d")["default"])},"6a9b":function(t,e,i){"use strict";i.r(e);var a=i("5db1"),n=i.n(a);for(var s in a)"default"!==s&&function(t){i.d(e,t,function(){return a[t]})}(s);e["default"]=n.a},"78ae":function(t,e,i){"use strict";i.r(e);var a=i("f096"),n=i("92a8");for(var s in n)"default"!==s&&function(t){i.d(e,t,function(){return n[t]})}(s);i("b7f8");var o=i("2877"),c=Object(o["a"])(n["default"],a["a"],a["b"],!1,null,null,null);e["default"]=c.exports},"92a8":function(t,e,i){"use strict";i.r(e);var a=i("2213"),n=i.n(a);for(var s in a)"default"!==s&&function(t){i.d(e,t,function(){return a[t]})}(s);e["default"]=n.a},b7f8:function(t,e,i){"use strict";var a=i("0164"),n=i.n(a);n.a},bc59:function(t,e,i){},be76:function(t,e,i){"use strict";i("316d");var a=s(i("b0ce")),n=s(i("3492"));function s(t){return t&&t.__esModule?t:{default:t}}Page((0,a.default)(n.default))},db71:function(t,e,i){"use strict";var a=i("2c01"),n=i.n(a);n.a},f096:function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("view",[i("view",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],staticClass:"uni-mask",style:{top:t.offsetTop+"px"},attrs:{eventid:"6a3d2440-0"},on:{click:t.hide}}),i("view",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],class:["uni-popup","uni-popup-"+t.type]},[t._v(t._s(t.msg)),t._t("default",null,{mpcomid:"6a3d2440-0"})],2)])},n=[];i.d(e,"a",function(){return a}),i.d(e,"b",function(){return n})}},[["be76","common/runtime","common/vendor"]]]);