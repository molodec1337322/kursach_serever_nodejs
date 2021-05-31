const {User} = require("../models/user")
const {Hero} = require("../models/hero")
const {Spell} = require("../models/spell")
const {Hero_spell} = require("../models/hero_spell")
const jwt_decode = require("jwt-decode")
const keys = require("../config/keys")

/**

@param {JSON} req none
@param {JSON} res 
[
    {
        "id_hero": 1,
        "user_id": 3,
        "name": "name",
        "skill_points": 0
    }
]

*/
module.exports.getHeroes = async function(req, res){
	//console.log(req.headers.authorization)
	const decode = jwt_decode(req.headers.authorization.split(" ")[1])
	const userEmail = decode.email

	User.findOne({where: {email: userEmail}})
		.then(user => {
			Hero.findAll()
			.then(heroes => {
				res.status(200).json(heroes)
			})
			.catch(err => {
				console.log(err)
				res.status(500).json({message: "Server error"})
			})
			
		})
		.catch(err => {
			console.log(err)
			res.status(500).json({message: "Server error"})
		})
}


/**
* @param {JSON} req {hero_name: "name"}
* @param {JSON} res {message: "Created"}
 */
module.exports.createNewHero = async function(req, res){
	const decode = jwt_decode(req.headers.authorization.split(" ")[1])
	const userEmail = decode.email

	User.findOne({where: {email: userEmail}})
		.then(user => {
			Hero.create({
				user_id: user.id_user,
				name: req.body.hero_name,
				skill_points: 0
			})
			.then(hero => {
				res.status(200).json({message: "Created"})
			})
			.catch(err => {
				console.log(err)
				res.status(500).json({message: "Server error"})
			})
			
		})
		.catch(err => {
			console.log(err)
			res.status(500).json({message: "Server error"})
		})
}

/**
 * 
 * @param {JSON} req {"hero_id": 1236}
 * @param {JSON} res 
 * [
    {
        "id_spell": 2,
        "mana_use": 12,
        "damage": 54,
        "rate_of_fire": 36,
        "speed": 59,
        "range": 78,
        "element": "fire",
        "spell_name": "fireball"
    },
    {
        "id_spell": 3,
        "mana_use": 12,
        "damage": 54,
        "rate_of_fire": 356,
        "speed": 39,
        "range": 78,
        "element": "water",
        "spell_name": "waterball"
    }
]
 */
module.exports.getHeroSpells = function(req, res){
	Hero_spell.findAll({where: {hero_id: req.body.hero_id}})
		.then(heroes_spells => {
			//console.log(heroes_spells)
			let final_response = []
			for(let i = 0; i < heroes_spells.length; i++){
				Spell.findOne({where: {id_spell: heroes_spells[i].spell_id}})
					.then(spell => {
						final_response.push(spell)
						if(final_response.length == heroes_spells.length){
							res.status(200).json(final_response)
						}
					})
					.catch(err => {
						console.log(err)
						res.status(500).json({message: "Server error"})
					})
			}
		})
		.catch(err => {
			console.log(err)
			res.status(500).json({message: "Server error"})
		})
}

/***
 * @param {JSON} req {"id_spell": 3}
 * @param {JSON} res 
 * {
    "id_spell": 3,
    "mana_use": 12,
    "damage": 54,
    "rate_of_fire": 36,
    "speed": 59,
    "range": 78,
    "element": "fire",
    "spell_name": "fireball"
	}
 */
module.exports.getOneHeroSpell = function(req, res){
	Spell.findOne({where: {id_spell: req.body.id_spell}})
		.then(spell => {
			res.status(200).json(spell)
		})
		.catch(err => {
			console.log(err)
			res.status(500).json({message: "Server error"})
		})
}

/**
 * 
 * @param {JSON} req {"hero_id": 1236, "mana_use": 12, "damage": 54, "rate_of_fire": 36, "speed": 59, "range": 78, "element": "fire", "spell_name": "fireball"}
 * @param {JSON} res {}
 */
module.exports.saveHeroSpell = async function(req, res){
	Spell.create({
		mana_use: req.body.mana_use,
		damage: req.body.damage,
		rate_of_fire: req.body.rate_of_fire,
		speed: req.body.speed,
		range: req.body.range,
		element: req.body.element,
		spell_name: req.body.spell_name
	})
	.then(spell => {
		Hero_spell.create({
			hero_id: req.body.hero_id,
			spell_id: spell.id_spell
		})
		.then(result => {
			res.status(200).json({
				message: "spell created"
			})
		})
		.catch(err => {
			console.log(err)
			res.status(500).json({message: "Server error"})
		})
	})
	.catch(err => {
		console.log(err)
		res.status(500).json({message: "Server error"})
	})
}

/**
 * 
 * @param {JSON} req {"spell_id": 2545, "mana_use": 12, "damage": 54, "rate_of_fire": 36, "speed": 59, "range": 78, "element": "fire", "spell_name": "fireball"}
 * @param {JSON} res {}
 */
module.exports.editHeroSpell = async function(req, res){
	Spell.update({
		mana_use: req.body.mana_use,
		damage: req.body.damage,
		rate_of_fire: req.body.rate_of_fire,
		speed: req.body.speed,
		range: req.body.range,
		element: req.body.element,
		spell_name: req.body.spell_name
	}, {where: {id_spell: req.body.spell_id}})
		.then(spell => {
			res.status(200).json({
				message: "edited"
			})
		})
		.catch(err => {
			console.log(err)
			res.status(500).json({message: "Server error"})
		})
}
