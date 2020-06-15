
import store from '../../../utils/store';
import create from '../../../utils/lib/westore/create';
import regeneratorRuntime from '../../../utils/lib/runtime';

create(store, {
	data: {
	},
	onLoad() {
		this.fetchInfo();
	},
	async fetchInfo() {
		// 经度:118.589424 纬度:24.908854
		let cityName = null;
		const location = await this.fetchLocation();
		if (location) {
			const result = await this.store.api.address(location.latitude, location.location);
			cityName = result || null;
		}

		// 首页获取前三个
		const params = {
			count: 3,
			city: cityName || null
		}
		const hotMovice = this.store.api.hotMovice(params);
		const top250 = this.store.api.top250(params);
		const comeSoonMovice = this.store.api.comeSoonMovice(params);
		const weeklyMovice = this.store.api.weeklyMovice(params);
		const newMovice = this.store.api.newMovice(params);
		const usMovice = this.store.api.usMovice(params);
		Promise.all([hotMovice, top250, comeSoonMovice, weeklyMovice, newMovice, usMovice]).then((res)=>{
			console.log(res);
			
		})
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


