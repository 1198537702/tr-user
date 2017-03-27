/**
 * Created by 黄炳乾 on 2017/2/27.
 */
require.config({
    baseUrl:'js',//基目录
    path:{
      "amap": "http://webapi.amap.com/maps?v=1.3&key=3b3a384deb8f95b088b24821fbff8604&callback=init",　　　　
      "mapsDriving" : 'https://webapi.amap.com/maps?v=1.3&key=3b3a384deb8f95b088b24821fbff8604&callback=init?plugin=AMap.Driving'
    },

    deps: [
    'bootstrap'//启动
    ]
});
