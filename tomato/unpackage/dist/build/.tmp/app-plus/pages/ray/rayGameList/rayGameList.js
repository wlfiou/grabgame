(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/ray/rayGameList/rayGameList"],{"122b":function(t,e,o){"use strict";o.r(e);var s=o("56b7"),n=o.n(s);for(var i in s)"default"!==i&&function(t){o.d(e,t,function(){return s[t]})}(i);e["default"]=n.a},"305c":function(t,e,o){},"56b7":function(t,e,o){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var s,n=i(o("eeb5"));function i(t){return t&&t.__esModule?t:{default:t}}var a={data:function(){return{showRoomPass:!1,gameInfo:null,pass:"",list:[],websocketIsOpen:!1,defaultImg:"../../../static/img/group_select.png"}},computed:{},onLoad:function(e){var o=this;this.gameInfo=this.$store.getters.getGameInfoList[e.gameIndex],this.loadGameList(this.gameInfo.callindex),t.connectSocket({url:this.$webSocketUrl+"plhb_chat"}),t.onSocketOpen(function(){console.log("WebSocket连接已打开！"),o.websocketIsOpen=!0}),t.onSocketError(function(e){console.log("WebSocket连接打开失败，正在进行重连！"),o.$utils.pluginRequest("sys_start_process","plhb",null,"GET",null,function(e){0==e.code?setTimeout(function(){t.connectSocket({url:o.$webSocketUrl+"plhb_chat"}),t.onSocketOpen(function(){console.log("WebSocket连接已打开！"),o.websocketIsOpen=!0})},2e3):console.log(e.msg)},function(t){},function(t){})})},onUnload:function(){t.closeSocket({url:this.$webSocketUrl+"plhb_chat"})},onBackPress:function(e){t.closeSocket({url:this.$webSocketUrl+"plhb_chat"}),this.$store.dispatch("setCurrentRoomInfo",null)},methods:{loadGameList:function(t){var e=this,o={page:1,pagesize:50};this.$utils.pluginRequest("pl_room_list","plhb",o,"GET",null,function(t){0==t.code&&(e.list=t.data.list,console.log(JSON.stringify(e.list)))},function(t){},function(t){})},closeModal:function(){this.showRoomPass=!this.showRoomPass},checkPass:function(){var e=this,o={roomid:s.roomid,password:this.pass};this.$utils.defalsePluginRequest("pl_room_check",this.gameInfo.callindex,o,function(o){if(0==o.code){var n=s.roomid.toString();t.setStorageSync(n,!0),e.jionRoom(s)}else t.showToast({title:o.msg,icon:"none",mask:!1,duration:2e3})},function(t){},function(t){})},jionRoom:function(e){console.log("item="+e);var o=e.roomid,s=e.title;e.ispwd;this.$store.dispatch("setCurrentRoomInfo",e),t.navigateTo({url:"../../ray/rayGame/rayGame?roomid="+o+"&callindex="+this.gameInfo.callindex+"&title="+s+"&websocketIsOpen="+this.websocketIsOpen})},toplayGame:function(e){var o=e.currentTarget.dataset.index;if(s=this.list[o],0==s.ispwd)this.jionRoom(s);else{var n=t.getStorageSync(s.roomid.toString());n?this.jionRoom(s):this.showRoomPass=!this.showRoomPass}}},components:{neilModal:n.default}};e.default=a}).call(this,o("649d")["default"])},"5e02":function(t,e,o){"use strict";var s=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("view",[o("view",{staticClass:"uni-list"},t._l(t.list,function(e,s){return o("view",{key:s,staticClass:"uni-list-cell",attrs:{"hover-class":"uni-list-cell-hover"}},[o("view",{staticClass:"uni-media-list",attrs:{"data-index":s,"data-ispwd":e.ispwd,eventid:"7cd5b22a-0-"+s},on:{tap:t.toplayGame}},[o("view",{staticClass:"uni-media-list-logo"},[o("image",{staticClass:"tleftimage",attrs:{src:""==e.imgurl?t.defaultImg:e.imgurl}})]),o("view",{staticClass:"uni-media-list-body"},[o("text",[t._v(t._s(e.title))])])])])})),o("neil-modal",{attrs:{show:t.showRoomPass,title:"请输入用户名密码",eventid:"7cd5b22a-2",mpcomid:"7cd5b22a-0"},on:{close:t.closeModal,confirm:t.checkPass}},[o("view",{staticClass:"input-view"},[o("view",{staticClass:"input-name"},[o("input",{directives:[{name:"model",rawName:"v-model",value:t.pass,expression:"pass"}],attrs:{type:"text",placeholder:"请输入房间密码",eventid:"7cd5b22a-1"},domProps:{value:t.pass},on:{input:function(e){e.target.composing||(t.pass=e.target.value)}}})])])])],1)},n=[];o.d(e,"a",function(){return s}),o.d(e,"b",function(){return n})},d2f6:function(t,e,o){"use strict";o.r(e);var s=o("5e02"),n=o("122b");for(var i in n)"default"!==i&&function(t){o.d(e,t,function(){return n[t]})}(i);o("e5c1");var a=o("2877"),l=Object(a["a"])(n["default"],s["a"],s["b"],!1,null,null,null);e["default"]=l.exports},e5c1:function(t,e,o){"use strict";var s=o("305c"),n=o.n(s);n.a},ee99:function(t,e,o){"use strict";o("316d");var s=i(o("b0ce")),n=i(o("d2f6"));function i(t){return t&&t.__esModule?t:{default:t}}Page((0,s.default)(n.default))}},[["ee99","common/runtime","common/vendor"]]]);