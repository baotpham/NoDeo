var EventEmitter = require('events').EventEmitter;
var utils = require('util');
var mysql = require('mysql');
var fs = require('fs');

var dbinfo = JSON.parse(fs.readFileSync('../key.json', 'utf8'));
var con = mysql.createConnection(dbinfo);

con.connect(function(err) {
    if (err) {
        console.log(err);
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
    var str = 'SELECT username, type FROM users ORDER BY username';
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
    //DAGMAWI - Ben, having the PASSWORD() around the password didnt work for me :-(
    var str = 'SELECT type FROM users WHERE username=\'' + username + '\' AND password = \'' + password + '\';';
    var self = this;
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




database.prototype.setNotes = function(username, time, note, url) {
    var str = 'INSERT INTO notes ( username, time, note, url ) VALUES ( \'' + username + '\', \'' + time + '\', \'' + note + '\', \'' + url + '\' )';
    var self = this;
    console.log('query', str);
    con.query(str, function(err, rows, fields) {
        if (err) {
            console.log('Error', err);
            return 0;
        }
    });

    // Check if row was added
    str = 'SELECT ROW_COUNT()'
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

// Retrieve all notes associated with username
database.prototype.getNotes = function(username, url) {
    var str = 'SELECT time,note FROM notes WHERE username = \'' + username + '\' AND url = \'' + url + '\'';
    var self = this;
    console.log('query', str);
    con.query(str, function(err, rows, fields) {
        if (err) {
            console.log('Error', err);
            return 0;
        } else {
            if (rows.length > 0) {
                self.emit('gotNotes', rows); // I think you want to actually emit the notes' JSON rather than an integer?
            } else {
                self.emit('gotNotes', "");
            }
        }
    });
};


database.prototype.setUser = function(username, password, type) {
    var str = 'INSERT INTO users ( username, password, type ) VALUES ( \'' + username + '\', \'' + password + '\', \'' + type + '\' );';
    var self = this;
    console.log('query', str);
    con.query(str, function(err, rows, fields) {
        if (err) {
            console.log('Error', err);
            return 0;
        }
    });

    // Check if user was added
    str = 'SELECT ROW_COUNT()'
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
