angular.module('module.home', [])
    .controller('performanceController', perfControl);

perfControl.$inject = ['$http'];

function perfControl($http) { //this function does not belong to an object
    var pCtrl = this;

    pCtrl.showVehicleInfo = false;
    pCtrl.vehicleInfo = {};

    pCtrl.vehicleRequest = function() {
        $http.get('/api/myvehicle?make=' + pCtrl.make + '&model=' + pCtrl.model + '&year=' + pCtrl.year)
            .then(function(success) {
                    console.log("Success: ", success.data);
                    pCtrl.make = " ";
                    pCtrl.model = " ";
                    pCtrl.year = " ";
                    pCtrl.vehicleInfo = success.data;
                    pCtrl.showVehicleInfo = true;
                },
                function(error) {
                    console.log("Error: ", error);
                });
    }
    pCtrl.model = false;
    pCtrl.carMakeDropdown = function(){ //this function belongs to an object
        if(pCtrl.make = "audi"){
            
        }

    }
}
