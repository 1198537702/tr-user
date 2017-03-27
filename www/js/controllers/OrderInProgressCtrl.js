/**
 * Created by 黄炳乾 on 2017/2/25.
 */
define(['app'], function (app) {
  'use strict';

  function ctrl($scope, $http, Tool, $stateParams, $ionicPopup) {
    $scope.$on("$ionicView.beforeEnter", function () {
      var o = Tool.getOrderListById($stateParams.orderid);
      $scope.order = o;
      $http({
        method: 'GET', url: Tool.getDriverInfoUrl(),

        params: {
          'driverId': o.driverId
        }

      }).success(function (data) {
        $scope.driver = data.driver;
        $scope.headPortraitURL = Tool.getStaticFilesURL() + data.driver.headPortrait

      }).error(function () {
        $ionicPopup.alert({
          title: '检查网络'
        });
      });

      var map = new AMap.Map('container', {
        resizeEnable: true,
        dragEnable: false,
        zoomEnable: false
      });
      var driving = new AMap.Driving({
        map: map
      });
      driving.search([
        {keyword: o.start, city: '杭州'},
        {keyword: o.end, city: '杭州'}
      ]);

    });


  }

  ctrl.$inject = ['$scope', '$http', 'Tool', '$stateParams', '$ionicPopup'];
  app.registerController('OrderInProgressCtrl', ctrl);
  // return ctrl;

});
