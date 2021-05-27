const Sequelize = require("sequelize")
const db = require("../config/database")

const Hero_spell = db.define("hero_spell", {})

module.exports.Hero_spell = Hero_spell