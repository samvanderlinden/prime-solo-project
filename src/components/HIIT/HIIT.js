import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';
import HiitItems from '../HiitItems/HiitItems';
import axios from 'axios';

const mapStateToProps = state => ({
    user: state.user,
});

class HIIT extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newHiitArticle: {
                title: '',
                link: '',
                article_type: '',
                study_details: '',
                date_posted: '',
                user_id: '',
            },
            allHiitArticles: [],
        }
    }

    handleChange = propertyName => event => {
        this.setState({
            newHiitArticle: {
                ...this.state.newHiitArticle,
                [propertyName]: event.target.value,
            }
        });
    }


    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        this.getHiitArticles();
    }

    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            this.props.history.push('home');
        }
    }

    getHiitArticles = () => {
        axios.get('/api/articles/hiit').then((response) => {
            console.log('GET hiit articles response.data', response.data);
            this.setState({
                allHiitArticles: response.data
            })
        })
            .catch((error) => {
                console.log('error on GET hiit', error)
            })
    }

    addNewHiitArticle = event => {
        event.preventDefault();
        console.log('post button clicked');
        console.log('addNewHiitArticle', this.state.newHiitArticle);
        axios.post('/api/articles/hiit', this.state.newHiitArticle).then(response => {
            this.getHiitArticles();
            console.log(response);
        }).catch(error => {
            console.log('error on strengths articles post', error);
        })
        this.setState({
            newHiitArticle: {
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
        axios.delete('/api/articles/hiit', {params: {id: article.id, user_id: article.user_id}})
        .then((response) => {
            console.log('hiit delete response', response);
            this.getHiitArticles();
        })
        .catch((error) => {
            console.log('error on delete hiit article:', error);
            alert('You can only delete the articles you added');
        })
    }

    render() {
        let content = null;

        if (this.props.user.userName) {
            content = (
                <div>
                    <p>
                        High Intensity Interval Training Page
                    </p>
                    <form onSubmit={this.addNewHiitArticle}>
                    <input className="input" onChange={this.handleChange('title')} value={this.state.newHiitArticle.title} placeholder='Article Title' />
                        <input className="input" onChange={this.handleChange('link')} value={this.state.newHiitArticle.link} placeholder='Article url here' />
                        <input className="input" onChange={this.handleChange('article_type')} value={this.state.newHiitArticle.article_type} placeholder='Exercise Category' />
                        <input className="input" onChange={this.handleChange('study_details')} value={this.state.newHiitArticle.study_details} placeholder='Study details here' />
                        <input type="date" className="input" onChange={this.handleChange('date_posted')} value={this.state.newHiitArticle.date_posted} placeholder='Date posted' />
                        <input className="input" onChange={this.handleChange('user_id')} value={this.state.newHiitArticle.user_id} placeholder='user_id' />
                        <input className="button" type="submit" value="Post article" />
                    </form>
                    <div>
                        <ul>
                            {this.state.allHiitArticles.map(article =>
                                <HiitItems key={article.id}
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


export default connect(mapStateToProps)(HIIT);