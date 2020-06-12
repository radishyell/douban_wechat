/**
 * 往第三方后台发送点击事件
 * @param {string} 事件名称
 */
export default function(event_name = null){
  if (!event_name) return;
  getApp().aldstat.sendEvent(event_name);
}