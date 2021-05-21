let Sequelize = require("sequelize");
module.exports = new Sequelize( process.env.DATABASE_NAME,
                                process.env.DATABASE_USERNAME,
                                process.env.DATABASE_PASSWORD, {
    dialect: "postgres",
    host: process.env.HOST,
    define: {
        timestamps: false
    }
});

