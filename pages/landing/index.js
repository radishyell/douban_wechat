//  小程序主入口 授权 中转页面

import store from '../../utils/store';
import create from '../../utils/lib/westore/create';
import regeneratorRuntime from '../../utils/lib/runtime';

create(store, {
	data: {
	},
	onLoad() {
		this.fetchUserInfo(2000);
	},
	fetchUserInfo(timeout = 0) {
		setTimeout(() => {
			this.selectComponent('#oauth').isHaveUserInfo((res)=>{
				console.log(res);
				wx.switchTab({
					url: '/pages/home/index/index'
				})
			})
		}, timeout);
	}
});


