import React, { useRef, useState } from 'react'
import { Grid, Avatar, TextField, Button, Dialog, DialogContent, DialogActions } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';
import { Alert, AlertTitle } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
    singupButton: {
        margin: "20px 0",
        width: "50%",
        backgroundColor: "black",
        '&:hover': {
            backgroundColor: '#ffc107'
        }
    },
    closeButton: {
        color: 'white',
        backgroundColor: 'black',
        '&:hover': {
            backgroundColor: '#ffc107'
        }
    }
}))
function SignupModal(props) {
    const [values, setValues] = useState({
        displayName: '',
        email: '',
        password: '',
    });
    const [isAlertVisible, setIsAlertVisible] = useState(false);

    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const formRef = useRef();

    const handleInputChange = (val) => (event) => {
        setValues({ ...values, [val]: event.target.value });
    };

    const handleSignup = () => {
        axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCrEB1r3iKHWXKZ53Cz-7G7uUpwOjoF2yM`, values)
            .then(res => {
                if (res.status === 200) {
                    dispatch(authActions.login());
                    dispatch(authActions.setUser(res.data));
                    localStorage.setItem('userToken', res.data.idToken);
                    props.onClose();
                    history.push('/');
                }
            })
            .catch(() => {
                setIsAlertVisible(true);
                formRef.current.reportValidity();
            })
    }
    return (
        <div>

            <Dialog
                onClose={props.onClose}
                open={props.visible}
            >
                <DialogContent dividers             >

                    <Grid align='center'>
                        <Avatar style={{ backgroundColor: 'black' }}><LockOutlinedIcon /></Avatar>
                        <h2>Signup</h2>
                    </Grid>
                    {isAlertVisible && <Alert severity="warning">
                        <AlertTitle>Warning</AlertTitle>
                        Signup failed — <strong> Try again !</strong>
                    </Alert>}
                    <form ref={formRef}>
                        <TextField
                            id='displayName'
                            label='Username'
                            placeholder='Enter username'
                            fullWidth
                            required
                            style={{ marginTop: 10 }}
                            onChange={handleInputChange('displayName')}
                        />
                        <TextField
                            id='email'
                            label='Email'
                            placeholder='Enter mail'
                            type='email'
                            fullWidth
                            required
                            style={{ marginTop: 10 }}
                            onChange={handleInputChange('email')}
                        />
                        <TextField
                            id='password'
                            label='Password'
                            placeholder='Enter password'
                            type='password'
                            fullWidth
                            required
                            style={{ marginTop: 10 }}
                            onChange={handleInputChange('password')}
                        />
                    </form>
                    <Grid align='center'>
                        <Button
                            type='submit'
                            color='primary'
                            variant="contained"
                            className={classes.singupButton}
                            fullWidth
                            onClick={handleSignup}
                        >
                            Signup
                        </Button>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={props.onClose} className={classes.closeButton} >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

        </div>

    )
}

export default SignupModal;
