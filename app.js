// 阿拉丁统计
const aldstat = require('./utils/lib/ald/ald-stat.js');

App({
  aldstat,
  onLaunch() {
    // 初始化项目
    require('./utils/init')();
  },
})