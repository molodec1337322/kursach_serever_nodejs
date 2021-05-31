const {User} = require("../models/user")
const {Hero} = require("../models/hero")
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
 * @param {JSON} req {}
 * @param {JSON} res {}
 */
module.exports.getHeroSpell = async function(req, res){
	const decode = jwt_decode(req.headers.authorization.split(" ")[1])
	const userEmail = decode.email

	User.findOne({where: {email: userEmail}})
		.then(user => {
			
		})
		.catch(err => {
			console.log(err)
			res.status(500).json({message: "Server error"})
		})
}

/**
 * 
 * @param {JSON} req {}
 * @param {JSON} res {}
 */
module.exports.saveHeroSpell = async function(req, res){
	const decode = jwt_decode(req.headers.authorization.split(" ")[1])
	const userEmail = decode.email

	User.findOne({where: {email: userEmail}})
		.then(user => {
			
		})
		.catch(err => {
			console.log(err)
			res.status(500).json({message: "Server error"})
		})
}