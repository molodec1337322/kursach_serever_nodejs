const Sequelize = require("sequelize")
const db = require("../config/database")

const Hero = db.define("hero", {
	id_hero: { 
		type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true
    },
    user_id: {
    	type: Sequelize.INTEGER,
    	allowNull: false
    },
    name: {
    	type: Sequelize.STRING,
    	allowNull: false
    },
    skill_points: {
    	type: Sequelize.INTEGER,
    	allowNull: false
    }
});

module.exports.Hero = Hero