import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import history from '../history';

class Navbar extends Component {
    constructor() {
        super();
        this.state = { reviewerDetails: '' }
    }

    //tentativa de consertar o bug do Select
    add() {
        localStorage.setItem('add', true);
    }

    //pega informações do usuario autenticado chamando a função getReviewer, 
    //caso esse exista
    componentWillUpdate() {
        let localId = localStorage.getItem('userId');
        let stateId = this.state.reviewerDetails.id;

        if ((stateId !== localId) && (localId !== null)) {
            this.getReviewer();
        }

    }

    //pega informações do usuario autenticado
    getReviewer() {
        let reviewerId = localStorage.getItem('userId');
        console.log(reviewerId);
        axios.get(`http://localhost:3000/api/Reviewers/${reviewerId}`).then(response => {
            this.setState({ reviewerDetails: response.data }, () => {
                console.log(this.state);
            })
        }).catch(err => console.log(err));
    }

    //faz o logout 
    postLogout(token) {
        axios.request({
            method: 'post',
            url: `http://localhost:3000/api/Reviewers/logout?access_token=${token}`,
        }).then(response => {
            localStorage.clear();
            history.push('/');
        }).catch(err => console.log(err));
    }

    //prepara as informações e chama a função postLogout ao pressionar o botão de logout
    logout(e) {
        let token = localStorage.getItem('token');
        this.postLogout(token);
        e.preventDefault();
    }

    render() {
        let onShow;
        let onShowAuth;

        //variaveis usadas para esconder ou mostrar os botões do navBar,
        //botões a serem mostrados variam se o usuario estiver logado ou não
        if (!localStorage.getItem('token')) {
            onShowAuth = 'hide';
            onShow = '';
        } else {
            onShowAuth = '';
            onShow = 'hide';
        }

        //retorna a barra de menu
        return (
            <div>
                <nav className="nav-extended blue darken-3">
                    <div className="nav-wrapper">
                        <a href="/" className="brand-logo center">Coffee Shop Reviews</a>
                        <a href="/" className={`brand-logo ${onShowAuth}`} >{this.state.reviewerDetails.email}</a>

                    </div>

                    <div className="nav-content">
                        <br />
                        <ul className="tabs tabs-transparent">
                            <li className="tab"><Link to="/" className="active">
                                <i className="fa">All Reviews</i>
                            </Link>
                            </li>
                            <li className="tab"><Link to="/myReviews" className={onShowAuth}>
                                <i className="fa">My Reviews</i>
                            </Link>
                            </li>
                            <li className="tab"><Link to="/reviews/add" onClick={this.add.bind(this)} className={onShowAuth}>
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

                            <button onClick={this.logout.bind(this)} className={`btn grey right ${onShowAuth}`}>Log Out</button>
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Navbar;