import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';
import axios from 'axios';
import YogaItems from '../YogaItems/YogaItems';

const mapStateToProps = state => ({
    user: state.user,
});

class YogaPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newYogaArticle: {
                title: '',
                link: '',
                article_type: '',
                study_details: '',
                date_posted: '',
                user_id: '',
            },
            allYogaArticles: [],
        }
    }

    handleChange = propertyName => event => {
        this.setState({
            newYogaArticle: {
                ...this.state.newYogaArticle,
                [propertyName]: event.target.value,
            }
        });
    }


    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        this.getYogaArticles();
    }

    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            this.props.history.push('home');
        }
    }


    getYogaArticles = () => {
        axios.get('/api/articles/yoga').then((response) => {
            console.log('GET yoga articles response.data', response.data);
            this.setState({
                allYogaArticles: response.data
            })
        })
            .catch((error) => {
                console.log('error on GET yoga', error)
            })
    }

    addNewYogaArticle = event => {
        event.preventDefault();
        console.log('post button clicked');
        console.log('addNewYogaArticle', this.state.newYogaArticle);
        axios.post('/api/articles/yoga', this.state.newYogaArticle).then(response => {
            console.log(response);
            this.getYogaArticles();
        }).catch(error => {
            console.log('error on yoga articles post', error);
        })
        this.setState({
            newYogaArticle: {
                title: '',
                link: '',
                article_type: '',
                study_details: '',
                date_posted: '',
                user_id: '',
            }
        })
    }

    render() {
        let content = null;

        if (this.props.user.userName) {
            content = (
                <div>
                    <p>
                        Yoga Training Page
                     </p>
                     <form onSubmit={this.addNewYogaArticle}>
                     <input className="input" onChange={this.handleChange('title')} value={this.state.newYogaArticle.title} placeholder='Article Title' />
                        <input className="input" onChange={this.handleChange('link')} value={this.state.newYogaArticle.link} placeholder='Article url here' />
                        <input className="input" onChange={this.handleChange('article_type')} value={this.state.newYogaArticle.article_type} placeholder='Exercise Category' />
                        <input className="input" onChange={this.handleChange('study_details')} value={this.state.newYogaArticle.study_details} placeholder='Study details here' />
                        <input type="date" className="input" onChange={this.handleChange('date_posted')} value={this.state.newYogaArticle.date_posted} placeholder='Date posted' />
                        <input className="input" onChange={this.handleChange('user_id')} value={this.state.newYogaArticle.user_id} placeholder='user_id' />
                        <input className="button" type="submit" value="Post article" />
                    </form>
                    <div>
                        <ul>
                            {this.state.allYogaArticles.map(article =>
                                <YogaItems key={article.id}
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

export default connect(mapStateToProps)(YogaPage);