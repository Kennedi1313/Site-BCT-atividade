import React, { Component } from 'react';
import axios from 'axios';

class Signup extends Component {

  submitUser(loginUser) {
    axios.request({
      method: 'post',
      url: 'http://localhost:3000/api/Reviewers/',
      data: loginUser
    }).then(response => {
      console.log(loginUser);
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
        <h1>Sign Up</h1>
        <form onSubmit={this.onSubmit.bind(this)}>
          <div className="input-field">
            <input type="text" name="email" ref="email" />
            <label htmlFor="email">Email</label>
          </div>
          <div className="input-field">
            <input type="password" name="password" ref="password" />
            <label htmlFor="password">  Password</label>
          </div>
          <input type="submit" value="Create Account" className="btn blue darken-3" />
        </form>
      </div>
    )
  }
}
export default Signup;