angular.module('module.dashboard',[])
    .controller('DashboardController', dashboard);

dashboard.$inject = ['$http'];

function dashboard() {
	var dCtrl = this;
    console.info('Dashboard.initialized');


    // $http.get('/profile')
    // 	.then(function(success){
    //             console.log("Got your profile!", success.data);
    //         }, function(error){
    //             console.log("Error getting your profile: ", error);
    //         });

    dCtrl.logout = function(){
    	req.session.uid = null;
    	$http.get('/').then
    		(function(success){
    			console.log('Successful logout!', success.data);
    		}, function(error){
    			console.log('Error logging out!', error);
    		});
    }
}
