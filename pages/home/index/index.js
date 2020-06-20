
import store from '../../../utils/store';
import create from '../../../utils/lib/westore/create';
import regeneratorRuntime from '../../../utils/lib/runtime';


create(store, {
	data: {
		dividerStyle: 'color: #000000; border-color: #a0a0a0; font-size: 40rpx; letter-spacing: 4rpx;',
		rank: [],
		maxCount: 3,
		windowHeight: 0,
	},
	onLoad() {
		// 开发环境下开启debug模式
		wx.setEnableDebug({ enableDebug: this.store.data.isDebug });
		const windowHeight = wx.getSystemInfoSync().windowHeight;
		this.setData({ windowHeight });
		// 设置调用顺序
		this.store.data.movice = {
			hot: 'hotMovice',
			top: 'top250',
			comesoon: 'comeSoonMovice',
			weekly: 'weeklyMovice',
			new: 'newMovice',
			us: 'usMovice'
		}
		this.fetchInfo();
	},
	async fetchInfo() {
		const location = await this.fetchLocation();
		if (location) {
			const result = await this.store.api.address(location.latitude, location.location);
			this.store.data.cityName = result || '上海';
		}
		// 首页获取前三个
		const params = {
			count: this.data.maxCount,
			city: this.store.data.cityName
		}
		const config = this.store.data.movice;
		const keys = Object.keys(config);
		const reqArray = keys.map((item)=>{
			return this.store.api[config[item]](params);
		})
		const result = await Promise.all(reqArray);
		// 排行榜
		const rank = this.resetRankInfo(result);
		this.setData({ rank });
		this.selectComponent('#empty').hiddenEmpty();
	},
	resetRankInfo(params) {
		params.map((item) => {
			if (item.isSuccess && item.data) {
				item.top3 = item.subjects = item.data.subjects;
				item.title = item.data.title;
				item.count = item.subjects.length;
				delete item.data;
				delete item.code;
				delete item.isSuccess;
				delete item.message;
				if (item.top3.length > this.data.maxCount) {
					item.top3 = item.top3.splice(0, this.data.maxCount);
				}
				item.top3.map((sItem) => {
					if (sItem.subject) {
						Object.assign(sItem, sItem.subject);
						delete sItem.subject;
					}
				});
			}
		});
		return params;
	},
	rankTap(params) {
		try {
			const index = params.currentTarget.dataset.item;
			const keys = Object.keys(this.store.data.movice);
			const path = this.store.data.movice[keys[index]];
			wx.navigateTo({ url: `/pages/home/more/index?path=${path}` });	
		} catch (error) {
			console.error(' rank tap error ', error);
		}
	},
	fetchLocation() {
		return new Promise((resolve) => {
			wx.getLocation({
				type: 'wgs84',
				success: resolve,
				fail: resolve,
			});
		})
	}
});


