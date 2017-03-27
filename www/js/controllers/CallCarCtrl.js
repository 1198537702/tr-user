/**
 * Created by 黄炳乾 on 2017/2/25.
 */
define(['app'], function (app) {
  'use strict';

  function ctrl($scope, $rootScope, $state, $ionicPopup) {
    var userStr = '';
    //{time: null, start:"北京", end:"杭州", carType:"金杯", ad:null, remark:"blue"}
    var newOrder;
    $scope.time = '';
    $scope.$on("$ionicView.beforeEnter", function () {
      userStr = localStorage.getItem('user');
      if ($rootScope.newOrder == null) {
        var start = {p: null, dp: null};
        var end = {p: null, dp: null};
        var ad = {banYun: null, anZhuan: null, huiDan: null, payment: null};
        newOrder = {time: null, start: start, end: end, carType: null, ad: ad, remark: null, pay: 0};
        $rootScope.newOrder = newOrder;
      }

    });
    $scope.sub = function () {

      if (userStr == null) {
          $ionicPopup.alert({
            title: '还没有登录哟'
          });
      } else {
        $rootScope.newOrder.time = $scope.time;
        var flage = true;
        for(var key in $rootScope.newOrder){
          if(newOrder[key] == null){
            if(key == 'ad'){
              continue;
            }
            flage = false;
            break;
          }
        }
        if(true){
          $state.go('tabs.orderConfirm');
        }else {
          $ionicPopup.alert({
            title: '还有未填写的表单信息'
          });
        }
      }

    }

  }

  ctrl.$inject = ['$scope', '$rootScope', '$state', '$ionicPopup'];
  app.registerController('CallCarCtrl', ctrl);
  // return ctrl;

});

