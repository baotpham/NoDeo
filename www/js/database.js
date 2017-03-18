var EventEmitter = require('events').EventEmitter;
var utils = require('util');
var mysql = require('mysql');
var fs = require('fs');

var dbinfo = JSON.parse(fs.readFileSync('../key.json', 'utf8'));
var con = mysql.createConnection(dbinfo);

con.connect(function(err) {
    if (err) {
        console.log('Error connecting to database');
    } else {
        console.log('Database successfully connected');
    }
});

function database() {
    EventEmitter.call(this);
}
utils.inherits(database, EventEmitter);

database.prototype.getUserTable = function() {
    var str = 'SELECT username, type FROM users order by username';
    var self = this;
    con.query(str,
        function(err, rows, fields) {
            if (err) {
                console.log('Error');
                return 0;
            } else {
                self.emit('usertable', rows);
            }
        }
    );
};

database.prototype.login = function(username, password) {
    var str = 'SELECT type FROM users WHERE username=\'' + username + '\' AND password = PASSWORD(\'' + password + '\');';
    var self = this;
    console.log('query', str);
    con.query(str, function(err, rows, fields) {
        if (err) {
            console.log('Error', err);
            return 0;
        } else {
            if (rows.length > 0) {
                self.emit('loggedin', 1);
            } else {
                self.emit('loggedin', 0);
            }
        }
    });
};




database.prototype.setNotes = function(data) {
    var str = 'SELECT * from USERS';
    var self = this;
    console.log('query', str);
    con.query(str, function(err, rows, fields) {
        if (err) {
            console.log('Error', err);
            return 0;
        } else {
            if (rows.length > 0) {
                self.emit('notesSet', 1);
            } else {
                self.emit('notesSet', 0);
            }
        }
    });
};

database.prototype.getNotes = function() {
    var str = 'SELECT * from USERS';
    var self = this;
    console.log('query', str);
    con.query(str, function(err, rows, fields) {
        if (err) {
            console.log('Error', err);
            return 0;
        } else {
            if (rows.length > 0) {
                self.emit('gotNotes', 1);
            } else {
                self.emit('gotNotes', 0);
            }
        }
    });
};


database.prototype.setUser = function(data) {
    var str = 'SELECT * from USERS';
    var self = this;
    console.log('query', str);
    con.query(str, function(err, rows, fields) {
        if (err) {
            console.log('Error', err);
            return 0;
        } else {
            if (rows.length > 0) {
                self.emit('userSet', 1);
            } else {
                self.emit('userSet', 0);
            }
        }
    });
};



module.exports = database;