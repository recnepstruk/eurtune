var Auth = require('./auth'),
    express = require('express');
    request = require('request');


module.exports = (app) => {
    app.get('/logout', Auth.logout); // logout route + redirect

    app.post('/login', Auth.login); // login form submission
    app.post('/register', Auth.register); // register form submission

    app.get('/dashboard.html', Auth.session); // protect the dashboard page - only send it, if the user has a valid session
    app.use(express.static('public')); // home route

    var url = "https://api.edmunds.com"; //API home route
    var APPID = process.env.APPID //API key in bash shell
        // additional key in bashrc 
        // nano ~/.bashrc
        // export APPID="key"
//  vehicle photo api request
    app.get('/api/myvehicle/photo', (req, res) => { // my made up route
        console.log(req.query.make);
        console.log(req.query.model);
        console.log(req.query.year);
        //https://api.edmunds.com/api/vehicle/v2/lexus/rx350/years?fmt=json&year=2011&api_key={api key}

        // use the request module to make an HTTP request to the edmunds api and send the response data to our client
        request(url + "/api/media/v2/" + req.query.make + "/" + req.query.model + "/" + req.query.year + "/photos?api_key=" + APPID, (err, response, body) => {
            if (err) {
                res.send(err);
            } else {
                console.log(body);
                res.send(body);
            }
        });
    });
};
