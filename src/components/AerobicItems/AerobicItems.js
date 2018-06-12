import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import DeleteIcon from '@material-ui/icons/Delete';


const styles = {
  card: {
    maxWidth: 375,
    marginBottom: 12,
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
};


const mapStateToProps = state => ({
    user: state.user,
});

class AerobicItems extends Component {
    render() {
const{classes} = this.props;
        return (
            <div>
            <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image="https://images.unsplash.com/photo-1521816043604-6bbe57d1c281?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=12f47e521de9f423319bf0c2a656ac00&auto=format&fit=crop&w=500&q=60"
          title="Aerobic Training"
        />
          <CardContent>
            <Typography variant="headline" component="h1">
              New article: {this.props.article.title}
            </Typography>
            <Typography component="p">
            Article source: <a href="{this.props.article.link}" target="{this.props.article.link}" >{this.props.article.link}</a>
            </Typography>
            <Typography component="p">
            Exercise type: {this.props.article.article_type}
            </Typography>
            <Typography component="p">
            Study details: {this.props.article.study_details}
            </Typography>
            Date posted: {moment(this.props.article.date_posted).format('MMMM Do YYYY')}
          </CardContent>
          <CardActions>
            <Button variant="fab" mini color="secondary" aria-label="delete" onClick={() => this.props.delete(this.props.article)}><DeleteIcon/></Button><br />
          </CardActions>
        </Card>
                {/* <p>
                New article: {this.props.article.title} <br/>
                Article url: <a href="{this.props.article.link}">{this.props.article.link}</a><br/>
                Exercise type: {this.props.article.article_type}<br/>
                Study details: {this.props.article.study_details}<br/>
                Date posted: {moment(this.props.article.date_posted).format('MMMM Do YYYY')}<br/>
                user_id: {this.props.article.user_id}<br/>
                Delete article: <button onClick={() => this.props.delete(this.props.article)}>Delete</button><br/>
                </p> */}
            </div>
        );

        AerobicItems.propTypes = {
            classes: PropTypes.object.isRequired,
          };
    }



}

export default connect(mapStateToProps)(withStyles(styles)(AerobicItems));

