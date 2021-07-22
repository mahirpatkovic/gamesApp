import React from 'react';
import { Link } from 'react-router-dom';

import { Icon, Card, Image } from 'semantic-ui-react';
import './style.css';

function GameItem(props) {

    return (
        <div style={{ margin: '100px auto' }}>
            <Card.Group itemsPerRow={3} stackable={true} doubling={true} centered>
                {props.games.map(game => <Card key={game.id} className="card" style={{ width: 300 }}>
                    <div className="game">
                        <Image src={game.poster} wrapped style={{ width: 300 }} />
                        <div className="gameOverlay"></div>
                        <div className="gameTextOverlay">
                            <p className="p0">{game.title}</p>
                            <p className="p1">{game.description}</p>
                        </div>
                    </div>
                    <Card.Content>
                        <Link to={`/${game.id}`} style={{ textDecoration: 'none' }}>
                            <Card.Header>
                                <h3>
                                    {game.name}
                                </h3>
                            </Card.Header>
                        </Link>
                        <Card.Meta>
                            <span className='date'><Icon name='tv' /> {game.platform}</span>
                        </Card.Meta>
                    </Card.Content>
                    <Card.Content extra>
                        <span className='date'><Icon name='tags' /> {game.genre}</span>
                    </Card.Content>
                </Card>)}
            </Card.Group>
        </div>
    )
}

export default GameItem;