import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';
import axios from 'axios';
import AerobicItems from '../AerobicItems/AerobicItems';

const mapStateToProps = state => ({
    user: state.user,
});

class AerobicPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newAerobicArticle: {
                title: '',
                link: '',
                article_type: '',
                study_details: '',
                date_posted: '',
                user_id: '',
            },
            allAerobicArticles: [],
        }
    }

    handleChange = propertyName => event => {
        this.setState({
            newAerobicArticle: {
                ...this.state.newAerobicArticle,
                [propertyName]: event.target.value,
            }
        });
    }

    addNewAerobicArticle = event => {
        event.preventDefault();
        console.log('post button clicked');
        console.log('addNewAerobicArticle', this.state.newAerobicArticle);
        axios.post('/api/articles/strength', this.state.newAerobicArticle).then(response => {
            this.getAerobicArticles();
            console.log('addNewAerobicArticle response', response);
        }).catch(error => {
            console.log('error on strengths articles post', error);
        })
        this.setState({
            newAerobicArticle: {
            title: '',
            link: '',
            article_type: '',
            study_details: '',
            date_posted: '',
            user_id: '',
            }
        })
    }

    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        this.getAerobicArticles();
    }

    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            this.props.history.push('home');
        }
    }

    getAerobicArticles = () => {
        axios.get('/api/articles/aerobic').then((response) => {
            console.log('GET aerobic articles response.data', response.data);
            this.setState({
                allAerobicArticles: response.data
            })
        })
            .catch((error) => {
                console.log('error on GET strengths', error)
            })
    }

    render() {
        let content = null;

        if (this.props.user.userName) {
            content = (
                <div>
                    <p>
                        Aerobic Training Page
                    </p>
                    <form onSubmit={this.addNewAerobicArticle}>
                        <input className="input" onChange={this.handleChange('title')} value={this.state.newAerobicArticle.title} placeholder='Article Title' />
                        <input className="input" onChange={this.handleChange('link')} value={this.state.newAerobicArticle.article_url} placeholder='Article url here' />
                        <input className="input" onChange={this.handleChange('article_type')} value={this.state.newAerobicArticle.article_type} placeholder='Exercise Category' />
                        <input className="input" onChange={this.handleChange('study_details')} value={this.state.newAerobicArticle.study_details} placeholder='Study details here' />
                        <input type="date" className="input" onChange={this.handleChange('date_posted')} value={this.state.newAerobicArticle.date_posted} placeholder='Date posted' />
                        <input className="input" onChange={this.handleChange('user_id')} value={this.state.newAerobicArticle.user_id} placeholder='user_id' />

                        {/* <button>Vote up</button>
                        <button>Vote down</button> */}
                        <input className="button" type="submit" value="Post article" />
                    </form>
                    <div>
                        <ul>
                            {this.state.allAerobicArticles.map(article =>
                                <AerobicItems key={article.id}
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


export default connect(mapStateToProps)(AerobicPage);