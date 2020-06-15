// 默认的配置
module.exports = {
  // 网络请求的域名地址
  eventUrl: 'https://product.com',

  // 是否是在开发环境下
  isDebug: false,

  // 动态加载工具方法。名字和tools下的文件命名一致
  methods: [ 
    'god', 'request', 'share', 'toast', 'aldstat', 'api'
  ]
}