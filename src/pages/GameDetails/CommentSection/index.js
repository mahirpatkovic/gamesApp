import React, { useEffect, useState } from 'react';
import { Button, Comment, Form, Header, Icon } from 'semantic-ui-react';
import { useSelector } from "react-redux";
import axios from 'axios';
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { List, notification } from 'antd';
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
let today = new Date();
let day = today.getDate();
let month = today.getMonth() + 1;
let year = today.getFullYear();
let hour = today.getHours();
let min = today.getMinutes();

today = day + '.' + month + '.' + year + ' - ' + hour + ':' + min;
function CommentSection(props) {
    const currentUser = useSelector(state => state.auth.currentUser);
    const [newComment, setNewComment] = useState({
        gameId: props.gameId,
        comment: "",
        date: today,
    });
    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const [comments, setComments] = useState([]);
    const [enteredText, setEnteredText] = useState("");
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const isUserLoggedIn = useSelector(state => state.auth.isAuthenticated);

    useEffect(() => {
        let tmp_comments = [];
        for (let key in props.comments) {
            tmp_comments.unshift(props.comments[key]);
        }
        setComments(tmp_comments);
    }, [props.comments]);

    const handleInputChange = (event) => {
        setEnteredText(event.target.value);
        if (event.target.value) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
        setNewComment({ ...newComment, comment: event.target.value });
    }

    const handleAddComment = () => {
        if (!isUserLoggedIn) {
            setIsAlertVisible(true);
        } else {
            axios.get(`https://gamesapp-f22ad-default-rtdb.europe-west1.firebasedatabase.app/games.json`)
                .then(res => {
                    for (let key in res.data) {
                        const game = res.data[key];
                        if (game.id === props.gameId) {
                            axios.post(`https://gamesapp-f22ad-default-rtdb.europe-west1.firebasedatabase.app/games/${key}/comments.json`, ({ ...newComment, user: currentUser.displayName }))
                                .then(() => {
                                    setComments((prevState) => {
                                        return [{...newComment, user: currentUser.displayName}, ...prevState];
                                    })
                                    notification.open({
                                        message: `Game Commented`,
                                        icon: <Icon name='check circle outline' />,
                                    });
                                    setEnteredText("");
                                    setIsButtonDisabled(true);
                                })
                                .catch(err => {
                                    console.error(err);
                                });
                        }
                    }
                })
                .catch(err => {
                    console.error(err);
                })
        }
    }

    const handleCloseNotification = () => {
        setIsAlertVisible(false);
    }

    return (
        <div>
            <Comment.Group>
                <Header as='h3' dividing>
                    Comments
                </Header>
                {(comments.length > 0) ?
                    <List
                        pagination={{
                            pageSize: 3,
                            responsive: true,
                        }}
                        dataSource={comments}
                        renderItem={comment => (
                            <List.Item>
                                <List.Item.Meta
                                    title={comment.user}
                                    description={comment.date}
                                />
                                {comment.comment}
                            </List.Item>
                        )}
                    >
                    </List>

                    : <p>No comments for this game.</p>}
                <Form reply>
                    <Form.TextArea onChange={handleInputChange} value={enteredText} />
                    <Button
                        content='Comment'
                        labelPosition='left'
                        icon='edit'
                        secondary
                        onClick={handleAddComment}
                        disabled={isButtonDisabled} />
                </Form>
            </Comment.Group>
            {isAlertVisible && <Snackbar
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
                    Comment section only available for users!
                    Please Register!
                </Alert>
            </Snackbar>}

        </div>
    );
};

export default CommentSection;