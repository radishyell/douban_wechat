
import regeneratorRuntime from '../../utils/lib/runtime.js';
import create from '../../utils/lib/westore/create';

create({
	data: {
		isShow: false,
		callBack: null,
	},
	methods: {
		cancel() {
			if (this.data.callBack) { 
				this.data.callBack(this.store.data.userInfo); 
			}
			this.setData({ isShow: false, callBack: null });
		},
		isHaveUserInfo(callBack) {
			this.setData({ callBack });
			const userInfo = this.store.data.userInfo;
			if (!userInfo) {
				// 开始进入授权判断
				this.begainOauth();
			} else {
				this.cancel();
			}
		},
		async begainOauth() {
			const result = await this.getInfo();
			if (!result) {
				// 显示授权页面
				this.setData({ isShow: true });
				console.log('需要用户触发按钮授权');
			} else {
				console.log('用户已经授权点击过，直接拿用户信息');
				// 请求接口
				this.fetchUserInfo(result);
			}
		},
		// 用户点击授权
		async onGetUserInfo(params) {
			if (params && params.detail && params.detail.userInfo) {
				this.fetchUserInfo(params.detail);
			} else {
				// 用户拒绝授权
				console.log('用户拒绝授权');
				this.cancel();
			}
		},
		async fetchUserInfo(params = null) {
			const code = await this.login();
			if (code && params) {
				console.log('发起请求，把用户数据存数据库');
				
				this.store.data.userInfo = params.userInfo;
				
				this.cancel();
			} else {
				console.log('code和用户信息未获取到');
				this.cancel();
			}
		},
		handleUserInfo(params) {
			this.store.data.userInfo = params;
			wx.setStorageSync(this.store.data.oauthKey, `Bearer ${params.token}`);
			this.store.update();
			if (this.data.callBack) {
				this.data.callBack(params);
			}
			this.cancel();
		},



		// 微信方法  登录拿code  和 拿用户信息
		login() {
			return new Promise((resolve) => {
				wx.login({
					success: (res) => { resolve(res.code); },
					fail: () => { resolve(); }
				})
			})
		},
		getInfo() {
			return new Promise((resolve) => {
				wx.getUserInfo({
					success: (res) => { resolve(res); },
					fail: () => { resolve(); }
				})
			})
		},

	}
})