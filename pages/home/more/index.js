
import store from '../../../utils/store';
import create from '../../../utils/lib/westore/create';
import regeneratorRuntime from '../../../utils/lib/runtime';


create(store, {
	data: {
		offset: {
			start: 0,
			count: 20,
		},
		path: null,
		windowHeight: 0,
	},
	onLoad(options) {
		const windowHeight = wx.getSystemInfoSync().windowHeight;
		this.setData({ windowHeight });

		if (!options.path) {
			wx.navigateBack({ delta: 1 });
			return;
		}
		this.setData({ path: options.path });
		this.fetchList();
	},
	async fetchList() {
		
	}
});


