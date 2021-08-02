import React, { Fragment, useEffect, useState } from "react";
import Dashboard from './layout/Dashboard';
import axios from 'axios';

import { useDispatch } from 'react-redux';
import { authActions } from './store/auth';
import Loader from "./components/Loader";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCrEB1r3iKHWXKZ53Cz-7G7uUpwOjoF2yM`, { idToken: userToken })
        .then(res => {
          dispatch(authActions.login());
          dispatch(authActions.setUser(res.data));
          console.log(res.data);
          setIsLoading(false);
        })
    }
    setIsLoading(false);
  }, [dispatch]);
  return (
    <Fragment>
      {isLoading ? <Loader /> :
        <Dashboard />}
    </Fragment>
  );
}

export default App;
