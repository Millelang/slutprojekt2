const express = require('express')
const router = express.Router()
const { body, matchedData, validationResult } = require('express-validator')
const bcrypt = require('bcrypt');
const pool = require('../db.js')


router.get('/', (req, res) => {
    res.render('index.njk')
    })

module.exports = router