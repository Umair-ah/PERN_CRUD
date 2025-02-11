require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "pern_crud",
    password: "umair",
    port: 5432,
});

module.exports = pool;
