import axios from 'axios';
import React, { useEffect } from 'react';
import { Button, Modal } from 'semantic-ui-react';

function MessageViewModal(props) {
    useEffect(() => {
        if (props.selected.isOpen) {
            const tmpContacts = {
                fullName: props.selected.fullName,
                email: props.selected.email,
                message: props.selected.message,
                isOpen: true,
            }
            axios.put(`https://gamesapp-f22ad-default-rtdb.europe-west1.firebasedatabase.app/contactDetails/${props.selected.id}.json`, tmpContacts)
                .then(() => {
                })
                .catch(err => {
                    console.error(err);
                })
        }
    }, []);

    const contact = props.selected;
    return (
        <div>
            <Modal
                onClose={props.onClose}
                onOpen={props.visible}
                open={props.visible}
                style={{ height: 'auto', top: 'auto', left: 'auto', bottom: 'auto', right: 'auto' }}
                size='tiny'
            >
                <Modal.Header>Message</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <p><strong>Contact Person:</strong> {contact.fullName}</p>
                        <p><strong>Email:</strong> {contact.email}</p>
                        <p><strong>Message:</strong> {contact.message}</p>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='black' onClick={props.onClose}>
                        Close
                    </Button>
                </Modal.Actions>
            </Modal>
        </div>
    )
}

export default MessageViewModal;