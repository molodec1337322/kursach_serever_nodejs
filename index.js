require('dotenv').config()
const express = require("express")
const bodyParser = require('body-parser')
const db = require("./config/database")
const cors = require('cors')

const app = express()

const port = process.env.port || 5617

/*
db.sync({alter: true}).then(result=>{
    console.log(result);
    console.log("\n\n\nSynchronized!!!")
    })
.catch(err=> console.log(err));
*/
db.authenticate()
     .then(() => console.log("db connected!"))
     .catch(err => console.log("db connection failed!"))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());

app.get("/", (req, res) => {
    res.json("hello world")
})

console.log("server started at: " + process.env.HOST + ":" + process.env.port);
app.listen(port);