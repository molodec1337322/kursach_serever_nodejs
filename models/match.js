const Sequelize = require("sequelize")
const db = require("../config/database")

const Match = db.define("match", {
	id_match: {
		type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true
	},
	hero_id: {
		type: Sequelize.INTEGER,
    	allowNull: false
	},
	opponent_id: {
		type: Sequelize.INTEGER,
    	allowNull: false
	},
	end_time: {
		type: "TIMESTAMP",
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
	},
	mob_kills: {
		type: Sequelize.INTEGER,
    	allowNull: false
	},
	player_kills: {
		type: Sequelize.INTEGER,
    	allowNull: false
	},
	points: {
		type: Sequelize.INTEGER,
    	allowNull: false
	}
})

module.exports.Match = Match