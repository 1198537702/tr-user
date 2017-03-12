/**
 * Created by 黄炳乾 on 2017/2/25.
 */
define(['app', 'maps'], function (app, maps) {
  'use strict';

  function ctrl($scope, maps) {
    var map = new AMap.Map('container', {
      resizeEnable: true,
      zoom: 13//地图显示的缩放级别

    });
    map.setCity('杭州市');
    AMap.plugin(['AMap.Autocomplete', 'AMap.PlaceSearch'], function () {
      var autoOptions = {
        city: "杭州", //城市，默认全国
        input: "keyword"//使用联想输入的input的id
      };
      var autocomplete = new AMap.Autocomplete(autoOptions);
      var placeSearch = new AMap.PlaceSearch({
        city: '北京',
        map: map
      });
      AMap.event.addListener(autocomplete, "select", function (e) {
        //TODO 针对选中的poi实现自己的功能
        placeSearch.search(e.poi.name)
      });
    });

  }

  ctrl.$inject = ['$scope'];
  app.registerController('MapCtrl', ctrl);
  // return ctrl;

});
