// import service functions from service files
const { getAllRepos } = require("../services/stats")

const getAgreggateStats = async (req, res) => {
    const { username, forked } = req.body

    try {
        const allRepos = await getAllRepos(username)
        return res.json(allRepos)
    }
    catch (error) {
        return res.status(500).send(error.message)
    }
    
}

module.exports = { getAgreggateStats }