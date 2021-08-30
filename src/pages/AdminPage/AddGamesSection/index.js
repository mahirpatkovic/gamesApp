import React, { useEffect, useState } from 'react';
import { Card, Table, Row, Col } from 'antd';
import axios from 'axios';
import AddGameModal from './AddGameModal';
import { Button } from 'semantic-ui-react';

function AddGamesSection() {
    const [games, setGames] = useState([]);
    const [isAddGameModalVisible, setIsAddGameModalVisible] = useState(false);

    useEffect(() => {
        axios.get(`https://gamesapp-f22ad-default-rtdb.europe-west1.firebasedatabase.app/games.json`)
            .then(res => {
                let transformedData = [];
                for (let key in res.data) {
                    transformedData.push(res.data[key])
                }
                setGames(transformedData)
            })
            .catch(err => {
                console.error(err);
            })
    }, []);

    const gameColumns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Release Date',
            dataIndex: 'releaseDate',
            key: 'releaseDate',
        },
        {
            title: 'Genre',
            dataIndex: 'genre',
            key: 'genre',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: price => <p>{price}$</p>
        },
    ];

    const openAddGameModalHandler = () => {
        setIsAddGameModalVisible(true);
    }

    const closeAddGameModalHandler = (values, isOk) => {
        if (isOk === true) {
            setGames((prevState => {
                return [...prevState, values];
            }))
        }
        setIsAddGameModalVisible(false);
    }

    return (
        <div>
            <Card
                bordered={false}
                size="small"
                style={{ backgroundColor: "transparent" }}
                cover={
                    <div>
                        <p
                            style={{
                                fontWeight: "bold",
                                padding: 8,
                                paddingLeft: 15,
                                backgroundColor: "#ffc107",
                                fontSize: 16,
                                borderRadius: 3,
                            }}
                        >
                            <Row>
                                <Col span={16} style={{ marginTop: 5 }}>
                                    Games List
                                </Col>
                                <Col span={8}>
                                    <Button secondary onClick={openAddGameModalHandler}>Add Game</Button>
                                </Col>
                            </Row>

                        </p>
                    </div>
                }
            >

                <Table
                    columns={gameColumns}
                    dataSource={games}
                    rowKey="name"
                    pagination={{ pageSize: 5 }}
                    scroll={{ x: 400 }}
                />
            </Card>
            {isAddGameModalVisible && <AddGameModal
                visible={isAddGameModalVisible}
                onClose={closeAddGameModalHandler}
            />}
        </div>
    )
}

export default AddGamesSection;