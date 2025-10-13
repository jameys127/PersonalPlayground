const user = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const login = asyncHandler(async (req, res) => {
    const {username, password} = req.body;
    if(!username || !password){
        return res.status(400).json({message: 'All fields are required'});
    }
    const foundUser = await user.getUserWithUsername(username);
    if(foundUser.length === 0){
        return res.status(401).json({message: 'Unauthorized'})
    }
    const match = await bcrypt.compare(password, foundUser[0].password)
    if(!match){
        return res.status(401).json({message: 'Unauthorized'})
    }

    const accessToken = jwt.sign(
        {
            "UserInfo": {
                "username": foundUser[0].username
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: '1m'}
    )

    const refreshToken = jwt.sign(
        {"username": foundUser[0].username},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: '1d'}
    )

    res.cookie('jwt', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 7 * 24 * 60 * 60 * 1000
    })
    res.json({accessToken});
    
})

const refresh = (req, res) => {
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.status(401).json({message: 'Unauthorized'});
    const refreshToken = cookies.jwt;

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        asyncHandler(async (err, decoded) => {
            if(err) return res.status(403).json({message: 'Forbidden'});
            const foundUser = await user.getUserWithUsername(decoded.username);
            if(foundUser.length === 0) return res.status(401).json({message: 'Unauthorized'});
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": foundUser[0].username
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '10s'}
            )
            res.json({accessToken})
        })
    )
}

const logout = (req, res) => {
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(204);
    res.clearCookie('jwt', {httpOnly: true, sameSite: 'None', secure: true});
    res.json({message: 'Cookie cleared'});
}

module.exports = {
    login,
    refresh,
    logout
}