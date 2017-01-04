// Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon 
function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

angular.module('module.home', [])
    .controller('performanceController', perfControl)
    .controller('module.auth.controller', loginController);

perfControl.$inject = ['$http'];
loginController.$inject = ['$http'];

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
        if("hp" > 100 && "hp" <= 200){

        } else if("hp" > 200 && "hp" <= 300){

        } else if("hp" > 300 && "hp" <= 400){
            
        } else if("hp" > 400 && "hp" <= 500){
            
        } else if("hp" > 500 && "hp" <= 600){
            
        } else if("hp" > 700 && "hp" <= 800){
            
        } else if("hp" > 800){
            
        }
    }

    // hide all model drop downs
    pCtrl.audiModel = false;
    pCtrl.bmwModel = false;
    pCtrl.porscheModel = false;
    pCtrl.volkswagenModel = false;
    pCtrl.showYear = false;
    pCtrl.showHP = false;
    // create function to show specific models based on make
    pCtrl.carMakeDropdown = function() { //this function belongs to an object
        if (pCtrl.make == "audi") {
            pCtrl.audiModel = true;
            pCtrl.bmwModel = false;
            pCtrl.porscheModel = false;
            pCtrl.volkswagenModel = false;
            pCtrl.showHP = true;
        } else if (pCtrl.make == "bmw") {
            pCtrl.bmwModel = true;
            pCtrl.audiModel = false;
            pCtrl.porscheModel = false;
            pCtrl.volkswagenModel = false;
            pCtrl.showHP = true;
        } else if (pCtrl.make == "porsche") {
            pCtrl.porscheModel = true;
            pCtrl.audiModel = false;
            pCtrl.bmwModel = false;
            pCtrl.volkswagenModel = false;
            pCtrl.showHP = true;
        } else if (pCtrl.make == "volkswagen") {
            pCtrl.volkswagenModel = true;
            pCtrl.audiModel = false;
            pCtrl.bmwModel = false;
            pCtrl.porscheModel = false;
            pCtrl.showHP = true;
        }
        pCtrl.showYear = true;
    }
}

function loginController($http) { // window.Auth
    console.info('Auth controller loaded!');

    var auth = this;

    auth.payloads = {
        login: {},
        register: {}
    };

    auth.login = {
        // happens when the user clicks submit on the login form
        submit: function($event) { // click-event
            console.info('auth.login.submit', $event);

            $http.post('/login', auth.payloads.login)
                .then(auth.login.success, auth.login.error);
                // brandon reminds you, that a wiffle bat will strike you if you forget your error callback!
        },
        success: function(res) { // server response callback
            // when login is successful, redirect them into the dashboard
            console.info('auth.login.success', res.data);
            location.href = '/dashboard.html';
        },
        error: function(err) {
            console.error('Login.error', err);

            // user feedback stuffs, sets up the alert box on error
            auth.login.message = ( err.data && err.data.message ) || 'Login failed, contact us!';
        }
    };

    auth.register = {
        submit: function () {
            // happens when the user clicks submit on the register form
            $http.post('/register', auth.payloads.register)
                .then(auth.register.success, auth.register.error);
        },
        success: function(res) {
            // when register is successful, just redirect them into the dashboard (already logged in)
            console.info('auth.register.success', res.data);
            location.href = "/dashboard.html";
        },
        error: function(err) {
            console.error('auth.register.error', err);
            // user feedback stuffs, sets up the alert box on error
            auth.register.message = ( err.data && err.data.message ) || 'Register failed, contact us!';
        }
    };
}
