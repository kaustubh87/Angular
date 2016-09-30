(function () {

    var app = angular.module("githubviewer",[]);

    var MainController = function($scope, $http) {

        $scope.search = function(){
          
            //console.log("Hello World");
            
            $http.get("https://api.github.com/users/kaustubh87").then(getUserDetails, onError);
       
        };
        
        var getUserDetails = function(response){
           $scope.user = response.data;
            
            $http.get($scope.user.repos_url).then(getRepoDetails, onError);
        };
        
        var getRepoDetails = function(response){
            $scope.repos = response.data;
        }
        
        var onError = function(error){
          $scope.error = "Error";  
        };

    };

    app.controller("MainController", ["$scope", "$http", MainController]);

}());