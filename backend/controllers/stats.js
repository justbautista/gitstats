// import service functions from service files
const { getAllRepos } = require("../services/stats")
const { aggregate } = require("../helpers/calculate")

const getAgreggateStats = async (req, res) => {
    const { username, forked } = req.body

    try {
        const allRepos = await getAllRepos(username)
        const aggregatedStats = aggregate(allRepos.data, forked)

        return res.json(aggregatedStats)
    }
    catch (error) {
        return res.status(500).send(error.message)
    }
    
}

module.exports = { getAgreggateStats }