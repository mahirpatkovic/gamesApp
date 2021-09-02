import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Popconfirm, Table, Tag } from 'antd';
import Column from 'antd/lib/table/Column';
import { useSelector } from 'react-redux';

function UsersTable() {
    const [users, setUsers] = useState([]);
    const [isSuperAdmin, setIsSuperAdmin] = useState(false);
    const currentUser = useSelector(state => state.auth.currentUser);
    useEffect(() => {
        axios.get(`https://gamesapp-f22ad-default-rtdb.europe-west1.firebasedatabase.app/userDetails.json`)
            .then(res => {
                let transformedData = [];
                for (let key in res.data) {
                    const tempData = {
                        id: key,
                        email: res.data[key].authDetails.email,
                        username: res.data[key].authDetails.username,
                        address: res.data[key].userValues.address,
                        isAdmin: res.data[key].userValues.isAdmin,
                        isSuperAdmin: res.data[key].userValues.isSuperAdmin,
                        phone: res.data[key].userValues.phone,
                    }
                    transformedData.push(tempData);
                    if (res.data[key].authDetails.email === currentUser.email && res.data[key].userValues.isSuperAdmin === true) {
                        setIsSuperAdmin(true);
                    }
                }
                setUsers(transformedData);
            })
    }, []);

    const addUserAsAdminHandler = (user) => {
        const userValues = {
            authDetails: {
                email: user.email,
                username: user.username
            },
            userValues: {
                address: user.address,
                isAdmin: true,
                isSuperAdmin: false,
                phone: user.phone
            }
        }

        axios.put(`https://gamesapp-f22ad-default-rtdb.europe-west1.firebasedatabase.app/userDetails/${user.id}.json`, userValues)
            .then(() => {
                for (let usr of users) {
                    if (usr.id === user.id) {
                        user.isAdmin = true;
                    }
                }
                let usersArray = [...users];
                setUsers(usersArray);
            })
            .catch(err => {
                console.error(err);
            })
    }

    const removeUserAsAdminHandler = (user) => {
        const userValues = {
            authDetails: {
                email: user.email,
                username: user.username
            },
            userValues: {
                address: user.address,
                isAdmin: false,
                isSuperAdmin: false,
                phone: user.phone
            }
        }
        axios.put(`https://gamesapp-f22ad-default-rtdb.europe-west1.firebasedatabase.app/userDetails/${user.id}.json`, userValues)
            .then(() => {
                for (let usr of users) {
                    if (usr.id === user.id) {
                        user.isAdmin = false;
                    }
                }
                let usersArray = [...users];
                setUsers(usersArray);
            })
            .catch(err => {
                console.error(err);
            })
        
    }

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
                            Users List
                        </p>
                    </div>
                }
            >
                <Table
                    dataSource={users}
                    rowKey="id"
                    pagination={{ pageSize: 5 }}
                    scroll={{ x: 400 }}
                >
                    <Column
                        title='Username'
                        dataIndex='username'
                        key='username'
                    />
                    <Column
                        title='Email'
                        dataIndex='email'
                        key='email'
                    />
                    <Column
                        title='Address'
                        dataIndex='address'
                        key='address'
                    />
                    <Column
                        title='Phone'
                        dataIndex='phone'
                        key='phone'
                    />
                    {isSuperAdmin && <Column
                        title='Admin'
                        dataIndex='isAdmin'
                        key='isAdmin'
                        render={(value, record) => (record.isSuperAdmin ? <Tag color='geekblue' style={{ cursor: 'pointer' }}>SuperAdmin</Tag> : <Tag color={value === true ? 'green' : 'volcano'} style={{ cursor: 'pointer' }}>
                            {record.isAdmin ? <Popconfirm title="Remove as admin?"
                                onConfirm={() => removeUserAsAdminHandler(record)}
                                okText="Yes"
                                cancelText="No">
                                YES
                            </Popconfirm> : <Popconfirm title="Add as admin?"
                                onConfirm={() => addUserAsAdminHandler(record)}
                                okText="Yes"
                                cancelText="No">
                                NO
                            </Popconfirm>}
                        </Tag>)}
                    />}
                </Table>
            </Card>

        </div>

    )
}

export default UsersTable;