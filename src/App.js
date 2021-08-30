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
          axios.get(`https://gamesapp-f22ad-default-rtdb.europe-west1.firebasedatabase.app/userDetails.json`)
            .then(rs => {
              let transformedData = [];
              for (let key in rs.data) {
                transformedData.push(rs.data[key]);
              }
              for (let user of transformedData) {
                if (user.authDetails.email === res.data.email) {
                  dispatch(authActions.setUserDetails(user))
                  if(user.userValues.isAdmin === true){
                    dispatch(authActions.setIsUserAdmin());
                  }
                }
              }
            })
            .catch(err =>{
              console.error(err);
            })
        })
        .catch(err => {
          console.error(err);
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
