// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
define(['controllers/controllers'], function () {
  'use strict';

  var app = angular.module('starter', ['ionic', 'starter.controllers', 'starter.services']);

  app.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })
  .config(function($stateProvider, $urlRouterProvider, $controllerProvider, $ionicConfigProvider) {
      // $ionicConfigProvider.platform.ios.tabs.style('standard');
      // $ionicConfigProvider.platform.ios.tabs.position('bottom');
      $ionicConfigProvider.platform.android.tabs.style('standard');
      $ionicConfigProvider.platform.android.tabs.position('standard');

      $ionicConfigProvider.platform.android.navBar.alignTitle('center');

      $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
      $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');

      $ionicConfigProvider.platform.ios.views.transition('ios');
      $ionicConfigProvider.platform.android.views.transition('android');

    app.registerController = $controllerProvider.register;
    app.loadControllerJs = function(controllerJs){
      return function($rootScope, $q){
        var def = $q.defer(),deps=[];
        angular.isArray(controllerJs) ? (deps = controllerJs) : deps.push(controllerJs);
        require(deps,function(){
          $rootScope.$apply(function(){
            def.resolve();
          });
        });
        return def.promise;
      };
    };
    $stateProvider

    .state('tabs', {
      url: '/tabs',
      abstract: true,
      templateUrl: 'templates/tabs.html',
      controller: 'AppCtrl',
      resolve:{
        deps: app.loadControllerJs('./controllers/AppCtrl')
      }
    })
    .state('tabs.callCar', {
        url: '/callCar',
        views: {
          'callCar': {
            templateUrl: 'templates/callCar.html',
            controller: 'PlaylistsCtrl',
            resolve:{
              deps: app.loadControllerJs('./controllers/CallCarCtrl')
            }
          }
        }
      })
    .state('tabs.place', {
        url: '/callCar/place/:place',
        views: {
          'callCar': {
            templateUrl: 'templates/place.html',
            controller: 'PlaceCtrl',
            resolve:{
              deps: app.loadControllerJs('./controllers/PlaceCtrl')
            }
          }
        }
      })

    .state('tabs.map', {
        url: '/callCar/map/:place',
        views: {
          'callCar': {
            templateUrl: 'templates/map.html',
            controller: 'MapCtrl',
            resolve:{
              deps: app.loadControllerJs('./controllers/MapCtrl')
            }
          }
        }
      })

    .state('tabs.remark', {
        url: '/callCar/remark',
        views: {
          'callCar': {
            templateUrl: 'templates/remark.html',
            controller: 'RemarkCtrl',
            resolve:{
              deps: app.loadControllerJs('./controllers/RemarkCtrl')
            }
          }
        }
      })

    .state('tabs.type', {
        url: '/callCar/type',
        views: {
          'callCar': {
            templateUrl: 'templates/carType.html',
            controller: 'CarTypeCtrl',
            resolve:{
              deps: app.loadControllerJs('./controllers/CarTypeCtrl')
            }
          }
        }
      })
    .state('tabs.additionalDemand', {
        url: '/callCar/additionalDemand',
        views: {
          'callCar': {
            templateUrl: 'templates/additionalDemand.html',
            controller: 'ADCtrl',
            resolve:{
              deps: app.loadControllerJs('./controllers/ADCtrl')
            }
          }
        }
      })

    .state('tabs.order', {
        url: '/order',
        views: {
          'order': {
            templateUrl: 'templates/order.html',
            controller: 'OrderCtrl',
            resolve:{
              deps: app.loadControllerJs('./controllers/OrderCtrl')
            }
          }
        }
      })
    .state('tabs.order-detail', {
        url: '/order/detail',
        views: {
          'order': {
            templateUrl: 'templates/order-detail.html',
            controller: 'PlaylistsCtrl',
            resolve:{
              deps: app.loadControllerJs('./controllers/PlaylistsCtrl')
            }
          }
        }
      })

    .state('tabs.me', {
        url: '/me',
        views: {
          'me': {
            templateUrl: 'templates/me.html',
            controller: 'PlaylistsCtrl',
            resolve:{
              deps: app.loadControllerJs('./controllers/PlaylistsCtrl')
            }
          }
        }
      })


    .state('tabs.search', {
      url: '/search',
      views: {
        'menuContent': {
          templateUrl: 'templates/search.html'
        }
      }
    })

    .state('tabs.browse', {
        url: '/browse',
        views: {
          'menuContent': {
            templateUrl: 'templates/browse.html'
          }
        }
      })


    .state('tabs.single', {
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
    $urlRouterProvider.otherwise('/tabs/callCar');
  });

  return app;
});
