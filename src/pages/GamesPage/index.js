import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Card } from 'semantic-ui-react';
import GameItem from '../../components/GameItem';
import { List, Row, Col, Select, Button } from 'antd';
import './style.css';

const { Option } = Select;

function Games() {
    const [games, setGames] = useState([]);
    const [isFilterByGenreCleared, setIsFilterByGenreCleared] = useState(false);
    const tmpGames = useSelector(state => state.games.games);

    useEffect(() => {
        setGames(tmpGames);
    }, []);

    const genreOptions = [
        { key: 'action', value: 'Action' },
        { key: 'adventure', value: 'Adventure' },
        { key: 'fight', value: 'Fight' },
        { key: 'history', value: 'History' },
        { key: 'racing', value: 'Racing' },
        { key: 'sports', value: 'Sports' },
        { key: 'war', value: 'War' },
    ]

    const filterPriceHandler = (type) => {
        switch (type) {
            case 'ascending':
                const priceArr = games.map(gm => gm).sort((a, b) => {
                    return a.price - b.price;
                });
                setGames(priceArr);
                break;
            case 'descending':
                const priceArrDes = games.map(gm => gm).sort((a, b) => {
                    return b.price - a.price;
                });
                setGames(priceArrDes);
                break;
            default:
                setGames(tmpGames);
                break;
        }
    }

    const filterByGenreHandler = (values) => {
        let tmpGamesFiltered = [];
        for (let game of tmpGames) {
            for (let val of values) {
                const gmGenre = game.genre.split(', ');
                for (let gnr of gmGenre) {
                    if (gnr === val) {
                        tmpGamesFiltered.push(game)
                    }
                }
            }
        }
        const uniqueGames = [...new Set(tmpGamesFiltered)];
        setGames(uniqueGames);
    }

    const resetFiltersHandler = () => {
        setIsFilterByGenreCleared(true);
        setGames(tmpGames);
    }

    return (
        <div style={{ display: 'flex' }}>
            <div className='gamesPage'>
                <div className='filters'>
                    <Row>
                        <Col
                            xxl={{ span: 3, offset: 4 }}
                            xl={{ span: 3, offset: 4 }}
                            lg={{ span: 3, offset: 4 }}
                            md={{ span: 3, offset: 4 }}
                            sm={{ span: 3, offset: 4 }}
                            xs={{ span: 3, offset: 4 }}
                        >
                            <Select placeholder='Filter by price' style={{ width: '100%' }} onChange={filterPriceHandler}>
                                <Option value="ascending">Ascending</Option>
                                <Option value="descending">Descending</Option>
                            </Select>
                            {/* <Dropdown
                                text='Filter by price'
                                icon='filter'
                                floating
                                labeled
                                button
                                className='icon'
                            >
                                <Dropdown.Menu>
                                    <Dropdown.Header icon='dollar' content='Filter by price' />
                                    <Dropdown.Divider />
                                    <Dropdown.Item
                                        label={{ color: 'red', empty: true, circular: true }}
                                        text='Ascending'
                                        onClick={() => filterPriceHandler('ascending')}
                                    />
                                    <Dropdown.Item
                                        label={{ color: 'blue', empty: true, circular: true }}
                                        text='Descending'
                                        onClick={() => filterPriceHandler('descending')}
                                    />
                                </Dropdown.Menu>
                            </Dropdown> */}
                        </Col>
                        <Col
                            xxl={{ span: 6, offset: 2 }}
                            xl={{ span: 6, offset: 2 }}
                            lg={{ span: 6, offset: 2 }}
                            md={{ span: 6, offset: 2 }}
                            sm={{ span: 6, offset: 2 }}
                            xs={{ span: 6, offset: 2 }}
                        >
                            <Select
                                mode="multiple"
                                showArrow
                                style={{ width: '100%' }}
                                options={genreOptions}
                                placeholder='Filter by genre'
                                onChange={(value) => (filterByGenreHandler(value))}
                                allowClear={isFilterByGenreCleared}
                            />
                            {/* <Dropdown
                                placeholder='Filter by genre'
                                fluid
                                multiple
                                selection
                                options={genreOptions}
                                clearable={isFilterByGenreCleared}
                                onChange={(value, option) => (filterByGenreHandler(value, option))}
                            /> */}
                        </Col>
                        <Col
                            xxl={{ span: 6, offset: 2 }}
                            xl={{ span: 6, offset: 2 }}
                            lg={{ span: 6, offset: 2 }}
                            md={{ span: 6, offset: 2 }}
                            sm={{ span: 6, offset: 2 }}
                            xs={{ span: 6, offset: 2 }}
                        >
                            <Button onClick={resetFiltersHandler}>
                                Reset Filters
                            </Button>
                        </Col>

                    </Row>
                </div>
                <div >
                    <Card.Group stackable={true} doubling={true} centered >
                        <List
                            pagination={{
                                pageSize: 5,
                                responsive: true,
                            }}
                            grid={{ gutter: 0, xxl: 5, xl: 4, lg: 3, md: 2, sm: 1, xs: 1 }}
                            dataSource={games}
                            renderItem={(game, index) => (
                                <GameItem
                                    game={game}
                                    key={index}
                                />)}
                            className='gamesList'
                        />
                        {/* {games.map((game, index) => {
                            return <GameItem
                                game={game}
                                key={index}
                            />
                        })
                        } */}
                    </Card.Group>
                </div>

            </div>
        </div>
    )
}

export default Games;