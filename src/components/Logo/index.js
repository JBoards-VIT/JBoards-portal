import React from 'react'
import { Link } from 'react-router-dom'
import logo from "../../assets/images/logo.png"
import "./style.scss"
const Logo = () => {
    return (
        <Link to="/">
            <div className="logo">
                <img className="logo__image" src={logo} alt="JBoards" />
                <h1 className="logo__text">JBoards</h1>
            </div>
        </Link>
    )
}

export default Logo
