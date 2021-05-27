const Sequelize = require("sequelize")
const db = require("../config/database")

const Hero = db.define("hero", {})

module.exports.Hero = Hero