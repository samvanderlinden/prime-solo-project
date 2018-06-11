import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';
import { Link } from 'react-router-dom';
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
import moment from 'moment';
import DeleteIcon from '@material-ui/icons/Delete';


const styles = {
  card: {
    maxWidth: 345,
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

// function SimpleCard(props) {
//   const { classes } = props;
//   const bull = <span className={classes.bullet}>•</span>;


const mapStateToProps = state => ({
  user: state.user,
});

class StrengthItems extends Component {
  

  render() {
    const{classes} = this.props;
    return (
      <div>
        <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image="https://images.unsplash.com/photo-1526401485004-46910ecc8e51?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=126329be8d7b9c484ee5e2981fe1f907&auto=format&fit=crop&w=500&q=60"
          title="Strength Training"
        />
          <CardContent>
            <Typography variant="headline" component="h1">
              New article: {this.props.article.title}
            </Typography>
            <Typography component="p">
            Article source <a href="{this.props.article.link}">{this.props.article.link}</a>
            </Typography>
            Exercise type {this.props.article.article_type}<br />
            Study details {this.props.article.study_details}<br />
            Date posted {moment(this.props.article.date_posted).format('MMMM Do YYYY')}<br />
          </CardContent>
          <CardActions>
            <Button variant="fab" mini color="secondary" aria-label="delete" onClick={() => this.props.delete(this.props.article)}><DeleteIcon/></Button><br />
          </CardActions>
        </Card>
      </div>

    );
  }

}
StrengthItems.propTypes = {
  classes: PropTypes.object.isRequired,
};

// export default withStyles(styles)(SimpleCard);

export default connect(mapStateToProps)(withStyles(styles)(StrengthItems));

