import React, { useState, useEffect } from 'react';
import HomeSlider from "../../components/HomeSlider";
import GameItem from '../../components/GameItem';
import WaveHomeUp from '../../components/WaveHomeUp';

import Loader from '../../components/Loader';
import './style.css';
import { useSelector } from 'react-redux';
import { Card } from 'semantic-ui-react';

function Home() {
    const [isLoading, setIsLoading] = useState(false);
    const games = useSelector(state => state.games.games);

    return (
        <div>
            <div>
                <HomeSlider />
                <div style={{ marginTop: 0 }}>
                    <WaveHomeUp />
                </div>
                <div className="gameItems">
                    <Card.Group itemsPerRow={3} stackable={true} doubling={true} centered style={{ margin: '50px auto' }}>
                        {games.slice(0, 5).map((game, index) =>
                            <GameItem
                                game={game}
                                key={index}
                            />)}
                    </Card.Group>
                </div>

            </div>
        </div >
    )
}

export default Home;