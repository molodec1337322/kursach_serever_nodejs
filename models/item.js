const Sequelize = require("sequelize")
const db = require("../config/database")

const Item = db.define("item", {
	id_item: {
		type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true
	},
	name: {
		type: Sequelize.STRING,
    	allowNull: false
	},
	cost: {
		type: Sequelize.INTEGER,
    	allowNull: false
	}
})

module.exports.Item = Item