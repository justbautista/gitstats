const { Octokit, App } = require("octokit")
const octokit = new Octokit({
    auth: process.env.ACCESS_TOKEN
})

const getAllRepos = async (username, forked) => {
    try {
        let response = await octokit.request("GET /users/{username}/repos", {
            username: username
        })
    
        return response
    }
    catch (err) {
        console.log('aoishdi')
        return err
    }
}

module.exports = { getAllRepos }