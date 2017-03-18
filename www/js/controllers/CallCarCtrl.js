/**
 * Created by 黄炳乾 on 2017/2/25.
 */
define(['app'], function (app) {
  'use strict';

  function ctrl($scope, $rootScope) {
    //{time: null, start:"北京", end:"杭州", carType:"金杯", ad:null, remark:"blue"}
    if($rootScope.newOrder == null){
      var start = {p: null, dp: null};
      var end = {p: null, dp: null};
      var ad = {banYun: null, anZhuan: null, huiDan: null, payment: null};
      var newOrder = {time: null, start: start, end: end, carType: null, ad: ad, remark: null};
      $rootScope.newOrder = newOrder;
    }

  }

  ctrl.$inject = ['$scope','$rootScope'];
  app.registerController('PlaylistsCtrl', ctrl);
  // return ctrl;

});

