import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import HiitItems from '../HiitItems/HiitItems';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';

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

class HIIT extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newHiitArticle: {
                title: '',
                link: '',
                article_type: '',
                study_details: '',
                date_posted: '',
            },
            allHiitArticles: [],
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
            newHiitArticle: {
                ...this.state.newHiitArticle,
                [propertyName]: event.target.value,
            }
        });
    }


    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        this.getHiitArticles();
    }

    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            this.props.history.push('home');
        }
    }

    getHiitArticles = () => {
        axios.get('/api/articles/hiit').then((response) => {
            console.log('GET hiit articles response.data', response.data);
            this.setState({
                allHiitArticles: response.data
            })
        })
            .catch((error) => {
                console.log('error on GET hiit', error)
            })
    }

    addNewHiitArticle = event => {
        event.preventDefault();
        console.log('post button clicked');
        console.log('addNewHiitArticle', this.state.newHiitArticle);
        axios.post('/api/articles/hiit', this.state.newHiitArticle).then(response => {
            this.getHiitArticles();
            console.log(response);
        }).catch(error => {
            console.log('error on hiit articles post', error);
        })
        this.setState({
            newHiitArticle: {
                title: '',
                link: '',
                article_type: '',
                study_details: '',
                date_posted: '',
            }
        })
    }

    deleteArticle = article => {
        axios.delete('/api/articles/hiit', { params: { id: article.id, user_id: article.user_id } })
            .then((response) => {
                console.log('hiit delete response', response);
                this.getHiitArticles();
            })
            .catch((error) => {
                console.log('error on delete hiit article:', error);
                swal({
                    title: 'You can only delete the articles you added',
                    icon: 'warning'});
            })
    }

    updateHiitArticle = article => {
        console.log('updatedArticle:', article);
        axios.put('/api/articles/strength', article)
        .then((response) => {
            console.log('put hiit response', response);
            this.getHiitArticles();
        })
        .catch((error) => {
            console.log('error on put hiit article:', error);
            swal({
                title: 'You can only edit articles you added!',
                icon: 'warning',
            });
        })    
    }

    render() {
        let content = null;
        const { classes } = this.props;

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
                            <TextField margin="dense" autoFocus fullWidth className="input" onChange={this.handleChange('title')} value={this.state.newHiitArticle.title} placeholder='Article Title' />
                            <br />
                            <TextField className="input" onChange={this.handleChange('link')} value={this.state.newHiitArticle.link} placeholder='Article url here' />
                            <br />
                            <FormControl>
                                {/* <InputLabel>Exercise</InputLabel> */}
                                <Select
                                    value={this.state.newHiitArticle.article_type}
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
                                className="input" onChange={this.handleChange('study_details')} value={this.state.newHiitArticle.study_details} placeholder='Study details here' />
                            <br />
                            <TextField type="date" className="input" onChange={this.handleChange('date_posted')} value={this.state.newHiitArticle.date_posted} placeholder='Date posted' />
                            <br />
                        </DialogContent>
                        <DialogActions>
                            <Button variant="contained" onClick={this.handleClose}>
                                Cancel
                            </Button>
                            <Button variant="fab" color="primary" aria-label="add" onClick={this.addNewHiitArticle}><AddIcon /></Button>
                        </DialogActions>
                    </Dialog>
                    <div>
                        <ul>
                            <Grid container className={classes.root} spacing={16}>
                                <Grid item xs={12}>
                                    <Grid container className={classes.demo} justify="flex-start">
                                        {this.state.allHiitArticles.map(article =>
                                            <HiitItems key={article.id}
                                                article={article}
                                                delete={this.deleteArticle}
                                                update={this.updateHiitArticle}
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

HIIT.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default connect(mapStateToProps)(withStyles(styles)(HIIT));