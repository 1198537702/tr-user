/**
 * Created by 黄炳乾 on 2017/2/27.
 */
define(['app'], function (app) {
  'use strict';
    return function($stateProvider, $urlRouterProvider, $controllerProvider) {
    app.registerController = $controllerProvider.register;
      app.loadControllerJs = function (controllerJs) {
        return function ($rootScope, $q) {
          var def = $q.defer, deps = [];
          angular.isArray(controllerJs) ? (deps = controllerJs) : deps.push(controllerJs);
          require(deps, function () {
            $rootScope.$apply(function () {
              def.resolve();
            });
          });
          return def.promise;
        }
      };
    $stateProvider

    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'AppCtrl',
      resolve:{
        deps: app.loadControllerJs('./controllers/AppCtrl')
      }
    })

    .state('app.search', {
      url: '/search',
      views: {
        'menuContent': {
          templateUrl: 'templates/search.html'
        }
      }
    })

    .state('app.browse', {
        url: '/browse',
        views: {
          'menuContent': {
            templateUrl: 'templates/browse.html'
          }
        }
      })

    .state('app.playlists', {
        url: '/playlists',
        views: {
          'menuContent': {
            templateUrl: 'templates/playlists.html',
            controller: 'PlaylistsCtrl',
            resolve:{
              deps: app.loadControllerJs('./controllers/PlaylistsCtrl')
            }
          }
        }
      })

    .state('app.single', {
      url: '/playlists/:playlistId',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlist.html',
          controller: 'PlaylistCtrl',
            resolve:{
              deps: app.loadControllerJs('./controllers/PlaylistCtrl')
            }

        }
      }
    });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/playlists');
  };

});
