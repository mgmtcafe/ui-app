var app = angular.module('app', ['ngRoute', 'ngResource']);
app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/admin', {
            templateUrl: 'index.html',
            controller: 'adminController'
        })
        .when('/list_vendor', {
            templateUrl: '/views/list_vendor.html',
            controller: 'listVendorController'
        })
        .when('/create_vendor', {
            templateUrl: '/views/create_vendor.html',
            controller: 'createController'
        })
        .when('/vendor', {
            templateUrl: '/views/vendor.html',
            controller: 'vendorController'
        })
        .otherwise({
            redirectTo: '/'
        });

}]);

app.controller('loginCtrl', function($scope, $http, $httpParamSerializer, $location) {
    if (window.localStorage.getItem('access_token') == null) {
        var url = window.location.href;
        try {
            access_token = url.match(/\#(?:access_token)\=([\S\s]*?)\&/)[1];
            access_token = 'Bearer ' + access_token;
            console.log(access_token);
            localStorage.setItem('access_token', access_token);
            window.location.href = 'https://ui-appli.herokuapp.com/';

        } catch (err) {
            console.log("First call");
        }
    } else {
        localStorage.setItem('authenticated', true);
        var config = {
            method: 'GET',
            url: "/uaa/user/me",
            headers: {
                "Authorization": localStorage.getItem('access_token')
            },
        }
        $http(config).then(
            function(data) {
                //console.log(data.data.authorities);
                var x = data.data.authorities;
                var flag = false;
                //console.log(x);
                for (y in x) {
                    var auth = x[y]['authority'];
                    if (auth == "ADMIN") {
                        flag = true;
                        localStorage.setItem('loggedInAs', 'admin');
                        $location.path('/create_vendor');
                        break;
                    }
                }
                if (flag == false) {
                    localStorage.setItem('loggedInAs', 'vendor');
                    $location.path('/vendor');
                }
            },
            function(error) {
                localStorage.clear();
                $location.path('/');
            });
    }


    $scope.authenticated = function() {
        return localStorage.getItem('authenticated');
    }
    
    
    $scope.userLogin = function() {
        window.location.href = 'https://ui-appli.herokuapp.com/uaa/oauth/authorize?response_type=token&client_id=web-app&redirect_uri=https://ui-appli.herokuapp.com/';

    }
    
    $scope.isAdmin = function() {
        return localStorage.getItem('loggedInAs') == 'admin';
    }
    
    $scope.Logout = function(){
        localStorage.clear();
        $location.path('/');
    }

});