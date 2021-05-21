const Sequelize = require("sequelize")
const db = require("../config/database")

const User = db.define("user",  {
    id_user:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false
    },
    remember_token:{
        type:Sequelize.STRING,
        allownull: true
    },
    created_at:{
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
});


module.exports.User = User