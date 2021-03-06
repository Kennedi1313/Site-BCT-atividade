import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Reviews from './Reviews';
import Login from './Login';
import Signup from './Signup';
import MyReviews from './MyReviews';
import AddReview from './AddReview';
import EditReview from './EditReview';

//verifica a validade das variaveis de autenticação
const checkAuth = () => {
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');
    if (!token || !refreshToken) {
        return false;
    }


    return true;
}

//se checkAuth for true, renderiza o componente 
//se checkAuth for false, redireciona para /login
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
        //faz o roteamento
        return (
            <main>
                <Switch>
                    <Route exact path='/' component={Reviews} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/signup' component={Signup} />
                    <AuthRoute exact path='/myReviews/' component={MyReviews} />
                    <AuthRoute exact path='/reviews/add' component={AddReview} />
                    <AuthRoute exact path='/reviews/edit/:id' component={EditReview} />
                </Switch>
            </main>
        )
    }
}
export default Main;