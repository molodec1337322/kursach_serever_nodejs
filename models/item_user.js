const Sequelize = require("sequelize")
const db = require("../config/database")

const Item_user = db.define("item_user", {
	id_item_user: {
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
	item_id: {
		type: Sequelize.INTEGER,
    	allowNull: false
	}
})

module.exports.Item_user = Item_user