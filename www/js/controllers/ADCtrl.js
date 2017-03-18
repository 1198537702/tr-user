/**
 * Created by 黄炳乾 on 2017/2/25.
 */
define(['app'], function (app) {
  'use strict';

  function ctrl($scope, $rootScope, $state) {
    $scope.$on("$ionicView.beforeEnter", function () {
      $scope.ad = $rootScope.newOrder.ad;

    });
    $scope.sub = function () {
      $rootScope.newOrder.ad = angular.copy($scope.ad);

      $state.go('tabs.callCar');
    };


  }

  ctrl.$inject = ['$scope', '$rootScope', '$state'];
  app.registerController('ADCtrl', ctrl);
  // return ctrl;

});
