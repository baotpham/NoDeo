// Author: Dagmawi Mulugeta
// Purpose: Server side JS file 

(function() {
    // require modules
    var express = require('express');
    var bodyParser = require("body-parser");
    var mysql = require('mysql');
    var fs = require('fs');
    var session = require('client-sessions');
    var database = require('./js/database.js');

    var db = new database();
    var app = express();
    // initial server configuration
    app.use(session({
        cookieName: 'session',
        secret: 'asdfasdf23423', //we could load all this in from an external file
        duration: 30 * 60 * 1000,
        activeDuration: 5 * 60 * 1000,
    }));


    // initial server configuration
    app.use(express.static("."));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    // Start listening for requests
    var server = app.listen(8080, function() {
        var port = server.address().port;
        console.log('Server Running at port = %s', port);
    });

    app.post('/setUser', function(req, res) {
        db.once('userSet', function(msg) {
            if (msg == 1) {
                res.status(200);
                console.log("Set User success");
                res.redirect('./login.html');
            } else {
                req.session.msg = "Failed add";
                res.status(400);
                res.send("Error adding user");
            }
        });
        db.setUser(req.body.username, req.body.password, 1);
    });

    app.get('/getNotes', function(req, res) {
        db.once('gotNotes', function(msg) {
            if (msg != "") {
                res.status(200);
                res.send(msg);
            } else {
                req.session.msg = "Failed save";
                res.status(400);
                res.send("Error getting note information");
            }
        });
        db.getNotes(req.query.username, req.query.url);
    });


    app.post('/setNotes', function(req, res) {
        db.once('notesSet', function(msg) {
            if (msg == 1) {
                res.status(200);
                res.send("SUCCESS setting notes");
            } else {
                req.session.msg = "Failed save";
                res.status(400);
                res.send("Error setting notes");
            }
        });
        db.setNotes(req.body.username, req.body.time, req.body.note, req.body.url);
    });

    app.post('/login', function(req, res) {
        db.once('loggedin', function(msg) {
            if (msg == 1) {
                req.session.userid = req.body.username;
                res.status(200);
                res.send("SUCCESS");
            } else {
                req.session.msg = "Invalid login";
                res.status(400);
                res.send("Error verifying login credentials");
            }
        });
        db.login(req.body.username, req.body.password);
    });

    app.post('/logout', function(req, res) {
        req.session.reset();
        req.session.msg = 'You logged out';
        res.status(200);
        res.send("Logged Out");
    });
})();