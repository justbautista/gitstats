import React, { useEffect, useState } from "react"

export default function Results({ username, forked }) {
    const [results, setResults] = useState(null)

    useEffect(() => {
        if (username === "") {
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
                const response = await fetch("http://localhost:8000/stats", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                })
                
                const responseData = await response.json()
                setResults(responseData)
            }
            catch (error) {
                console.error(error)
            }
        }

        fetchData()
    }, [username, forked])

    return (
        <div className="container">
            <pre className="text-wrap">{ results ? JSON.stringify(results) : "There are no results" }</pre>
        </div>
    )
}