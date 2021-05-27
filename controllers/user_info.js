const {User} = require("../models/user")
const {Hero} = require("../models/hero")
const jwt_decode = require("jwt-decode")
const keys = require("../config/keys")

/**

@param {JSON} req {token: "fdsfsdf.fdgvfdsg.gfdsgv"}
@param {JSON} res [{name: "molodec", skill_points: 322}]

*/
module.exports.getHeroes = function(req, res){
	//console.log(req.header.authorization)
	const decode = jwt_decode(req.body.token.split(" ")[1])
	const userEmail = decode.email
	res.status(200).json({
		message: userEmail
	})
}