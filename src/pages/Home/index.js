import React, { useState, useEffect } from 'react';
import HomeSlider from "../../components/HomeSlider";
import GameItem from '../../components/GameItem';
import WaveHomeUp from '../../components/WaveHomeUp';

import Loader from '../../components/Loader';
import './style.css';
function Home() {
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        let startTime = new Date().getTime();
        let interval = setInterval(() => {
            setIsLoading(true);
            if (new Date().getTime() - startTime > 500) {
                setIsLoading(false);
                clearInterval(interval);
                return;
            }
        }, 0);
    }, []);
    return (
        <div>
            {isLoading ? <Loader /> : <div>
                <HomeSlider />
                <div style={{ marginTop: 0 }}>
                    <WaveHomeUp />
                </div>
                <div className="gameItems">
                    <GameItem />
                </div>
            </div>}
        </div>
    )
}

export default Home;