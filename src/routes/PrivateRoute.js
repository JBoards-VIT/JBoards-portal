import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, mobileComponent: MobileComponent, ...rest }) => {
    const LoggedIn = useSelector(state => state.auth.isLoggedIn)
    const width = window.innerWidth;
    return (
        <Route {...rest} render={props => (
            LoggedIn ?
                width <= 1024 && MobileComponent ? <MobileComponent {...props} /> : <Component {...props} />
                : <Redirect to="/login" />
        )} />
    );
};

export default PrivateRoute;