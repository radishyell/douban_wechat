

module.exports = (url, data = {}) => {
	return new Promise((resolve) => {
		wx.request({
			url,
			header: {
				'content-type': 'json', // 默认header头
			},
			data, //请求参数
      success: (res) => { //成功回调
				resolve({
					data: res.data || null,
					isSuccess: res.statusCode === 200,
					message: res.errMsg || '',
					code: res.statusCode
				});
			},
      fail: (res) => { //失败回调
				resolve({ data: null, message: `网络开小差`, isSuccess: false });
			},
		});
	})
}
