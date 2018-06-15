import React, { Component } from 'react';
import { connect } from 'react-redux';
// import Nav from '../../components/Nav/Nav';
// import { USER_ACTIONS } from '../../redux/actions/userActions';
// import { triggerLogout } from '../../redux/actions/loginActions';
// import { Link } from 'react-router-dom';
// import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
// import classNames from 'classnames';
import moment from 'moment';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/ModeEdit';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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

class HiitItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            updateHiitArticle: {
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
          updateHiitArticle: {
            ...this.state.updateHiitArticle,
            [propertyName]: event.target.value,
          }
        });
        console.log('event.target.value', event.target.value)
      }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Card className={classes.card} style={{maxHeight: 425, overflow: 'auto', margin: 8}}>
                    <CardMedia
                        className={classes.media}
                        image="https://images.unsplash.com/photo-1516922654979-6833a58a1b83?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=81c8acc08372891e76bd00e973bbbeb7&auto=format&fit=crop&w=500&q=60"
                        title="High Intensity Interval Training"
                    />
                    <CardContent>
                        <Typography variant="headline" component="h1">
                            Title: {this.props.article.title}
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
                        <Button variant="fab" mini color="secondary" aria-label="delete" onClick={() => this.props.delete(this.props.article)}><DeleteIcon /></Button>
                        <Button variant="fab" mini color="secondary" aria-label="edit" onClick={this.handleClickOpen}><EditIcon /></Button>
                    </CardActions>
                </Card>
                <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogContent>
            <TextField margin="dense" autoFocus fullWidth className="input" onChange={this.handleChangeUpdate('title')} value={this.state.updateHiitArticle.title} placeholder='Article Title' />
            <br />
            <TextField className="input" onChange={this.handleChangeUpdate('link')} value={this.state.updateHiitArticle.link} placeholder='Article url here' />
            <br />
            <FormControl>

              <Select
                value={this.state.updateHiitArticle.article_type}
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
              className="input" onChange={this.handleChangeUpdate('study_details')} value={this.state.updateHiitArticle.study_details} placeholder='Study details here' />
            <br />
            <TextField type="date" className="input" onChange={this.handleChangeUpdate('date_posted')} value={this.state.updateHiitArticle.date_posted} placeholder='Date posted' />

          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button variant="fab" color="primary" aria-label="add" onClick={() => this.props.update(this.state.updateHiitArticle)}><AddIcon /></Button>
          </DialogActions>
        </Dialog>
            </div>
        );
    }
}

HiitItems.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(HiitItems));