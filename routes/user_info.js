const express = require("express")
const controller = require("../controllers/user_info")
const router = express.Router()

router.get("/getHeroes", controller.getHeroes)

router.post("/createHero", controller.creteNewHero)

module.exports = router