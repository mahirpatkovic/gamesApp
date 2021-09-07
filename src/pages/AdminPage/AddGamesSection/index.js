import React, { useEffect, useState } from 'react';
import { Card, Table, Row, Col } from 'antd';
import axios from 'axios';
import AddGameModal from './AddGameModal';
import EditGameModal from './EditGameModal';
import { Button } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { gamesActions } from '../../../store/games';

function AddGamesSection() {
    const [games, setGames] = useState([]);
    const [isAddGameModalVisible, setIsAddGameModalVisible] = useState(false);
    const [selectedGame, setSelectedGame] = useState(null);
    const [isEditGameModalVisible, setIsEditGameModalVisible] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        axios.get(`https://gamesapp-f22ad-default-rtdb.europe-west1.firebasedatabase.app/games.json`)
            .then(res => {
                let transformedData = [];
                for (let key in res.data) {
                    transformedData.push({ ...res.data[key], id: key })
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
            title: 'Games in stock',
            dataIndex: 'quantity',
            key: 'quantity',
            align: 'center',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            align: 'center',
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

    const openEditGameModalHandler = (record) => {
        setSelectedGame(record);
        setIsEditGameModalVisible(true);
    }

    const closeEditGameModalHandler = (gm, isOk) => {
        if (isOk === true) {
            let tmpData = games;
            tmpData.forEach((v, i) => {
                if (v.id === gm.id) {
                    tmpData[i] = gm;
                }
            });
            setGames([...tmpData]);
        }
        setIsEditGameModalVisible(false);
    }

    const deleteGameHandler = (gm) => {
        let tmpData = games;
        setGames([...tmpData.filter(game => game.id !== gm.id)]);
        dispatch(gamesActions.fetchGames([...tmpData.filter(game => game.id !== gm.id)]));
        setIsEditGameModalVisible(false);
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
                    rowKey="id"
                    pagination={{ pageSize: 5 }}
                    scroll={{ x: 400 }}
                    onRow={(data, index) => {
                        return {
                            onClick: (event) => openEditGameModalHandler(data),
                        };
                    }}
                />
            </Card>
            {isAddGameModalVisible && <AddGameModal
                visible={isAddGameModalVisible}
                onClose={closeAddGameModalHandler}
            />}
            {isEditGameModalVisible && <EditGameModal
                visible={isEditGameModalVisible}
                selected={selectedGame}
                onClose={closeEditGameModalHandler}
                onDelete={deleteGameHandler}
            />}
        </div>
    )
}

export default AddGamesSection;