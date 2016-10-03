(function () {

    var app = angular.module("githubviewer");

    var UserController = function($scope, github, $routeParams) {

        
        
        $scope.search = function(username){
          
            //console.log("Hello World");
            
           github.getUser($scope.username).then(getUserDetails, onError);
            if(countDownInterval){
                $interval.cancel(countDownInterval);
                $scope.countdown = null;
            }
       
        };
       
        
        var getUserDetails = function(data){
           $scope.user = data;
           github.getRepos($scope.user).then(getRepoDetails, onError);
           
        };
        
       
        var getRepoDetails = function(data){
            $scope.repos = data;
            
        };
        
        var onError = function(error){
          $scope.error = "Error";
        };
        
        $scope.username = $routeParams.username;
        github.getUser($scope.username).then(getUserDetails,onError);
        
       

    };

    app.controller("UserController" ,UserController);

}());