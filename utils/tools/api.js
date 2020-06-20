/**
 * 豆瓣电影API接口请求
 * */ 


const fetch = require('./api/fetch');
const BaiDu = require('./api/baidu');

// 豆瓣配置
const DouBanUrl = 'https://api.douban.com/v2/movie';
const DouBanAppKey = '0df993c66c0c636e29ecbb5344252a4a';



 /**
 * 百度转换接口，根据经纬度，转为省市区的名字
 * @param  {Number} latitude   纬度
 * @param  {Number} longitude  经度
 */
function address(latitude, longitude) {
  const config = BaiDu(latitude, longitude);
  return fetch(config.url, config.params).then(res => res.data.result.addressComponent.city);
}


 /**
 * 某个城市的正在热映电影
 * @param  {object}  传参参照 defaultParams
 */
function hotMovice(params = {}) {
  Object.assign(params, { city: '上海' });
  return resetParams('/in_theaters', params);
}


 /**
 * 排行前250的电影
 * @param  {object}  传参参照 defaultParams
 */
function top250(params = null) {
  return resetParams('/top250', params);
}


 /**
 *  即将上映的电影
 * @param  {object}  传参参照 defaultParams
 */
function comeSoonMovice(params = null) {
  return resetParams('/coming_soon', params);
}


 /**
 *  本周口碑电影
 * @param  {object}  传参参照 defaultParams
 */
function weeklyMovice(params = null) {
  return resetParams('/weekly', params);
}


 /**
 *  最新电影
 * @param  {object}  传参参照 defaultParams
 */
function newMovice(params = null) {
  return resetParams('/new_movies', params);
}


 /**
 *  北美票房榜
 * @param  {object}  传参参照 defaultParams
 */
function usMovice(params = null) {
  return resetParams('/us_box', params);
}


 /**
 *  电影详情
 * @param  {string}  传入电影的id
 */
function detailMovice(params = null) {
  if (!params) return;
  const url = DouBanUrl + '/subject/' + params;
  return fetch(url, { apikey: DouBanAppKey });
}


function searchMovice(params = null) {
  if (!params) return;
  // const url = `https://movie.douban.com/j/subject_suggest?q=${params}`;

  const url = `https://movie.douban.com/j/subject_suggest`;
  return fetch(url, {
    q: params
  });
}



function resetParams(url ,params) {
  const defaultParams = {
    start: 0,
    count: 20,
    apikey: DouBanAppKey
  }
  if (params) {
    Object.assign(defaultParams, params);
  }
  return fetch(DouBanUrl + url, defaultParams);
}

export default {
  address,
  hotMovice,
  top250,
  comeSoonMovice,
  weeklyMovice,
  newMovice,
  usMovice,
  detailMovice,
  searchMovice
}


