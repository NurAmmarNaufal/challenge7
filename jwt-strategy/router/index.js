const express = require('express')
const router = express.Router()
const jwtRouter = require('./jwtRouter')

router.get('/', (req, res) => res.send('server on'))
router.use('/jwt', jwtRouter)

module.exports = router