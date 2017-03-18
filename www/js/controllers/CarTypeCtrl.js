/**
 * Created by 黄炳乾 on 2017/2/25.
 */
define(['app'], function (app) {
  'use strict';

  function ctrl($scope, $rootScope, $state) {
      $scope.sub = function (cartype) {
        $rootScope.newOrder.carType = cartype;

        $state.go('tabs.callCar');
      };


  }

  ctrl.$inject = ['$scope', '$rootScope', '$state'];
  app.registerController('CarTypeCtrl', ctrl);
  // return ctrl;

});
