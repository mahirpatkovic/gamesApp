import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function GameDetails() {
    const { gameId } = useParams();
    const [game, setGame] = useState([]);
    useEffect(() => {
        axios.get(`https://gamesapp-f22ad-default-rtdb.europe-west1.firebasedatabase.app/gamesHomeSlider.json`)
            .then(res => {
                for (let gm of res.data) {
                    if (gm.id === gameId) {
                        setGame(gm);
                        console.log("game", gm)
                    }
                }
            })
            .catch(err => {
                console.error(err);
            })
    }, [gameId]);
    return (
        <div style={{ display: 'flex' }}>
            <div style={{ marginTop: 100 }}>
                <p>GameDetails Page</p>
                <h3>{game.name}</h3>
            </div>
        </div>
    )
}

export default GameDetails;