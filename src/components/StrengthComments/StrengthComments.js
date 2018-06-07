import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';
import axios from 'axios';



const mapStateToProps = state => ({
    user: state.user,
});

class StrengthComments extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        // }
    }

    // handleChange = propertyName => event => {
    //     this.setState({
    //         newStrengthArticle: {
    //             ...this.state.newStrengthArticle,
    //             [propertyName]: event.target.value,
    //         }
    //     });
    //     console.log('event.target.value', event.target.value)
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
        console.log('this.state after render', this.state);
        let content = null;

        if (this.props.user.userName) {
            content = (
                <div>
                    <p>
                        Strength Comments Page
                    </p>
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

export default connect(mapStateToProps)(StrengthComments);