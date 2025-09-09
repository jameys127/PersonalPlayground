const {Pool, Client} = require('pg');

const connectionString = `${process.env.DATABASE_URI}`;
const pool = new Pool({
    connectionString: connectionString
});

module.exports = pool;