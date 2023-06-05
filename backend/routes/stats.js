// import express
// creates a Router instance
const express = require("express")
const router = express.Router()

// import logic functions from controller files
const { getAgreggateStats } = require("../controllers/stats")

// set route path to speficied function from controllers
router.post("/", getAgreggateStats)

// export router for use in app.js
module.exports = router
