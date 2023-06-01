import os
import requests
import json
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv('API_KEY')

username = "seantomburke"
PER_PAGE = 100

def get_total_repo_count(user):
    response = requests.get(f"https://api.github.com/users/{username}").json()
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
            response = requests.get(f"https://api.github.com/users/{username}/repos?per_page={PER_PAGE}&page={pageNumber}")
            completeRepoList.extend(response.json())   
            pageNumber += 1
            print(response.status_code)
        except:
            print("error", response.status_code)

    return completeRepoList

def buildStats(data):
    pass

repos = get_all_repos(username)
print(len(repos))
with open("api.json", "w") as f:
    f.write(json.dumps(repos))

