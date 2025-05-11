const User = require('../Models/UserSchema.model');
const bcrypt = require('bcryptjs');

const Signup = async (req, res) => {
    const { email, username, password } = req.body;

    try {

        //*Existing User Find
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
            }
            
        //* Hashpassword using the bcrypt

        const Hashpassword = await bcrypt.hash(password, 10); //* 10 solt rounds


        //* Create New User (pass an object!)
        const user = new User({
            email,
            username,
            password : Hashpassword,
        });

        await user.save();

        req.session.user = user;

        return res.status(201).json({
            success: true,
            message: 'User Created Successfully',
            data: user,
            redirectTO: '/resumeform'
        });
        
    }
    catch (error) {

        console.error('Signup Error:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
};

module.exports = Signup;
