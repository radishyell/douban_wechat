Component({
	data: {
		isShow: false, //是否显示加载
		isShowIcon: true, //是否显示加载的图标
		loadingText: '加载中...', //不同状态管理
		failText: '加载失败, 请点击重试!',
		finishText: '已经到底啦！',

		// 显示的文字
		text: '',
		nullText: '空空如也'
	},
	methods: {
		clickLoadMore() {
			this.triggerEvent('parentEvent');
		},
		// 结束loading 判断是否有更多，是否出错
		finishLoad(hasMore = true, isError = false) {
			if (isError) {
				// 请求出错
				this.setData({
					isShow: true,
					text: this.data.failText,
					isShowIcon: false
				});
			} else {
				if (!hasMore) {
					// 已经到了
					this.setData({
						isShow: true,
						text: this.data.finishText,
						isShowIcon: false
					});
				} else {
					// 还有更多数据可以下拉
					this.setData({
						isShow: false,
						isShowIcon: true
					});
				}
			}
		},
		// 什么数据都没有
		nullDataLoad(text) {
			this.setData({
				isShow: true,
				text: text ? text : this.data.nullText,
				isShowIcon: false
			});
		},
		// 开始加载
		begainLoad() {
			this.setData({
				isShow: true,
				text: this.data.loadingText
			});
		},
		isLoading() {
			// 如果显示菊花转圈，
			return this.data.isShow && this.data.text != this.data.failText;
		}
	}
})