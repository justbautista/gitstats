import React from "react"

export default function Search({ setUsername, forked, setForked }) {

    const handleSearch = (event) => {
        if (event.key === "Enter") {
            setUsername(event.target.value)
        }
    }

    return (
        <div className="container-fluid d-flex flex-row justify-content-center align-items-center my-5">
            <div className="form-group">
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="GitHub Username"
                    onKeyDown={ handleSearch }
                    ></input>
            </div>
            <div className="btn-group ms-2">
                <button 
                    type="button" 
                    className={ `btn btn-outline-success ${ forked === "Include Forked" ? "active" : ""}` }
                    onClick={ () => setForked("Include Forked") }
                >
                    Include Forked
                </button>
                <button 
                    type="button" 
                    className={ `btn btn-outline-danger ${ forked === "Exclude Forked" ? "active" : ""}` }
                    onClick={ () => setForked("Exclude Forked") }
                >
                    Exclude Forked
                </button>
            </div>
        </div>
    )
}