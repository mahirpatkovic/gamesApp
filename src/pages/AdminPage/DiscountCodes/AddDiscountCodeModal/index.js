import React, { useState } from 'react';
import { Button, Form, Modal, Icon } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { notification } from 'antd';

function ModalExampleModal(props) {
    const [enteredCode, setEnteredCode] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);
    const currentUser = useSelector(state => state.auth.currentUser);

    const handleInputChange = (e) => {
        if (e.target.value.length > 4) {
            setEnteredCode(e.target.value.toUpperCase());
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }

    const saveDiscountCodeHandler = () => {
        axios.post(`https://gamesapp-f22ad-default-rtdb.europe-west1.firebasedatabase.app/discountCodes.json`, { codeId: enteredCode, addedBy: currentUser.displayName })
            .then(() => {
                notification.open({
                    message: `Discount Code Added`,
                    icon: <Icon name='check circle outline' />,
                });
            })
            .catch(err => {
                console.error(err);
            })
        props.onClose(enteredCode, true);
    }

    return (
        <Modal
            centered={false}
            open={props.visible}
            onClose={props.onClose}
            onOpen={props.visible}
            style={{ height: 'auto', top: 'auto', left: 'auto', bottom: 'auto', right: 'auto' }}
        >
            <Modal.Header>Enter Discount Code</Modal.Header>
            <Modal.Content>
                <Form>
                    <Form.Field>
                        <label>Dicount Code</label>
                        <input placeholder='Enter Discount Code' onChange={handleInputChange} />
                    </Form.Field>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button color='black' onClick={props.onClose}>
                    Close
                </Button>
                <Button
                    content="Save"
                    labelPosition='right'
                    icon='checkmark'
                    onClick={saveDiscountCodeHandler}
                    positive
                    disabled={isDisabled}
                />
            </Modal.Actions>
        </Modal>
    )
}

export default ModalExampleModal
