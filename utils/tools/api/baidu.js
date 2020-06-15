

 /**
 * 百度转换接口，根据经纬度，转为省市区的名字
 * ak申请地址 : http://lbsyun.baidu.com/apiconsole/key/update?app-id=20403736
 * 百度接口文档： http://lbsyun.baidu.com/index.php?title=webapi/guide/webservice-geocoding
 * @param  {Number} latitude   纬度
 * @param  {Number} longitude  经度
 */


module.exports = (latitude, longitude) => {
  const url = 'https://api.map.baidu.com/geocoder/v2/';
  const ak = 'B61195334f65b9e4d02ae75d24fa2c53';
  return {
    url,
    params: {
      location: `${latitude},${longitude}`, 
      output: 'json', 
      ak
    }
  }
}
