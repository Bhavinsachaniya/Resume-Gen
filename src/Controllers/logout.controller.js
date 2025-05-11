const express = require('express');
const session = require('express-session');

const logout = async (req,res) => {
    res.session.destroy(() => {
        res.redirect('/auth');
    })
};

module.exports = logout;