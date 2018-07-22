import React, { Component } from 'react';
import axios from 'axios';

class ReviewItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: props.item,
            reviewerDetails: '',
            shopDetails: ''
        }
    }

    componentWillMount() {
        this.getReviewer();
        this.getShop();
    }

    //pega as informações do CoffeeShop
    getShop() {
        let shopId = this.props.item.coffeeShopId;
        axios.get(`http://localhost:3000/api/CoffeeShops/${shopId}`).then(response => {
            this.setState({ shopDetails: response.data }, () => {
                //console.log(this.state);
            })
        }).catch(err => console.log(err));
    }

    //pega as informações do Reviewer
    getReviewer() {
        let reviewerId = this.props.item.publisherId;
        axios.get(`http://localhost:3000/api/Reviewers/${reviewerId}`).then(response => {
            this.setState({ reviewerDetails: response.data }, () => {
                //console.log(this.state);
            })
        }).catch(err => console.log(err));
    }

    //retorna um card com um item de Review
    render() {
        return (
            <li className="collection-item">

                {this.state.item.date} | {this.state.shopDetails.name}
                <p>{this.state.reviewerDetails.email}</p>
                <p><i className="fa fa-star"></i>{this.state.item.rating} - {this.state.item.comments}`</p>

            </li>
        )
    }
}

export default ReviewItem;