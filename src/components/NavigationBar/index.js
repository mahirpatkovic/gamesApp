import React, { useState } from 'react';
import { IconButton, Button, Menu, MenuItem } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import MenuDrawer from '../MenuDrawer';
import SettingsIcon from '@material-ui/icons/Settings';
import { NavLink, useHistory } from 'react-router-dom';

import LoginModal from '../LoginModal';
import SignupModal from '../SignupModal';
import useWindowSize from '../../utils/useWindowSize';
import PersonIcon from '@material-ui/icons/Person';
import logo from './logo.png';
import logo2 from './logo2.png';
import navBox from './navBox.png'
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store/auth';
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        position: 'fixed',
        zIndex: 1,
        width: '100%',
    },
    menuButton: {
        marginRight: theme.spacing(2),
        color: '#ffc107',
    },
    loginButton: {
        marginRight: theme.spacing(2),
        backgroundColor: 'white',
        '&:hover': {
            backgroundColor: '#ffc107'
        }
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
    navigationLinks: {
        color: "black",
        backgroundColor: "white",
        textDecoration: "none",
    },
    settingsMenu: {
        color: "black",
        backgroundColor: 'white',
        zIndex: 3,
        marginTop: '1.5rem',
        '&:hover': {
            backgroundColor: 'black',
            color: 'white'
        },
    },
    userButton: {
        margin: theme.spacing(0.0),
    }

}));

function NavigationBar() {
    const classes = useStyles();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [openMenu, setOpenMenu] = useState(null);
    const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
    const [isSignupModalVisible, setIsSignupModalVisible] = useState(false);
    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const [click, setClick] = useState(false);
    const { width } = useWindowSize();

    const isUserLoggedIn = useSelector(state => state.auth.isAuthenticated);
    const currentUser = useSelector(state => state.auth.currentUser);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleClick = () => {
        setClick(true);
    }
    const handleClickGames = () => {
        if (isUserLoggedIn) {
            setClick(true);
        } else {
            history.push('/');
            setIsAlertVisible(true);
        }
    }
    const openDrawerHandler = () => {
        setIsDrawerOpen(true);
    }

    const openMenuHandler = (event) => {
        setOpenMenu(event.currentTarget);
    };
    const closeDrawerHandler = () => {
        setIsDrawerOpen(false);
    }

    const closeMenuHandler = () => {
        setOpenMenu(null);
    };

    const openLoginModalHandler = () => {
        setIsLoginModalVisible(true);
    }

    const closeLoginModalHandler = () => {
        setIsLoginModalVisible(false);
        closeMenuHandler();
    }

    const openSignupModalHandler = () => {
        setIsSignupModalVisible(true);
    }

    const closeSignupModalHandler = () => {
        setIsSignupModalVisible(false);
        closeMenuHandler();
    }
    const logoutHandler = () => {
        localStorage.removeItem('userToken');
        dispatch(authActions.logout());
        closeMenuHandler();
        history.push('/');
    }

    const openUserProfilePage = () => {
        history.push('/user-profile');
        closeMenuHandler();
    }
    const handleCloseNotification = () => {
        setIsAlertVisible(false);
    }

    return (
        <div>
            {(width > 1170 && window.innerWidth > 1170) ? <nav className="navbar">
                <div className="navBox"><img src={navBox} /></div>
                <Snackbar
                    open={isAlertVisible}
                    autoHideDuration={3000}
                    onClose={handleCloseNotification}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                >
                    <Alert
                        onClose={handleCloseNotification}
                        severity="warning"
                        style={{ marginTop: 50, backgroundColor: 'black' }}
                    >
                        Accessing Games Page only for users!
                        Please Register!
                    </Alert>
                </Snackbar>
                <div className="nav-container">
                    <NavLink exact to="/" className="nav-logo" >
                        <img alt="logo2" src={logo2} className="nav-logo2" />
                        <img alt="logo" src={logo} className="nav-logo" />
                    </NavLink>
                    <ul className={click ? "nav-menu active" : "nav-menu"}>
                        <li className="nav-item">
                            <NavLink
                                exact
                                to="/"
                                activeClassName="active"
                                className="nav-links"
                                onClick={handleClick}
                            >
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                exact
                                to="/about"
                                activeClassName="active"
                                className="nav-links"
                                onClick={handleClick}
                            >
                                About
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                exact
                                to="/games"
                                activeClassName="active"
                                className="nav-links"
                                onClick={handleClickGames}
                            >
                                Games
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                exact
                                to="/contact"
                                activeClassName="active"
                                className="nav-links"
                                onClick={handleClick}
                            >
                                Contact Us
                            </NavLink>
                        </li>
                    </ul>
                    {(isUserLoggedIn && currentUser) && <Button
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        variant="contained"
                        onClick={openMenuHandler}
                        style={{ backgroundColor: 'white', zIndex: 3, marginTop: '1.5rem' }}
                    >
                        {currentUser.displayName}
                        <PersonIcon />
                    </Button>}
                    {!isUserLoggedIn && <Button
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        variant="contained"
                        onClick={openMenuHandler}
                        className={classes.settingsMenu}
                    >
                        <SettingsIcon />
                    </Button>}
                    <Menu
                        id="simple-menu"
                        anchorEl={openMenu}
                        keepMounted
                        open={Boolean(openMenu)}
                        onClose={closeMenuHandler}
                    >
                        {isUserLoggedIn ?
                            <div>
                                <MenuItem onClick={openUserProfilePage}>My Profile</MenuItem>
                                <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                            </div> : <div>
                                <MenuItem onClick={openLoginModalHandler}>LogIn</MenuItem>
                                <MenuItem onClick={openSignupModalHandler}>SignUp</MenuItem>
                            </div>
                        }
                    </Menu>
                </div>
            </nav>
                : <nav className="navbar">
                    {!isDrawerOpen && <div className="nav-container">
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="open drawer"
                            onClick={openDrawerHandler}
                        >
                            <MenuIcon />
                        </IconButton>
                        <NavLink exact to="/" className="nav-logo" >
                            <img alt="logo2" src={logo2} className="nav-logo2" />
                            <img alt="logo" src={logo} className="nav-logo" />
                        </NavLink>

                        <Button
                            size="small"
                            aria-controls="simple-menu"
                            aria-haspopup="true"
                            variant="contained"
                            style={{ backgroundColor: "white" }}
                            onClick={openMenuHandler}
                        >
                            {(isUserLoggedIn && currentUser) ?
                                <PersonIcon />
                                :
                                <SettingsIcon />}
                        </Button>
                        <Menu
                            id="simple-menu"
                            anchorEl={openMenu}
                            keepMounted
                            open={Boolean(openMenu)}
                            onClose={closeMenuHandler}
                        >
                            {isUserLoggedIn ?
                                <div>
                                    <MenuItem onClick={openUserProfilePage}>My Profile</MenuItem>
                                    <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                                </div> : <div>
                                    <MenuItem onClick={openLoginModalHandler}>LogIn</MenuItem>
                                    <MenuItem onClick={openSignupModalHandler}>SignUp</MenuItem>
                                </div>
                            }
                        </Menu>
                    </div>}
                </nav>}
            <MenuDrawer
                visible={isDrawerOpen}
                onClose={closeDrawerHandler}
            />
            {isLoginModalVisible && <LoginModal
                visible={isLoginModalVisible}
                onClose={closeLoginModalHandler}
            />}
            {isSignupModalVisible && <SignupModal
                visible={isSignupModalVisible}
                onClose={closeSignupModalHandler}
            />}
        </div>
    );
}
export default NavigationBar;
