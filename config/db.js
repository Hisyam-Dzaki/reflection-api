const Pool = require('pg').Pool

const pool = new Pool({
    pool    user: '',
        host: 'localhost',
        database: 'db_reflection',
        password: ''
    })

module.exports = 