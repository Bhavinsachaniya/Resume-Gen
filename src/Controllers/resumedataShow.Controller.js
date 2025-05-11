const express = require('express');
const mongoose = require('mongoose');
const User =require('../Models/UserSchema.model');
const Resume = require('../Models/ResumeSchema.model');



const resumeShow = async (req, res) => {
    try {
        console.log('chal gya');
        const userId = await req.session.user._id;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized: No user session" });
        }

        const userData = await Resume.findOne({
            user: new mongoose.Types.ObjectId(userId)
        });

        if (!userData) {
            return res.status(404).json({ message: "Resume not found for this user" });
        }

        return res.status(200).json({ message: "Success", resume: userData });
    } catch (error) {
        console.error("resumeShow error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


module.exports = resumeShow;