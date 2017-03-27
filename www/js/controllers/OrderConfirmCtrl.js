/**
 * Created by 黄炳乾 on 2017/2/25.
 */
define(['app'], function (app) {
  'use strict';

  function ctrl($scope, $rootScope, $state, $http, Tool, $ionicPopup) {
    //{time: null, start:"北京", end:"杭州", carType:"金杯", ad:null, remark:"blue"}
    var ad;
    $scope.contacts = {}
    $scope.$on("$ionicView.beforeEnter", function () {
      $scope.ad = '';

      ad = $rootScope.newOrder.ad;
      if (ad.anZhuan != null) {
        $scope.ad += '  安装 '
      }
      if (ad.banYun != null) {
        $scope.ad += '  搬运 '
      }
      if (ad.huiDan != null) {
        $scope.ad += '  回单 '
      }
      if (ad.payment != null) {
        $scope.ad += '  回款:' + ad.payment
      }
      var map = new AMap.Map('container', {
        dragEnable: false,
        zoomEnable: false

      });

      var driving = new AMap.Driving({
        map: map
      });
      driving.search([
        {keyword: $rootScope.newOrder.start.p, city: '杭州'},
        {keyword: $rootScope.newOrder.end.p, city: '杭州'}
      ], function (status, result) {
        if (status == 'complete') {
          var url = 'http://restapi.amap.com/v3/distance';
          var dorigins = result.origin.getLng() + ',' + result.origin.getLat();
          var ddestination = result.destination.getLng() + ',' + result.destination.getLat();
          $http({
            method: 'GET', url: url,

            params: {
              origins: dorigins,
              destination: ddestination,
              key: '0e72a6c15fb26fd06fe7a7a6fa0b8a40'
            }

          }).success(function (data) {
            if (data.info == 'OK') {
              var result = data.results;
              var distance = result[0].distance;
              var pay = Tool.getPrice($rootScope.newOrder.carType, distance);
              $rootScope.newOrder.pay = pay;
            } else {
              $ionicPopup.alert({
                title: '还有未填写的表单信息'
              });

            }
          })
        }
      });

    });

    $scope.sub = function () {
      var orderToSub = new Object();
      var newday = new Date();
      if ($scope.contacts.name == null || $scope.contacts.tell == null) {
        $ionicPopup.alert({
          title: '联系人信息不完整'
        });

      } else {


        orderToSub.transportTime = $rootScope.newOrder.time;
        orderToSub.start = $rootScope.newOrder.start.p;
        orderToSub.startDetail = $rootScope.newOrder.start.dp;
        orderToSub.end = $rootScope.newOrder.end.p;
        orderToSub.endDetail = $rootScope.newOrder.end.dp;
        orderToSub.anZhuang = $rootScope.newOrder.ad.anZhuan;
        orderToSub.payment = $rootScope.newOrder.ad.payment;
        orderToSub.huiDan = $rootScope.newOrder.ad.huiDan;
        orderToSub.banYun = $rootScope.newOrder.ad.banYun;
        orderToSub.remarks = $rootScope.newOrder.remark;
        orderToSub.vehicleType = $rootScope.newOrder.carType;
        orderToSub.pay = $rootScope.newOrder.pay;
        orderToSub.orderTime = newday.toLocaleString();
        orderToSub.userId = $rootScope.user.tell;
        orderToSub.contactsTell = $scope.contacts.name;
        orderToSub.contactsName = $scope.contacts.tell;
        orderToSub.orderStatus = '派车中';
        $http.post(
          Tool.getOrderSubmitUrl(),
          JSON.parse(localStorage.getItem('testData')),
          Tool.getPostCfg()
        ).success(function (data) {
          if (data.msg == 'success') {
            $ionicPopup.alert({
              title: '提交成功'
            });

          }
        });

      }
    }
  }

  ctrl.$inject = ['$scope', '$rootScope', '$state', '$http', 'Tool', '$ionicPopup'];
  app.registerController('OrderConfirmCtrl', ctrl);
  // return ctrl;

});

