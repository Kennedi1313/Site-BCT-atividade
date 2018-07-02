import React, { Component } from 'react';
import axios from 'axios';
import ReviewItem from './ReviewItem';
import { Link } from 'react-router-dom';

class MyReviews extends Component {
    constructor() {
        super();
        this.state = {
            reviews: []
        }
    }

    componentWillMount() {
        this.getReviews();
    }

    getReviews() {
        let userId = localStorage.getItem('userId');
        axios.get(`http://localhost:3000/api/Reviewers/${userId}/reviews`).then(response => {
            this.setState({ reviews: response.data }, () => {
                //console.log(this.state);
            })
        }).catch(err => console.log(err));
    }

    render() {
        const reviewItems = this.state.reviews.map((reviews, i) => {
            return (
                <div key={reviews.id}>
                    <ReviewItem item={reviews} key={reviews.id} />
                    <Link className="btn" to={`Reviews/edit/${reviews.id}`}>Edit</Link>
                    <button className="btn red right">Delete</button>
                </div>
            )
        })
        return (
            <div className="container">
                <ul className="collection">
                    {reviewItems}
                </ul>
            </div>
        )
    }
}

export default MyReviews;