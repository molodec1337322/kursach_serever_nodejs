const Sequelize = require("sequelize")
const db = require("../config/database")

const Spell = db.define("spell", {})

module.exports.Spell = Spell