const express = require('express');
const Router = express.Router();
const mongoose = require('mongoose');
const resumeModel = require('../Models/ResumeSchema.model');

Router.post('/session',async (req, res) => {
    const userId = req.session.user ? req.session.user._id : null;
    console.log(userId);
    const resume = await resumeModel.findOne({ user: userId });
    console.log(resume);
    res.json(resume);
});

module.exports = Router;
