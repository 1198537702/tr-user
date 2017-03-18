/**
 * Created by 黄炳乾 on 2017/2/25.
 */
define(['app'], function (app) {
  'use strict';

  function ctrl($scope, $rootScope, $state, $stateParams) {
    $scope.$on("$ionicView.beforeEnter", function () {
      // console.log($scope.messages);
      $scope.place = $stateParams.place;
      if ($stateParams.place == 'start') {
        $scope.start = $rootScope.newOrder.start;
        $scope.sub = function () {
          $rootScope.newOrder.start.dp = angular.copy($scope.start.dp);
          $scope.start = null;
          $state.go('tabs.callCar');
        };
        $scope.next = function () {
          $rootScope.newOrder.start.dp = angular.copy($scope.start.dp);
        };

      } else if ($stateParams.place == 'end') {
        $scope.start = $rootScope.newOrder.end;
        $scope.sub = function () {
          $rootScope.newOrder.end.dp = angular.copy($scope.start.dp);
          $state.go('tabs.callCar');
        };
        $scope.next = function () {
          $rootScope.newOrder.end.dp = angular.copy($scope.start.dp);
        };

      }

    });

  }

  ctrl.$inject = ['$scope', '$rootScope', '$state', '$stateParams'];
  app.registerController('PlaceCtrl', ctrl);
  // return ctrl;

});
