import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
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

function Dashboard() {
    const [isLoading, setIsLoading] = useState(false);
    const isUserLoggedIn = useSelector(state => state.auth.isAuthenticated);
    const cartGames = useSelector(state => state.cart.addedGamesToCart);
    const dispatch = useDispatch();
    useEffect(() => {
        setIsLoading(true);
        axios.get(`https://gamesapp-f22ad-default-rtdb.europe-west1.firebasedatabase.app/games.json`)
            .then(res => {
                let transformedData = [];
                for(let key in res.data){
                    transformedData.push(res.data[key])
                }
                dispatch(gamesActions.fetchGames(transformedData));
                setIsLoading(false);
            })
            .catch(err => {
                console.error(err);
            })
    }, []);
    
    useEffect(() => {
        setIsLoading(false);
    }, []);

    const handleLoaderShow = (isOpen) => {
        setIsLoading(isOpen);
    }

    return (
        <div>
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
                        {!isUserLoggedIn ? <Home /> : <AdminPage />}
                    </Route>
                    <Route path="/:gameId" exact>
                        <GameDetails />
                    </Route>
                    <Route path="*" exact>
                        <Redirect from='*' to='/' />
                    </Route>
                </Switch>}
            </Router>
        </div>
    );
}

export default Dashboard;
