(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/my/setting/security/payPwd"],{"52fa":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{showPassword:!0,vertyText:"获取验证码",currentTime:60,disabled:!1,vertrycode:"",pass:""}},methods:{getCode:function(){var t=this;this.$utils.tRequest({url:this.$webUrl+"user_verify_smscode",data:{mobile:this.phone},success:function(e){t.AppSendVerifyCode(e)},fail:function(){},complete:function(){}})},AppSendVerifyCode:function(e){var n=this;if(0==e.code){var s=n.currentTime;this.interval=setInterval(function(){n.disabled=!0,s--,n.vertyText=s+"秒",s<=0&&(clearInterval(n.interval),n.vertyText="重新发送",n.currentTime=60,n.disabled=!1)},1e3)}else t.showModal({title:"提示",content:e.msg,showCancel:!1,cancelText:"",confirmText:"知道了",success:function(t){},fail:function(){},complete:function(){}})},changePassword:function(){this.showPassword=!this.showPassword},update:function(){var e=this;this.$utils.tRequest({url:this.$webUrl+"user_paypassword_edit",method:"POST",data:{code:this.vertrycode,password:this.pass},success:function(n){0==n.code&&e.$store.dispatch("setPayPass",e.pass),t.showToast({title:n.msg,mask:!1,duration:1500,icon:"none"})},fail:function(){},complete:function(){}})}},computed:{phone:function(){return this.$store.getters.getUserInfo.mobile}}};e.default=n}).call(this,n("649d")["default"])},8322:function(t,e,n){"use strict";n.r(e);var s=n("ee30"),i=n("f84b");for(var o in i)"default"!==o&&function(t){n.d(e,t,function(){return i[t]})}(o);n("9e35");var a=n("2877"),r=Object(a["a"])(i["default"],s["a"],s["b"],!1,null,null,null);e["default"]=r.exports},"9e35":function(t,e,n){"use strict";var s=n("9f3f"),i=n.n(s);i.a},"9f3f":function(t,e,n){},da95:function(t,e,n){"use strict";n("316d");var s=o(n("b0ce")),i=o(n("8322"));function o(t){return t&&t.__esModule?t:{default:t}}Page((0,s.default)(i.default))},ee30:function(t,e,n){"use strict";var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("view",{staticClass:"page"},[n("view",{staticClass:"uni-form-item uni-column uni-common-mt borderRadi"},[n("input",{staticClass:"uni-input",attrs:{type:"number",placeholder:"原手机号码",value:t.phone}})]),n("view",{staticClass:"uni-form-item uni-column uni-common-mt code borderRadi"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.vertrycode,expression:"vertrycode"}],staticClass:"uni-input",attrs:{type:"number",placeholder:"验证码",eventid:"7c673837-0"},domProps:{value:t.vertrycode},on:{input:function(e){e.target.composing||(t.vertrycode=e.target.value)}}}),n("span",{attrs:{eventid:"7c673837-1"},on:{click:t.getCode}},[t._v(t._s(t.vertyText))])]),n("view",{staticClass:"uni-form-item uni-column uni-common-mt borderRadi"},[n("view",{staticClass:"with-fun"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.pass,expression:"pass"}],staticClass:"uni-input",attrs:{placeholder:"新支付密码",password:t.showPassword,eventid:"7c673837-2"},domProps:{value:t.pass},on:{input:function(e){e.target.composing||(t.pass=e.target.value)}}}),n("view",{staticClass:"uni-icon uni-icon-eye",class:[t.showPassword?"":"uni-active"],attrs:{eventid:"7c673837-3"},on:{click:t.changePassword}})])]),n("button",{staticClass:"commitBtn uni-common-mt",attrs:{eventid:"7c673837-4"},on:{tap:t.update}},[t._v("修改")])],1)},i=[];n.d(e,"a",function(){return s}),n.d(e,"b",function(){return i})},f84b:function(t,e,n){"use strict";n.r(e);var s=n("52fa"),i=n.n(s);for(var o in s)"default"!==o&&function(t){n.d(e,t,function(){return s[t]})}(o);e["default"]=i.a}},[["da95","common/runtime","common/vendor"]]]);