import React from 'react'
import UserAvatar from '../UserAvatar'
import Logo from "../Logo"
import "./style.scss"
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom"
import CustomButton from "../CustomButton"

const Nav = () => {
    const LoggedIn = useSelector(state => state.auth.isLoggedIn)
    return (
        <div className="nav">
            <Logo />
            {
                LoggedIn ? <UserAvatar /> : <NavOptions />
            }
        </div>
    )
}

const NavOptions = () => {
    return (
        <div className="nav__options">
            <Link to="/login">
                <span>Login</span>
            </Link>
            {
                window.innerWidth > 576 && (
                    <Link to="/signup">
                        <CustomButton
                            label="Get Started"
                        />
                    </Link>
                )
            }
        </div>
    )
}

export default Nav
