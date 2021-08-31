import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Grid, Form, Accordion, Button, Radio, Message, Icon } from "semantic-ui-react";
import { authActions } from "../../store/auth";
import { useMediaQuery } from 'react-responsive';
import { notification } from 'antd';
import './style.css';

function UserProfile() {

    const [activeIndex, setActiveIndex] = useState(0);
    const [isDisabled, setIsDisabled] = useState(true);
    const [userValues, setUserValues] = useState({
        email: '',
        username: '',
    })
    const [passwordValues, setPasswordValues] = useState({
        newPassword: '',
        repNewPassword: '',
    })
    const [isErrorMessageVisible, setIsErrorMessageVisible] = useState(false);
    const dispatch = useDispatch();
    const isTabletOrMobile = useMediaQuery({
        query: '(max-device-width: 1024px)'
    })
    useEffect(() => {
        const userToken = localStorage.getItem('userToken');
        if (userToken) {
            axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCrEB1r3iKHWXKZ53Cz-7G7uUpwOjoF2yM`, { idToken: userToken })
                .then(res => {
                    dispatch(authActions.setUser(res.data));
                    setUserValues({ email: res.data.email, username: res.data.displayName })
                })
        }
    }, []);

    const onClickOpenAccordion = (e, title) => {
        const { index } = title;
        if (index === 0) {
            setActiveIndex(-1)
        } else {
            setActiveIndex(0)
        }
    }

    const onChangePasswordHandler = (e) => {
        const { id, value } = e.target;
        setPasswordValues({ ...passwordValues, [id]: value });
    }

    const handleDisableEdit = (e, value) => {
        if (value.checked === true) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }

    const confirmUpdateHandler = () => {
        const userToken = localStorage.getItem('userToken');
        if (passwordValues.newPassword === passwordValues.repNewPassword) {
            axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCrEB1r3iKHWXKZ53Cz-7G7uUpwOjoF2yM`, { idToken: userToken, password: passwordValues.newPassword })
                .then(res => {
                    localStorage.removeItem('userToken');
                    localStorage.setItem('userToken', res.data.idToken);
                    notification.open({
                        message: `Password Changed`,
                        icon: <Icon name='check circle outline' />,
                    });
                    setPasswordValues({
                        oldPassword: '',
                        newPassword: '',
                        repNewPassword: '',
                    })
                    setIsErrorMessageVisible(false);
                    setActiveIndex(0)
                })
                .catch(err => {
                    console.error(err);
                })
        }
        else {
            setIsErrorMessageVisible(true);
        }
    }
    const handleInputChange = (val) => (event) => {
        setUserValues({ ...userValues, [val]: event.target.value });
    };

    const updateProfileHandler = () => {
        const userToken = localStorage.getItem('userToken');
        // let newUserToken = ''
        axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCrEB1r3iKHWXKZ53Cz-7G7uUpwOjoF2yM`, { idToken: userToken, displayName: userValues.username, email: userValues.email })
            .then(res => {
                localStorage.removeItem('userToken');
                localStorage.setItem('userToken', res.data.idToken);
                notification.open({
                    message: `Profile Updated`,
                    icon: <Icon name='check circle outline' />,
                });
            })
            .catch(err => {
                console.error(err);
            })
    }
    const isConfirmButtonDisabled = !passwordValues.newPassword || !passwordValues.repNewPassword;

    return (
        <div style={{ display: 'flex' }}>
            <div className="userProfile">
                <div style={{ float: 'right' }}>
                    <Radio toggle label='Edit Profile' onChange={handleDisableEdit} />
                </div>
                <Grid.Column>
                    <Form >
                        <Form.Field>
                            <label>Username</label>
                            <input
                                id='username'
                                placeholder='Username'
                                defaultValue={userValues && userValues.username} disabled={isDisabled}
                                onChange={handleInputChange('username')}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Email</label>
                            <input
                                id='email'
                                placeholder='Email'
                                defaultValue={userValues && userValues.email}
                                disabled={isDisabled}
                                onChange={handleInputChange('email')}
                            />
                        </Form.Field>
                    </Form>
                    <Accordion styled style={{ marginTop: 20, width: isTabletOrMobile && '100%' }}>
                        <Accordion.Title
                            content='Password Change'
                            onClick={onClickOpenAccordion}
                            index={activeIndex}
                        />
                        <Accordion.Content active={activeIndex}>
                            <Form error>

                                <Form.Field>
                                    <label>New password</label>
                                    <input
                                        id='newPassword'
                                        placeholder='New password'
                                        onChange={onChangePasswordHandler}
                                        value={passwordValues.newPassword}
                                        type='password'
                                    />
                                </Form.Field>
                                <Form.Field
                                >
                                    <label>Repeat new password</label>
                                    <input placeholder='Repeat new password'
                                        id='repNewPassword'
                                        onChange={onChangePasswordHandler}
                                        value={passwordValues.repNewPassword}
                                        type='password'
                                    />
                                </Form.Field>
                                {isErrorMessageVisible && <Message
                                    error
                                    header='Passwords do not match'
                                    content='Please try again!!!'
                                />}
                                {/* <Message
                                    error
                                    header='This is your current password'
                                    content='Please try again!!!'
                                /> */}
                                <Button secondary onClick={confirmUpdateHandler} disabled={isConfirmButtonDisabled}>Confirm</Button>
                            </Form>
                        </Accordion.Content>
                    </Accordion>
                    <Button secondary onClick={updateProfileHandler} disabled={isDisabled} style={{ marginTop: 20 }}>Update profile</Button>
                </Grid.Column>
            </div>

        </div>
    )
}

export default UserProfile;