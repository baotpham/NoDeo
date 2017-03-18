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

    //Login Page
    // app.get('/', function (req, res) {
    //     res.sendFile(path.join(__dirname + '/login.html'));
    // });

    // Start listening for requests
    var server = app.listen(8080, function() {
        var port = server.address().port;
        console.log('Server Running at port = %s', port);
    });



    app.get('/getNotes', function(req, res) {
        db.once('gotNotes', function(msg) {
            if (msg == 1) {
                // req.session.userid = req.body.username;
                console.log(msg);
                res.status(200);
                res.send("SUCCESS");
            } else {
                req.session.msg = "Failed save";
                res.status(400);
                res.send("Error saving information");
            }
        });
        db.getNotes(data);
    });



    app.post('/setNotes', function(req, res) {
        db.once('notesSet', function(msg) {
            if (msg == 1) {
                // req.session.userid = req.body.username;
                res.status(200);
                res.send("SUCCESS");
            } else {
                req.session.msg = "Failed save";
                res.status(400);
                res.send("Error getting information");
            }
        });
        db.setNotes(data);
    });

    app.post('/setUser', function(req, res) {
        db.once('userSet', function(msg) {
            if (msg == 1) {
                // req.session.userid = req.body.username;
                res.status(200);
                res.send("SUCCESS");
            } else {
                req.session.msg = "Failed add";
                res.status(400);
                res.send("Error adding user");
            }
        });
        console.log(req.body.username, req.body.password)
        res.send("SUCCESS");
        // db.setUser(req.body.username,req.body.password);
    });


    // app.get('/getUsers', function(req, res) {
    //     db.once('usertable', function(rows) {
    //         var str = "<table><th>User</th><th>Permissions</th>";
    //         for (var i = 0; i < rows.length; i++) {
    //             str += "<tr><td>" + rows[i].username + "</td><td>" + rows[i].type + "</td></tr>";
    //         }
    //         str += "</table>";
    //         str += `<br>Add User <form method=post action='/addUser'> Username: <input name=username> Password: <input name=pass>
    //                 Type <select> name = type <option value=1>User</option> <option value=2>Admin</option> </select>
    //                 <submit value='Add User'></form>`;
    //         res.send('<html><body>' + str + '</body></html>');
    //     });
    //     db.getUserTable();
    // });



    app.post('/login', function(req, res) {
        // console.log('server login ', req.body);
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
        //return res.redirect('/');
    });


})();