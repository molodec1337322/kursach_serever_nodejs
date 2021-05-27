const Sequelize = require("sequelize")
const db = require("../config/database")

const Item_user = db.define("item_user", {})

module.exports.Item_user = Item_user