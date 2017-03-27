define(function (require) {
  'use strict';
  var services = angular.module('starter.services',[]);

  services.factory('Chats', require('services/ChatsService'));
  services.factory('Tool', require('services/ToolService'));
});
