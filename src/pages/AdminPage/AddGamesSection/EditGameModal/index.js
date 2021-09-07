import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Radio, Input, Label, Icon } from 'semantic-ui-react';
import { notification, Popconfirm } from 'antd';

function EditGameModal(props) {
    const [isDisabled, setIsDisabled] = useState(true);
    const [gameValues, setGameValues] = useState(props.selected)

    useEffect(() => {
        console.log(props.selected)
    }, []);
    const enableEditHandler = (e, value) => {
        if (value.checked === true) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }

    const inputChangeHandler = (e) => {
        const { id, value } = e.target;
        if (id === 'price' || id === 'quantity') {
            setGameValues({ ...gameValues, [id]: Number(value) });
        } else {
            setGameValues({ ...gameValues, [id]: value });
        }
    }

    const updateGameHandler = () => {
        axios.put(`https://gamesapp-f22ad-default-rtdb.europe-west1.firebasedatabase.app/games/${gameValues.id}.json`, gameValues)
            .then(() => {
                notification.open({
                    message: `Game Updated`,
                    icon: <Icon name='check circle outline' />,
                });
            })
            .catch(err => {
                console.error(err);
            })
        props.onClose(gameValues, true);
    }

    const deleteGameHandler = () => {
        axios.delete(`https://gamesapp-f22ad-default-rtdb.europe-west1.firebasedatabase.app/games/${gameValues.id}.json`)
            .then(() => {
                notification.open({
                    message: `Game Deleted`,
                    icon: <Icon name='check circle outline' />,
                });
            })
            .catch(err => {
                console.error(err);
            })
        props.onDelete(gameValues);
    }

    return (
        <div>
            <Modal
                onClose={props.onClose}
                onOpen={props.visible}
                open={props.visible}
                style={{ height: 'auto', top: 'auto', left: 'auto', bottom: 'auto', right: 'auto' }}
                size='tiny'
            >
                <Modal.Header>Game Edit Modal</Modal.Header>
                <br />
                <Radio toggle label='Edit Game' onChange={enableEditHandler} style={{ marginLeft: 20 }} />

                <div style={{ float: 'right', marginRight: 20 }}>
                    <Popconfirm title="Are you sure you want to remove this game?"
                        onConfirm={deleteGameHandler}
                        okText="Yes"
                        cancelText="No">
                        <Button color='red'>
                            Delete Game
                        </Button>
                    </Popconfirm>
                </div>
                <br />
                <Modal.Content>

                    <Modal.Description>
                        <Form >
                            <Form.Group widths='equal'>
                                <Form.Field disabled={isDisabled}>
                                    <label>Game Name</label>
                                    <input
                                        id='name'
                                        placeholder='Game Name'
                                        defaultValue={gameValues.name}
                                        onChange={inputChangeHandler}
                                    />
                                </Form.Field>
                                <Form.Field disabled={isDisabled}>
                                    <label>Game Title</label>
                                    <input
                                        id='title'
                                        placeholder='Game Title'
                                        defaultValue={gameValues.title}
                                        onChange={inputChangeHandler}
                                    />
                                </Form.Field>
                            </Form.Group>

                            <Form.Group widths='equal'>
                                <Form.Field disabled={isDisabled}>
                                    <label>Description</label>
                                    <input
                                        id='description'
                                        placeholder='Description'
                                        defaultValue={gameValues.description}
                                        onChange={inputChangeHandler}
                                    />
                                </Form.Field>
                                <Form.Field disabled={isDisabled}>
                                    <label>Genre</label>
                                    <input
                                        id='genre'
                                        placeholder='Genre'
                                        defaultValue={gameValues.genre}
                                        onChange={inputChangeHandler}
                                    />
                                </Form.Field>
                            </Form.Group>

                            <Form.Group widths='equal'>
                                <Form.Field disabled={isDisabled}>
                                    <label>Developer</label>
                                    <input
                                        id='developer'
                                        placeholder='Developer'
                                        defaultValue={gameValues.developer}
                                        onChange={inputChangeHandler}
                                    />
                                </Form.Field>
                                <Form.Field disabled={isDisabled}>
                                    <label>Modes</label>
                                    <input
                                        id='modes'
                                        placeholder='Modes'
                                        defaultValue={gameValues.modes}
                                        onChange={inputChangeHandler}
                                    />
                                </Form.Field>
                            </Form.Group>

                            <Form.Group widths='equal'>
                                <Form.Field disabled={isDisabled}>
                                    <label>Poster</label>
                                    <input
                                        id='poster'
                                        placeholder='Poster'
                                        defaultValue={gameValues.poster}
                                        onChange={inputChangeHandler}
                                    />
                                </Form.Field>
                                <Form.Field disabled={isDisabled}>
                                    <label>Price</label>
                                    <Input labelPosition='right' placeholder='Price' style={{ width: '100%' }}>
                                        <Label basic>$</Label>
                                        <input
                                            id='price'
                                            type='number'
                                            defaultValue={gameValues.price}
                                            onChange={inputChangeHandler}
                                        />
                                    </Input>
                                </Form.Field>
                            </Form.Group>

                            <Form.Group widths='equal'>
                                <Form.Field disabled={isDisabled}>
                                    <label>Quantity</label>
                                    <input
                                        id='quantity'
                                        placeholder='Quantity'
                                        defaultValue={gameValues.quantity}
                                        onChange={inputChangeHandler}
                                    />
                                </Form.Field>
                                <Form.Field disabled={isDisabled}>
                                    <label>Trailer</label>
                                    <input
                                        id='trailer'
                                        placeholder='Trailer'
                                        defaultValue={gameValues.trailer}
                                        onChange={inputChangeHandler}
                                    />
                                </Form.Field>
                            </Form.Group>

                        </Form>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='black' onClick={props.onClose}>
                        Close
                    </Button>
                    <Button
                        content="Update"
                        labelPosition='right'
                        icon='checkmark'
                        positive
                        onClick={updateGameHandler}
                        disabled={isDisabled}
                    />
                </Modal.Actions>
            </Modal>
        </div >
    )
}

export default EditGameModal;