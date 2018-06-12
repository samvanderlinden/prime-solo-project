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
import Icon from '@material-ui/core/Icon';


const styles = {
  card: {
    width: 395,
    height: 450,
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

class StrengthItems extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     open: false,
  //   }
  // }

  // handleClickOpen = () => {
  //   this.setState({ open: true });
  // };

  // handleClose = () => {
  //   this.setState({ open: false });
  // };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Card className={classes.card} style={{maxHeight: 375, overflow: 'auto', margin: 8}}>
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
            <Button variant="fab" mini color="secondary" aria-label="delete" onClick={() => this.props.delete(this.props.article)}><DeleteIcon /></Button>
            {/* <Button variant="fab" mini color="secondary" aria-label="edit" onClick={this.handleClickOpen}><Icon>edit_icon</Icon></Button> */}
          </CardActions>
        </Card>
      </div>
    );
  }
}

StrengthItems.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(StrengthItems));

