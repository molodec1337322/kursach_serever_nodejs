require('dotenv').config()
const express = require("express")
const bodyParser = require('body-parser')
const passport = require("passport")
const db = require("./config/database")
const cors = require('cors')
const cookieParser = require("cookie-parser");

const app = express()

const port = process.env.port || 5617

const authRouter = require("./routes/auth")
const userInfoRouter = require("./routes/user_info")


db.sync().then(result=>{
    console.log(result);
    console.log("\n\n\nSynchronized!!!")
    })
.catch(err=> console.log(err));


/*
db.authenticate()
     .then(() => console.log("db connected!"))
     .catch(err => console.log("db connection failed!"))
*/

app.use(passport.initialize())
require("./middleware/passport")(passport)


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());
app.use (cookieParser ());

app.use("/auth", authRouter)
app.use("/userInfo", userInfoRouter)

app.get("/", (req, res) => {
    res.json("hello world")
})

console.log("server started at: " + process.env.HOST + ":" + process.env.port);
app.listen(port);