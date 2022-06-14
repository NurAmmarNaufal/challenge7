const express = require('express')
const restrict = require('../middleware/restrict')
const router = express.Router()
const authRouter = require('./playerRouter')

router.get('/', restrict, (req, res) => res.render('index'))
router.use('/player', authRouter)

module.exports = router