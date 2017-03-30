/**
 * Created by 黄炳乾 on 2016/10/31.
 */
define(['jquery'], function () {
  "use strict";
  var xiaoMianBaoQiBu = 33;
  var zhongMianBaoQiBu = 50;
  var xiaoHuoCheQiBu = 60;
  var zhongHuoCheQiBu = 100;

  var xiaoMianBaoChao = 3;
  var zhongMianBaoChao = 4;
  var xiaoHuoCheChao = 4;
  var zhongHuoCheChao = 5;
  var orderList;
  var factory = function () {
    var host = 'http://127.0.0.1:8000';
    return {
      all: function () {
        return chats;
      },
      getLoginUrl: function () {
        return host + '/app/login';
      },
      getOrderSubmitUrl: function () {
        return host + '/app/newOrder';
      },
      getConfirmedServicetUrl: function () {
        return host + '/app/confirmedService';
      },
      getOrderListURL: function () {
        return host + '/app/userOrderList';
      },
      getDriverInfoUrl: function () {
        return host + '/app/driverInfo';
      },
      getStaticFilesURL: function () {
        return host + '/staticFiles/';
      },
      getOrderEvaluationURL: function () {
        return host + '/app/orderEvaluation';
      },
      getPostCfg: function () {
        var postCfg = {
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          transformRequest: function (data) {
            return $.param(data);
          }
        };

        return postCfg;
      },

      setOrderList: function (list) {
        for(var i = 0; i < list.length; i++){
          switch (list[i].orderStatus){
            case '已完成': list[i].btn = ' 评 价 ';
                  break;
            case '派车中': list[i].btn = '取消订单';
                  break;
            case '运送中': list[i].btn = '查看详情';
                  break;
            case '已取消': list[i].btn = '已取消';
                  break;
            case '已送达': list[i].btn = '支付';
                  break;
          }
        }
        orderList = list;
        return list;
      },
      getOrderListById: function (id) {
        var o = {};
        for (var i = 0; i < orderList.length; i++) {
          if (orderList[i].id == id) {
            o = orderList[i];
            break;
          }
        }
        return o;
      },

      getPrice: function (carType, distance) {
        var qibu;
        var chao;
        switch (carType) {
          case '小型面包':
            qibu = xiaoMianBaoQiBu;
            chao = xiaoMianBaoChao;
            break;
          case '中型面包':
            qibu = zhongMianBaoQiBu;
            chao = zhongMianBaoChao;
            break;
          case '小型货车':
            qibu = xiaoHuoCheQiBu;
            chao = xiaoHuoCheChao;
            break;
          case '中型货车':
            qibu = zhongHuoCheQiBu;
            chao = zhongHuoCheChao;
            break;
        }

        var m = parseInt(distance);
        if (m <= 5000)
          return qibu;
        else {
          var price = qibu + (m - 5000) / 1000 * chao;
          return price.toFixed(2);
        }

      }

    };
  };
  factory().$inject = [];
  return factory;
});
