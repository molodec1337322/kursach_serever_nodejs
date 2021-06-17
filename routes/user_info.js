const express = require("express")
const controller = require("../controllers/user_info")
const router = express.Router()
const passport = require("passport")

router.get("/getHeroes", passport.authenticate('jwt', {session:false}), controller.getHeroes)

router.post("/createHero", passport.authenticate('jwt', {session:false}), controller.createNewHero)

router.post("/deleteHero", passport.authenticate('jwt', {session:false}), controller.deleteHero)

router.post("/getHeroSpells", passport.authenticate('jwt', {session:false}), controller.getHeroSpells)

router.get("/getOneHeroSpell", passport.authenticate('jwt', {session:false}), controller.getOneHeroSpell)

router.post("/saveHeroSpell", passport.authenticate('jwt', {session:false}), controller.saveHeroSpell)

router.post("/editHeroSpell", passport.authenticate('jwt', {session:false}), controller.editHeroSpell)

router.post("/deleteHeroSpell", passport.authenticate('jwt', {session:false}), controller.deleteHeroSpell)

router.post("/editHeroSpell", passport.authenticate('jwt', {session:false}), controller.editHeroSpell)

router.get("/getItemsAccount", passport.authenticate('jwt', {session:false}), controller.getItemsAccount)

router.post("/saveItemAccount", passport.authenticate('jwt', {session:false}), controller.saveItemAccount)

module.exports = router