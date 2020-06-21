
import store from '../../../utils/store';
import create from '../../../utils/lib/westore/create';
import regeneratorRuntime from '../../../utils/lib/runtime';


create(store, {
	data: {
		offset: null,
		path: null,
		windowHeight: 0,
		moviceList: [],
	},
	onLoad(options) {
		const windowHeight = wx.getSystemInfoSync().windowHeight;
		this.setData({ windowHeight });
		if (!options.path) {
			wx.navigateBack({ delta: 1 });
			return;
		}
		const offset = { start: 0, count: 20 }

		if (options.path.indexOf('hot') > -1) {
			offset.city = this.store.data.cityName || null;
		}
		this.setData({ path: options.path, offset });
		this.fetchList();
	},
	async fetchList() {
		const params = this.data.offset;
		const moviceList = this.data.moviceList;
		if (moviceList.length) {
			params.start = moviceList[moviceList.length - 1].start;
		} else {
			this.selectComponent('#empty').showLoading();
		}
		const result = await this.store.api[this.data.path](params);
		if (result.isSuccess) {
			this.setData({ moviceList: result.data.subjects || [] });
			if (result.data.title) {
				wx.setNavigationBarTitle({ title: result.data.title })
			}
		}
		if (this.data.moviceList.length) {
			this.selectComponent('#empty').hidde();
		} else {
			this.selectComponent('#empty').showEmpty();
		}
	}
});


