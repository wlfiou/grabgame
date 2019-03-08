import util_store from '../store'
var webPluginUrl = 'http://103.224.249.197:8012/'
var url = 'api/openapi.aspx?method=';
  function urlEncode(param, key, encode) {
  	if (param == null) return '';
  	var paramStr = '';
  	var t = typeof(param);
  	if (t == 'string' || t == 'number' || t == 'boolean') {
  		paramStr += '&' + key + '=' + ((encode == null || encode) ? encodeURIComponent(param) : param);
  	} else {
  		for (var i in param) {
  			var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i)
  			paramStr += urlEncode(param[i], k, encode)
  		}
  	}
  	return paramStr;

  }

  function getAppUrl(t_url, call_index) {
  	//http://103.224.249.197:8012/
	// var webPluginUrl = 'http://tat.lpcbd.com/plugins/'
  	var web = webPluginUrl + 'plugins/'
  	// var webPluginUrl = this.$baseUrl +'plugins/'
  	// var url = '/api/openapi.aspx?method=';
  	return web + call_index + '/'+url + t_url;
  }

  function pluginRequest(t_url, call_index, t_data, t_method, t_header, t_success, t_fail, t_complete) {
  	var url = t_url ? this.getAppUrl(t_url, call_index) : '';
  	this.tRequest({
  		url: url,
  		data: t_data,
  		method: t_method,
  		header: t_header,
  		success: t_success,
  		fail: t_fail,
  		complete: t_complete
  	})
  }

  function defalsePluginRequest(t_url, call_index, t_data, t_success, t_fail, t_complete) {
  	this.pluginRequest(t_url, call_index, t_data, null, null, t_success, t_fail, t_complete);
  }

  function tRequest(obj) {
  	obj = obj || {};
  	obj.url = obj.url || '';
  	obj.data = obj.data || {};
  	obj.method = obj.method || 'GET';
  	obj.header = obj.header || {
  		"Content-Type": "application/x-www-form-urlencoded"
  	};
  	obj.success = obj.success || function() {};
  	obj.fail = obj.fail() || function() {};
  	obj.complete = obj.complete() || function() {};
  	console.log("state = " + util_store.state.userInfo)
  	if (util_store.state.userInfo) {
  		obj.data.token = util_store.state.userInfo.token
  	}
  	uni.showLoading({
  		title: 'loading...',
  		mask: true
  	});
  	uni.request({
  		url: obj.url,
  		data: obj.data,
  		method: obj.method,
  		header: obj.header,
  		success: function(res) {
  			obj.success(res.data);
  			console.log(JSON.stringify(res.data));
  		},
  		fail: function(res) {
  			obj.fail(res);
  			console.log(JSON.stringify(res));
  		},
  		complete: function(res) {
  			uni.hideLoading();
  			console.log(obj.url + urlEncode(obj.data));
  			obj.complete(res);
  		}
  	})
  }
   function refreshMyInfo(func){
	   this.tRequest({
	   		url: webPluginUrl+url + 'user_info_get',
	   		method: 'GET',
	   		data: {},
	   		success: res => {
	   			util_store.commit("login",res.data);
				func();
	   		},
	   		fail: () => {},
	   		complete: () => {}
	   	})
   }
  function plusXing(str, frontLen, endLen, cha) {
	if(str==null || str==""){
		return "";
	}
  	var len = str.length - frontLen - endLen;
  	var xing = '';
  	for (var i = 0; i < len; i++) {
  		xing += cha;
  	}
  	return str.substring(0, frontLen) + xing + str.substring(str.length - endLen);
  }

  function defaultPlusXing(str) {
  	return this.plusXing(str, 4, 4, "*");
  }

  function checkMobile(str) {
  	var re = /^1\d{10}$/
  	if (re.test(str)) {
  		return true;
  	} else {
  		return false;
  	}
  }

  function checkPass(str) {
  	var pass = str || '';
  	if (pass.length < 6) {
  		return true;
  	} else {
  		uni.showToast({
  			title: '请输入6位以上密码',
  			mask: false,
  			duration: 1500,
			icon:'none'
  		});
  		return false;
  	}
  }
  
  function itemIndex(item, List) {
  	for (let i = 0; i < List.length; i++) {
  		if (item === List[i]) {
  			return i;
  		}
  	}
	return 0;
  }
  function safeStr(str){
	 return str == null?"":str
  }
  export default {
  	tRequest: tRequest,
  	defaultPlusXing: defaultPlusXing,
  	plusXing: plusXing,
  	checkMobile: checkMobile,
  	checkPass: checkPass,
  	pluginRequest: pluginRequest,
  	getAppUrl: getAppUrl,
  	defalsePluginRequest: defalsePluginRequest,
	itemIndex:itemIndex,
	safeStr:safeStr,
	refreshMyInfo:refreshMyInfo
  }
