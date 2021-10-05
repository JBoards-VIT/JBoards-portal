import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
    const LoggedIn = useSelector(state => state.auth.isLoggedIn)
    return (
        <Route {...rest} render={props => (
            LoggedIn && restricted ?
                <Redirect to="/home" />
                : <Component {...props} />
        )} />
    );
};

export default PublicRoute;