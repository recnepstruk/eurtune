angular.module('module.dashboard', [])
    .controller('DashboardController', Dashboard);

function Dashboard() {
    console.info('Dashboard.initialized');


    $http.get('/profile')
    	.then(function(success){
                console.log("Got your profile!", success.data);
            }, function(error){
                console.log("Error getting your profile: ", error);
            });
}