// import service functions from service files
const { getAllRepos } = require("../services/stats")

const getAgreggateStats = async (req, res) => {
    const { username, forked } = req.body
    const allRepos = await getAllRepos(username)
    
    return res.json(allRepos)
}

module.exports = { getAgreggateStats }