import React, { useState, useEffect } from 'react';
import HomeSlider from "../components/HomeSlider";
import axios from 'axios'

function Home() {
    const [games, setGames] = useState([]);

    useEffect(() => {
        axios.get(`https://gamesapp-f22ad-default-rtdb.europe-west1.firebasedatabase.app/gamesHomeSlider.json`)
            .then(res => {
                setGames(res.data);
                console.log(res.data)
            })
            .catch(err => {
                console.error(err);
            })
    }, []);
    return (
        <div >
            <HomeSlider games={games}/>
            {/* {games.map(game => {
                return <HomeSlider
                    key={game.id}
                    gameId={game.id}
                    title={game.title}
                    poster={game.poster}
                    type={game.type}
                    description={game.description}
                    name={game.name}
                    platform={game.platform}
                    games={games}
                />
            })} */}
        </div>
    )
}

export default Home;