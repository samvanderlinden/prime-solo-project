import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';
import moment from 'moment';


const mapStateToProps = state => ({
    user: state.user,
});

class AerobicItems extends Component {
    render() {

        return (
            <div>
                <p>
                New article: {this.props.article.title} <br/>
                Article url: <a href="{this.props.article.link}">{this.props.article.link}</a><br/>
                Exercise type: {this.props.article.article_type}<br/>
                Study details: {this.props.article.study_details}<br/>
                Date posted: {moment(this.props.article.date_posted).format('MMMM Do YYYY')}<br/>
                user_id: {this.props.article.user_id}<br/>
                Delete article: <button onClick={() => this.props.delete(this.props.article)}>Delete</button><br/>
                </p>
            </div>
        );
    }



}

export default connect(mapStateToProps)(AerobicItems);

