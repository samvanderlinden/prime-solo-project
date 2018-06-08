import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';
import { Link } from 'react-router-dom';


const mapStateToProps = state => ({
    user: state.user,
});

class HiitItems extends Component {
    render() {

        return (
            <div>
                <p>
                New article: {this.props.article.title} <br/>
                Article url: <a href="{this.props.article.link}">{this.props.article.link}</a><br/>
                Exercise type: {this.props.article.article_type}<br/>
                Study details: {this.props.article.study_details}<br/>
                Date posted: {this.props.article.date_posted}<br/>
                user_id: {this.props.article.user_id}<br/>
                Delete article: <button onClick={() => this.props.delete(this.props.article)}>Delete</button><br/>
                <Link to="/hiit/comments">See comments</Link>
                </p>
                
            </div>
        );
    }



}

export default connect(mapStateToProps)(HiitItems);