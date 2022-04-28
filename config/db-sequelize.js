Sequelize = require('sequelize');
require('dotenv').config();

var sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USER,
    process.env.DB_PASSWORD,

    {
        host: process.env.DB_HOST,
        dialect: 'postgres',
    }
);

sequelize
    .authenticate()
    .then(() => {
        console.log('connection has been established');
    })
    .catch(err => {
        console.error('unable to connect to db', err);
    });

module.exports = { sequelize, Sequelize };