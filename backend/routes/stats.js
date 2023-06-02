// import express
const express = require("express")
// creates a Router instance
const router = express.Router()

// import logic functions from controller files
const { getStats } = require("../controllers/stats")

// set route path to speficied function from controllers
router.post("/", getStats)

// export router for use in app.js
module.exports = router