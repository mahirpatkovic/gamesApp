import React, { useRef, useState } from 'react'
import { Grid, Avatar, TextField, Button, Dialog, DialogContent, DialogActions, Typography } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';
// import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Alert, AlertTitle } from '@material-ui/lab';
import { notification } from 'antd';
import { Image } from 'semantic-ui-react';
import logo from './logo.png';

const useStyles = makeStyles((theme) => ({
    loginButton: {
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
function LoginModal(props) {
    const [values, setValues] = useState({
        email: '',
        password: '',
    })
    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const [isPasswordResetAlertVisible, setIsPasswordResetAlertVisible] = useState(false);
    const classes = useStyles();
    const dispatch = useDispatch();
    // const history = useHistory();
    const formRef = useRef();

    const handleInputChange = (val) => (event) => {
        setValues({ ...values, [val]: event.target.value });
    };

    const handleLogin = () => {
        axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCrEB1r3iKHWXKZ53Cz-7G7uUpwOjoF2yM`, values)
            .then(res => {
                console.log(res)
                if (res.status === 200) {
                    dispatch(authActions.login());
                    dispatch(authActions.setUser(res.data));
                    localStorage.setItem('userToken', res.data.idToken);
                    props.onClose();
                    let startTime = new Date().getTime();
                    let interval = setInterval(() => {
                        props.onLoad(true);
                        if (new Date().getTime() - startTime > 1000) {
                            props.onLoad(false);
                            notification.open({
                                message: `Welcome ${res.data.displayName}`,
                                icon: <Image src={logo} wrapped style={{ width: 30 }} />,
                            });
                            clearInterval(interval);
                            return;
                        }
                    }, 0);
                    axios.get(`https://gamesapp-f22ad-default-rtdb.europe-west1.firebasedatabase.app/userDetails.json`)
                        .then(rs => {
                            let transformedData = [];
                            for (let key in rs.data) {
                                transformedData.push(rs.data[key]);
                            }
                            for (let user of transformedData) {
                                if (user.authDetails.email === res.data.email) {
                                    dispatch(authActions.setUserDetails(user))
                                    if (user.userValues.isAdmin === true) {
                                        dispatch(authActions.setIsUserAdmin());
                                    }
                                }
                            }
                        })
                        .catch(err => {
                            console.error(err);
                        })
                    // history.push('/');
                }
            })
            .catch(() => {
                setIsAlertVisible(true);
                setIsPasswordResetAlertVisible(false);
                formRef.current.reportValidity();
            })
    }

    const resetPasswordHandler = () => {
        axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCrEB1r3iKHWXKZ53Cz-7G7uUpwOjoF2yM`, { requestType: "PASSWORD_RESET", email: values.email })
            .then(() => {
                console.log('Email sent')
            })
            .catch(err => {
                console.error(err)
                setIsPasswordResetAlertVisible(true);
            })
    }

    return (
        <div>

            <Dialog
                onClose={props.onClose}
                open={props.visible}
            >
                <DialogContent dividers>

                    <Grid align='center'>
                        <Avatar style={{ backgroundColor: 'black' }}><LockOutlinedIcon /></Avatar>
                        <h2>Login</h2>
                    </Grid>
                    {isAlertVisible && <Alert severity="warning">
                        <AlertTitle>Warning</AlertTitle>
                        Login failed — <strong> Try again !</strong>
                    </Alert>}
                    {isPasswordResetAlertVisible && <Alert severity="error">
                        <AlertTitle>Warning</AlertTitle>
                        Email field cannot be empty — <strong> Try again !</strong>
                    </Alert>}
                    <form ref={formRef}>
                        <TextField
                            id="email"
                            label='Email'
                            placeholder='Enter email'
                            type='email'
                            fullWidth
                            required
                            style={{ marginTop: 10 }}
                            onChange={handleInputChange('email')}
                        />
                        <TextField
                            id="password"
                            label='Password'
                            placeholder='Enter password'
                            type='password'
                            fullWidth
                            required
                            style={{ marginTop: 10, marginBottom: 10 }}
                            onChange={handleInputChange('password')}
                        />
                    </form>
                    <Typography onClick={resetPasswordHandler} style={{ cursor: 'pointer', color: 'black' }}><strong>Forgot password?</strong> </Typography>
                    <Grid align='center'>
                        <Button
                            type='submit'
                            color='primary'
                            variant="contained"
                            className={classes.loginButton}
                            fullWidth
                            onClick={handleLogin}
                        >
                            Login
                        </Button>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={props.onClose} className={classes.closeButton}  >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default LoginModal;
