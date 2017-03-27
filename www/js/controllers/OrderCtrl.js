/**
 * Created by 黄炳乾 on 2017/2/25.
 */
define(['app'], function (app) {
  'use strict';

  function ctrl($scope, $rootScope, $http, $ionicPopup, Tool, $state) {
    $scope.correntTabs = '';
    $scope.orderList = null;


    $scope.dtl = function (id, status) {
      if($scope.correntTabs == 'notfinish' && status != '派车中'){
        $state.go('tabs.orderInProgress', {orderid: id});
      }else if ($scope.correntTabs == 'finish'){
        $state.go('tabs.orderDtail', {orderid: id});
      }
    };


    function turnTabs(tabsID, to) {
      if (to != $scope.correntTabs) {
        $('#' + tabsID).removeClass('active');
        $('#' + to).addClass('active');
        $scope.correntTabs = to;
        $http({
          method: 'GET', url: Tool.getOrderListURL(),

          params: {
            'list': to,
            'userId': $rootScope.user.tell
          }

        }).success(function (data) {
          if (data.msg == 'success') {
            $scope.orderList = Tool.setOrderList(data.orderList);

          } else {
            $ionicPopup.alert({
              title: data.msg
            });

          }
        });
      }

    }
    $scope.turnTabs = turnTabs;
    turnTabs('finish', 'notfinish');


  }

  ctrl.$inject = ['$scope', '$rootScope', '$http', '$ionicPopup', 'Tool', '$state'];
  app.registerController('OrderCtrl', ctrl);
  // return ctrl;

});
