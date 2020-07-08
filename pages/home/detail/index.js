//  小程序主入口 授权 中转页面

import store from '../../../utils/store';
import create from '../../../utils/lib/westore/create';
import regeneratorRuntime from '../../../utils/lib/runtime';

create(store, {
	data: {
		bgImage: null,
	},
	onLoad(options) {
		const windowHeight = wx.getSystemInfoSync().windowHeight;
		this.setData({ windowHeight });

		if (!options.id) {
			wx.navigateBack({ delta: 1 });
			return;
		}
		this.setData({ moviceId: options.id });
		this.fetchMoviceInfo();
	},

	async fetchMoviceInfo() {
		this.selectComponent('#empty').showLoading();
		const result = await this.store.api.detailMovice(this.data.moviceId);
		if (result.isSuccess) {
			this.resetPageInfo(result.data);
		}
		if (result.isSuccess && result.data) {
			this.selectComponent('#empty').hidde();
		} else {
			const config = {
				callBack: () => {
					this.fetchMoviceInfo();
				},
				btnText: '刷新一下'
			}
			this.selectComponent('#empty').showEmpty(config);
		}
	},
	resetPageInfo(params = null) {
		if (!params) return;

		const bgImage = params.images.large;




		this.setData({
			bgImage,
		})
	}
	
});


