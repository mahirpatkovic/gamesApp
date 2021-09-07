import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import NavigationBar from "../components/NavigationBar";

import Home from '../pages/Home/index';
import About from '../pages/About';
import UserProfile from '../pages/UserProfile/index';
import Games from "../pages/Games";
import { useDispatch, useSelector } from "react-redux";
import GameDetails from '../pages/GameDetails/index';
import Contact from "../pages/Contact";
import Checkout from "../pages/Checkout/index";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import axios from 'axios';
import { gamesActions } from "../store/games";
import AdminPage from "../pages/AdminPage/index";
import Footer from "../components/Footer";
import logoToTop from '../assets/logo2.png';
import './style.css';
import { Icon } from "semantic-ui-react";

function Dashboard() {
    const [isLoading, setIsLoading] = useState(false);
    const [isBackTopButtonVisible, setIsBackTopButtonVisible] = useState(false);
    const isUserLoggedIn = useSelector(state => state.auth.isAuthenticated);
    const cartGames = useSelector(state => state.cart.addedGamesToCart);
    const isUserAdmin = useSelector(state => state.auth.isUserAdmin)
    const dispatch = useDispatch();
    useEffect(() => {
        setIsLoading(true);
        axios.get(`https://gamesapp-f22ad-default-rtdb.europe-west1.firebasedatabase.app/games.json`)
            .then(res => {
                let transformedData = [];
                let tempData = {};
                for (let key in res.data) {
                    tempData = {...res.data[key], id: key };
                    transformedData.push(tempData);
                }
                dispatch(gamesActions.fetchGames(transformedData));
                setIsLoading(false);
            })
            .catch(err => {
                console.error(err);
            })
    }, []);

    // useEffect(() => {
    //     setIsLoading(false);
    // }, []);

    const handleLoaderShow = (isOpen) => {
        setIsLoading(isOpen);
    }
    const toTopButtonVisibleHandler = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300) {
            setIsBackTopButtonVisible(true);
        }
        else if (scrolled <= 300) {
            setIsBackTopButtonVisible(false)
        }
    };

    const scrollToTopHandler = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    window.addEventListener('scroll', toTopButtonVisibleHandler);

    return (
        <div className='pageContainer'>
            <Router>
                <NavigationBar onLoad={handleLoaderShow} />

                {isLoading === true ? <Loader /> : <Switch>
                    <Route path="/" exact>
                        <Home />
                    </Route>
                    <Route path="/about" exact>
                        <About />
                    </Route>
                    <Route path="/user-profile" exact>
                        {!isUserLoggedIn ? <Redirect to="/" /> : <UserProfile />}
                    </Route>
                    <Route path="/contact" exact>
                        <Contact />
                    </Route>
                    <Route path="/checkout" exact>
                        {cartGames.length > 0 ? <Checkout /> : <Home />}
                    </Route>
                    <Route path="/games" exact>
                        {!isUserLoggedIn ? <Home /> : <Games />}
                    </Route>
                    <Route path="/admin" exact>
                        {(isUserLoggedIn && isUserAdmin) ? <AdminPage /> : <Home />}
                    </Route>
                    <Route path="/:gameId" exact>
                        <GameDetails />
                    </Route>
                    <Route path="*" exact>
                        <Redirect from='*' to='/' />
                    </Route>
                </Switch>}
                <Footer />
                {isBackTopButtonVisible && <div className='backToTopBtn' onClick={scrollToTopHandler}>
                    <img src={logoToTop} alt='MsGames' />
                    <Icon name='chevron circle up' color='yellow' />
                </div>}
            </Router>
        </div>
    );
}

export default Dashboard;
