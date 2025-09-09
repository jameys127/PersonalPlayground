const pool = require('../db/db');
const bcrypt = require('bcrypt');

const createUser = async (username, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = `
        INSERT INTO users (username, email, password)
        VALUES ($1, $2, $3)
        RETURNING id, username, email, is_admin, created_at;
    `;
    const values = [username, email, hashedPassword];
    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    }catch (err){
        console.log(err);
    }
};

module.exports = {createUser};