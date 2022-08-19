const express = require('express')
const router = express.Router()
const AllGamesController = require('../controllers/AllGamesController')


router.get('/', AllGamesController.allGames)

module.exports = router