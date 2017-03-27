/**
 * Created by 黄炳乾 on 2017/2/25.
 */
define(['app'], function (app) {
  'use strict';

  function ctrl($scope, $rootScope, $state, maps) {


    var map = new AMap.Map('container', {
      resizeEnable: true,
      dragEnable: false,
      zoomEnable: false

    });
    var driving = new AMap.Driving({
        map: map
    });
    driving.search([
        {keyword: '北京市地震局(公交站)',city:'北京'},
        {keyword: '亦庄文化园(地铁站)',city:'北京'}
    ]);


  }

  ctrl.$inject = ['$scope', '$rootScope', '$state', '$stateParams'];
  app.registerController('OrderSendingCtrl', ctrl);
  // return ctrl;

});
