/**
 * Created by 黄炳乾 on 2017/2/25.
 */
define(['app'], function (app) {
  'use strict';

  function ctrl($scope, $http) {
        $http.get("http://127.0.0.1:8000/app/orderTest").success(function (data) {

          var d = data[0];
          alert("s");
        }).error(function (error) {

          var e = error;
          alert("q");
        })
  }

  ctrl.$inject = ['$scope','$http'];
  app.registerController('OrderCtrl', ctrl);
  // return ctrl;

});
