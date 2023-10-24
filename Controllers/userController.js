const express = require('express');
const xss = require("xss");
const bcrypt = require('bcrypt');
const users = require('../models/Users')
const validateUserInput = require('../middlewares/ValidationMiddleware')
const sendEmail = require('../middlewares/EmailSender');
const jwt = require('jsonwebtoken')
require('dotenv').config();
const secretKey = process.env.TOKEN_KEY;
const refreshKey = process.env.REFRESH_KEY;

//create user logic ==============================

async function createUser(req, res) {

    const { first_name, last_name, role, email, user_name, password} = req.body;
    const firstName = xss(first_name);
    const lastName = xss(last_name);
    const realEmail = xss(email);
    const userName = xss(user_name);
    const realPass = xss(password);

    const validationErrors = validateUserInput.validateInput(firstName,lastName, realEmail, realPass, userName );
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
                const existingUser = await users.findOne({ email: realEmail });
                if (existingUser) {
                    return res.status(400).json({ err: 'Email is already in use, try something else' });
                } else {
                const newUser = await users.create({
                    first_name: firstName,
                    last_name: lastName,
                    role: role,
                    email: realEmail,
                    user_name: userName,
                    password: hash,
                });
                
                res.status(201).json(`signed in ${newUser}`)
                sendEmail.sendWelcomeEmailToUser(email, userName, password);
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
        const checkUser = await users.findOne({user_name: realName})
        if (!checkUser) {
            return res.status(401).json('invalid credentials')
        }else{
            const passwordMatch = await bcrypt.compare(realPass, checkUser.password)
                if (!passwordMatch ) {
                    return res.status(401).json('invalid credentials')
                }else{
                    const token = jwt.sign( {userId: checkUser.id, userRole: checkUser.role}, secretKey, {expiresIn: '30s'});
                    const refreshToken = jwt.sign({userId: checkUser.id}, refreshKey, {expiresIn: '60s'});
                    const currentDate = new Date();
                    checkUser.last_login = currentDate;
                    await checkUser.save();
                    return res.status(200).json(
                        {
                            "access_token": token,
                            "token_type": "jwt",
                            "expires_in": "30s",
                            "refresh_token": refreshToken 
                        })
                }    
        }
    } catch (error) {
        res.status(500).json({err:error.message})
    }
    
}

// get all users ====================================

// async function getAllUsers (req, res){
//     const page = req.query.page ;
//     const singlePage = 3;
//     const sort = req.query.sort === 'DESC' ? -1 : 1 ;
//     try {
//         const users = await users.find().skip((page - 1) * singlePage).limit(singlePage).sort({createdAt: sort});
//         res.json(users);
//     } catch (error) {
//         res.status(500).json({ error: error });
//     }
// }

// get user by id ============================================

async function getUsersId (req, res){
    const idd = req.params.id;
    console.log(idd);
    try {
        const userId = await users.findById(idd);
        if (userId) {
            res.status(200).json(userId);
        }else{
            res.status(404).json({"message": "user not found"})
        };
    } catch (error) {
        res.json(error)
    }
    
}


// search for users ================================

async function searchForUsers (req, res){
    const page = req.query.page || 1 ;
    const singlePage = 3 ;
    const sort = req.query.sort === 'DESC' ? -1 : 1 ;
    const query = req.query.query
    try {
        const user = await users.find({ first_name: { $regex: new RegExp(query, 'i') } }).skip((page - 1) * singlePage).limit(singlePage).sort({createdAt: sort});
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

// update the users =====================================


async function updateUser(req, res){
    const userId = req.params.id;
    const {first_name, last_name, email, role, active} = req.body;
    try {
        const user = await users.findByIdAndUpdate(userId, {first_name, last_name, email, role, active});
        if (user) {
            res.status(200).json('User updated successfully');
        }else{
            res.status(404).json("no user found with the provided Id")
        };
    } catch (error) {
        res.json(error)
    }
}

// delete usesr ===================================


async function deleteUser(req, res){
    const userId = req.params.id;
    try {
        const user = await users.findByIdAndDelete(userId);
        if (user) {
            res.status(200).json('User deleted successfully');
        }else{
            res.status(404).json("no user found with the provided Id")
        };
    } catch (error) {
        res.json(error)
    }
}

module.exports = {
    createUser: createUser,
    loginUser: loginUser,
    // getAllUsers: getAllUsers,
    getUsersId: getUsersId,
    searchForUsers: searchForUsers,
    updateUser: updateUser,
    deleteUser: deleteUser
};