// import service functions from service files
const { getAllRepos } = require("../services/stats")

const getAgreggateStats = async (req, res) => {
    const allRepos = await getAllRepos("justbautista", true)
    
    return res.json(allRepos)
}

module.exports = { getAgreggateStats }