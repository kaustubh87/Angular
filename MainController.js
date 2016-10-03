(function () {

    var app = angular.module("githubviewer");

    var MainController = function($scope, $interval,$location) {

        
        var countDownInterval = null;
        
        var startCountDown = function(){
            countDownInterval = $interval(decrementCountDown, 1000, $scope.countdown);
        }
        
        var decrementCountDown = function(){
            $scope.countdown -= 1;
            if($scope.countdown<1){
                $scope.search($scope.username);
            }
            
        }
        
        
        $scope.search = function(username){
          
            //console.log("Hello World");
            
          
            if(countDownInterval){
                $interval.cancel(countDownInterval);
                $scope.countdown = null;
            }
            
            $location.path("/user/", +username);
            
       
        };
        
        
        $scope.countdown = 5;
        startCountDown();

    };

    app.controller("MainController" ,MainController);

}());