angular
  .module('app')
  .controller('listVendorController', listVendorCtrl);

function listVendorCtrl($scope, $http) {
	//var vm = this;
	$scope.headingTitle = "Vendor List";
	//Getting vendor list 
	var config = {
            headers: {
                "Authorization": localStorage.getItem('access_token')
            }
        }
	
	var getAllVendorUrl = "/admin/vendor/all";
		
	var vendorInfo;
	
    $http.get(getAllVendorUrl, config)
        .then(
            function(response) {
            	$scope.message = response.data;
            	//console.log(vendorInfo);
            	    	        
            },
            function(response) {
            	$("#error").html("**403 Error (Forbidden)");
            }
        );
    
    //END of getting vendor list
	
	
	
    
};