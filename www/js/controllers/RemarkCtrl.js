/**
 * Created by 黄炳乾 on 2017/2/25.
 */
define(['app'], function (app) {
  'use strict';

  function ctrl($scope, $rootScope, $state) {
    $scope.$on("$ionicView.beforeEnter", function () {
      $scope.remark = $rootScope.newOrder.remark;

    });
    $scope.sub = function () {
      var node = window.document.getElementById('remark');
      $rootScope.newOrder.remark = node.value;

      $state.go('tabs.callCar');
    };
    $scope.cleartext = function () {
      var node = window.document.getElementById('remark');
      node.value = '';
    }

  }

  ctrl.$inject = ['$scope', '$rootScope', '$state'];
  app.registerController('RemarkCtrl', ctrl);
  // return ctrl;

});
