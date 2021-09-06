import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Table} from 'antd';
import { Icon } from 'semantic-ui-react';
import MessageViewModal from './MessageViewModal';

function ContactDetails() {
    const [contactDetails, setContactDetails] = useState([]);
    const [isMessageViewModalVisible, setIsMessageViewModalVisible] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState(null);

    useEffect(() => {
        axios.get(`https://gamesapp-f22ad-default-rtdb.europe-west1.firebasedatabase.app/contactDetails.json`)
            .then(res => {
                let transformedData = [];
                for (let key in res.data) {
                    const tempData = {
                        id: key,
                        fullName: res.data[key].fullName,
                        email: res.data[key].email,
                        message: res.data[key].message,
                        isOpen: res.data[key].isOpen,
                    }
                    transformedData.push(tempData);
                }
                setContactDetails(transformedData)
            })
    }, []);

    const openMessageModalHandler = (record) => {
        setSelectedMessage(record);
        for (let contact of contactDetails) {
            if (contact.id === record.id) {
                contact.isOpen = true;
            }
        }
        let tmpContacts = [...contactDetails];
        setContactDetails(tmpContacts);
        setIsMessageViewModalVisible(true);
    }

    const closeMessageModalHandler = () =>{
        setIsMessageViewModalVisible(false);
    }

    const contactDetailsColumns = [
        {
            title: 'Name',
            dataIndex: 'fullName',
            key: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Message',
            dataIndex: 'message',
            key: 'message',
        },
        {
            title: 'Open Message',
            dataIndex: 'isOpen',
            key: 'isOpen',
            align: 'center',
            render: (value, record) => <Icon name={value === true ? 'envelope open outline' : 'envelope'}
                size='large'
                style={{ cursor: 'pointer' }}
                onClick={() => openMessageModalHandler(record)}
            />
        }
    ];

    return (
        <div >
            <Card
                bordered={false}
                size="small"
                style={{ backgroundColor: "transparent" }}
                cover={
                    <div>
                        <p
                            style={{
                                fontWeight: "bold",
                                padding: 15,
                                backgroundColor: "#ffc107",
                                fontSize: 16,
                                borderRadius: 3,
                            }}
                        >
                            Contact Details
                        </p>
                    </div>
                }
            >
                <Table
                    columns={contactDetailsColumns}
                    dataSource={contactDetails}
                    rowKey="id"
                    pagination={{ pageSize: 5 }}
                    scroll={{ x: 400 }}
                />
                {isMessageViewModalVisible && <MessageViewModal 
                    visible={isMessageViewModalVisible}
                    onClose={closeMessageModalHandler}
                    selected={selectedMessage}
                />}
            </Card>
        </div>

    )
}

export default ContactDetails;