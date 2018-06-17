import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/ModeEdit';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Divider from '@material-ui/core/Divider';

const styles = {
  card: {
    width: 375,
    height: 630,
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
  divider: {
    width: '100%',
  }
};

const mapStateToProps = state => ({
  user: state.user,
});

class StrengthItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      updateStrengthArticle: {
        title: this.props.article.title,
        link: this.props.article.link,
        article_type: this.props.article.article_type,
        study_details: this.props.article.study_details,
        date_posted: this.props.article.date_posted,
        user_id: this.props.article.user_id,
        id: this.props.article.id,
      },
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
      updateStrengthArticle: {
        ...this.state.updateStrengthArticle,
        [propertyName]: event.target.value,
      }
    });
    console.log('event.target.value', event.target.value)
  }


  render() {
    const { classes } = this.props;

    return (
      <div>
        <Card className={classes.card} style={{ maxHeight: 630, overflow: 'auto', margin: 8 }}>
          <CardMedia
            className={classes.media}
            image="https://images.unsplash.com/photo-1526401485004-46910ecc8e51?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=126329be8d7b9c484ee5e2981fe1f907&auto=format&fit=crop&w=500&q=60"
            title="Strength Training"
          />
          <CardContent>
            <Typography variant="headline" component="h1" style={{marginBottom: 10}}>
              <b>Title:</b> {this.props.article.title}
              <Divider className={classes.divider} style={{marginLeft: "0"}} inset />
            </Typography>
            <Typography component="p" style={{marginBottom: 10}}>
              <b>Article source:</b> <a href={this.props.article.link} target="_blank" >Go to article</a>
            </Typography>
            <Typography component="p" style={{marginBottom: 10}}>
              <b>Exercise type:</b> {this.props.article.article_type}
            </Typography>
            <Typography component="p" style={{marginBottom: 10}}>
              <b>Study details:</b> {this.props.article.study_details}
            </Typography>
            <Typography>
              <b>Date posted:</b> {moment(this.props.article.date_posted).format('MMMM Do YYYY')}
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant="fab" mini color="secondary" aria-label="delete" onClick={() => this.props.delete(this.props.article)}><DeleteIcon /></Button>
            <Button variant="fab" mini color="secondary" aria-label="edit" onClick={this.handleClickOpen}><EditIcon /></Button>
          </CardActions>
        </Card>

        {/* Edit card modal starts here */}
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogContent>
            <TextField margin="dense" autoFocus fullWidth className="input" onChange={this.handleChangeUpdate('title')} value={this.state.updateStrengthArticle.title} placeholder='Article Title' />
            <br />
            <TextField className="input" onChange={this.handleChangeUpdate('link')} value={this.state.updateStrengthArticle.link} placeholder='Article url here' />
            <br />
            <FormControl>

              <Select
                value={this.state.updateStrengthArticle.article_type}
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
              className="input" onChange={this.handleChangeUpdate('study_details')} value={this.state.updateStrengthArticle.study_details} placeholder='Study details here' />
            <br />
            <TextField type="date" className="input" onChange={this.handleChangeUpdate('date_posted')} value={this.state.updateStrengthArticle.date_posted} placeholder='Date posted' />
            <br />

          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button variant="fab" color="primary" aria-label="add" onClick={() => this.props.update(this.state.updateStrengthArticle)}><AddIcon /></Button>
          </DialogActions>
        </Dialog>

      </div >
    );
  }
}

StrengthItems.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(StrengthItems));

