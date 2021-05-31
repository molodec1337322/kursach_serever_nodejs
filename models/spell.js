const Sequelize = require("sequelize")
const db = require("../config/database")

const Spell = db.define("spell", {
	id_spell: {
		type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true
	},
	mana_use: {
		type: Sequelize.FLOAT,
    	allowNull: false
	},
	damage: {
		type: Sequelize.FLOAT,
    	allowNull: false
	},
	rate_of_fire: {
		type: Sequelize.FLOAT,
    	allowNull: false
	},
	speed: {
		type: Sequelize.FLOAT,
    	allowNull: false
	},
	range: {
		type: Sequelize.FLOAT,
    	allowNull: false
	},
	element: {
		type: Sequelize.STRING,
		allowNull: false
	},
	spell_name: {
		type: Sequelize.STRING,
		allowNull: false
	}
})

module.exports.Spell = Spell