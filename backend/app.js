// importing modules into application
require("dotenv").config()
const express = require("express")
const cors = require("cors")

// create an express instance
const app = express()

// middleware
app.use(cors())
app.use(express.json())

// setup routers
const statsRouter = require("./routes/stats")

// set url path to specified router
app.use("/stats", statsRouter)

// creates server and starts listening for any incoming requests
const port = process.env.PORT || 3000
app.listen(port)