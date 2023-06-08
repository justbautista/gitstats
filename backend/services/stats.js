const { Octokit } = require("octokit")
const octokit = new Octokit({
    auth: process.env.ACCESS_TOKEN
})

const getAllRepos = async (username) => {
    try {
        const response = await octokit.rest.repos.listForUser("GET /users/{username}/repos", {
            username: username,
            per_page: 100
        })
    
        return response
    }
    catch (error) {
        console.error(error.status, error.message)

        if (error.status === 404) {
            throw new Error("User Not Found")
        }
        else {
            throw new Error("API Error")
        }
    }
}

const getData = async (url) => {
    try {
        const response = await octokit.request(url)
        
        return response.data
    }
    catch (error) {
        console.error(error.status, error.message)
        throw new Error("API Error")
    }
}

module.exports = { getAllRepos, getData }