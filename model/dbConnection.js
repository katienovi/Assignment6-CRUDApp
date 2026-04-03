//Requiring dependencies
require('dotenv').config();
const { Pool } = require('pg');

//Linking to our neon database
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

module.exports = pool;