/**
 * Created by 黄炳乾 on 2017/2/25.
 */
define([], function () {
  'use strict';

  function ctrl($scope) {
    $scope.playlists = [
      { title: 'Reggae', id: 1 },
      { title: 'Chill', id: 2 },
      { title: 'Dubstep', id: 3 },
      { title: 'Indie', id: 4 },
      { title: 'Rap', id: 5 },
      { title: 'Cowbell', id: 6 }
    ];
  }

  ctrl.$inject = ['$scope'];
  return ctrl;

})
