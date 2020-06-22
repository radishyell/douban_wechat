//  小程序主入口 授权 中转页面

import store from '../../../utils/store';
import create from '../../../utils/lib/westore/create';
import regeneratorRuntime from '../../../utils/lib/runtime';


create(store, {
	data: {
		userInfo: null,
		pageList: [
			[
				{
				    'title': '个人信息',
				    'page': 'info',
				    'icon': '../../../image/me/account.png'
				}, 
				{
					'title': '联系我们',
					'page': 'contact',
					'icon': '../../../image/me/contact.png'
				},
			],
			[
				{
				    'title': '条款和细则',
				    'page': 'policy',
				    'icon': '../../../image/me/policy.png'
				}
			]
		]
	},
	onLoad() {
		wx.setNavigationBarTitle({ title: '我的' });
		console.log(this.store.data.userInfo);
		
	},
	showSingle(params) {
		// this.selectComponent('#oauth').isHaveUserInfo();
	},
});