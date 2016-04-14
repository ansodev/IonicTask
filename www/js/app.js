// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic']);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

app.controller('mainController', function($scope, $ionicPopup, $ionicListDelegate) {
  var tasks = new getTasks();

  $scope.lista = tasks.items;
  $scope.showMarked = false;
  $scope.removeStatus = false;

  function getItem(item, novo) {
    $scope.data = {};
    $scope.data.newTask = item.nome;

    $ionicPopup.show({
      title: "Nova tarefa",
      scope: $scope,
      template: "<input type='text' placeholder='Tarefa' autofocus='true' ng-model='data.newTask'>",
      buttons: [
        {text: "Ok",
        onTap: function(e) {
            item.nome = $scope.data.newTask;
            if (novo) {
              tasks.add(item);
            }
            tasks.save();
        }},
        {text: "Cancel"}
      ]
    });

    $ionicListDelegate.closeOptionButtons();
  };

  $scope.onMarkTask = function(item) {
    item.finalizada = !item.finalizada;
    tasks.save();
  };

  $scope.onHideItem = function(item) {
    return item.finalizada && !$scope.showMarked;
  };

  $scope.onItemAdd = function() {
    var item = {nome: "", finalizada: false};

    getItem(item, true);
  };

  $scope.onItemEdit = function(item) {
    getItem(item, false);

  };

  $scope.onItemRemove = function(item) {
    tasks.remove(item);
    tasks.save();
  };

  $scope.onClickRemove = function() {
    $scope.removeStatus = !$scope.removeStatus;
  };
});
