import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import NavigationBar from "../components/NavigationBar";

import Home from '../pages/Home/index';
import About from '../pages/About';
import UserProfile from '../pages/UserProfile';
import Games from "../pages/Games";
import { useSelector } from "react-redux";
import GameDetails from '../pages/GameDetails/index';
import Contact from "../pages/Contact";
import Checkout from "../pages/Checkout/index";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";

function Dashboard() {
    const [isLoading, setIsLoading] = useState(false);
    const isUserLoggedIn = useSelector(state => state.auth.isAuthenticated);
    const cartGames = useSelector(state => state.cart.addedGamesToCart);
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
                        <UserProfile />
                    </Route>
                    <Route path="/contact" exact>
                        <Contact />
                    </Route>
                    <Route path="/checkout" exact>
                        {cartGames.length > 0 ? <Checkout /> : <Home />}
                    </Route>
                    <Route path="/games" exact>
                        {!isUserLoggedIn ? <Redirect to="/" /> : <Games />}
                    </Route>
                    <Route path="/:gameId" exact>
                        <GameDetails />
                    </Route>
                    <Route path="*" exact>
                        <Redirect to="/" />
                    </Route>
                </Switch>}
            </Router>
        </div>
    );
}

export default Dashboard;
