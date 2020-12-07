import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Reservation from './components/pages/Reservation';
import Mypage from './components/pages/Mypage';
import LogIn from './components/pages/LogIn';
import SignUp from './components/pages/SignUp';
import Confirmation from './components/pages/Confirmation';
import Description from './components/pages/description'
import SingleRoom from './components/room_pages/singleroom';
import DoubleRoom from './components/room_pages/doubleroom';
import TwinRoom from './components/room_pages/twinroom';
import TripleRoom from './components/room_pages/tripleroom';
import DeluxRoom from './components/room_pages/deluxroom';
import OndolRoom from './components/room_pages/ondolroom';
import SweetRoom from './components/room_pages/sweetroom';
import Axios from 'axios';


function App() {
  const [user, setUser] = useState(false);
  const [permission, setPermission] = useState(false);
  const authenticated = user != false;


  const getuser = (a) => setUser(a);
  useEffect(() => {
    Axios.get('http://localhost:5000/login').then((response) => {
      console.log(response.data);
      setUser(response.data.loggedIn)

    });

  }, []);
  const checkPermission = async () => {
    await Axios({
      method: "get",
      url: "http://localhost:5000/login",
    }).then((res) => {
      if (res.data.loggedIn) {
        setPermission(true)
        setUser(true)
      } else {
        setPermission(false)
        setUser(false)
      }

    });
    console.log(user)
  }
  return (

    <Router>
      <Navbar userin={user} getuser={getuser} />
      <Switch>
        <Route path='/' render={props => (<Home checkPermission={checkPermission} />)} exact />
        <Route path='/mypage' render={props => (<Mypage checkPermission={checkPermission} />)} />
        <Route path='/reservation' render={props => (<Reservation checkPermission={checkPermission} />)} />
        <Route path='/confirmation' render={props => (<Confirmation checkPermission={checkPermission} />)} />
        <Route path='/description' render={props => (<Description checkPermission={checkPermission} />)} />
        <Route
          path="/login"
          render={props => (
            <LogIn getuser={getuser} />
          )}
        />
        <Route path='/signup' render={props => (<SignUp checkPermission={checkPermission} />)} />

        <Route path='/singleroom' render={props => (<SingleRoom checkPermission={checkPermission} />)} />
        <Route path='/doubleroom' render={props => (<DoubleRoom checkPermission={checkPermission} />)} />
        <Route path='/twinroom' render={props => (<TwinRoom checkPermission={checkPermission} />)} />
        <Route path='/tripleroom' render={props => (<TripleRoom checkPermission={checkPermission} />)} />
        <Route path='/deluxroom' render={props => (<DeluxRoom checkPermission={checkPermission} />)} />
        <Route path='/ondolroom' render={props => (<OndolRoom checkPermission={checkPermission} />)} />
        <Route path='/sweetroom' render={props => (<SweetRoom checkPermission={checkPermission} />)} />
      </Switch>

    </Router>
  );
}

export default App;
