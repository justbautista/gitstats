const aggregate = (data, forked) => {
    const aggregatedStats = data.reduce((result, repo) => {
        result["total_repos"]++
        result["total_stargazers"] += repo["stargazers_count"]
        result["total_forks"] += repo["forks_count"]
        
        return result
    }, {"total_repos": 0, "total_stargazers": 0, "total_forks": 0})
    
    return aggregatedStats
}

module.exports = { aggregate }