//  小程序主入口 授权 中转页面

import store from '../../../utils/store';
import create from '../../../utils/lib/westore/create';
import regeneratorRuntime from '../../../utils/lib/runtime';

create(store, {
	data: {
		searchList: [],
	},
	onLoad() {
		wx.setNavigationBarTitle({ title: '搜索' });

		this.resetList();
	},
	onChange(params) {
		const detail = params.detail;
		if (!detail) {
			this.resetList();
		} else {
			this.searchMovice(detail);
		}
	},
	async searchMovice(params) {
		if (!this.data.searchList.length) {
			this.selectComponent('#empty').showLoading();
		}
		const result = await this.store.api.searchMovice(params);
		if (result.isSuccess) {
			this.setData({ searchList: result.data });
		}
		if (this.data.searchList.length) {
			this.selectComponent('#empty').hidde();
		} else {
			this.selectComponent('#empty').showEmpty();
		}
	},
	singleTap(params) {
		const item = params.currentTarget.dataset.item;
		if (!item || !item.id) return;
		wx.navigateTo({ url: `/pages/home/detail/index?id=${item.id}` });
	},
	resetList() {
		this.setData({ searchList: [] });
		this.selectComponent('#empty').showEmpty();
	}
});


