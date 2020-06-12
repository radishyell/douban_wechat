

module.exports = () => {
  const store = require('./store').default;

  const defaultConfig = require('./config/default');

  // 加载配置
  const config = fetchConfig();
  if (config) {
    Object.assign(defaultConfig, config);
  }

  // 挂载初始化的data属性到store底下
  Object.assign(store.data, defaultConfig);
  if (store.data.methods) {
    delete store.data.methods;
  }

  // 挂载方法到store底下
  const methods = defaultConfig.methods;
  if (methods && methods.length) {
    methods.forEach(item => {
      const tempFun = require(`./tools/${item}.js`).default;
      if (tempFun){
        store[item] = tempFun;
      }
    });
  }

  godInfo(store);
}



// 根据当前小程序环境获取不同配置
function fetchConfig () {
  let versionConfig = null;
  try {
    if (!__wxConfig || !__wxConfig.envVersion) {
      throw new Error('__wxConfig undefinde');
    }
    const envVersion = __wxConfig.envVersion;
    switch (envVersion) {
      case 'develop':
        versionConfig = require('./config/develop');
        break;
      case 'trial':
        versionConfig = require('./config/trial');
        break;
      case 'release':
        versionConfig = require('./config/prod');
        break;
      default:
        break;
    }
  } catch (error) {
    console.error('=== config error ===', error);
  }
  return versionConfig;
}



function godInfo(store) {
  try {
    if (store.god) {
      store.god();
    } else {
      throw new Error('没有佛主保佑的代码是不安全的');
    }
  } catch (error) {
    console.error(error.message);
  }
}