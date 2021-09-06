import React from 'react';
import logo from '../../../assets/logo2.png';
import logo2 from '../../../assets/logo.png';

function About() {
    return (
        <div>
            <div style={{ overflow: 'hidden', width: 120 }}>
                <p style={{ float: 'left', color: 'white', fontFamily: 'Segoe UI Black', fontSize: 25 }}>About</p>
                <p style={{ float: 'right', color: '#ffc107', fontFamily: 'Segoe UI Black', fontSize: 25 }}>Us</p>
            </div>
            <p style={{ fontFamily: 'Segoe UI', color: 'white' }}>
                This is a games web shop application created by Mahir Patkovic.
                This web application is for games buying, its information, recommendations, screenshots with gameplays, game trailers if somebody wants to see the story 
                    and gameplay of specific game, characteristics for each game, so the players will know do their PCs can run the game and many other interesting stuff.
            </p>
            <div style={{ overflow: 'hidden', width: 180 }}>
                <img src={logo} alt='MsGames' className='logo' />
                <img src={logo2} alt='MsGames' className='logo2' />
            </div>

        </div>
    )
}

export default About;