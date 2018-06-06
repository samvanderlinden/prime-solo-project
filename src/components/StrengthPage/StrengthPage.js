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
        this.state={
            newStrengthArticle: [],
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

    getStrengthArticles = () => {
        axios.get('/api/articles/strength').then((response) => {
            console.log('GET strengths articles response.data', response.data);
            this.setState({
                newStrengthArticle: response.data
            })
        })
            .catch((error) => {
                console.log('error on GET strengths', error)
            })
    }

    addNewStrengthArticle = event => {
        event.preventDefault();
        console.log('addNewStrengthArticle', this.state.newStrengthArticle);
        this.setState({
            newStrengthArticle: {
                article_title: '',
                article_url: '',
                exercise_category: '',
                date_posted: '',
            }
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
                        <input className="input" onChange={this.handleChange('article_title')} value={this.state.newStrengthArticle.article_title} placeholder='Article Title' />
                        <input className="input" onChange={this.handleChange('article_url')} value={this.state.newStrengthArticle.article_url} placeholder='Article url here' />
                        <input className="input" onChange={this.handleChange('exercise_category')} value={this.state.newStrengthArticle.exercise_category} placeholder='Exercise Category' />
                        <input className="button" type="submit" value="Post article" />
                    </form>
                    <div>
                        <ul>
                            {this.state.newStrengthArticle.map(article => 
                               <StrengthItems key={article.id}
                               article={article}
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