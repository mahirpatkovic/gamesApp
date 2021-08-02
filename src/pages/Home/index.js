import React, { useState, useEffect } from 'react';
import axios from 'axios'
import HomeSlider from "../../components/HomeSlider";
import GameItem from '../../components/GameItem';
import WaveHomeUp from '../../components/WaveHomeUp';
import WaveHomeDown from '../../components/WaveHomeDown';

import Loader from '../../components/Loader';
import './style.css';
function Home() {
    const [games, setGames] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setIsLoading(true);
        axios.get(`https://gamesapp-f22ad-default-rtdb.europe-west1.firebasedatabase.app/games.json`)
            .then(res => {
                setGames(res.data);
                setIsLoading(false);
            })
            .catch(err => {
                console.error(err);
            })
    }, []);
    return (
        <div>
            {isLoading ? <Loader /> : <div>
                <HomeSlider />
                <div style={{ marginTop: 0 }}>
                    <WaveHomeUp />
                </div>
                <div className="gameItems">
                    <GameItem games={games} />
                </div>
                <div style={{ marginTop: -370 }}>
                    <WaveHomeDown />
                </div>
            </div>}
        </div>
    )
}

export default Home;