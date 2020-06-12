 /**
 * onShareAppMessage 需要返回的数据，可以传入数据进行合并
 * @param {object}   onShareAppMessage方法默认给的参数
 * @param {object}   该页面需要自定义的分享参数。
 * @return {object}  没有参数，返回默认配置。有参数，则会合并到默认配置里面。
 */

export default function (options, params = null) {
	if (options && options.from == 'button') {
		// 来自页面内的转发按钮
		// 页面内的触发分享需要在 wxml文件里面加入 <button open-type="share"></button>
	} else {
		// 点击微信右上角的分享按钮
	}

	const defaultConfig = {
		title: '这个是小程序的分享标题',  // 26字 后面变成省略号
		imageUrl: '',  // 分享封面。必须是URL地址。https://xxx/xx.jpg。URL地址记得是否添加了安全域名
		path: '/pages/landing/index',      // 分享的后，其他用户点击进来的路径
	}
	
	if (params) {
		Object.assign(defaultConfig, params);
	}
	return defaultConfig;
}