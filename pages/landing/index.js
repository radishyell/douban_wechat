
import store from '../../utils/store';
import create from '../../utils/lib/westore/create';
import regeneratorRuntime from '../../utils/lib/runtime';

create(store, {
	data: {},
	fetchUserInfo() {
		this.selectComponent('#oauth').isHaveUserInfo(()=>{
			wx.switchTab({ url: '/pages/home/index/index' });
		})
	}
});


