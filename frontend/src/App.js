import React, { useState } from "react"
import Search from "./Search"
import Results from "./Results"

export default function App() {
    const [forked, setForked] = useState("Include Forked")
    const [username, setUsername] = useState("")

	return (
        <>
            <h1 className="display-1 text-center py-5">gitstats</h1>
		    <Search 
                setUsername={ setUsername }
                forked={ forked }
                setForked={ setForked }
            />
            <Results 
                username={ username }
                forked={ forked }
            />
        </>
	)
}
