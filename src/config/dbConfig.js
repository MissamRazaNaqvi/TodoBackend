
const dotenv = require('dotenv');
const mysql = require('mysql2');
dotenv.config();
var mysqlConnection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    dialect: 'mysql'
});
module.exports = mysqlConnection;