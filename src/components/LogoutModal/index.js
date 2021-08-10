import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { authActions } from '../../store/auth';
import { notification } from 'antd';
import { makeStyles } from '@material-ui/core/styles';
import { Image } from 'semantic-ui-react';
import logo from './logo.png';


const useStyles = makeStyles((theme) => ({
    logoutButton: {
        color: 'white',
        backgroundColor: 'black',
        '&:hover': {
            backgroundColor: 'black',
        }
    },
}));
function LogoutModal(props) {
    const user = useSelector(state => state.auth.currentUser);

    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    const logoutHandler = () => {
        let startTime = new Date().getTime();
        let interval = setInterval(() => {
            props.onLoad(true);
            if (new Date().getTime() - startTime > 1000) {
                props.onLoad(false);
                notification.open({
                    message: `Goodbye ${user.displayName}`,
                    icon: <Image src={logo} wrapped style={{ width: 30 }} />,
                });
                clearInterval(interval);
                return;
            }
        }, 0);
        localStorage.removeItem('userToken');
        dispatch(authActions.logout());
        history.push('/');
        props.onClose();
    }
    return (
        <div>
            <Dialog
                open={props.visible}
                onClose={props.onCLose}
                aria-labelledby="customized-dialog-title"
            >
                <DialogTitle id="customized-dialog-title">Are you sure you want to logout?</DialogTitle>
                <DialogActions>
                    <Button onClick={props.onClose} variant="contained">
                        Close
                    </Button>
                    <Button onClick={logoutHandler} variant="contained" autoFocus className={classes.logoutButton}>
                        Logout
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
export default LogoutModal;