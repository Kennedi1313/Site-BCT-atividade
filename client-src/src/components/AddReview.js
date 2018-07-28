import React, { Component } from 'react';
import axios from 'axios';

class AddReview extends Component {
    constructor() {
        super();
        this.state = {
            rating: ''
        }

    }

    //atualiza o valor do Radio
    setRating(event) {
        this.setState({ rating: event.target.value });
    }

    //adiciona uma Review no bd
    addReview(newReview) {
        console.log(newReview);

        axios.request({
            method: 'put',
            url: 'http://localhost:3000/api/Reviews',
            data: newReview
        }).then(response => {
            this.props.history.push('/');
        }).catch(err => console.log(err));
    }

    //pega os valores do formulario e chama addReview
    onSubmit(e) {
        let userId = localStorage.getItem('userId');
        const newReview = {
            date: Date.now() - (1000 * 60 * 60 * 24),
            rating: this.state.rating,
            comments: this.refs.comments.value,
            coffeeShopId: this.refs.name.value,
            publisherId: userId
        }

        this.addReview(newReview);

        e.preventDefault();
    }

    //conserta o bug do Select
    reload = () => {
        let flag = localStorage.getItem('add');
        if (flag === 'true') {
            window.location.reload();
            localStorage.setItem('add', false);
        }

    }

    componentDidMount() {
        this.reload();
    }

    render() {
        let option_id = ['0', '1', '2', '3'];
        let options = [{ name: 'Selecione uma opção' }, { name: 'Bel Cafe' }, { name: 'Three Bees Coffee House' }, { name: 'Caffe Artigiano' }];
        
        //retorna o formulario para add uma Review
        return (
            <div className="container" >
                <form onSubmit={this.onSubmit.bind(this)}>
                    <label>Coffee shop name</label>
                    <div className="input-field" >
                        <select ref="name">
                            {option_id.map(id =>
                                <option key={id} value={id}>{options[id].name}</option>
                            )}
                        </select>

                    </div>

                    <div onChange={event => this.setRating(event)}>
                        <label>Rating</label>
                        <p >
                            <label>
                                <input name="rating" type="radio" value="1" ref="rating" />
                                <span> 1 <i className="fa fa-star" /></span>
                                <br />
                            </label>
                            <label>
                                <input name="rating" type="radio" value="2" ref="rating" />
                                <span> 2 <i className="fa fa-star " /></span>
                                <br />
                            </label>
                            <label>
                                <input name="rating" type="radio" value="3" ref="rating" />
                                <span> 3 <i className="fa fa-star" /></span>
                                <br />
                            </label>
                            <label>
                                <input name="rating" type="radio" value="4" ref="rating" />
                                <span> 4 <i className="fa fa-star" /></span>
                                <br />
                            </label>
                            <label>
                                <input name="rating" type="radio" value="5" ref="rating" />
                                <span> 5 <i className="fa fa-star" /></span>
                            </label>
                        </p>
                    </div>

                    <div className="input-field">
                        <textarea id="comments" ref="comments" className="materialize-textarea"></textarea>
                        <label htmlFor="comments">Comments</label>
                    </div>

                    <input type="submit" value="Save" className="btn" />
                </form>
            </div >
        )
    }
}

export default AddReview;