import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import history from '../history';

class Navbar extends Component {
    constructor (){
        super();
        this.state = {logado: false}
    }

    postLogout(token){
        axios.request({
            method: 'post',
            url: `http://localhost:3000/api/Reviewers/logout?access_token=${token}`,
        }).then(response => {
            this.setState({logado: false});
            localStorage.clear();
            history.push('/');
        }).catch(err => console.log(err));
    }

    logout(e){
        let token = localStorage.getItem('token');
        this.postLogout(token);
        e.preventDefault();
    }

    render() {
        let onShow;
        let onShowAuth;
        if(!localStorage.getItem('token')){
            onShowAuth = 'hide';
            onShow = '';
        }else{
            onShowAuth = '';
            onShow = 'hide';
        }
        return (
            <div>
                <nav className="nav-extended blue darken-3">
                    <div className="nav-wrapper">
                        <a href="/" className="brand-logo">Coffee Shop Reviews</a>
                        <button onClick={this.logout.bind(this)} className={`btn grey right ${onShowAuth}`}>Log Out</button>
                    </div>

                    <div className="nav-content">
                        <ul className="tabs tabs-transparent">
                            <li className="tab"><Link to="/" className="active">
                                <i className="fa">All Reviews</i>
                            </Link>
                            </li>
                            <li className="tab"><Link to="/MyReviews" className={onShowAuth}>
                                <i className="fa">My Reviews</i>
                            </Link>
                            </li>
                            <li className="tab"><Link to="/AddReview" className={onShowAuth}>
                                <i className="fa">Add Review</i>
                            </Link>
                            </li>
                            <li className="tab"><Link to="/signup" className={onShow}>
                                <i className="fa">Sign Up</i>
                            </Link>
                            </li>
                            <li className="tab"><Link to="/login" className={onShow}>
                                <i className="fa">Log In</i>
                            </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Navbar;