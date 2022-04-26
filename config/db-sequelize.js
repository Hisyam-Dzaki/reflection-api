Sequelize = require('sequelize');
var sequelize = new Sequelize(
    'db_reflection',
    '',
    '',

    {
        host: 'localhost',
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