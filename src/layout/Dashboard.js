import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import NavigationBar from "../components/NavigationBar";

import Home from '../pages/Home';
import About from '../pages/About';
import UserProfile from '../pages/UserProfile';
import Games from "../pages/Games";
import { useSelector } from "react-redux";
import GameDetails from "../pages/GameDetails";

function Dashboard() {

    const isUserLoggedIn = useSelector(state => state.auth.isAuthenticated);
    return (
        <div>
            <Router>
                <NavigationBar />

                <Switch>
                    <Route path="/" exact>
                        <Home />
                    </Route>
                    <Route path="/about" exact>
                        <About />
                    </Route>
                    <Route path="/user-profile" exact>
                        <UserProfile />
                    </Route>
                    <Route path="/games" exact>
                        {!isUserLoggedIn ? <Redirect to="/" /> : <Games />}
                    </Route>
                    <Route path="/:gameId" exact>
                        <GameDetails />
                    </Route>
                    <Route path="*">
                        <Redirect to="/" />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default Dashboard;
