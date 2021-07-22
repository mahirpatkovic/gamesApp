import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from '../../components/Loader';
import { Grid, Segment, Button, Icon, Label, Embed } from 'semantic-ui-react';
import './style.css';
import ImageSlider from "./ImageSlider";
import TableInfo from "./TableInfo";
import TableLanguageInfo from "./TableLanguageInfo";
import GameReqs from "./GameReqs";
import CommentSection from "./CommentSection";
import { useDispatch } from "react-redux";
import {cartActions} from '../../store/cart';

function GameDetails() {
    const { gameId } = useParams();
    const [game, setGame] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [winMinimum, setWinMinimum] = useState([]);
    const [winRecommended, setWinRecommended] = useState([]);
    const [macMinimum, setMacMinimum] = useState([]);
    const [macRecommended, setMacRecommended] = useState([]);
    const [english, setEnglish] = useState([]);
    const [german, setGerman] = useState([]);
    const [portugese, setPortugese] = useState([]);
    const [spanish, setSpanish] = useState([]);
    const [turkish, setTurkish] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        setIsLoading(true);
        axios.get(`https://gamesapp-f22ad-default-rtdb.europe-west1.firebasedatabase.app/games.json`)
            .then(res => {
                for (let gm of res.data) {
                    if (gm.id === gameId) {
                        setGame(gm);
                        setWinMinimum(gm.systemReqs.windows.minimum);
                        setWinRecommended(gm.systemReqs.windows.recommended);
                        setMacMinimum(gm.systemReqs.mac.minimum);
                        setMacRecommended(gm.systemReqs.mac.recommended);
                        setEnglish(gm.languages.English);
                        setGerman(gm.languages.German);
                        setPortugese(gm.languages.Portugese);
                        setSpanish(gm.languages.Spanish);
                        setTurkish(gm.languages.Turkish)
                        console.log("game", gm);
                        setIsLoading(false);
                    }
                }
            })
            .catch(err => {
                console.error(err);
            })
    }, [gameId]);

    const addGameToCartHandler = (game) =>{
        dispatch(cartActions.addToCart(game));
    }
    return (
        <div style={{ display: 'flex' }}>
            {isLoading ? <Loader /> : <div className="gameSinglePage">
                <Grid columns={2} >
                    <Grid.Row columns={2} centered>
                        <Grid.Column mobile={16} tablet={12} computer={6}>
                            <ImageSlider images={game.images} />
                        </Grid.Column>
                        <Grid.Column mobile={12} tablet={8} computer={4}>
                            <Grid.Row columns={2} style={{ marginTop: 20, marginLeft: 0 }}>
                                <Grid.Column>
                                    <Button as='div' labelPosition='right' onClick={() => addGameToCartHandler(game)}>
                                        <Button color='black'>
                                            <Icon name='shop' />
                                        </Button>
                                        <Label as='a' basic color='black' pointing='left'>
                                            Add to cart
                                        </Label>
                                    </Button>
                                </Grid.Column>
                                <Grid.Column style={{ marginLeft: 10 }}>
                                    <Label as='a' tag size="big">${Number(game.price).toFixed(2)}</Label>
                                </Grid.Column>
                            </Grid.Row>
                            <Segment>
                                <TableInfo game={game} />
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row centered>
                        <Grid.Column mobile={16} tablet={12} computer={6}>
                            <Embed
                                autoplay={true}
                                id={game.trailer}
                                source='youtube'
                                iframe={{
                                    allowFullScreen: true,
                                    autoplay: true,
                                }}
                                className="gameTrailer"
                            />
                        </Grid.Column>
                        <Grid.Column only={'computer'} computer={4} >
                            <TableLanguageInfo
                                english={english}
                                german={german}
                                portugese={portugese}
                                spanish={spanish}
                                turkish={turkish}
                            />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row centered>
                        <Grid.Column only={'computer'} computer={6}>
                            <Segment>
                                <h4>System Requirements</h4>
                                <GameReqs
                                    winMinimum={winMinimum}
                                    winRecommended={winRecommended}
                                    macMinimum={macMinimum}
                                    macRecommended={macRecommended}
                                />
                            </Segment>
                        </Grid.Column>
                        <Grid.Column mobile={10} tablet={12} computer={4}>
                            <CommentSection gameId={game.id} comments={game.comments} />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

                <p>GameDetails Page</p>
                <h3>{game.name}</h3>
            </div>}
        </div>
    )
}

export default GameDetails;