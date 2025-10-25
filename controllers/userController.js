const user = require('../models/User');
const asyncHandler = require('express-async-handler');

const getAllUsers = asyncHandler(async (req, res) => {
    const allUsers = await user.getAllUsers();
    if(allUsers.length === 0){
        return res.status(400).json({message: 'No users found'});
    }
    res.status(200).json(allUsers);
});

const createNewUser = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body;
    if(!username || !email || !password){
        return res.status(400).json({message: 'All fields are required'});
    }
    const duplicateUsername = await user.getUserWithUsername(username)
    const duplicateEmail = await user.getUserWithEmail(email)
    if(duplicateUsername.length !== 0){
        return res.status(409).json({message: 'Duplicate username'});
    }
    if(duplicateEmail.length !== 0){
        return res.status(409).json({message: 'Duplicate email'});
    }

    const newUser = await user.createUser(username, email, password);

    if(newUser){
        res.status(201).json({message: `New user ${username} created`});
    }else{
        res.status(400).json({message: 'Invalid user data received'});
    }
});

const updateUser = asyncHandler(async (req, res) => {
    const {id, username, email, password} = req.body;
    if(!id || !username || !email){
        return res.status(400).json({message: 'All fields required'});
    }
    const userToUpdate = await user.getUserWithId(id);
    if(userToUpdate.length === 0){
        return res.status(400).json({message: 'User not found'});
    }
    const duplicateUsername = await user.getUserWithUsername(username);
    if(duplicateUsername.length === 1 &&  duplicateUsername[0].id !== id){
        return res.status(409).json({message: 'Duplicate username'});
    }
    const duplicateEmail = await user.getUserWithEmail(email);
    if(duplicateEmail.length === 1 &&  duplicateEmail[0].id !== id){
        return res.status(409).json({message: 'Duplicate email'});
    }
    if(password){
        const updatedUser = await user.updateUser(id, username, email, password);
        if(updatedUser === 0){
            return res.status(400).json({message: 'Update failed'});
        }
        return res.status(200).json({message: `user ${username} has been successfully updated`});
    }else{
        const updatedUser = await user.updateUser(id, username, email);
        if(updatedUser === 0){
            return res.status(400).json({message: 'Update failed'});
        }
        return res.status(200).json({message: `${username} has been successfully updated`});
    }
})

const deleteUser = asyncHandler(async (req, res) => {
    const {id} = req.body;
    if(!id){
        return res.status(400).json({message: 'User ID required'});
    }
    const deletedUser = await user.deleteUser(id);
    if(deletedUser === 0){
        return res.status(400).json({message: 'User not found'})
    }
    return res.status(200).json({message: 'User deleted'});
})

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}