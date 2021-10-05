import React from 'react'
import Logo from "../Logo"
import { Button } from '@mui/material'
import OAuthButtonTheme from '../../themes/OAuthButtonTheme'
import { ThemeProvider } from '@mui/material'
import "./style.scss"
const Auth = ({ label, image, showOAuth, formComponent }) => {
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
                {showOAuth && <OAuth />}
                {formComponent}
            </div>
        </div>
    )
}

const OAuth = () => {
    return (
        <div className="oauth">
            <p className="oauth__label"><span>Sign in with</span></p>
            <div className="oauth__buttons">
                <OAuthButton
                    logo="https://cdn.icon-icons.com/icons2/2108/PNG/512/google_icon_130924.png"
                    label="Google"
                />
                <OAuthButton
                    logo="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                    label="Github"
                />
            </div>
            <p className="oauth__label"><span>or</span></p>
        </div>
    )
}

const OAuthButton = ({ logo, label }) => {
    return (
        <ThemeProvider theme={OAuthButtonTheme}>
            <div className="oauth__button">
                <Button
                    type="outlined"
                    size="large"
                    fullWidth={true}
                    startIcon={<img className="oauth__button_img" src={logo} alt={label} />}
                >
                    Sign in with {label}
                </Button >
            </div >
        </ThemeProvider>
    )
}

export default Auth
