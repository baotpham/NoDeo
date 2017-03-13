// Author: Dagmawi Mulugeta
// Purpose: Server side JS file 

(function() {
    // require modules
    var express = require('express');
    var bodyParser = require("body-parser");
    var mysql = require('mysql');
    var fs = require('fs');

    var app = express();
    // initial server configuration
    app.use(express.static("."));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    //Login Page
    // app.get('/', function (req, res) {
    //     res.sendFile(path.join(__dirname + '/index.html'));
    // });

    // Start listening for requests
    var server = app.listen(8080, function() {
        var port = server.address().port;
        console.log('Server Running at port = %s', port);
    });

    // Get Database name and password from key.json file, one level higher.
    // var key = fs.readFileSync('../key.json', 'utf8');
    // config = JSON.parse(key)

    // var connection = mysql.createConnection({
    //     host: config["host"],
    //     user: config["user"],
    //     password: config["password"],
    //     database: config["database"]
    // });


    // Get responders with require actions 
    app.get('/TABLE', function(req, res) {
        console.log('SELECT * from ' + req.query["data"] + ';')
            // connection.query('SELECT * from ' + req.query["type"] + ';', function(err, rows, fields) {
            //     if (err) {
            //         return connection.rollback(function() {});
            //     }
            //     res.send(rows);
            // });
    });
})();