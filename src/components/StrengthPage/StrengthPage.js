import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';
import axios from 'axios';
import StrengthItems from '../StrengthItems/StrengthItems';


const mapStateToProps = state => ({
    user: state.user,
});

class StrengthPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newStrengthArticle: {
                title: '',
                link: '',
                article_type: '',
                study_details: '',
                date_posted: '',
                user_id: '',
            },
            allStrengthArticles: [],
        }
    }

    handleChange = propertyName => event => {
        this.setState({
            newStrengthArticle: {
                ...this.state.newStrengthArticle,
                [propertyName]: event.target.value,
            }
        });
        console.log('event.target.value', event.target.value)
    }

    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        this.getStrengthArticles();
    }

    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            this.props.history.push('home');
        }
    }

    // votesButton() {
    //     this.setState({
    //         votes: ++this.state.votes
    //     })
    // }

    getStrengthArticles = () => {
        axios.get('/api/articles/strength').then((response) => {
            console.log('GET strengths articles response.data', response.data);
            this.setState({
                allStrengthArticles: response.data
            })
        })
            .catch((error) => {
                console.log('error on GET strengths', error)
            })
    }

    addNewStrengthArticle = event => {
        event.preventDefault();
        console.log('post button clicked');
        console.log('addNewStrengthArticle', this.state.newStrengthArticle);
        axios.post('/api/articles/strength', this.state.newStrengthArticle).then(response => {
            console.log(response);
            this.getStrengthArticles();
        }).catch(error => {
            console.log('error on strengths articles post', error);
        })
        this.setState({
            newStrengthArticle: {
                title: '',
                link: '',
                article_type: '',
                study_details: '',
                date_posted: '',
                user_id: '',
            }
        })
    }

    deleteArticle = article => {
        axios.delete('/api/articles/strength', {params: {id: article.id, user_id: article.user_id}})
        .then((response) => {
            console.log('strengths delete response', response);
            this.getStrengthArticles();
        })
        .catch((error) => {
            console.log('error on delete strength article:', error);
            alert('You can only delete the articles you added');
        })
    }

    render() {
        console.log('this.state after render', this.state);
        let content = null;

        if (this.props.user.userName) {
            content = (
                <div>
                    <p>
                        Strength Training Page
                    </p>
                    <form onSubmit={this.addNewStrengthArticle}>
                        <input className="input" onChange={this.handleChange('title')} value={this.state.newStrengthArticle.title} placeholder='Article Title' />
                        <input className="input" onChange={this.handleChange('link')} value={this.state.newStrengthArticle.link} placeholder='Article url here' />
                        <input className="input" onChange={this.handleChange('article_type')} value={this.state.newStrengthArticle.article_type} placeholder='Exercise Category' />
                        <input className="input" onChange={this.handleChange('study_details')} value={this.state.newStrengthArticle.study_details} placeholder='Study details here' />
                        <input type="date" className="input" onChange={this.handleChange('date_posted')} value={this.state.newStrengthArticle.date_posted} placeholder='Date posted' />
                        <input className="input" onChange={this.handleChange('user_id')} value={this.state.newStrengthArticle.user_id} placeholder='user_id' />
                        <input className="button" type="submit" value="Post article" />
                        {/* <button onClick={this.votesButton}>Votes</button> */}
                    </form>
                    <div>
                        <ul>
                            {this.state.allStrengthArticles.map(article =>
                                <StrengthItems key={article.id}
                                    article={article}
                                    delete={this.deleteArticle}
                                />
                            )}
                        </ul>
                    </div>
                </div>
            );
        }

        return (
            <div>
                <Nav />
                {content}
            </div>
        );
    }
}

export default connect(mapStateToProps)(StrengthPage);