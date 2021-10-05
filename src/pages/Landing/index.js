import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
const Landing = () => {
    useEffect(() => {
        document.title = "JBoards"
    }, [])
    return (
        <div>
            <h1>Landing</h1>
            <Link to="/login">Login</Link>
        </div>
    )
}

export default Landing
