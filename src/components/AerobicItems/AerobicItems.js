import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';


const mapStateToProps = state => ({
    user: state.user,
});

class AerobicItems extends Component {


    render() {
        
        // let content = null;

        // if (this.props.user.userName) {
        //     content = (
        //         <div>
        //             <p>New article:{this.props.article_title}</p>
        //             {JSON.stringify(this.props)}
        //         </div>
        //     );
        // }

        return (
            <div>
                <p>
                New article: {this.props.article.title} <br/>
                Article url: <a href="{this.props.article.link}">{this.props.article.link}</a><br/>
                Exercise type: {this.props.article.article_type}<br/>
                Study details: {this.props.article.study_details}<br/>
                Date posted: {this.props.article.date_posted}<br/>
                </p>
            </div>
        );
    }



}

export default connect(mapStateToProps)(AerobicItems);

