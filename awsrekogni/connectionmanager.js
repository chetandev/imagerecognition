var mysql = require('mysql');
var mssql = require('mssql');
var Promise = require('bluebird');

function obj() {

    this.getMySqlConnection = function() {
        var connection = mysql.createConnection({
            host: '103.25.128.59',
            port: '2499',
            user: 'root',
            password: process.env.MYSQL_PASS,
            connectTimeout: 60 * 10000, //1 min
            database: 'giftxyz',
            multipleStatements: true
        });
        return connection;
    };
    this.getMySqlConnectionPool = function() {
        var connection = mysql.createPool({
            connectionLimit: 20,
            host: '35.164.185.157',
            port: '3306',
            user: 'root',
            password: process.env.MYSQL_PASS,
            connectTimeout: 60 * 10000, //1 min
            acquireTimeout: 30000, // 30s
            database: process.env.MYSQL_SCHEMA,
            multipleStatements: true
        });
        return connection;
    };
}


module.exports = new obj();
