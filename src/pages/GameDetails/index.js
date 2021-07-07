import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from '../../components/Loader';
import { Grid, Image, Segment } from 'semantic-ui-react';
import './style.css';
function GameDetails() {
    const { gameId } = useParams();
    const [game, setGame] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setIsLoading(true);
        axios.get(`https://gamesapp-f22ad-default-rtdb.europe-west1.firebasedatabase.app/games.json`)
            .then(res => {
                for (let gm of res.data) {
                    if (gm.id === gameId) {
                        setGame(gm);
                        console.log("game", gm)
                        setIsLoading(false);
                    }
                }
            })
            .catch(err => {
                console.error(err);
            })
    }, [gameId]);
    return (
        <div style={{ display: 'flex' }}>
            {isLoading ? <Loader /> : <div className="gameSinglePage">
                <Grid stackable columns={2}>
                    <Grid.Column>
                        <Segment>
                            <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
                        </Segment>
                    </Grid.Column>
                    <Grid.Column>
                        <Segment>
                            <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
                        </Segment>
                    </Grid.Column>
                </Grid>
                <p>GameDetails Page</p>
                <h3>{game.name}</h3>
            </div>}
        </div>
    )
}

export default GameDetails;