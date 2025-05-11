const express = require('express');
const genrateAnswer = require('../Controllers/resumeAIContentGenrate.controller');
const {resumeDataSave, resumeGenrate} = require('../Controllers/resumeGenrate.controller');
const resumeShow = require('../Controllers/resumedataShow.Controller');
const Update = require('../Controllers/resumeDataUpdate.Controller');
const Router = express.Router();


Router.post('/genrateContent',genrateAnswer);
Router.post('/datasave', resumeDataSave);
Router.post('/generate/:resumeId/:templateNumber', resumeGenrate);
Router.get('/Show', resumeShow);
Router.post('/update', Update);
module.exports = Router;

