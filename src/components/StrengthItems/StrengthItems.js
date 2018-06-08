import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import moment from 'moment';

const styles = {
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

// function SimpleCard(props) {
//   const { classes } = props;
//   const bull = <span className={classes.bullet}>•</span>;


const mapStateToProps = state => ({
    user: state.user,
});

class StrengthItems extends Component {

    render() {
        return (
            <div>
                <Card>
                <CardContent>
                  <Typography variant="headline" component="h1">
                New article: {this.props.article.title} <br/>
                </Typography>
                Article source <a href="{this.props.article.link}">{this.props.article.link}</a><br/>
                Exercise type {this.props.article.article_type}<br/>
                Study details {this.props.article.study_details}<br/>
                Date posted {moment(this.props.article.date_posted).format('MMMM Do YYYY')}<br/>
                User id {this.props.article.user_id}<br/>
                {/* username: {this.props.article.username_name}<br/> */}
                <Link to="/strength/comments">See comments</Link>
                </CardContent>
                <CardActions>
                <Button variant="contained" color="secondary" size="small" onClick={() => this.props.delete(this.props.article)}>Delete article</Button><br/>
                </CardActions>
                
                
                </Card>       
            </div>
        );
    }



}

export default connect(mapStateToProps)(StrengthItems);

