import React from 'react'
import UserAvatar from '../UserAvatar'
import Logo from "../Logo"
import "./style.scss"

const Nav = () => {
    return (
        <div className="nav">
            <Logo />
            <UserAvatar />
        </div>
    )
}

export default Nav
