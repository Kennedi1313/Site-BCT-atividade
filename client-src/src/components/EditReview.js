import React, { Component } from 'react';
import axios from 'axios';

class EditReview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            rating: '',
            comments: '',
            coffeeShopId: '',
            publisherId: '',
        }

        this.radioChanged = this.radioChanged.bind(this);

    }

    componentWillMount() {
        this.getReviews();
    }

    componentDidMount() {
        this.reload();
    }

    //pega as informações da Review que esta sendo editada
    getReviews() {
        let reviewId = this.props.match.params.id;
        axios.get(`http://localhost:3000/api/Reviews/${reviewId}`).then(response => {
            this.setState({
                id: response.data.id,
                rating: String(response.data.rating),
                comments: response.data.comments,
                coffeeShopId: String(response.data.coffeeShopId)
            }, () => {
                console.log(this.state);
            });
        }).catch(err => console.log(err));
    }

    //atualiza o valor do Radio
    radioChanged(e) {
        this.setState({ rating: e.target.value });
        console.log(this.state.coffeeShopId);
    }

    //atualiza o valor do Select
    dropdownChanged(e) {
        this.setState({ coffeeShopId: e.target.value });
        console.log(this.refs.name.value);
    }

    //atualiza o bd
    EditReview(newReview) {
        let reviewId = this.props.match.params.id;

        axios.request({
            method: 'put',
            url: `http://localhost:3000/api/Reviews/${reviewId}`,
            data: newReview
        }).then(response => {
            this.props.history.push('/');
        }).catch(err => console.log(err));
    }

    //pega os valores do formulario e chama EditReview
    onSubmit(e) {
        let userId = localStorage.getItem('userId');
        const newReview = {
            date: Date.now() - (1000 * 60 * 60 * 24),
            rating: this.state.rating,
            comments: this.refs.comments.value,
            coffeeShopId: this.refs.name.value,
            publisherId: userId
        }

        this.EditReview(newReview);

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

    render() {
        let option_id = ['0', '1', '2', '3'];
        let options = [{ name: 'Selecione uma opção' }, { name: 'Bel Cafe' }, { name: 'Caffe Artigiano' }, { name: 'Three Bees Coffee House' }];
        
        //retorna o formulario para editar uma Review
        return (
            <div className="container" >
                <form onSubmit={this.onSubmit.bind(this)}>

                    <div className="input-field" >
                        <label>Coffee shop name</label>
                        <select ref="name" defaultValue={this.coffeeShopId} onChange={this.dropdownChanged.bind(this)}>
                            {option_id.map(id =>
                                <option key={id} value={id}>{options[id].name}</option>
                            )}
                        </select>
                    </div>

                    <div>
                        <label>Rating</label>
                        <p >
                            <label>
                                <input name="rating" type="radio" value='1' ref="rating" checked={this.state.rating === '1'} onChange={this.radioChanged} />
                                <span> 1 <i className="fa fa-star" /></span>
                                <br />
                            </label>
                            <label>
                                <input name="rating" type="radio" value='2' ref="rating" checked={this.state.rating === '2'} onChange={this.radioChanged} />
                                <span> 2 <i className="fa fa-star " /></span>
                                <br />
                            </label>
                            <label>
                                <input name="rating" type="radio" value='3' ref="rating" checked={this.state.rating === '3'} onChange={this.radioChanged} />
                                <span> 3 <i className="fa fa-star" /></span>
                                <br />
                            </label>
                            <label>
                                <input name="rating" type="radio" value='4' ref="rating" checked={this.state.rating === '4'} onChange={this.radioChanged} />
                                <span> 4 <i className="fa fa-star" /></span>
                                <br />
                            </label>
                            <label>
                                <input name="rating" type="radio" value='5' ref="rating" checked={this.state.rating === '5'} onChange={this.radioChanged} />
                                <span> 5 <i className="fa fa-star" /></span>
                            </label>
                        </p>
                    </div>

                    <div className="input-field">
                        <textarea onChange={() => { this.setState({ comments: this.refs.comments.value }) }} id="comments" ref="comments" className="materialize-textarea" value={this.state.comments}></textarea>
                        <label htmlFor="comments">Comments</label>
                    </div>

                    <input type="submit" value="Save" className="btn" />
                </form>
            </div >
        )
    }
}

export default EditReview;