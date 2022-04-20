const Pool = require('pg').Pool

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'db_reflection',
    password: '5432'
})

module.exports = pool