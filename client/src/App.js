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
import description from './components/pages/description'
import SingleRoom from './components/room_pages/singleroom';
import DoubleRoom from './components/room_pages/doubleroom';
import TwinRoom from './components/room_pages/twinroom';
import TripleRoom from './components/room_pages/tripleroom';
import DeluxRoom from './components/room_pages/deluxroom';
import OndolRoom from './components/room_pages/ondolroom';
import SweetRoom from './components/room_pages/sweetroom';


function App() {
  const [user, setUser] = useState(false);
  const authenticated = user != false;


  const getuser = (a) => setUser(a);

  return (

    <Router>
      <Navbar userin={user} getuser={getuser} />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/mypage' component={Mypage} />
        <Route path='/reservation' component={Reservation} />
        <Route path='/confirmation' component={Confirmation} />
        <Route path='/description' component={description} />
        <Route
          path="/login"
          render={props => (
            <LogIn getuser={getuser} />
          )}
        />
        <Route path='/signup' component={SignUp} />

        <Route path='/singleroom' component={SingleRoom} />
        <Route path='/doubleroom' component={DoubleRoom} />
        <Route path='/twinroom' component={TwinRoom} />
        <Route path='/tripleroom' component={TripleRoom} />
        <Route path='/deluxroom' component={DeluxRoom} />
        <Route path='/ondolroom' component={OndolRoom} />
        <Route path='/sweetroom' component={SweetRoom} />
      </Switch>

    </Router>
  );
}

export default App;
