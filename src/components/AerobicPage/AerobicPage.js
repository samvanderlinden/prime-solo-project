import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';

const mapStateToProps = state => ({
    user: state.user,
  });

class AerobicPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newAerobicArticle: {
                article_title: '',
                article_url: '',
                exercise_category: '',
            }
        }
    }

    handleChange = propertyName => event => {
        this.setState({
            newItem: {
                ...this.state.newAerobicArticle,
                [propertyName]: event.target.value,
            }
        });
    }

    // addNewAerobicArticle = () => {

    // }

    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    }

    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            this.props.history.push('home');
        }
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
                        <input className="input" onChange={this.handleChange('article_title')} value={this.state.newAerobicArticle.article_title} placeholder='Article Title' />
                        <input className="input" onChange={this.handleChange('article_url')} value={this.state.newAerobicArticle.article_url} placeholder='Article url here' />
                        <input className="input" onChange={this.handleChange('exercise_category')} value={this.state.newAerobicArticle.exercise_category} placeholder='Exercise Category' />
                        <button>Vote up</button>
                        <button>Vote down</button>
                        <input className="button" type="submit" value="Post article" />
                    </form>
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