/**
 * Created by 黄炳乾 on 2017/2/25.
 */
define(['app', 'jquery'], function (app) {
  'use strict';

  function ctrl($scope, $http, Tool, $stateParams, $ionicPopup) {
    var mark = 5;
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

      $scope.sub = function () {
        var node = window.document.getElementById('evaluation');
        var data = {
          'evaluation': node.value,
          'mark': mark,
          'id': o.id
        };
        $http.post(Tool.getOrderEvaluationURL(), data, Tool.getPostCfg()).success(function (data) {
          $ionicPopup.alert({
            title: '评价成功'
          });

        });

      };
      $scope.cleartext = function () {
        var node = window.document.getElementById('evaluation');
        node.value = '';
      };

      $(".stars").on("click", "a", function () {
        var num = parseInt(event.target.id);
        mark = num;
        for (var i = 1; i <= num + 1; i++) {
          $("#" + i).addClass('myactive');
        }
        for (var i = num + 1; i <= 5; i++) {
          $("#" + i).removeClass('myactive');
        }

      })


    });


  }

  ctrl.$inject = ['$scope', '$http', 'Tool', '$stateParams', '$ionicPopup'];
  app.registerController('OrderInDetailCtrl', ctrl);
  // return ctrl;

});
