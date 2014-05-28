app.controller('FleetCtrl', ['$scope', function($scope) {
  $scope.$watch('configs[branch.name].fleet.config', function (value) {
    $scope.config = value || {
      hub: '',
      secret: '',
      app: '',
      script: '',
      seaport: '',
      shoreman_app: '',
      shoreman_cmd: ''
    };
  });
  $scope.saving = false;
  $scope.save = function () {
    $scope.saving = true;
    $scope.pluginConfig('fleet', $scope.config, function () {
      $scope.saving = false;
    });
  };
  $scope.del = function (key) {
    delete $scope.config[key];
    $scope.save();
  };
  $scope.add = function () {
    $scope.config[$scope.newkey] = $scope.newvalue;
    $scope.newkey = $scope.newvalue = '';
    $scope.save();
  };

}]);
