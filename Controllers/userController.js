const express = require('express');
const { v4: uuidv4 } = require('uuid');
const xss = require("xss");
const bcrypt = require('bcrypt');
const myData = require('../models/Users')
const validateUserInput = require('../middlewares/ValidationMiddleware')
const sendEmail = require('../middlewares/EmailSender');
const jwt = require('jsonwebtoken')
require('dotenv').config();
const secretKey = process.env.TOKEN_KEY;
const refreshKey = process.env.REFRESH_KEY;

//regester logic ==============================

async function createUser(req, res) {
    const { first_name, last_name, role, email, user_name, password} = req.body;
    const firstName = xss(first_name);
    const lastName = xss(last_name);
    const realEmail = xss(email);
    const userName = xss(user_name);
    const realPass = xss(password);

    const validationErrors = validateUserInput(firstName,lastName, realEmail,userName, realPass);
    if (validationErrors.length > 0) {
        return res.status(400).json({ err: validationErrors });
    }

try {
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ err: 'Internal server error' });
        } else {
            bcrypt.hash(realPass, salt, async (err, hash) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ err: 'Internal server error' });
            } else {
                const existingUser = await myData.findOne({ email: realEmail });
                if (existingUser) {
                    return res.status(400).json({ err: 'Email is already in use, try something else' });
                } else {
                const newUser = await myData.create({
                    id: uuidv4(),
                    first_name: firstName,
                    last_name: lastName,
                    role: role,
                    email: realEmail,
                    user_name: userName,
                    password: hash,
                    last_login:new Date(),
                    active:true
                });
                
                res.status(201).json(`signed in ${newUser}`)
                sendEmail(email, userName, password);
                }
            }
            });
        }
        
    });
    
    } catch (error) {
        return res.status(500).json({ err: 'Internal server error' });
    }
}


// login logic==============================

async function loginUser (req, res){
    try {
        const {user_name, password}= req.body;
        const realName = xss(user_name);
        const realPass = xss(password);
        const checkUser = await myData.findOne({user_name: realName})
        if (!checkUser) {
            return res.status(401).json('the user name or password are not exicte')
        }else{
            const passwordMatch = await bcrypt.compare(realPass, checkUser.password)
                if (!passwordMatch ) {
                    return res.status(401).json('the user name or password are not exicte')
                }else{
                    const token = jwt.sign( {userId: checkUser.id}, secretKey, {expiresIn: '30s'});
                    res.cookie('token', token);
                    const refreshToken = jwt.sign({userId: checkUser.id}, refreshKey, {expiresIn: '60s'});
                    checkUser.refreshTokens.push({refreshTkn:refreshToken})
                    checkUser.save()
                    // console.log(token)
                    // console.log(refreshToken)
                    return res.status(200).json({token})
                }    
        }
    } catch (error) {
        res.status(500).json({err:error.message})
    }
    
}


module.exports = {
    createUser: createUser,
    loginUser: loginUser
};