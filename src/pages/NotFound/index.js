import React, { useEffect } from 'react'
import Logo from '../../components/Logo'
import CustomButton from '../../components/CustomButton'
import pageNotFound from "../../assets/images/pageNotFound.svg"
import { useHistory } from 'react-router'
import "./style.scss"
const NotFound = () => {
    const history = useHistory()
    useEffect(() => {
        document.title = "404 Not Found"
    }, [])
    return (
        <div className="notFound">
            <div className="notFound__nav">
                <Logo />
            </div>
            <div className="notFound__body">
                <div className="notFound__body-left">
                    <img className="notFound__image" src={pageNotFound} alt="Page Not Found" />
                </div>
                <div className="notFound__body-right">
                    <h1>Oops !</h1>
                    <p>Sorry, The page  you are looking for does not exist.</p>
                    <CustomButton
                        onPress={() => history.replace("/login")}
                        label="Go Home!"
                    />
                </div>
            </div>
        </div>
    )
}

export default NotFound
