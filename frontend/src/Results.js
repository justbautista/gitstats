import React, { useEffect, useState } from "react"

export default function Results({ username, forked }) {
    const [results, setResults] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)

        if (username === "") {
            setLoading(false)
            return
        }

        const fetchData = async () => {
            if (forked === "Include Forked") {
                forked = true
            }
            else {
                forked = false
            }

            const data = {
                "username": username,
                "forked": forked
            }

            try {
                const response = await fetch(`${process.env.BACKEND_URL}/stats`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                })

                const responseData = await response.json()

                if (!response.ok) {
                    throw new Error(await responseData.message)
                }
                
                setResults(responseData)
            }
            catch (error) {
                console.error(error)
                setResults(null)
            }

            setLoading(false)
        }

        fetchData()
    }, [username, forked])

    return (
        <div className="container d-flex flex-column justify-content-center">
            {
                loading ?
                <div className="container-fluid text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
                : 
                (results ?
                    <>
                        <div className="w-100">
                            <h1>{ username }</h1>
                        </div>
                        <div className="row row-cols-2 py-2">
                            <div className="col">
                                <h5>Total Repos</h5>
                                <p>{ results["stats"]["total_repos"] }</p>
                            </div>
                            <div className="col">
                                <h5>Total Fork Count</h5>
                                <p>{ results["stats"]["total_fork_count"] }</p>
                            </div>
                        </div>
                        <div className="row row-cols-2 py-2">
                            <div className="col">
                                <h5>Total Stargazers</h5>
                                <p>{ results["stats"]["total_stargazers"] }</p>
                            </div>
                            <div className="col">
                                <h5>Average Repo Size (kB)</h5>
                                <p>{ Math.round(results["stats"]["average_repo_size"] * 10) / 10 }</p>
                            </div>
                        </div>
                        <div className="row text-center py-2">
                            <h5 className="text-center">Bytes of Each Language Used</h5>
                            <div className="d-flex flex-wrap">
                                {
                                    results["stats"]["list_of_languages"].map(pair => (
                                        <div className="card m-2">
                                            <div className="card-body">
                                                <h5 className="card-title">{ pair[0] }</h5>
                                                <p className="card-text">{ pair[1] }</p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </>
                    :
                    <h5 className="text-center">There are no results</h5>
                )
            }
        </div>
    )
}