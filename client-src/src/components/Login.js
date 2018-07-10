import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Login extends Component {
    constructor(){
        super();
        this.state = {
            userDetails:''
        }
    }

  submitUser(loginUser) {
    axios.request({
      method: 'post',
      url: 'http://localhost:3000/api/Reviewers/login',
      data: loginUser
    }).then(response => {
        this.setState({userDetails: response.data}, () => {
            let token = this.state.userDetails.id;
            let refreshToken = this.state.userDetails.ttl;
            let userId = this.state.userDetails.userId;
            localStorage.setItem('token', token);
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('userId', userId);
            
        });
      this.props.history.push('/');
    }).catch(err => console.log(err));
  }

  onSubmit(e) {
    const loginUser = {
      email: this.refs.email.value,
      password: this.refs.password.value,
    }
    this.submitUser(loginUser);
    e.preventDefault();
  }

  render() {
    return (
      <div className="container">
        <h1>Login</h1>
        <form onSubmit={this.onSubmit.bind(this)}>
          <div className="input-field">
            <input type="text" name="email" ref="email" />
            <label htmlFor="email">Email</label>
          </div>
          <div className="input-field">
            <input type="password" name="password" ref="password" />
            <label htmlFor="password">  Password</label>
          </div>
          <input type="submit" value="Login" className="btn blue darken-3" />
          <Link className="btn right" to="/signup">Create Account</Link>
        </form>
      </div>
    )
  }
}
export default Login;