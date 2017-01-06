/************************* Navigation Menu ************************************/

/* Set the width of the side navigation to 250px */
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

$('#arrowScroll').click(function() {
    $("html, body").animate({ scrollTop: 0 }, 1000);
    return false;
});

$('#turboInfo').click(function() {
    $("html, body").animate({ scrollTop: 0 }, 1000);
    return false;
});

window.onload = function() {
    setTimeout(function() {
        scrollTo(0, 0);
    }, 100); //100ms for example
};

/************************* Home Page Controller ************************************/
angular.module('module.home', [])
    .controller('performanceController', perfControl)
    .controller('module.auth.controller', loginController);

perfControl.$inject = ['$http'];
loginController.$inject = ['$http'];

function perfControl($http) { //this function does not belong to an object
    var pCtrl = this;

    pCtrl.showVehicleInfo = false;
    pCtrl.vehicleInfo = {};

    pCtrl.showAutoBox = false;
    pCtrl.arrowClick = function() {
        pCtrl.showAutoBox = true;
    }

    pCtrl.shape1 = false;
    pCtrl.shape2 = false;
    pCtrl.shape3 = false;
    pCtrl.shape4 = false;
    pCtrl.openPerfInfo1 = function() {
        pCtrl.shape1 = true;
        pCtrl.shape2 = false;
        pCtrl.shape3 = false;
        pCtrl.shape4 = false;
    }
    pCtrl.openPerfInfo2 = function() {
        pCtrl.shape2 = true;
        pCtrl.shape1 = false;
        pCtrl.shape3 = false;
        pCtrl.shape4 = false;
    }
    pCtrl.openPerfInfo3 = function() {
        pCtrl.shape3 = true;
        pCtrl.shape1 = false;
        pCtrl.shape2 = false;
        pCtrl.shape4 = false;
    }
    pCtrl.openPerfInfo4 = function() {
        pCtrl.shape4 = true;
        pCtrl.shape1 = false;
        pCtrl.shape2 = false;
        pCtrl.shape3 = false;
    }

    // pCtrl.make = 'Audi';
    // pCtrl.model = 'A4';
    // pCtrl.year = '2004';

    pCtrl.titlemake = pCtrl.make;
    pCtrl.titlemodel = pCtrl.model;
    pCtrl.titleyear = pCtrl.year;

    pCtrl.keepVehicleData = function(){
        pCtrl.make;
        pCtrl.model;
        pCtrl.year;
    }

    pCtrl.vehicleRequest = function() {
        $http.get('/api/myvehicle/photo?make=' + pCtrl.make + '&model=' + pCtrl.model + '&year=' + pCtrl.year)
            .then(function(success) {
                    // console.log("Success: ", success.data);
                    // pCtrl.make = " ";
                    pCtrl.model = " ";
                    pCtrl.year = " ";
                    console.log(pCtrl.make);
                    pCtrl.vehicleInfo = success.data;
                    pCtrl.showVehicleInfo = true;
                    for (var i = 0; i < pCtrl.vehicleInfo.photos.length; i++) {
                        var photo = pCtrl.vehicleInfo.photos[i];
                        console.log('looking for exterior');
                        if (photo.category == "EXTERIOR" && (photo.shotTypeAbbreviation == "S" || photo.shotTypeAbbreviation == "FQ")) {
                            for (var s = 0; s < photo.sources.length; s++) {
                                console.log('looking for big picture!');
                                if (photo.sources[s].size.width > 400) {
                                    console.log('found picture!');
                                    pCtrl.vehicleImage = photo.sources[s].link.href;
                                }
                            }
                        }
                    }
                },
                function(error) {
                    console.log("Error: ", error);
                });
        if (pCtrl.make == "audi" && pCtrl.model == "a4") {
            if (pCtrl.year >= 1996 && pCtrl.year <= 2001) { //B5
                pCtrl.greeting = "Audi A4 B5"
                // display parts... 
                // https://www.ecstuning.com/Audi-B5_A4-Quattro-1.8T/News/Audi_B5_18T_Replacement_Turbo_01032016_21621/
            } else if (pCtrl.year >= 2002 && pCtrl.year <= 2004) { //B6
                pCtrl.greeting = "Audi A4 B6"
                // display parts...
                // http://www.modbargains.com/afe-cold-air-intake-stage-2-audi-a4.htm
            } else if (pCtrl.year >= 2005 && pCtrl.year <= 2008) { //B7
                pCtrl.greeting = "Audi A4 B7"
                // display parts... 
                // http://www.modbargains.com/AEM-Performance-Intake-Audi-A4.htm    
            } else if (pCtrl.year >= 2009 && pCtrl.year <= 2015) { //B8
                pCtrl.greeting = "Audi A4 B8"
                // display parts...
            } else {
                pCtrl.greeting = "Please enter a year after 1995."
            }

        } else if (pCtrl.make == "bmw" && pCtrl.model == "e46") {
            pCtrl.greeting = "BMW E46 M3"
            // E46 is 1999 to 2005
            // display parts...
        } else if (pCtrl.make == "porsche" && pCtrl.model == "911") {
            if (pCtrl.year >= 1997 && pCtrl.year <= 2003) { 
                pCtrl.greeting = "Porsche 911 - 996"
                // display parts... 
            } else if (pCtrl.year >= 2004 && pCtrl.year <= 2010) {
                pCtrl.greeting = "Porsche 911 - 997" 
                // display parts...
            } else if (pCtrl.year >= 2011 && pCtrl.year <= 2015) { 
                pCtrl.greeting = "Porsche 911 - 991"
                // display parts...     
            } else {
                pCtrl.greeting = 'Please enter a year after 1996.'
            }
        } else if (pCtrl.make == "volkswagen" && pCtrl.model == "r32") {
            if (pCtrl.year == 2004) {
                pCtrl.greeting = "VW R32 MK4"

            } else if (pCtrl.year == 2008) {
                pCtrl.greeting = "VW R32 MK5"
            }
        }

    }

    /************************* hide all model drop downs ************************************/
    pCtrl.audiModel = false;
    pCtrl.bmwModel = false;
    pCtrl.porscheModel = false;
    pCtrl.volkswagenModel = false;
    pCtrl.showYear = false;
    pCtrl.showHP = false;
    /************************* create function to show specific models based on make *********/
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
/************************* Login in and Register Controller ************************************/
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
            auth.login.message = (err.data && err.data.message) || 'Login failed, contact us!';
        }
    };

    auth.register = {
        submit: function() {
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
            auth.register.message = (err.data && err.data.message) || 'Register failed, contact us!';
        }
    };
}
