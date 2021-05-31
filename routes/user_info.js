const express = require("express")
const controller = require("../controllers/user_info")
const router = express.Router()
const passport = require("passport")

router.get("/getHeroes", passport.authenticate('jwt', {session:false}), controller.getHeroes)

router.post("/createHero", passport.authenticate('jwt', {session:false}), controller.createNewHero)

router.get("/getHeroSpell", passport.authenticate('jwt', {session:false}), controllers.getHeroSpell)

router.post("/saveHeroSpell", passport.authenticate('jwt', {session:false}), controllers.saveHeroSpell)

module.exports = router