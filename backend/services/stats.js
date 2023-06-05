const { Octokit } = require("octokit")
const octokit = new Octokit({
    auth: process.env.ACCESS_TOKEN
})

const getAllRepos = async (username) => {
    try {
        let response = await octokit.rest.repos.listForUser("GET /users/{username}/repos", {
            username: username,
            per_page: 100
        })

        console.log(response.data.length)
    
        return response
    }
    catch (err) {
        console.log('aoishdi')
        return err
    }
}

module.exports = { getAllRepos }