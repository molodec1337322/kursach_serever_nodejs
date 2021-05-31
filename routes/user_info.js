const express = require("express")
const controller = require("../controllers/user_info")
const router = express.Router()
const passport = require("passport")

router.get("/getHeroes", passport.authenticate('jwt', {session:false}), controller.getHeroes)

router.post("/createHero", passport.authenticate('jwt', {session:false}), controller.createNewHero)

router.get("/getHeroSpells", passport.authenticate('jwt', {session:false}), controller.getHeroSpells)

router.post("/saveHeroSpell", passport.authenticate('jwt', {session:false}), controller.saveHeroSpell)

router.post("/editHeroSpell", passport.authenticate('jwt', {session:false}), controller.editHeroSpell)

module.exports = router