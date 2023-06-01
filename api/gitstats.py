import os
import requests
import json
from dotenv import load_dotenv
load_dotenv = load_dotenv("../.env")
access_token = os.getenv("ACCESS_TOKEN")
headers = {"Authorization": "Bearer " + access_token}

username = "justbautista"
PER_PAGE = 100
fork = True

def get_total_repo_count(user):
    response = requests.get(
        f"https://api.github.com/users/{user}", headers=headers
    ).json()
    return response["public_repos"]


def get_all_repos(user):
    totalRepoCount = get_total_repo_count(user)
    pageNumber = 1
    completeRepoList = []

    if totalRepoCount == 0:
        return []

    if totalRepoCount % PER_PAGE == 0:
        totalPages = totalRepoCount // PER_PAGE
    else:
        totalPages = (totalRepoCount // PER_PAGE) + 1

    while pageNumber <= totalPages:
        try:
            response = requests.get(
                f"https://api.github.com/users/{user}/repos?per_page={PER_PAGE}&page={pageNumber}",
                headers=headers,
            )
            completeRepoList.extend(response.json())
            pageNumber += 1
            print(response.status_code)
        except:
            print("error", response.status_code)

    return completeRepoList


def get_language_list(url):
    response = requests.get(url, headers=headers).json()
    languageList = []

    for language, count in response.items():
        languageList.append((language, count))

    return languageList


def buildStats(user, data, forked):
    """
    Total count of repositories
    Total stargazers for all repositories
    Total fork count for all repositories
    Average size of a repository in the appropriate KB, MB or GB
    A list of languages with their counts, sorted by the most used to least used
    """
    totalStarGazers = 0
    totalForkCount = 0
    totalRepoSize = 0
    totalRepoCount = get_total_repo_count(user)
    languageCounts = {}
    listOfLanguages = []

    statsJson = {}
    statsJson["user"] = user
    statsJson["forked"] = forked

    for repo in data:
        languageList = get_language_list(repo["languages_url"])

        if not forked:
            if repo["fork"]:
                continue

        if len(languageList) == 0:
            languageList = [(repo["language"], 1)]

        for language in languageList:
            if language[0] in languageCounts:
                languageCounts[language[0]] += language[1]
            else:
                languageCounts[language[0]] = language[1]

        totalStarGazers += repo["stargazers_count"]
        totalForkCount += repo["forks_count"]
        totalRepoSize += repo["size"]

    avgRepoSize = totalRepoSize / totalRepoCount

    for language, count in languageCounts.items():
        if language is None:
            continue

        listOfLanguages.append((language, count))

    listOfLanguages.sort(key=lambda x: x[1], reverse=True)

    statsJson["stats"] = {
        "total_repo_count": totalRepoCount,
        "total_stargazers_count": totalStarGazers,
        "total_fork_count": totalForkCount,
        "avg_size": avgRepoSize,
        "list_of_languages": listOfLanguages,
    }

    return statsJson

repos = get_all_repos(username)
print(len(repos))
with open("api.json", "w") as f:
    f.write(json.dumps(repos))

with open("result.json", "w") as f:
    f.write(json.dumps(buildStats(username, repos, True)))