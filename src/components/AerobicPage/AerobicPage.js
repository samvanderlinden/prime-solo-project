import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
// import { triggerLogout } from '../../redux/actions/loginActions';
import axios from 'axios';
import AerobicItems from '../AerobicItems/AerobicItems';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
// import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
// import Input from '@material-ui/core/Input';
// import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
// import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import swal from 'sweetalert';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    control: {
        padding: theme.spacing.unit * 2,
    },
});

const mapStateToProps = state => ({
    user: state.user,
});

class AerobicPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newAerobicArticle: {
                title: '',
                link: '',
                article_type: '',
                study_details: '',
                date_posted: '',
            },
            allAerobicArticles: [],
            open: false,
            spacing: '16',
        }
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleChange = propertyName => event => {
        this.setState({
            newAerobicArticle: {
                ...this.state.newAerobicArticle,
                [propertyName]: event.target.value,
            }
        });
    }

    addNewAerobicArticle = event => {
        event.preventDefault();
        console.log('post button clicked');
        console.log('addNewAerobicArticle', this.state.newAerobicArticle);
        axios.post('/api/articles/strength', this.state.newAerobicArticle)
        .then(response => {
            this.getAerobicArticles();
            console.log('addNewAerobicArticle response', response);
        }).catch(error => {
            console.log('error on error articles post', error);
        })
        this.setState({
            newAerobicArticle: {
                title: '',
                link: '',
                article_type: '',
                study_details: '',
                date_posted: '',
            }
        })
    }

    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        this.getAerobicArticles();
    }

    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            this.props.history.push('home');
        }
    }

    getAerobicArticles = () => {
        axios.get('/api/articles/aerobic').then((response) => {
            console.log('GET aerobic articles response.data', response.data);
            this.setState({
                allAerobicArticles: response.data
            })
        })
            .catch((error) => {
                console.log('error on GET strengths', error)
            })
    }


    deleteArticle = article => {
        axios.delete('/api/articles/aerobic', { params: { id: article.id, user_id: article.user_id } })
            .then((response) => {
                console.log('aerobic delete response', response);
                this.getAerobicArticles();
            })
            .catch((error) => {
                console.log('error on aerobic article:', error);
                alert('You can only delete the articles you added');
            })
    }

    updateAerobicArticle = article => {
        axios.put('/api/articles/aerobic', article)
        .then((response) => {
            console.log('strengths put response', response);
            this.getAerobicArticles();
        })
        .catch((error) => {
            console.log('error on put aerobic article:', error);
            swal({
                title: 'You can only edit articles you added!',
                icon: 'warning',
            });
        })    
    }

    render() {
        let content = null;
        const { classes } = this.props;
        const { spacing } = this.state;

        if (this.props.user.userName) {
            content = (
                <div>
                    <Button color="primary" variant="contained" onClick={this.handleClickOpen}>Add new article</Button>
                    <Dialog
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="form-dialog-title"
                    >
                        <DialogContent>
                            <TextField margin="dense" autoFocus fullWidth className="input" onChange={this.handleChange('title')} value={this.state.newAerobicArticle.title} placeholder='Article Title' />
                            <br />
                            <TextField className="input" onChange={this.handleChange('link')} value={this.state.newAerobicArticle.link} placeholder='Article url here' />
                            <br />
                            <FormControl>
                                {/* <InputLabel>Exercise</InputLabel> */}
                                <Select
                                    value={this.state.newAerobicArticle.article_type}
                                    onChange={this.handleChange('article_type')}
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
                                className="input" onChange={this.handleChange('study_details')} value={this.state.newAerobicArticle.study_details} placeholder='Study details here' />
                            <br />
                            <TextField type="date" className="input" onChange={this.handleChange('date_posted')} value={this.state.newAerobicArticle.date_posted} placeholder='Date posted' />
                            <br />
                        </DialogContent>
                        <DialogActions>
                            <Button variant="contained" onClick={this.handleClose}>
                                Cancel
                            </Button>
                            <Button variant="fab" color="primary" aria-label="add" onClick={this.addNewAerobicArticle}><AddIcon /></Button>
                        </DialogActions>
                    </Dialog>

                    {/* <form onSubmit={this.addNewAerobicArticle}>
                        <input className="input" onChange={this.handleChange('title')} value={this.state.newAerobicArticle.title} placeholder='Article Title' />
                        <input className="input" onChange={this.handleChange('link')} value={this.state.newAerobicArticle.article_url} placeholder='Article url here' />
                        <input className="input" onChange={this.handleChange('article_type')} value={this.state.newAerobicArticle.article_type} placeholder='Exercise Category' />
                        <input className="input" onChange={this.handleChange('study_details')} value={this.state.newAerobicArticle.study_details} placeholder='Study details here' />
                        <input type="date" className="input" onChange={this.handleChange('date_posted')} value={this.state.newAerobicArticle.date_posted} placeholder='Date posted' />
                        <input className="input" onChange={this.handleChange('user_id')} value={this.state.newAerobicArticle.user_id} placeholder='user_id' /> */}

                    {/* <button>Vote up</button>
                        <button>Vote down</button> */}
                    {/* <input className="button" type="submit" value="Post article" />
                    </form> */}
                    <div>
                        <ul>
                            <Grid container className={classes.root} spacing={16}>
                                <Grid item xs={12}>
                                    <Grid container className={classes.demo} justify="flex-start">
                                        {this.state.allAerobicArticles.map(article =>
                                            <AerobicItems key={article.id}
                                                article={article}
                                                delete={this.deleteArticle}
                                                update={this.updateAerobicArticle}
                                            />
                                        )}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </ul>
                    </div>
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

AerobicPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(AerobicPage));