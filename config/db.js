const Pool = require('pg').Pool

const pool = new Pool({
    user: '',
    host: 'localhost',
    database: 'db_reflection',
    password: ''
})

module.exports = pool