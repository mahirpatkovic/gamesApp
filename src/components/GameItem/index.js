import React from 'react';
import { Link } from 'react-router-dom';

import { Icon, Card, Image } from 'semantic-ui-react';
import './style.css';

function GameItem(props) {
   
    return (
        <div style={{ margin: '100px auto' }}>
            <Card.Group itemsPerRow={3} stackable={true} doubling={true} centered>
                {props.games.map(game => <Card key={game.id} className="card" style={{ width: 300 }}>
                    <Link to={`/${game.id}`}>
                        <Image src={game.poster} wrapped style={{width: 300}}/>
                    </Link>
                    <Card.Content>
                        <Card.Header>{game.name}</Card.Header>
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