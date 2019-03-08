import Vue from 'vue'
import App from './App'
// var utils = require('./commen/util.js');
import utils from './commen/util.js'
Vue.config.productionTip = false

 var url = 'http://103.224.249.197:8012/'
// var url = 'http://tat.lpcbd.com/'
Vue.prototype.$baseUrl = url
Vue.prototype.$webUrl = url+'api/openapi.aspx?method=';
Vue.prototype.$imageUrl = url+'api/qrcode.ashx?action=';
Vue.prototype.$webSocketUrl = 'ws://103.224.249.197:65001/';

App.mpType = 'app'

import store from '@/store'
Vue.prototype.$utils = utils
Vue.prototype.$store = store
const app = new Vue({
	store,
    ...App
})
app.$mount()
