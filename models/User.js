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

const updateUser = async(id, username, email, password) => {
    if(password){
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = `UPDATE users SET username = $1, email = $2, password = $3 WHERE id = $4;`
        const values = [username, email, hashedPassword, id];
        try{
            const result = await pool.query(query, values);
            return result.rowCount;
        }catch(err){
            console.log(err);
        }
    }
    const query = `UPDATE users SET username = $1, email = $2 WHERE id = $3;`
        const values = [username, email, id]
        try{
            const result = await pool.query(query, values);
            return result.rowCount;
        }catch(err){
            console.log(err);
        }
}

const deleteUser = async(id) => {
    const query = `DELETE FROM users WHERE id = $1;`
    const value = [id];
    try{
        const result = await pool.query(query, value);
        return result.rowCount;
    }catch(err){
        console.log(err);
    }
}

const getAllUsers = async () => {
    const query = `SELECT id, username, email FROM users;`
    try{
        const result = await pool.query(query);
        return result.rows;
    }catch (err){
        console.log(err);
    }
}

const getUserWithUsername = async (username) => {
    const query = `SELECT id, username, email FROM users WHERE username = $1;`;
    const value = [username];
    try{
        const result = await pool.query(query, value);
        return result.rows;
    }catch (err){
        console.log(err);
    }
}
const getUserWithEmail = async (email) => {
    const query = `SELECT id, username, email FROM users WHERE email = $1;`;
    const value = [email];
    try{
        const result = await pool.query(query, value);
        return result.rows;
    }catch (err){
        console.log(err);
    }
}
const getUserWithId = async (id) => {
    const query = `SELECT id, username, email FROM users WHERE id = $1;`;
    const value = [id];
    try{
        const result = await pool.query(query, value);
        return result.rows;
    }catch (err){
        console.log(err);
    }
}

module.exports = {
    createUser,
    updateUser,
    deleteUser,
    getAllUsers,
    getUserWithEmail,
    getUserWithUsername,
    getUserWithId
};