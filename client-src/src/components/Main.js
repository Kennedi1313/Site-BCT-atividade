import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Reviews from './Reviews';
import About from './About';
import Login from './Login';
import Signup from './Signup';
import MyReviews from './MyReviews';
import AddReview from './AddReview';


const checkAuth = () => {
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');
    if (!token || !refreshToken) {
        return false;
    }


    return true;
}

const AuthRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        checkAuth() ? (
            <Component {...props} />
        ) : (
                <Redirect to={{ pathname: './login' }} />
            )
    )} />
)

class Main extends Component {
    render() {
        return (
            <main>
                <Switch>
                    <Route exact path='/' component={Reviews} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/signup' component={Signup} />
                    <AuthRoute exact path='/about' component={About} />
                    <AuthRoute exact path='/MyReviews/' component={MyReviews} />
                    <AuthRoute exact path='/AddReview' component={AddReview} />
                </Switch>
            </main>
        )
    }
}
export default Main;