const { getData } = require("../services/stats")

const aggregate = async (data, forked, username) => {
	let repoData = data
	let stats = {
		"total_repos": 0,
		"total_stargazers": 0,
		"total_fork_count": 0,
		"average_repo_size": 0,
		"list_of_languages": [],
	}
    let totalRepoSize = 0
    let languageData = {}
    let languageDict = {}

	if (!forked) {
		repoData = data.filter((repo) => repo["fork"] === false)
	}
    
	for (const repo of repoData) {
        stats["total_repos"]++
        stats["total_stargazers"] += repo["stargazers_count"]
        stats["total_fork_count"] += repo["forks_count"]
        
        totalRepoSize += repo["size"]

        try {
            languageData = await getData(repo["languages_url"])

            if (Object.keys(languageData).length > 0) {
                for (const language in languageData) {
                    if (language in languageDict) {
                        languageDict[language] += languageData[language]
                    }
                    else {
                        languageDict[language] = languageData[language]
                    }
                }
            }
        }
        catch (error) {
            console.error(error.status, error.message, error.stack)
            throw new Error("Error Calculating")
        }
	}
    
    for (const language in languageDict) {
        stats["list_of_languages"].push([language, languageDict[language]])
    }

    stats["average_repo_size"] = totalRepoSize / stats["total_repos"]
    stats["list_of_languages"].sort((a, b) => b[1] - a[1])

    const aggregateStats = {
        "user": username,
        "forked": forked,
        "stats": { stats }
    }

	return aggregateStats
}

module.exports = { aggregate }
