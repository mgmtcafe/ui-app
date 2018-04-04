angular
  .module('app')
  .controller('createController', createVendorCtrl);

function createVendorCtrl($scope, $http) {
    $scope.headingTitle = "Create Vendor";
	$scope.locationInfo;
	var config = {
             headers: {
                "Authorization": localStorage.getItem('access_token')
            }
        }
	var getAllLocationUrl = "https://locationmicro.cfapps.io/location/getLocationByAddress/kolkata";
    $http.get(getAllLocationUrl, config)
        .then(
            function(response) {
                //console.log(response.data);
                $scope.locationInfo = response.data;  
            },
            function(response) {
                alert("error");
            }

        );
    
    //END of getting location list
    var config = {
            headers: {
                "Authorization": localStorage.getItem('access_token')
            },
    }
    //Posting values to create Vendor   
    $scope.vendorDetails = {
            "name": "",
            "email": "",
            "contact": "",
            "location": "",
            "address": ""
            
        };

    $scope.postVendorData = function() {
        var postVendorDataUrl = "/admin/vendor/create";
        for(var i in $scope.locationInfo.message){	
	    	if($scope.vendorDetails.location==($scope.locationInfo.message[i].address+", "+$scope.locationInfo.message[i].code))      	
	    		$scope.vendorDetails.location=$scope.locationInfo.message[i].id;
    	}
        console.log($scope.vendorDetails);
        $http.post(postVendorDataUrl, $scope.vendorDetails, config)
            .then(
                function(response) {  
                	if(response.data.status=="success"){
                		console.log(response.data);
                		$scope.result_success=1;
                		$scope.result_failure=0;
                		$("#outcome-created").html("Vendor Created Successfully!");
                	}
                	else{
                		$scope.result_failure=1; 
                		$scope.result_success=0;
                		console.log(response.data);
                		$("#outcome-notcreated").html(response.data.message);
            		}
                	
                },
                function(response) {
                	$scope.result_failure=1;  
                	$scope.result_success=0;
                	$("#outcome-notcreated").html("Could not create Vendor..");
                }
            );
    	}
    //END of Posting values to create Vendor 
    
    //Hide msg
    $scope.hideMessage = function(){
    	$scope.result_failure=0;  
    	$scope.result_success=0;
    }
    //End Hide msg
    
        
};


