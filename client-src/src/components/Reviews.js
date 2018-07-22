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

    //pega as informações de todas as Reviews do bd
    getReviews(){
        axios.get('http://localhost:3000/api/Reviews').then(response => {
            this.setState({reviews: response.data}, () => {
                //console.log(this.state);
            })
        }).catch(err => console.log(err));
    }

    render(){
        //pega o card de Review construido em ReviewItem.js
        const reviewItems = this.state.reviews.map((reviews, i) => {
            return(
                <ReviewItem item={reviews} key={reviews.id}/>
            )
        });

        //retorna todas as Reviews do bd
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