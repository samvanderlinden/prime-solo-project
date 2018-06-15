import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import EditIcon from '@material-ui/icons/ModeEdit';

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

class AerobicItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      updateAerobicArticle: {
        title: this.props.article.title,
        link: this.props.article.link,
        article_type: this.props.article.article_type,
        study_details: this.props.article.study_details,
        date_posted: this.props.article.date_posted,
        user_id: this.props.article.user_id,
        id: this.props.article.id,
      }
    }
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChangeUpdate = propertyName => event => {
    this.setState({
      updateAerobicArticle: {
        ...this.state.updateAerobicArticle,
        [propertyName]: event.target.value,
      }
    });
    console.log('event.target.value', event.target.value)
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Card className={classes.card} style={{ maxHeight: 425, overflow: 'auto', margin: 8 }}>
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
              Article source: <a href={this.props.article.link} target="_blank" >Go to article</a>
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
            <Button variant="fab" mini color="secondary" aria-label="delete" onClick={() => this.props.delete(this.props.article)}><DeleteIcon /></Button><br />
            <Button variant="fab" mini color="secondary" aria-label="edit" onClick={this.handleClickOpen}><EditIcon /></Button>
          </CardActions>
        </Card>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogContent>
            <TextField margin="dense" autoFocus fullWidth className="input" onChange={this.handleChangeUpdate('title')} value={this.state.updateAerobicArticle.title} placeholder='Article Title' />
            <br />
            <TextField className="input" onChange={this.handleChangeUpdate('link')} value={this.state.updateAerobicArticle.link} placeholder='Article url here' />
            <br />
            <FormControl>

              <Select
                value={this.state.updateAerobicArticle.article_type}
                onChange={this.handleChangeUpdate('article_type')}
                displayEmpty
              >
                <MenuItem value={'strength training'}>Strength Training</MenuItem>
                <MenuItem value={'aerobic training'}>Aerobic Training</MenuItem>
                <MenuItem value={'high intensity interval training'}>High Intensity Interval Training</MenuItem>
                <MenuItem value={'yoga'}>Yoga</MenuItem>
              </Select>
            </FormControl>
            <br />
            <TextField
              multiline={true}
              rows={4}
              className="input" onChange={this.handleChangeUpdate('study_details')} value={this.state.updateAerobicArticle.study_details} placeholder='Study details here' />
            <br />
            <TextField type="date" className="input" onChange={this.handleChangeUpdate('date_posted')} value={this.state.updateAerobicArticle.date_posted} placeholder='Date posted' />
            <br />
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button variant="fab" color="primary" aria-label="add" onClick={() => this.props.update(this.state.updateAerobicArticle)}><AddIcon /></Button>
          </DialogActions>
        </Dialog>
      </div>
    );

    AerobicItems.propTypes = {
      classes: PropTypes.object.isRequired,
    };
  }



}

export default connect(mapStateToProps)(withStyles(styles)(AerobicItems));

