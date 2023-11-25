const artisianControllers = require('../controllers/artisian');
const auth = require("../middlewares/auth");

const express = require('express');
const Router = express.Router();

Router.get('/getArtisian', auth.isArtist, artisianControllers.getArtisian);

module.exports = Router;