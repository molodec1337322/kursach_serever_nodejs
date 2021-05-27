const Sequelize = require("sequelize")
const db = require("../config/database")

const Item = db.define("item", {})

module.exports.Item = Item