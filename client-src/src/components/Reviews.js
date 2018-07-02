import React, {Component} from 'react';
import axios from 'axios';
import ReviewItem from './ReviewItem';

class Reviews extends Component{
    constructor(){
        super();
        this.state = {
            reviews:[]
        }
    }

    componentWillMount(){
        this.getReviews();
    }

    getReviews(){
        axios.get('http://localhost:3000/api/Reviews').then(response => {
            this.setState({reviews: response.data}, () => {
                //console.log(this.state);
            })
        }).catch(err => console.log(err));
    }

    render(){
        const reviewItems = this.state.reviews.map((reviews, i) => {
            return(
                <ReviewItem item={reviews} key={reviews.id}/>
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

export default Reviews;