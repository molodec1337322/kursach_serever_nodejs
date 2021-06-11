const {User} = require("../models/user")
const {Hero} = require("../models/hero")
const {Spell} = require("../models/spell")
const {Hero_spell} = require("../models/hero_spell")
const {Item} = require("../models/item")
const {Item_user} = require("../models/item_user")
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
				skill_points: 20
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
		"skill_points_used": 20,
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
		"skill_points_used": 20,
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
	"skill_points_used": 20
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
 * @param {JSON} req {"hero_id": 1236, "mana_use": 12, "damage": 54, "rate_of_fire": 36, "speed": 59, "range": 78, "skill_points_used": 20, "element": "fire", "spell_name": "fireball"}
 * @param {JSON} res {}
 */
module.exports.saveHeroSpell = function(req, res){
	Spell.create({
		mana_use: req.body.mana_use,
		damage: req.body.damage,
		rate_of_fire: req.body.rate_of_fire,
		speed: req.body.speed,
		range: req.body.range,
		skill_points_used: req.body.skill_points_used,
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
 * @param {JSON} req {"spell_id": 2545, "mana_use": 12, "damage": 54, "rate_of_fire": 36, "speed": 59, "range": 78, "skill_points_used": 20, "element": "fire", "spell_name": "fireball"}
 * @param {JSON} res {}
 */
module.exports.editHeroSpell = function(req, res){
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

/**
 * 
 * @param {JSON} req {"spell_id": 2545}
 * @param {JSON} res 
 */
module.exports.deleteHeroSpell = function(req, res){
	Hero_spell.destroy({where: {spell_id: spell.id_spell}})
	.then(result => {
		res.status(200).json({message: "spell deleted"})
	})
	.catch(err => {
		console.log(err)
		res.status(500).json({message: "Server error"})
	})
}

/**
 * 
 * @param {JSON} req 
 * @param {JSON} res 
 * [
    {
        "id_item": 1,
        "name": "Poison",
        "cost": 264
    }
   ]
 * 
 */
module.exports.getItemsAccount = function(req, res){
	const decode = jwt_decode(req.headers.authorization.split(" ")[1])
	const userEmail = decode.email

	User.findOne({where: {email: userEmail}})
		.then(user => {
			Item_user.findAll({where: {user_id: user.id_user}})
				.then(items_user => {
					let final_response = []
					for(let i = 0; i < items_user.length; i++){
						Item.findOne({where: {id_item: items_user[i].item_id}})
							.then(item => {
								final_response.push(item)
								if(final_response.length == items_user.length){
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
		})
		.catch(err => {
			console.log(err)
			res.status(500).json({message: "Server error"})
		})
}

/**
 * 
 * @param {JSON} req 
 * @param {JSON} res 
 */
module.exports.getOneItemAccount = function(req, res){

}

/**
 * 
 * @param {JSON} req {"item_name": "Poison", "cost": 264}
 * @param {JSON} res 
 * {
    "message": "item saved"
   }
 */
module.exports.saveItemAccount = function(req, res){
	const decode = jwt_decode(req.headers.authorization.split(" ")[1])
	const userEmail = decode.email

	User.findOne({where: {email: userEmail}})
		.then(userRes => {
			let user = userRes
			Item.create({
				name: req.body.item_name,
				cost: req.body.cost
			})
			.then(item => {
				Item_user.create({
					user_id: user.id_user,
					item_id: item.id_item
				})
				.then(result => {
					res.status(200).json({
						message: "item saved"
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
		})
		.catch(err => {
			console.log(err)
			res.status(500).json({message: "Server error"})
		})
}

/**
 * 
 * @param {JSON} req 
 * @param {JSON} res 
 */
module.exports.deleteItemAccount = function(req, res){

}
