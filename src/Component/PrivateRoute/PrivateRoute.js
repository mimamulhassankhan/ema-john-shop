import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({user, children, ...rest}) => {
    console.log(user);
    return (
        <Route {...rest} render={({ location }) =>
            // (sessionStorage.getItem('token') || loggedInUser.email) 
            user.email ? ( children ) : (
            <Redirect
                to={{ pathname: "/login", state: { from: location }}}/> )} />
    );
};
const mapStateToProps = state => {
    return {
        user: state.user
    }
} 
export default connect(mapStateToProps)(PrivateRoute);