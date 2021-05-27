const Sequelize = require("sequelize")
const db = require("../config/database")

const Match = db.define("match", {})

module.exports.Match = Match