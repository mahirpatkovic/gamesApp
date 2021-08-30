import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Table, Tag } from 'antd';

function UsersTable() {
    const [users, setUsers] = useState([]);

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
                        phone: res.data[key].userValues.phone,
                    }
                    transformedData.push(tempData)
                }
                setUsers(transformedData);
            })
    }, []);

    const userColumns = [
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Admin',
            dataIndex: 'isAdmin',
            key: 'isAdmin',
            render: isAdmin => <Tag color={isAdmin === true ? 'green' : 'volcano'}>
                {isAdmin === true ? 'YES' : 'NO'}
            </Tag>
        },
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
                            Users List
                        </p>
                    </div>
                }
            >

                <Table
                    columns={userColumns}
                    dataSource={users}
                    rowKey="email"
                    pagination={{ pageSize: 5 }}
                    scroll={{ x: 400 }}
                />
            </Card>

        </div>

    )
}

export default UsersTable;