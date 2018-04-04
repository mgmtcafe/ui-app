angular
  .module('app')
  .controller('vendorController', vendorController);

function vendorController($scope, $location, $http) {    
     $scope.Logout = function(){
        localStorage.clear();
        $location.path('/');
    }
     
    $scope.vendorName;
	var config = {
             headers: {
                "Authorization": localStorage.getItem('access_token')
            }
        }
	var vendorDetailsUrl = "/uaa/user/me";
    $http.get(vendorDetailsUrl, config)
        .then(
            function(response) {
                $scope.vendorName = response.data;  
            },
            function(response) {
                alert("error");
            }

        );
};
