import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class AddReview extends Component {
    constructor(){
        super();
        this.state = {
            rating: ''
        }
    }

    setRating(event) {
        this.setState({rating: event.target.value});
    }

    addReview(newReview){
        console.log(newReview);
        axios.request({
            method: 'post',
            url: 'http://localhost:3000/api/Reviews',
            data: newReview
        }).then(response => {
            this.props.history.push('/');
        }).catch(err => console.log(err));
    }
    
    onSubmit(e) {
        let userId = localStorage.getItem('userId');
        const newReview = {
            date: '',
            rating: this.state.rating,
            comments: this.refs.comments.value,
            id: '',
            coffeeShopId: this.refs.name.value,
            publisherId: userId
        }

        this.addReview(newReview);

        e.preventDefault();
    }

    

    render() {

        return (
            <div className="container">
                <form onSubmit={this.onSubmit.bind(this)}>

                    <div className="input-field">
                        <select ref="name">
                            <option value="" disabled selected>Choose the coffee shop</option>
                            <option value="1">Bel Cafe</option>
                            <option value="2">Caffe Artigiano</option>
                            <option value="3">Three Bees Coffee House</option>
                        </select>
                        <label>Coffee shop name</label>
                    </div>

                    <div onChange={event => this.setRating(event)}>
                        <label>Rating</label>
                        <p >
                            <label>
                                <input name="rating" type="radio" value="1" ref="rating" />
                                <span><i className="fa fa-star"/> 1</span>
                            </label>
                            <label>
                                <input name="rating" type="radio" value="2" ref="rating"/>
                                <span><i className="fa fa-star "/> 2</span>
                            </label>
                            <label>
                                <input name="rating" type="radio" value="3" ref="rating"/>
                                <span><i className="fa fa-star"/> 3</span>
                            </label>
                            <label>
                                <input name="rating" type="radio" value="4" ref="rating"/>
                                <span><i className="fa fa-star"/> 4</span>
                            </label>
                            <label>
                                <input name="rating" type="radio" value="5" ref="rating"/>
                                <span><i className="fa fa-star"/> 5</span>
                            </label>
                        </p>
                    </div>

                    <div className="input-field">
                        <textarea id="comments" ref="comments" className="materialize-textarea"></textarea>
                        <label htmlFor="comments">Comments</label>
                    </div>

                    <input type="submit" value="Save" className="btn" />
                </form>
            </div>
        )
    }
}

export default AddReview;