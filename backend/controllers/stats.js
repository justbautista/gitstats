// import service functions from service files
const { getAllRepos } = require("../services/stats")
const { aggregate } = require("../helpers/calculate")

const getAgreggateStats = async (req, res) => {
    const { username, forked } = req.body
    console.log(req.body)
    try {
        const allRepos = await getAllRepos(username)
        const aggregateStats = await aggregate(allRepos.data, forked, username)
        
        return res.json(aggregateStats)
    }
    catch (error) {
        return res.status(500).send(error.message)
    }
    
}

module.exports = { getAgreggateStats }