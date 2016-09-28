(function () {

    var app = angular.module("githubviewer", []);

    var GithubController = function ($scope, $http, $interval, $anchorScroll, $location) {

        var onUserComplete = function (response) {
            $scope.user = response.data;
            $http.get($scope.user.repos_url)
                .then(onRepos, onError);
            
        };

        var onError = function (error) {
            $scope.error = "Could not fetch the data";
        };

        var onRepos = function (response) {

            $scope.repos = response.data;
            $location.hash("userDetails");
            $anchorScroll();

        };

        var countdowntimer = null;
        var startCountdown = function() {
            countdowntimer = $interval(decrementCountdown, 1000, $scope.countdown);
        };
        
        $scope.search = function () {
            $http.get("https://api.github.com/users/" + $scope.username).then(onUserComplete, onError);
            if(countdowntimer)
                {
                    $interval.cancel(countdowntimer);
                    $scope.countdown = null;
                }
        }

        var decrementCountdown = function() {
            $scope.countdown --;
            if ($scope.countdown < 1) {
                $scope.search($scope.username);
            }
        };
        
        

        
        $scope.repoSortOrder = "+name";
        $scope.countdown = 5;
        startCountdown();


    };

    app.controller("GithubController", ["$scope", "$http", "$interval","$anchorScroll","$location", GithubController]);

}());