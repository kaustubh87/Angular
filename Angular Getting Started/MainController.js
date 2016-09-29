(function () {

    var app = angular.module("githubviewer");

    var MainController = function ($scope, $http, $interval, $location) {



        var countdowntimer = null;
        var startCountdown = function () {
            countdowntimer = $interval(decrementCountdown, 1000, $scope.countdown);
        };

        $scope.search = function (username) {

            if (countdowntimer) {
                $interval.cancel(countdowntimer);
                $scope.countdown = null;
            }
            //
            $location.path("/user/" + username);
        };

        var decrementCountdown = function () {
            $scope.countdown--;
            if ($scope.countdown < 1) {
                $scope.search($scope.username);
            }
        };




        $scope.countdown = 5;
        startCountdown();


    };

    app.controller("MainController", ["$scope", "$http", "$interval", "$location", MainController]);

}());