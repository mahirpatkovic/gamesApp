import React, { useState } from 'react';
import { IconButton, Button, Menu, MenuItem } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import MenuDrawer from '../MenuDrawer';
import SettingsIcon from '@material-ui/icons/Settings';
import { NavLink, useHistory } from 'react-router-dom';

import LoginModal from '../LoginModal';
import SignupModal from '../SignupModal';
import PersonIcon from '@material-ui/icons/Person';
import logo from './logo.png';
import logo2 from './logo2.png';
import navBox from './navBox.png'
import './style.css';
import { useSelector } from 'react-redux';
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import LogoutModal from '../LogoutModal';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useMediaQuery } from 'react-responsive';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(1),
        color: '#ffc107',
    },
    settingsMenu: {
        color: "black",
        backgroundColor: 'transparent',
        zIndex: 3,
        marginTop: '2rem',
        marginRight: '7rem',
        '&:hover': {
            backgroundColor: 'black',
            color: 'white'
        },
        '@media (min-width: 1024px) and (max-width: 1300px)': {
            marginRight: '2rem'
        },
    },
    shoppingButton: {
        color: 'black',
        zIndex: 3,
        marginTop: '2rem',
        '&:hover': {
            backgroundColor: 'black',
            color: 'white'
        },
    },
    userButton: {
        backgroundColor: 'white',
        zIndex: 3,
        marginTop: '2rem',
        marginRight: '8rem',
        '@media (min-width: 1024px) and (max-width: 1300px)': {
            marginRight: '1rem'
        },

    },
    shoppingResponsive: {
        color: 'white',
        marginLeft: '10px',
    },
    settingsResponsive: {
        color: 'white',
        marginLeft: '20px',
        marginRight: '-15px',
    }
}));

function NavigationBar() {
    const classes = useStyles();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [openMenu, setOpenMenu] = useState(null);
    const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
    const [isSignupModalVisible, setIsSignupModalVisible] = useState(false);
    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
    const [click, setClick] = useState(false);

    const isUserLoggedIn = useSelector(state => state.auth.isAuthenticated);
    const currentUser = useSelector(state => state.auth.currentUser);
    const history = useHistory();
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-device-width: 1025px)'
    })
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


    const openUserProfilePage = () => {
        history.push('/user-profile');
        closeMenuHandler();
    }
    const handleCloseNotification = () => {
        setIsAlertVisible(false);
    }

    const openLogoutModalHandler = () => {
        setIsLogoutModalVisible(true);
    }

    const closeLogoutModalHandler = () => {
        closeMenuHandler();
        setIsLogoutModalVisible(false);
    }

    return (
        <div className="navMaster">
            {isDesktopOrLaptop ? <nav className="navbar">
                <div className="navBox"><img alt="navBox" src={navBox} /></div>
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
                    <Button className={classes.shoppingButton} >
                        <ShoppingCartIcon />
                    </Button>
                    {(isUserLoggedIn && currentUser) && <div>
                        <Button
                            aria-controls="simple-menu"
                            aria-haspopup="true"
                            variant="contained"
                            onClick={openMenuHandler}
                            className={classes.userButton}
                        >
                            {currentUser.displayName}
                            <PersonIcon />
                        </Button>
                    </div>}
                    {!isUserLoggedIn && <div>
                        <Button
                            aria-controls="simple-menu"
                            aria-haspopup="true"
                            onClick={openMenuHandler}
                            className={classes.settingsMenu}
                        >
                            <SettingsIcon />
                        </Button>
                    </div>}
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
                                <MenuItem onClick={openLogoutModalHandler}>Logout</MenuItem>
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

                        <ShoppingCartIcon className={classes.shoppingResponsive} />

                        {(isUserLoggedIn && currentUser) ?
                            <PersonIcon
                                onClick={openMenuHandler}
                                className={classes.settingsResponsive}
                            />
                            :
                            <SettingsIcon
                                onClick={openMenuHandler}
                                className={classes.settingsResponsive}
                            />}
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
                                    <MenuItem onClick={openLogoutModalHandler}>Logout</MenuItem>
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
            {
                isLoginModalVisible && <LoginModal
                    visible={isLoginModalVisible}
                    onClose={closeLoginModalHandler}
                />
            }
            {
                isSignupModalVisible && <SignupModal
                    visible={isSignupModalVisible}
                    onClose={closeSignupModalHandler}
                />
            }
            {
                isLogoutModalVisible && <LogoutModal
                    visible={isLogoutModalVisible}
                    onClose={closeLogoutModalHandler}
                />
            }
        </div >
    );
}
export default NavigationBar;
