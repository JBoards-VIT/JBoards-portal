import React from 'react'
import Logo from "../Logo"
import "./style.scss"
const Auth = ({ label, image, formComponent }) => {
    return (
        <div className="auth__page">
            <div className="auth__page__nav">
                <Logo />
            </div>
            <div className="auth__page-left">
                <div className="auth__page-left__body">
                    <img src={image} alt={label} />
                </div>
            </div>
            <div className="auth__page-right">
                <h1>{label}</h1>
                {formComponent}
            </div>
        </div>
    )
}

export default Auth
