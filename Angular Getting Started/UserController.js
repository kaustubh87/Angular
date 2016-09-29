(function () {
    
   
    var app = angular.module("githubviewer");
    
    var UserController = function ($scope, github , $routeParams) {

      var onUserComplete = function(data){
          $scope.user = data;
          github.getRepos($scope.user).then(onRepos, onError);
      };
        
      var onRepos = function(data)
      {
          $scope.repos = data;
          
      };
        
        var onError = function(reason){
            $scope.error = "Could not fetch details";
        };
        
        $scope.username = $routeParams.username;
        github.getUser($scope.username).then(onUserComplete,onError);

    };

    app.controller("UserController", ["$scope", "$http", UserController]);

}());