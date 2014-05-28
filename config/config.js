app.controller('FleetCtrl', ['$scope', function($scope) {
  $scope.$watch('configs[branch.name].fleet.config', function (value) {
    $scope.config = value || {};
  });
  $scope.saving = false;
  $scope.save = function () {
    $scope.saving = true;
    $scope.pluginConfig('fleet', $scope.config, function () {
      $scope.saving = false;
    });
  };

}]);
