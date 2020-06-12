
 /**
 * 接口请求
 * @param {string} 	 弹窗的文字内容
 * @param {boolean}  成功或者失败弹窗
 */

export default function (message = null, isSuccess = true) {
	if (!message) {
		message = isSuccess ? 'success' : 'fail';
	}
	const iconPath = isSuccess ? '/assets/toast/success.png' : '/assets/toast/fail.png';
	wx.showToast({ title: message, image: iconPath, duration: 1500 });
}