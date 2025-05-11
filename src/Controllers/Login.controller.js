const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../Models/UserSchema.model');
const session =  require('express-session');

const Login = async (req, res) => {
    try{

        const {email, password} = req.body;

        const user = await User.findOne({email});
        
        if(!user) return res.status(400).json({message:'User not found'});

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        req.session.user = user;
        

        if(!isPasswordMatch){

            return res.status(401).json({
                success:false,
                message:"Invalid Credentials"
            });

        };

        return res.status(200).json({
            success : true,
            message: "Login Successfully",
            data: user,
            redirectTO: '/resumeupdate'
        });

    }
    catch(error){

        console.error('Login Error', error);
        return res.status(500).json({
            success: false,
            message:'Internal Server error'
        })

        
    }
}

module.exports = Login;