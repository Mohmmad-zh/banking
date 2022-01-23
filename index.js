const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config
const Joi = require("joi")
const JoiObjectId = require("joi-objectid")
Joi.objectid = JoiObjectId(Joi)
const users = require("./Routes/users")
const accounts = require("./Routes/accounts")
const cards = require("./Routes/cards")
const operations = require("./Routes/operations")
const faker = require("faker")
mongoose
  .connect(`mongodb://localhost:27017/bankDB`)
  .then(() => {
    console.log("connected to mongoDB")
  })
  .catch(error => {
    console.log("failed to connect to mongoDB"), error
  })

const app = express()
app.use(express.json())
app.use(cors())

app.use("/api/auth", users)
app.use("/api", accounts)
app.use("/api", cards)
app.use("/api", operations)

const port = 5000

app.listen(port, () => console.log("server is listening on port... " + port))
