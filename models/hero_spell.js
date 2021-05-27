const Sequelize = require("sequelize")
const db = require("../config/database")

const Hero_spell = db.define("hero_spell", {
	id_hero_spell:{
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
	spell_id: {
		type: Sequelize.INTEGER,
    	allowNull: false
	}
})

module.exports.Hero_spell = Hero_spell