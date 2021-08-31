
import React, { useState } from 'react';

import { Row, Col } from 'antd';

import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import GameVideoModal from '../GameVideoModal';
import { useMediaQuery } from 'react-responsive';
import './style.css';
import 'antd/dist/antd.css';
import { NavLink, useHistory } from 'react-router-dom';
import Coverflow from 'react-coverflow';
import { useSelector } from 'react-redux';


function HomeSlider(props) {
    const [isGameVideoModalVisible, setIsGameVideoModalVisible] = useState(false);
    const [isOpenVideoButtonClicked, setIsOpenVideoButtonClicked] = useState(true);
    const history = useHistory();
    const games = useSelector(state => state.games.games);
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-device-width: 1025px)'
    })
    const openGameVideoModalHandler = () => {
        setIsGameVideoModalVisible(true);
        setIsOpenVideoButtonClicked(false);
    }

    const closeGameVideoModalHandler = () => {
        setIsGameVideoModalVisible(false);
        setIsOpenVideoButtonClicked(true);
    }

    const openGameHandler = () => {
        history.push('/g3')
    }
    
    return (
        <div style={{display: 'flex'}}>
            {isDesktopOrLaptop && <div style={{marginTop: 100}}>
                <Row >
                    <Col lg={8} xl={8} style={{ backgroundColor: 'black', color: 'white', zIndex: 2 }}>
                        <img alt="Need for Speed" src="https://media.contentapi.ea.com/content/dam/eacom/510/common/nfs-510-logo-white.svg" style={{ marginTop: 150, marginLeft: 100, zIndex: 2 }} />
                        <Row>
                            <Col>
                                <div className="readMore">
                                    <p onClick={openGameHandler}>READ MORE</p>
                                    <div className="readMoreOverlay">
                                    </div>
                                </div>
                            </Col>
                            <Col>
                                <div className="buyNow">
                                    <p onClick={openGameHandler}>BUY NOW</p>
                                    <div className="buyNowOverlay">
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col lg={16} xl={16}>
                        <img alt="Need for Speed" src="https://www.thesixthaxis.com/wp-content/uploads/2020/11/NFSHotPursuitRe-Hero500.jpg" />
                        <div className="container" onClick={openGameVideoModalHandler}>
                            {isOpenVideoButtonClicked && <button className="pulse-button">
                                <PlayArrowIcon style={{ fontSize: 80, color: '#ffc107' }} />
                            </button>}
                        </div>
                    </Col>

                </Row>
            </div>}


            {isGameVideoModalVisible && <GameVideoModal
                visible={isGameVideoModalVisible}
                onClose={closeGameVideoModalHandler}
            />}

        </div>
    )
}

export default HomeSlider;